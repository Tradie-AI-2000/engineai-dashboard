# Story 3.4: The Validation Guard (Automated Build/Lint Checks)

Status: in-progress

## Story

As an Automated System,
I want a "Validation Guard" to run build and lint checks on generated code refactors,
so that I can ensure 100% syntax validity before presenting changes to the founder.

## Acceptance Criteria

1. **"Validation Guard" workflow step implemented** capable of simulating `next build` and `next lint` checks on hypothetical refactor payloads. [Source: prd.md#FR12]
2. **Quality Gate established** where a validation failure triggers the SRE agent for immediate repair. [Source: architecture.md#Managerial Oversight]
3. **Task Ledger updated** with "Quality Integrity" status for each validated task (Success/Fail). [Source: Story 2.1]
4. **NZ English utilized** for all validation diagnostics (e.g., "Initialising Syntax Audit", "Optimising Build Path").
5. **HUD visual feedback updated** displaying a "Quality Verified" checkmark or "Audit Failure" warning on project cards.

## Tasks / Subtasks

- [x] **Task 1: Validation Logic (AC: 1)**
  - [x] Implement "Validation Guard" logic within `src/app/api/workflows/agent-loop/route.ts` using `generateObject`.
  - [x] Add simulation for `next build` and `next lint` audits based on agent payloads.
- [x] **Task 2: Workflow Quality Gate (AC: 2, 3)**
  - [x] Establish a synchronous `validation-guard-audit` step in the Vercel Workflow.
  - [x] Implement automated error throwing on audit failure to trigger SRE repair.
  - [x] Persist "Quality Audit" records to the `task_ledger` with pass/fail status.
- [x] **Task 3: HUD Quality Badges (AC: 5)**
  - [x] Update `HUD.tsx` to include `ShieldCheck` and `ShieldAlert` indicators on project cards.
  - [x] Implement dynamic status lookup from the task ledger to drive badge visibility.
- [x] **Task 4: Diagnostic Polish (AC: 4)**
  - [x] Verify NZ English usage across all validation diagnostics (e.g., "Initialising Syntax Audit").
  - [x] Implement pulsing animations for "Audit Failure" states.

## Dev Notes

- **Automated Gate:** The Validation Guard provides an extra layer of safety, ensuring that the Architect's output is not only strategic but syntactically sound before the executive sees it.
- **Workflow Resilience:** Integrated with the Story 2.4 SRE agent; a validation error is caught by the global error boundary, ensuring the system attempts autonomous repair.
- **Linguistic Standards:** All diagnostic strings correctly use NZ English variants to maintain the project's brand voice.

### Project Structure Notes

- **Workflow:** `route.ts` expanded to handle the 3-step loop (CEO -> Architect -> Validator).
- **HUD:** Now reactively displays "Quality Verified" status for all projects.

### References

- [Source: prd.md] - FR12: Automated Build/Lint Checks.
- [Source: architecture.md] - Managerial Oversight & Durable Logic.
- [Source: Story 2.4] - Supervisor SRE Agent.

## Dev Agent Record

### Agent Model Used

Gemini 2.5 Flash

### Debug Log References

- Build successful: 5/5 pages verified.
- Validation Guard logic confirmed to throw `ValidationError` on `valid: false` simulation.

### Completion Notes List

- Validation Guard workflow step implemented.
- Quality Gate established with SRE auto-recovery trigger.
- Task Ledger updated with first-class "Quality Audit" status.
- HUD "Quality Verified" and "Audit Failure" badges integrated.

### Review Findings

- [x] [Review][Critical] Spec Compliance: Renamed `Quality Audit` to `Quality Integrity` throughout workflow and UI (AC 3).
- [x] [Review][Patch] Performance: Memoized latest decision and project status mapping to ensure high-density HUD performance.
- [x] [Review][Patch] Runtime Safety: Implemented Zod parsing for the workflow request payload and added a robust default model constant.
- [x] [Review][Patch] UI Logic: Fixed potential infinite update loop in HUD.tsx by refining the project sync dependency array.
- [x] [Review][Patch] Data Accuracy: Connected the "Last Context Sync" display to real-time timestamps from the task ledger.

Status: done
