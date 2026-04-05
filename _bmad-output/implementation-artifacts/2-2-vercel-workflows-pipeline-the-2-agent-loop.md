# Story 2.2: Vercel Workflows Pipeline (The 2-Agent Loop)

Status: in-progress

## Story

As an Orchestrator,
I want a durable Vercel Workflow pipeline connecting the CEO and Architect agents,
so that I can ensure project specifications are refined and approved without manual intervention.

## Acceptance Criteria

1. **Vercel Workflows integrated** using the `@upstash/workflow` or Vercel-native SDK (configured for 2026 standards). [Source: architecture.md#Durable Logic]
2. **2-Agent Loop established** where the CEO Agent initiates a task and the Architect Agent provides a technical assessment. [Source: epics.md#Story 2.2]
3. **Durable Handoff persistence** implemented where each step of the loop is recorded in the `task_ledger` table. [Source: Story 2.1]
4. **Self-healing retries configured** for transient AI API failures, ensuring the pipeline can run for 24h+. [Source: prd.md#FR1]
5. **HUD visualization updated** to show "Active Pipeline" status during the loop execution.

## Tasks / Subtasks

- [x] **Task 1: Workflow Infrastructure (AC: 1, 4)**
  - [x] Integrate `@upstash/workflow` for durable agent coordination.
  - [x] Establish workflow endpoint at `src/app/api/workflows/agent-loop/route.ts`.
- [x] **Task 2: CEO-Architect Handoff (AC: 2, 3)**
  - [x] Implement durable `context.run` steps for CEO intent and Architect spec.
  - [x] Persist each step to the `task_ledger` with recursive parent IDs.
- [x] **Task 3: AI SDK Integration (AC: 2)**
  - [x] Use Vercel AI SDK `generateText` with Gemini 2.0 Flash within workflow steps.
  - [x] Implement role-specific prompting for CEO and Architect agents.
- [x] **Task 4: HUD Sync (AC: 5)**
  - [x] Add "Initiate Handoff Loop" trigger button to `Sidebar.tsx`.
  - [x] Ensure HUD and Sidebar are Client Components to handle operational interactivity.

## Dev Notes

- **Durability:** The use of Upstash Workflows ensures that agent reasoning loops can persist through transient timeouts and continue execution asynchronously.
- **Provider setup:** Installed `@ai-sdk/google` to support the required Gemini model for agentic logic.
- **Build stability:** Fixed Next.js 16 Client/Server component boundary issues by applying `'use client'` to HUD and Sidebar.

### Project Structure Notes

- **Workflows:** `src/app/api/workflows/` established as the orchestration hub.
- **Agents:** Inline prompting used for Phase 1; move to `src/lib/agents/` in subsequent stories.

### References

- [Source: architecture.md] - Durable Logic & Vercel SDK patterns.
- [Source: prd.md] - FR1: Real-time Orchestration.
- [Source: Story 2.1] - The Task Ledger implementation.

## Dev Agent Record

### Agent Model Used

Gemini 2.5 Flash

### Debug Log References

- Build successful: 5/5 pages verified (including `/api/workflows/agent-loop`).
- Corrected Parenthesized expression error in HUD.tsx.

### Completion Notes List

- Vercel Workflows integrated with Upstash.
- Durable 2-agent loop (CEO -> Architect) implemented.
- Handoffs persistently logged to `task_ledger`.
- Operational trigger added to dashboard HUD.

### Review Findings

- [x] [Review][Critical] Spec Compliance: Added `retries: 3` to the workflow configuration for self-healing (AC 4).
- [x] [Review][Patch] Functional Integration: Replaced `alert()` trigger with a real `fetch` call to the workflow API (AC 5).
- [x] [Review][Patch] HUD Dynamics: Added a visual "Pipeline: Active" pulsing indicator to the HUD header (AC 5).
- [x] [Review][Patch] Runtime Safety: Implemented workflow payload validation and AI response guards.
- [x] [Review][Patch] UI Safety: Added array and null guards for `DIVISIONS` and `filteredProjects` in the Sidebar.

Status: done
