# Story 2.3: Audit Drill-down & Agent Reasoning Logs

Status: in-progress

## Story

As a Founder-Orchestrator,
I want to drill down into any task in the ledger to see the full agent reasoning chain,
so that I can eliminate "human blindness" and understand why specific decisions were made.

## Acceptance Criteria

1. **Recursive Audit UI implemented** allowing users to click a task in the HUD and see its `parent_task` and children in a hierarchical view. [Source: prd.md#FR10]
2. **"Thought Loop" Overlay established** displaying the raw prompt and completion for any agent-led task (CEO, Architect). [Source: architecture.md#Managerial Transparency]
3. **Audit depth supported** up to 10 levels of recursion to reconstruct complex "Digital Assembly Line" handoffs. [Source: epics.md#Story 2.3]
4. **NZ English utilized** for all system status messages in the drill-down (e.g., "Initialising Trace", "Authorisation Verified").
5. **HUD updated** to support task selection and interactive state transitions for the drill-down view.

## Tasks / Subtasks

- [x] **Task 1: Audit Drill-down Component (AC: 1, 3)**
  - [x] Create `AuditDrilldown.tsx` in `src/features/cockpit/`.
  - [x] Implement hierarchical rendering for `parent_task` relationships.
  - [x] Apply glass-morphic `backdrop-blur-2xl` styling for the drawer effect.
- [x] **Task 2: Reasoning Log Viewer (AC: 2)**
  - [x] Create `ReasoningLog.tsx` in `src/components/ui/`.
  - [x] Implement JSONB object exploration with JetBrains Mono.
  - [x] Add scrollable container for long agent "Thought Loops".
- [x] **Task 3: HUD Interaction (AC: 5)**
  - [x] Update `HUD.tsx` to manage `selectedTask` state via `AnimatePresence`.
  - [x] Integrate interactive click events on the Task Ledger Audit stream.
- [x] **Task 4: Data Fetching (AC: 1)**
  - [x] Establish `AuditTask` interface for consistent tree mapping.
  - [x] Verify animation performance for drawer transitions.

## Dev Notes

- **Cinematic UI:** The drill-down uses a right-aligned motion drawer to simulate "opening an encrypted file."
- **Transparency:** The `ReasoningLog` provides raw access to the agent payloads, fulfilling the managerial transparency requirement.
- **Recursion:** While the UI supports depth, Phase 1 focuses on the immediate parent relationship for the CEO -> Architect loop.

### Project Structure Notes

- **Auditing:** `AuditDrilldown.tsx` orchestrates the trace view.
- **UI Primitives:** `ReasoningLog` added to `src/components/ui/`.

### References

- [Source: prd.md] - FR10: Managerial Oversight.
- [Source: architecture.md] - Managerial Transparency patterns.
- [Source: Story 2.1] - Task Ledger Schema.

## Dev Agent Record

### Agent Model Used

Gemini 2.5 Flash

### Debug Log References

- Build successful: 5/5 pages verified.
- Fixed `retries` TypeScript error in `agent-loop/route.ts`.

### Completion Notes List

- Hierarchical audit UI implemented.
- Agent reasoning log viewer established.
- HUD interaction established for task drill-down.
- Tech Noir styling and animations applied to audit traces.

### Review Findings

- [x] [Review][Critical] Spec Compliance: Refactored AuditDrilldown to a recursive pattern supporting 10 levels of depth (AC 1 & 3).
- [x] [Review][Patch] Transparency: Added explicit "System Input" and "Agent Output" labeling to ReasoningLog (AC 2).
- [x] [Review][Patch] Runtime Safety: Implemented circuit-breaker for task ancestry and null-guards for JSONB payloads.
- [x] [Review][Patch] UX Polish: Added animated transition for "Deep Trace" ancestry and improved scrollbar visibility.

Status: done
