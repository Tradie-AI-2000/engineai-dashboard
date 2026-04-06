# Story 3.3: The Surgical Lock Protocol (HITL Intervention)

Status: ready-for-dev

## Story

As a Founder-Orchestrator,
I want the system to automatically pause agent execution when I intervene in a build,
so that I have absolute sovereignty and prevent agent conflicts during my refactors (UX-DR2).

## Acceptance Criteria

1. **"Surgical Lock" interface implemented** allowing users to click a stage on the `ProgressiveRibbon` to toggle a "Manual Review" state. [Source: epics.md#Story 3.3]
2. **HITL State persistence** established where locking a stage marks the current project as `blocked` in `src/lib/data.ts` and updates the `lockedStages` array. [Source: architecture.md#Task Ledger]
3. **Vercel Workflow Integration:** Entering a lock state must trigger a blocking "checkpoint" in the active Vercel Workflow. [Source: architecture.md#ADR-002]
4. **Cinematic "Lock" visual feedback** applied to the Ribbon:
   - UI shifts from "Engine Gold" to "Control Slate" (#E0E0E0) for the locked stage.
   - Amber padlock icon (#F59E0B) appears with pulsing animation.
   - "Manual Intervention Required" label displayed.
5. **NZ English utilized** for all lock diagnostics (e.g., "Authorising Surgical Lock", "Intervention Synchronised").

## Tasks / Subtasks

- [ ] **Task 1: Ribbon Interaction & UI State (AC: 1, 4)**
  - [ ] Update `ProgressiveRibbon.tsx` to handle click-to-lock events.
  - [ ] Implement "Control Slate" (#E0E0E0) theme for locked nodes.
  - [ ] Integrate Amber padlock icon with `framer-motion` animation.
- [ ] **Task 2: State Management & Persistence (AC: 2)**
  - [ ] Update project data schema to support persistent `lockedStages`.
  - [ ] Implement `handleToggleLock` in `HUD.tsx` to sync with backend/mock-data.
  - [ ] Ensure project status transitions to `blocked` when any stage is locked.
- [ ] **Task 3: Workflow Checkpoint Logic (AC: 3)**
  - [ ] Implement a middleware/hook to intercept workflow progress if a lock is detected.
  - [ ] Verify "checkpoint" state in Vercel Workflows stops autonomous execution.
- [ ] **Task 4: NZ English & Polish (AC: 5)**
  - [ ] Review all UI strings for NZ English spelling and tone.

## Dev Notes

- **Sovereignty First:** This is a high-leverage safety feature. The lock must be absolute; no agent should proceed while a stage is locked.
- **Visual Cues:** The shift to "Control Slate" is a psychological trigger for the user that they are in "Manual Control" mode.

### Project Structure Notes

- `src/components/ui/ProgressiveRibbon.tsx`: Main interaction point.
- `src/features/cockpit/HUD.tsx`: Orchestrates the project state.
- `src/lib/data.ts`: Schema definitions for `lockedStages`.

### References

- [Source: prd.md] - Section: User Journeys (The "Executive Tap").
- [Source: architecture.md] - ADR-002: Vercel Workflows.
- [Source: ux-design-specification.md] - Cinematic UI patterns.

### Review Findings

- [ ] [Review][Patch] AC 4 Violation: Locked Node Color [src/components/ui/ProgressiveRibbon.tsx]
- [ ] [Review][Patch] AC 4 Missing: Pulsing Padlock [src/components/ui/ProgressiveRibbon.tsx]
- [ ] [Review][Patch] AC 2 Gap: State Persistence [src/features/cockpit/HUD.tsx]
- [ ] [Review][Patch] Interaction Failure: Blocked Overlay [src/features/cockpit/HUD.tsx]
- [ ] [Review][Patch] Edge Case: State Loss on Division Switch [src/features/cockpit/HUD.tsx]
- [ ] [Review][Patch] UI Polish: Z-Index Ambiguity [src/features/cockpit/HUD.tsx]

### Dev Agent Record


### Agent Model Used

Gemini 2.5 Flash

### Debug Log References

### Completion Notes List

### File List
