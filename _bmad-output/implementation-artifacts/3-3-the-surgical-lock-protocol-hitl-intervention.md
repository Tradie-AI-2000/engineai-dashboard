# Story 3.3: The Surgical Lock Protocol (HITL Intervention)

Status: in-progress

## Story

As a Founder-Orchestrator,
I want to surgically lock any project stage for manual review (HITL),
so that I can approve critical refactors before the agent proceeds to deployment.

## Acceptance Criteria

1. **"Surgical Lock" interface implemented** allowing users to click a stage on the `ProgressiveRibbon` to toggle a "Manual Review" state. [Source: prd.md#FR11]
2. **HITL State persistence** established where locking a stage marks the current project as `blocked` in `src/lib/data.ts` and logs a "Surgical Intervention" task. [Source: Story 2.1]
3. **Cinematic "Lock" visual feedback** applied to the Ribbon, featuring an Amber padlock icon and "Manual Intervention Required" labels. [Source: ux-design-specification.md#Cinematic UI]
4. **NZ English utilized** for all lock diagnostics (e.g., "Authorising Surgical Lock", "Intervention Synchronised").
5. **Responsiveness maintained** with the lock interaction occurring within the 500ms threshold.

## Tasks / Subtasks

- [x] **Task 1: Surgical Lock Component (AC: 1, 3)**
  - [x] Update `ProgressiveRibbon.tsx` to handle click events on stage nodes.
  - [x] Implement an `isLocked` state for each stage with Amber visual styling and glowing shadows.
  - [x] Add Amber padlock icons to locked nodes using `AnimatePresence`.
- [x] **Task 2: State Synchronization (AC: 2)**
  - [x] Update `MOCK_PROJECTS` in `src/lib/data.ts` to support `lockedStages` schema.
  - [x] Implement local `projects` state in `HUD.tsx` to manage lock toggles reactively.
  - [x] Ensure locking a stage marks the project as `blocked`.
- [x] **Task 3: HUD Visual Feedback (AC: 3, 5)**
  - [x] Update the project card in `HUD.tsx` to display a pulsing "HITL LOCK ACTIVE" badge.
  - [x] Implement Amber background and border tints for locked project cards.
- [x] **Task 4: Linguistic Refinement (AC: 4)**
  - [x] Verify all surgical lock labels use NZ English (e.g., "Authorised", "Initialising").
  - [x] Add functional console logging for executive lock authorisation.

## Dev Notes

- **HITL Interactivity:** Users can now click any stage node on the Ribbon to toggle a manual override. This signals the system to halt autonomous progress for that specific project.
- **Cinematic UI:** Leveraged `AnimatePresence` for the padlock icon to provide a smooth "reveal" effect when locking.
- **State management:** Local state used in `HUD.tsx` for immediate reactive feedback; Phase 2 will involve persisting these locks to the `task_ledger` via an API.

### Project Structure Notes

- **UI:** `ProgressiveRibbon` updated with interaction logic.
- **HUD:** Now orchestrates both global telemetry and surgical project overrides.

### References

- [Source: prd.md] - FR11: Manual Override / Kill-switch.
- [Source: ux-design-specification.md] - Cinematic UI & Portal Patterns.
- [Source: Story 1.5] - Progressive Ribbon implementation.

## Dev Agent Record

### Agent Model Used

Gemini 2.5 Flash

### Debug Log References

- Build successful: 5/5 pages verified.
- Console logs confirmed for "HITL LOCK AUTHORISED" signals.

### Completion Notes List

- Surgical Lock interface implemented on ProgressiveRibbon.
- HITL state management established in HUD.
- "HITL LOCK ACTIVE" visual warnings integrated.
- NZ English verified across all override labels.

### Review Findings

- [x] [Review][Patch] State Sync: Added `useEffect` to sync local `projects` state when `activeDivision` changes, fixing the stale UI bug.
- [x] [Review][Patch] Status Integrity: Refactored `handleToggleLock` to ensure projects only transition to `active` from a `blocked` state when locks are removed.
- [x] [Review][Patch] Spec Compliance: Updated all UI labels to match spec exactly (e.g., "Manual Intervention Required", "Intervention Synchronised").
- [x] [Review][Patch] Runtime Safety: Corrected `AnimatePresence` import and added null-guards for `lockedStages` prop.

Status: done
