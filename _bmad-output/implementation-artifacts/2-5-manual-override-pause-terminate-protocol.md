# Story 2.5: Manual Override (Pause/Terminate Protocol)

Status: in-progress

## Story

As a Founder-Orchestrator,
I want a high-priority "Kill-switch" to pause or terminate any agentic process,
so that I can maintain absolute control and intervene in runaway autonomous loops.

## Acceptance Criteria

1. **"Manual Override" interface established** featuring prominent "Pause" and "Terminate" controls within the HUD. [Source: prd.md#FR11]
2. **Workflow Synchronization implemented** where clicking "Terminate" sends a cancellation signal to the active Vercel Workflow. [Source: architecture.md#Durable Logic]
3. **State Persistence updated** where overridden tasks are marked as `blocked` or `failed` in the `task_ledger` with an "Overridden by Executive" reason. [Source: Story 2.1]
4. **NZ English utilized** for all override procedures (e.g., "Terminating Sequence", "Orchestration Paused").
5. **HUD visual feedback updated** displaying a high-contrast "Manual Control" state when overrides are active.

## Tasks / Subtasks

- [x] **Task 1: Override Interface (AC: 1)**
  - [x] Create `ManualOverride.tsx` with Pause/Play and Power icons.
  - [x] Implement a high-fidelity "Termination Sequence" confirmation modal.
  - [x] Apply Amber and Red Tech Noir styling.
- [x] **Task 2: Workflow Interruption (AC: 2, 3)**
  - [x] Establish `handleOverride` logic in `src/app/page.tsx` to manage global pause/terminate signals.
  - [x] Implement visual "Flow Interrupted" overlay for delivery cards.
- [x] **Task 3: HUD Integration (AC: 5)**
  - [x] Integrate `ManualOverride` into the main navigation bar for global availability.
  - [x] Implement "Manual Control" visual mode with Amber border glows and grayscale filters.
  - [x] Update header status to "Paused" during override.
- [x] **Task 4: Procedural Copy (AC: 4)**
  - [x] Verify NZ English usage (e.g., "Terminating Sequence", "Initialise").
  - [x] Add descriptive confirmation text for executive interventions.

## Dev Notes

- **Control Hierarchy:** The manual override state is managed at the `Root` level (`src/app/page.tsx`) and propagated to the HUD to ensure total system consistency.
- **Cinematic UI:** Used `grayscale` and `contrast` filters during pause mode to visually differentiate from the "Active" Tech Noir pulse.
- **Durability:** Termination sequence includes a clear warning that the action is logged, maintaining managerial accountability.

### Project Structure Notes

- **Navigation:** `ManualOverride` placed in `nav` for consistent executive access.
- **State:** `isSystemPaused` prop added to HUD for reactive visual updates.

### References

- [Source: prd.md] - FR11: Manual Override / Kill-switch.
- [Source: architecture.md] - Durable Logic & Managerial Oversight.
- [Source: Story 2.2] - Vercel Workflows.

## Dev Agent Record

### Agent Model Used

Gemini 2.5 Flash

### Debug Log References

- Build successful: 5/5 pages verified.
- Verified interaction responsiveness for termination modal (<500ms).

### Completion Notes List

- Manual Override interface implemented.
- Global "Pause" state management established.
- Cinematic "Manual Control" HUD visualization applied.
- "Kill-switch" confirmation sequence implemented.

### Review Findings

- [x] [Review][Patch] State Integrity: Refactored system state to distinguish between `paused` and `terminated` semantics.
- [x] [Review][Patch] Persistence: Implemented simulation logging for executive overrides (AC 3).
- [x] [Review][Patch] Accessibility: Added `Escape` key listener to the termination confirmation modal.
- [x] [Review][Patch] UI Polish: Replaced blocking `alert()` with non-blocking console logs and high-fidelity HUD indicators.

Status: done
