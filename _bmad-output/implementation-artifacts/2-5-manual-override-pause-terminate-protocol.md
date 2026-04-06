# Story 2.5: Manual Override (Pause/Terminate Protocol)

Status: ready-for-dev

## Story

As a Founder-Orchestrator,
I want one-touch controls to pause or terminate any autonomous pipeline,
so that I maintain absolute sovereignty over the agency's operations (FR2).

## Acceptance Criteria

1. **Given** an active "Digital Assembly Line" workflow, **When** I trigger the "Pause" or "Terminate" action from the dashboard or mobile HUD, **Then** the Vercel Workflow hits a blocking state or halts execution immediately. [Source: epics.md#Story 2.5]
2. **Given** a status change triggered by a manual override, **Then** a "Silent Toast" notification confirms the status change in the bottom-right corner (UX-DR10). [Source: epics.md#Story 2.5]
3. **Given** a project is paused or terminated, **Then** its status in the Progressive Ribbon visualization shifts from "Pulsing Gold" (#C4A35A) to "Control Slate" (#E0E0E0) (UX-DR11). [Source: epics.md#Story 2.5]
4. **Given** an override action is executed, **Then** the `task_ledger` or `provisioning_ledger` is updated to mark the task as `blocked` or `failed` with a standardized reason "Overridden by Executive". [Source: epics.md#Story 2.1]
5. **Given** the Tech Noir aesthetic, **Then** the Manual Override UI components follow the established theme (#0A0A0A base, #C4A35A accents) and maintain responsiveness (<500ms) (NFR1, UX-DR5).

## Tasks / Subtasks

- [ ] **Task 1: Executive Override Interface (AC: 1, 5)**
  - [ ] Create `ManualOverrideControls` component in `src/components/cockpit/ManualOverrideControls.tsx`.
  - [ ] Implement high-contrast "Pause" (Engine Gold) and "Terminate" (Surgical Red) buttons with JetBrains Mono typography.
  - [ ] Ensure the interface is globally accessible within the HUD/Monaco layout.
  - [ ] Implement a "Termination Sequence" confirmation modal to prevent accidental halts.
- [ ] **Task 2: Workflow Orchestration Integration (AC: 1, 4)**
  - [ ] Create API route `src/app/api/workflows/override/route.ts` to receive override signals.
  - [ ] Integrate with Vercel Workflows client to signal pause or termination for a specific `workflow_run_id`.
  - [ ] Update the `task_ledger` in Supabase, setting `status` to `blocked` (for pause) or `failed` (for terminate).
  - [ ] Log the executive intervention event in the audit trail for transparency (FR5).
- [ ] **Task 3: Visual Telemetry & Feedback (AC: 2, 3)**
  - [ ] Create `SilentToast` notification component in `src/components/ui/SilentToast.tsx` (UX-DR10).
  - [ ] Update `ProgressiveRibbon` to support the `control-slate` visual state using `#E0E0E0`.
  - [ ] Implement the 150ms "UI Flicker" animation for state transitions to signal context sync (UX-DR9).
  - [ ] Add "Shift-Light" border glows to the project cards to indicate the locked state (UX-DR11).
- [ ] **Task 4: Quality & NZ English Verification (AC: 4)**
  - [ ] Verify all UI strings use NZ English (e.g., "Initialise", "Terminating Sequence", "Optimisation").
  - [ ] Ensure responsiveness standards (NFR1) are met for all override interactions.

## Dev Notes

- **Workflows:** Use the Vercel Workflows client to manage active runs. Note that "Pause" might require a blocking checkpoint in the workflow code itself that checks a "paused" flag in the `task_ledger`.
- **State:** Use Zustand for the global HUD state to trigger visual transitions (Pulsing Gold -> Control Slate) across components.
- **Database:** Ensure RLS policies in Supabase allow the Executive tenant to update the `task_ledger` for any associated project.
- **Components:** Place UI components in `src/components/cockpit/` to align with Epic 1 features.

### Project Structure Notes

- **Workflow Logic:** `src/workflows/`
- **UI Components:** `src/components/cockpit/` and `src/components/ui/`
- **API Routes:** `src/app/api/workflows/`

### References

- [Source: _bmad-output/planning-artifacts/prd.md] - FR2: Manual Override.
- [Source: _bmad-output/planning-artifacts/architecture.md] - ADR-002: Durable Execution via Vercel Workflows.
- [Source: _bmad-output/planning-artifacts/ux-design-specification.md] - UX-DR10: Silent Toasts, UX-DR11: Shift-Light Borders.
- [Source: _bmad-output/planning-artifacts/epics.md] - Story 2.5: Manual Override (Pause/Terminate) Protocol.

## Dev Agent Record

### Agent Model Used

Gemini 2.5 Flash

### Debug Log References

### Completion Notes List

### File List
