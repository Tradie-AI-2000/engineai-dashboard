---
stepsCompleted: [1, 2, 3, 4, 5, 6, 7, 8]
inputDocuments:
  - _bmad-output/planning-artifacts/prd.md
  - _bmad-output/planning-artifacts/A-Product-Brief/product-brief.md
  - _bmad-output/planning-artifacts/ux-design-specification.md
  - _bmad-output/planning-artifacts/research/technical-agent-orchestration-frameworks-research-2026-04-04.md
  - GEMINI.md
workflowType: 'architecture'
project_name: 'EngineAI Dashboard'
user_name: 'Wardo'
date: '2026-04-04'
lastStep: 8
status: 'complete'
completedAt: '2026-04-04'
---

# Architecture Decision Document (High-Integrity Version)

_This document serves as the authoritative technical contract for the EngineAI Dashboard. It defines the execution model, state management, and security protocols required for the "Digital Assembly Line."_

## Architectural Decision Records (ADR)

### ADR-001: Custom Orchestration via Vercel AI SDK v6
- **Context:** Evaluated LangChain, CrewAI, and LangGraph for multi-agent coordination.
- **Decision:** Use **Vercel AI SDK v6** directly for all agent logic.
- **Rationale:** We require absolute control over Generative UI streaming and tool-calling. Frameworks like CrewAI are too opinionated ("Black Box"), and LangChain adds unnecessary abstraction layers that introduce latency and complicate debugging.
- **Trade-off:** We own the orchestration complexity (handoffs, state management).

### ADR-002: Durable Execution via Vercel Workflows
- **Context:** Evaluated Temporal and Inngest for long-running (24h+) tasks.
- **Decision:** **Vercel Workflows**.
- **Rationale:** Native integration with the Vercel ecosystem simplifies deployment for client "Business in a Box" instances. It provides sufficient durability for the 6-stage delivery pipeline without the overhead of a dedicated Temporal cluster.
- **Trade-off:** Bound to the Vercel platform.

### ADR-003: Runtime Split (Node.js vs. Edge)
- **Context:** Initial plan was Edge-only for all logic.
- **Decision:** **Node.js (Standard Serverless)** for all agent reasoning, tool calls, and AST refactoring. **Edge** is restricted to UI streaming and Middleware.
- **Rationale:** Agent reasoning and multi-step tool calls frequently exceed Edge's 25s response-start and 300s streaming limits. Node.js provides the reliability needed for complex orchestration.

### ADR-004: Multi-tenant Provisioning via Saga Pattern
- **Context:** Evaluated linear provisioning scripts.
- **Decision:** **Supabase-backed Saga Ledger** with compensating transactions.
- **Rationale:** Ensures no orphaned resources (repos, DBs) across GitHub, Vercel, and Supabase. Every step is idempotent and rollback-capable.

### ADR-005: Secret Management via Sealed Envelopes
- **Context:** How to inject client secrets (Supabase keys) into Vercel without LLM exposure?
- **Decision:** **Sealed Envelope Pattern**. Deterministic Workflow functions handle the values; Agents only orchestrate the trigger and status.
- **Rationale:** Secrets never enter the LLM context window, agent logs, or the audit trail. Conductors (Agents) point to the payload but never touch it.

## Data Models & Schemas

### 1. Task Ledger (The Engine)
Tracks agent execution, resume state, and side-effect idempotency.

```sql
CREATE TABLE task_ledger (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workflow_run_id TEXT NOT NULL,
  step_key        TEXT NOT NULL,
  agent_role      TEXT NOT NULL CHECK (agent_role IN ('ceo', 'specialist', 'sre')),
  tenant_id       UUID NOT NULL,
  status          TEXT NOT NULL DEFAULT 'pending'
                  CHECK (status IN ('pending','running','checkpoint','completed','failed','dead_letter')),
  checkpoint      JSONB NOT NULL DEFAULT '{}', -- Resumable LLM state
  tool_cache      JSONB NOT NULL DEFAULT '[]', -- Cached tool results
  effects_log     JSONB NOT NULL DEFAULT '[]', -- The Outbox (side effects)
  attempts        INTEGER NOT NULL DEFAULT 0,
  max_attempts    INTEGER NOT NULL DEFAULT 3,
  last_error      TEXT,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  completed_at    TIMESTAMPTZ,
  UNIQUE (workflow_run_id, step_key)
);
```

### 2. Provisioning Ledger (The Saga)
Tracks the "Blueprint-to-Instance" deployment transaction.

```sql
CREATE TABLE provisioning_ledger (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id),
  github_repo_url TEXT,
  supabase_project_id TEXT,
  vercel_project_id TEXT,
  state TEXT CHECK (state IN ('idle', 'creating_repo', 'provisioning_db', 'injecting_secrets', 'running_ast', 'active', 'failed', 'rolling_back')),
  -- Granular step tracking
  github_status TEXT DEFAULT 'pending',
  supabase_status TEXT DEFAULT 'pending',
  vercel_status TEXT DEFAULT 'pending',
  ast_status TEXT DEFAULT 'pending',
  -- Cleanup refs for rollback (compensating transactions)
  github_cleanup_ref   TEXT,   -- repo full name
  supabase_cleanup_ref TEXT,   -- project ref
  vercel_cleanup_ref   TEXT,   -- project id
  -- Idempotency keys
  github_idempotency_key   TEXT UNIQUE,
  supabase_idempotency_key TEXT UNIQUE,
  vercel_idempotency_key   TEXT UNIQUE,
  retry_count INTEGER DEFAULT 0,
  error_log JSONB,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);
```

## Agent Execution Model & Handoff Protocol

### The Handoff Envelope (Zod Schema)
All agent transitions must utilize this contract to ensure context preservation and side-effect safety.

```typescript
export const HandoffEnvelopeSchema = z.object({
  id: z.string().uuid(),
  workflow_run_id: z.string(),
  tenant_id: z.string().uuid(),
  sender: z.enum(['ceo', 'specialist', 'sre', 'system']),
  recipient: z.enum(['ceo', 'specialist', 'sre', 'user']),
  status: z.enum(['pending', 'active', 'checkpoint', 'completed', 'failed', 'dead_letter']),
  payload: z.record(z.unknown()), 
  checkpoint: z.object({
    current_phase: z.string(),
    summary: z.string().max(4000),           // Recursive summary of conversation
    intermediate_artifacts: z.record(z.string()),
  }).optional(),
  effects_log: z.array(z.object({
    effect_id: z.string(),                   // hash(run_id + step + type + params)
    type: z.string(),
    status: z.enum(['pending', 'completed', 'failed']),
    result: z.unknown().optional(),
    executed_at: z.string().datetime().optional(),
  })).default([]),
  constraints: z.object({
    max_tool_calls: z.number().default(10),
    timeout_ms: z.number().default(300000),
    max_summary_chars: z.number().default(4000),
  }),
  created_at: z.string().datetime().default(() => new Date().toISOString()),
});
```

### The Sealed Envelope Protocol (Security)
To maintain **Managerial Transparency** without exposing sensitive credentials:
1.  **Orchestration:** The Agent (LLM) triggers a Workflow step (e.g., `injectSecrets`).
2.  **Execution:** The Workflow step (deterministic Node.js code) fetches secrets from the source (Supabase) and pushes to the destination (Vercel).
3.  **Hiding:** The secrets exist only in the function's memory.
4.  **Audit:** The Workflow returns a success/fail status to the Agent. The Agent logs "Secrets injected" but never sees the values.

## Phase Boundary & Requirements Mapping

### Phase 1 (MVP: The Executive Cockpit)
- **FR1-3, FR5:** Mobile Oversight, Manual Override, Approval Gates, Audit Drill-down.
- **FR9-10:** CEO + Primary Specialist (Architect/Writer).
- **FR20:** Handoff Integrity (The Envelope Protocol).
- **Logic:** `src/features/cockpit/`, `src/agents/ceo.ts`.

### Phase 2 (Growth: The Industrial Factory)
- **FR12-14:** Industrial Cloner (AST Refactoring), PR Management, Validation Guard.
- **FR21:** The Supervisor (SRE Agent for Vercel Workflows).
- **FR11:** BMB Hot-Loading.
- **Logic:** `src/features/factory/`, `src/workflows/self-healing.ts`.

### Phase 3 (Expansion: Intelligence Hub)
- **FR4, FR6-8, FR15-19:** Division Dashboards, Intelligence Hub, Social/Support/IT Agents.
- **Logic:** `src/features/intelligence/`, `src/agents/specialist-marketing.ts`.

## Risks and Unknowns
- **Model Reliability:** The accuracy of the "Recursive Summary" (4000 chars) over very long (48h+) pipelines.
- **API Stability:** GitHub and Supabase Management API rate limits when scaling to 50 concurrent provisioning jobs.
- **AST Complexity:** Handling edge cases in nested Next.js 16 components during automated refactoring.

