# Story 2.2: Vercel Workflows Pipeline (The 2-Agent Loop)

Status: ready-for-dev

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a Founder-Orchestrator,
I want a durable orchestration pipeline using Vercel Workflows for the CEO-Specialist loop,
so that complex project builds can run autonomously for 24+ hours without timeouts.

## Acceptance Criteria

1. **Given** the Vercel AI SDK and Vercel Workflows
   **When** I initiate a project build pipeline
   **Then** the workflow coordinates the handoff between the CEO and the primary Specialist agent (CEO provides intent, Specialist executes/specifies).
2. **And** the workflow state is persisted in the `task_ledger` at every checkpoint (using the schema from Story 2.1). [Source: architecture.md#Task Ledger]
3. **And** the pipeline survives serverless cold-starts or transient timeouts by resuming from the last successful checkpoint (NFR7). [Source: prd.md#NFR7]
4. **And** the implementation utilizes `@upstash/workflow` as the engine for Vercel Workflows as per 2026 standards. [Source: architecture.md#ADR-002]
5. **And** self-healing retries are configured for transient AI API failures (NFR8). [Source: prd.md#NFR8]
6. **And** the 2-Agent Loop utilizes the `HandoffEnvelopeSchema` for all state transitions. [Source: architecture.md#Handoff Envelope]

## Tasks / Subtasks

- [ ] **Task 1: Workflow Infrastructure (AC: 1, 4, 5)**
  - [ ] Initialize `@upstash/workflow` in the Next.js 16 project.
  - [ ] Create the core workflow endpoint at `src/app/api/workflows/agent-loop/route.ts`.
  - [ ] Configure retry policies (max 3 attempts) and failure handling for durable execution. [Source: architecture.md#Task Ledger]
- [ ] **Task 2: CEO-Specialist Handoff Logic (AC: 1, 2, 6)**
  - [ ] Implement the first `context.run` step for the CEO Agent to define the task intent.
  - [ ] Implement the second `context.run` step for the Specialist Agent (Architect) to generate the technical spec/output.
  - [ ] Integrate the `task_ledger` persistence for each step using the `handoff` schema from `src/lib/schemas/handoff.ts`.
- [ ] **Task 3: AI SDK Integration (AC: 1)**
  - [ ] Use Vercel AI SDK `generateText` with `google('gemini-2.0-flash-001')` within workflow steps.
  - [ ] Ensure prompt templates for CEO and Architect roles are correctly loaded.
- [ ] **Task 4: HUD Sync & Validation (AC: 5)**
  - [ ] Add a temporary "Initiate Handoff Loop" trigger button to the dashboard (e.g., in `Sidebar.tsx` or `HUD.tsx`).
  - [ ] Display real-time "Active Pipeline" status on the HUD telemetry cards. [Source: ux-design-specification.md#UX-DR1]

## Dev Notes

- **Durable Logic:** Refer to `architecture.md#ADR-002` for the decision to use Vercel Workflows.
- **Node.js Runtime:** All agent reasoning and workflow steps MUST run in the Node.js (Standard Serverless) runtime, NOT Edge (ADR-003).
- **Handoff Schema:** Must use the Zod schema defined in `src/lib/schemas/handoff.ts`.
- **Gemini 2.0:** Use `@ai-sdk/google` provider.
- **Environment:** Ensure `UPSTASH_WORKFLOW_URL` and `UPSTASH_WORKFLOW_TOKEN` are configured in `.env.local`.

### Project Structure Notes

- **Workflows:** Located in `src/app/api/workflows/`.
- **Agents:** Logic should be modularized in `src/lib/agents/` to support future hot-loading (FR11).
- **Ledger:** Interaction logic in `src/lib/tasks.ts`.

### References

- [Source: _bmad-output/planning-artifacts/prd.md#FR21] - The Supervisor (SRE Agent) & Self-Healing.
- [Source: _bmad-output/planning-artifacts/architecture.md#Durable Logic] - Workflow pattern and Task Ledger schema.
- [Source: _bmad-output/implementation-artifacts/2-1-the-task-ledger-handoff-envelope-schema.md] - Task Ledger and Handoff Schema dependency.

## Dev Agent Record

### Agent Model Used

Gemini 2.5 Flash

### Debug Log References

### Completion Notes List

### File List
