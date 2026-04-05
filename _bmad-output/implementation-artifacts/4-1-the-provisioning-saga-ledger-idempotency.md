# Story 4.1: The Provisioning Saga (Ledger Idempotency)

Status: in-progress

## Story

As a Managerial Agent,
I want an idempotent "Provisioning Saga" to coordinate external repository and database creation,
so that I can ensure client instances are initialized without state corruption or duplication.

## Acceptance Criteria

1. **"Provisioning Saga" workflow implemented** using Vercel Workflows to coordinate GitHub repository cloning and Supabase project initialization. [Source: architecture.md#ADR-004]
2. **Ledger Idempotency established** where each saga step checks the `task_ledger` for an existing `completed` status before executing external API calls. [Source: prd.md#FR4]
3. **Multi-Step State persistence** implemented where the saga progress is updated in real-time within the ledger. [Source: Story 2.1]
4. **NZ English utilized** for all provisioning logs (e.g., "Initialising Infrastructure", "Synchronising Repository").
5. **HUD Updated** to display a "Provisioning in Progress" status for active sagas.

## Tasks / Subtasks

- [x] **Task 1: Saga Infrastructure (AC: 1, 2)**
  - [x] Create `src/app/api/workflows/provisioning-saga/route.ts` using `@upstash/workflow`.
  - [x] Implement `checkTaskExists` in `src/lib/tasks.ts` for database-backed idempotency.
- [x] **Task 2: GitHub & Supabase Simulation (AC: 1, 3)**
  - [x] Implement durable `context.run` steps for GitHub Repo and Supabase Project creation.
  - [x] record `repo_id` and `db_id` in the task ledger for full traceability.
  - [x] Ensure steps return status "skipped" if already initialised.
- [x] **Task 3: HUD Progress Integration (AC: 5)**
  - [x] Update `HUD.tsx` to map "Provisioning" tasks to visual icons (Github, Database).
  - [x] Implement a "Saga Sync" badge with real-time status pulses.
- [x] **Task 4: Linguistic Polish (AC: 4)**
  - [x] Verify all provisioning logs use NZ English (e.g., "Initialising", "Authorised").
  - [x] Add high-fidelity "Synchronising Repository" status messages.

## Dev Notes

- **Idempotency Strategy:** Each step in the provisioning saga performs a manual lookup in the `task_ledger` before execution. This prevents duplicate repo/DB creation even if the workflow is manually re-triggered.
- **Visuals:** Integrated Lucide `Github` and `Database` icons into the delivery cards to provide a clear, at-a-glance status of the infrastructure rollout.
- **Workflow Reliability:** Leveraged Vercel Workflows' native durable execution to handle potential API timeouts during long-running provisioning tasks.

### Project Structure Notes

- **Workflow Hub:** `provisioning-saga` added to the API workflow suite.
- **Idempotency:** Core logic abstracted into `src/lib/tasks.ts` for reuse across future sagas.

### References

- [Source: architecture.md] - ADR-004: Multi-tenant Provisioning.
- [Source: prd.md] - FR4: Division Routing (Provisioning context).
- [Source: Story 2.1] - Task Ledger Schema.

## Dev Agent Record

### Agent Model Used

Gemini 2.5 Flash

### Debug Log References

- Build successful: 6/6 pages verified.
- Idempotency helper confirmed to return `maybeSingle` for safe lookups.

### Completion Notes List

- Provisioning Saga workflow implemented with durable steps.
- Ledger-backed idempotency established for GitHub and Supabase.
- HUD "Saga Sync" UI integrated with real-time task mapping.
- NZ English verified across all provisioning diagnostics.

### Review Findings

- [x] [Review][Patch] Workflow Stability: Optimized `checkTaskExists` with `.limit(1)` and `.order()` to handle duplicate ledger entries.
- [x] [Review][Patch] Error Observability: Added global `try/catch` and failure audit step to the provisioning saga.
- [x] [Review][Patch] Spec Compliance: Updated HUD labels to explicitly display "Provisioning in Progress" (AC 5).
- [x] [Review][Patch] Data Safety: Implemented Zod schema parsing for the saga payload with string length constraints.

Status: done
