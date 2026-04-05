# Story 3.2: The Decision HUD ("Why-First" Summaries)

Status: in-progress

## Story

As a Founder-Orchestrator,
I want agent reasoning summarized as "Why-First" highlights in the HUD,
so that I can understand the strategic rationale of any action at a glance.

## Acceptance Criteria

1. **"Decision Summary" cards implemented** displaying the primary rationale for agent actions (e.g., "Why this refactor?", "Why this module?"). [Source: prd.md#FR10]
2. **"Why-First" visual hierarchy established** where the summary is prominent and technical logs are secondary. [Source: ux-design-specification.md#Action Hierarchy]
3. **Real-time Summarisation pattern** established where agent handoffs generate a 1-sentence "Executive Rationale" in the `task_ledger`. [Source: Story 2.1]
4. **NZ English utilized** for all executive summaries (e.g., "Prioritising stability", "Optimising for speed").
5. **Interactive transitions** enabled where clicking a summary opens the full `AuditDrilldown` established in Story 2.3.

## Tasks / Subtasks

- [x] **Task 1: Reasoning Extraction Logic (AC: 1, 3)**
  - [x] Update `src/app/api/workflows/agent-loop/route.ts` to use `generateObject` for structured rationale.
  - [x] Update `HandoffEnvelopeSchema` to include `executive_rationale` field.
- [x] **Task 2: Decision Summary Component (AC: 1, 2)**
  - [x] Create `DecisionCard.tsx` in `src/components/ui/`.
  - [x] Implement a high-contrast "Why-First" layout with Engine Gold accents.
- [x] **Task 3: HUD Integration (AC: 5)**
  - [x] Update `HUD.tsx` to display real-time rationales via `useTaskLedger`.
  - [x] Bind "Click to Drill-down" action to the `AuditDrilldown` component.
- [x] **Task 4: Linguistic Refinement (AC: 4)**
  - [x] Update agent prompts to explicitly request 1-sentence rationales in NZ English.
  - [x] Verify HUD summaries use the correct brand voice.

## Dev Notes

- **Architectural Refactor:** Decoupled `tasks.ts` into `tasks.ts` (server) and `tasks-client.ts` (client) to resolve Next.js 16 build errors regarding `next/headers`.
- **Reasoning-First:** The HUD now prioritises the `executive_rationale` over technical logs, fulfilling the high-signal oversight requirement.
- **Durable Summaries:** Rationales are persistently stored in the `task_ledger` JSONB payload and as a dedicated field for indexing.

### Project Structure Notes

- **UI:** `DecisionCard` established as a reusable oversight primitive.
- **Ledger:** Schema updated to support first-class rationale storage.

### References

- [Source: prd.md] - FR10: Managerial Oversight.
- [Source: ux-design-specification.md] - Action Hierarchy & Summary Patterns.
- [Source: Story 2.3] - Audit Drill-down.

## Dev Agent Record

### Agent Model Used

Gemini 2.5 Flash

### Debug Log References

- Build successful: 5/5 pages verified.
- Resolved `next/headers` import conflict in client hooks.

### Completion Notes List

- Structured rationale generation implemented in CEO/Architect loop.
- DecisionCard UI implemented with "Why-First" hierarchy.
- HUD connected to real-time task ledger rationales.
- Drill-down transitions confirmed functional.

### Review Findings

- [x] [Review][Patch] UI Safety: Added `line-clamp-3` to DecisionCard to handle excessively long agent rationales.
- [x] [Review][Patch] Data Integrity: Implemented chronological sorting (`created_at`) for task ledger polling in HUD.tsx.
- [x] [Review][Patch] Runtime Safety: Added defensive guards for `DIVISIONS` array and empty task lists.
- [x] [Review][Patch] NZ English: Verified all simulated rationales use correct local spelling (e.g., "Initialising", "Optimising").

Status: done
