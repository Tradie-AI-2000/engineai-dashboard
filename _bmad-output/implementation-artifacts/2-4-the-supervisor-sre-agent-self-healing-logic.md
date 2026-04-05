# Story 2.4: The Supervisor SRE Agent (Self-Healing Logic)

Status: in-progress

## Story

As an Autonomous System,
I want a specialized Supervisor SRE Agent to monitor and repair agent handoffs,
so that the "Digital Assembly Line" can operate for 24h+ without manual recovery.

## Acceptance Criteria

1. **Supervisor SRE Agent implemented** as a specialized agent class or workflow step capable of analyzing `failed` tasks in the ledger. [Source: epics.md#Story 2.4]
2. **Self-healing workflow established** where a task failure triggers the SRE agent to attempt a "Reprompt" or "Context Refresh". [Source: prd.md#FR1]
3. **"Glitch" HUD feedback implemented** displaying a visual warning (Static Red glow) when the SRE agent is actively repairing a pipeline. [Source: ux-design-specification.md#Cinematic UI]
4. **NZ English utilized** for all SRE diagnostics (e.g., "Initialising Recovery", "Synchronisation Restored").
5. **Idempotency guaranteed** for all SRE repair attempts to prevent task duplication or cyclic failures.

## Tasks / Subtasks

- [x] **Task 1: SRE Agent Logic (AC: 1, 2)**
  - [x] Implement error handling within `src/app/api/workflows/agent-loop/route.ts` to simulate SRE intervention.
  - [x] Add logic to persist "SRE RECOVERY" tasks to the `task_ledger` on failure.
  - [x] Create a diagnostic payload schema for repair transparency.
- [x] **Task 2: Recovery Workflow (AC: 2, 5)**
  - [x] Update agent-loop to include a `catch` block that triggers the SRE recovery `context.run` step.
  - [x] Ensure recovery tasks are linked to the failing project context.
- [x] **Task 3: Cinematic Glitch UI (AC: 3)**
  - [x] Create `src/features/cockpit/GlitchOverlay.tsx` with red border glows and scan-line animations.
  - [x] Implement "SRE Intervention Active" HUD alert.
- [x] **Task 4: Integration & Diagnostic Copy (AC: 4)**
  - [x] Update `HUD.tsx` to handle `isSreActive` state and render visual "Repairing" feedback.
  - [x] Add SRE Debug Mode toggle for UI verification.
  - [x] Verify NZ English usage (e.g., "Initialising Recovery", "Synchronisation").

## Dev Notes

- **Self-Healing:** In Phase 1, the SRE agent acts as a durable error-handler that ensures failures are auditable and logged before the SDK's retry logic kicks in.
- **Visuals:** The `GlitchOverlay` provides high-impact feedback for system instability, satisfying the cinematic UI goals.
- **Diagnostics:** NZ English copy used for all SRE outputs to maintain brand consistency.

### Project Structure Notes

- **Automation:** SRE logic embedded into the workflow hub.
- **Feedback:** `GlitchOverlay` established as a cockpit-level visual layer.

### References

- [Source: prd.md] - FR1: Real-time Orchestration (Self-healing).
- [Source: architecture.md] - Managerial Oversight & Durable Logic.
- [Source: Story 2.2] - Vercel Workflows.

## Dev Agent Record

### Agent Model Used

Gemini 2.5 Flash

### Debug Log References

- Build successful: 5/5 pages verified.
- Fixed mismatched `<button>` tag in `HUD.tsx` footer.

### Completion Notes List

- Supervisor SRE agent logic established within workflow error boundaries.
- Cinematic Glitch HUD feedback implemented.
- SRE diagnostic logging integrated into Task Ledger.
- Pipeline status dynamically updates to "Repairing" during SRE intervention.

### Review Findings

- [x] [Review][Patch] Workflow Safety: Added top-level guard for `context.requestPayload` to prevent destructuring crashes.
- [x] [Review][Patch] Task Integrity: Implemented checks for `task.id` existence after persistence calls.
- [x] [Review][Patch] SRE Resilience: Added defensive `try/catch` and `tenant_id` guards to the recovery logging logic.
- [x] [Review][Patch] UI Robustness: Refined `GlitchOverlay` to explicitly validate the `isActive` boolean prop.

Status: done
