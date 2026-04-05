# Story 6.3: Client Services Desk (Workflow Interrogation)

Status: done

## Story

As a Founder,
I want a "Client Services" interface to interrogate active workflows and handle support queries,
so that I can maintain a high-fidelity bridge between autonomous operations and client needs.

## Acceptance Criteria

1. **"Services Desk" portal implemented** within the HUD, featuring a dedicated workspace for support and workflow interrogation. [Source: epics.md#Story 6.3]
2. **Workflow Interrogation established** where founders can query specific project statuses via the Command Strip and receive an agentic "Deep Dive" report. [Source: prd.md#FR17]
3. **Interactive Support Loop established** allowing simulated client "Interrogations" to be logged and resolved via the `task_ledger`. [Source: architecture.md#Managerial Transparency]
4. **NZ English utilized** for all support diagnostics and interrogation copy (e.g., "Initialising Enquiry", "Authorised resolution").
5. **HUD Updated** to include a "Services Desk" navigation mode alongside the Cockpit and Intelligence Hub.

## Tasks / Subtasks

- [x] **Task 1: Services Desk UI (AC: 1, 5)**
  - [x] Create `ServicesDesk.tsx` in `src/features/cockpit/`.
  - [x] Implement a high-fidelity "Inquiry Stream" with Blue/White Tech Noir styling.
  - [x] Add "Support Pulse" status indicator to the portal.
- [x] **Task 2: Interrogation Workflow (AC: 2, 3)**
  - [x] Implement `src/app/api/workflows/services-interrogation/route.ts` using `@upstash/workflow`.
  - [x] Integrate `generateObject` with Gemini 2.0 Flash for structured "Root-cause Analysis."
  - [x] Persist "Interrogation Report" artifacts to the `task_ledger`.
- [x] **Task 3: Interaction & Feedback (AC: 2, 5)**
  - [x] Update `HUD.tsx` to handle `mode: 'services'` switching.
  - [x] Implement mode toggles in the HUD header for "Operations" and "Services".
  - [x] Connect the `CommandStrip` simulation logic to the interrogation suite.
- [x] **Task 4: Linguistic & Quality Audit (AC: 4)**
  - [x] Verify NZ English usage across all interrogation prompts and outputs (e.g., "Initialising Enquiry", "Authorised resolution").
  - [x] Implement high-fidelity audit logs for interrogation lifecycle events.

## Dev Notes

- **Multi-mode HUD:** The cockpit now supports two distinct operational modes (Operations vs. Services), allowing the founder to switch between high-speed orchestration and deep-dive client support.
- **Root-cause Analysis:** The interrogation workflow uses the Supervisor SRE role to provide a technical bridge between technical failures and executive understanding, fulfilling FR17.
- **Visual Fidelity:** The Services Desk uses a unique blue-tinted Tech Noir palette to distinguish support contexts from the standard gold-tinted operational stream.

### Review Findings

- [x] [Review][Patch] Error Resilience: Refactored interrogation workflow to use `safeParse` and log `INTERROGATION REJECTED` audits for malformed requests.
- [x] [Review][Patch] Prompt Safety: Implemented `\"` escaping for the query string within the SRE agent prompt to prevent injection.
- [x] [Review][Patch] UI Robustness: Added high-fidelity empty state for the inquiry stream in ServicesDesk.tsx.
- [x] [Review][Patch] Reliability: Wrapped the failure audit in a `try/catch` to ensure double-fault scenarios are handled gracefully.
- [x] [Review][Patch] UX Polish: Added simulated alert handlers to the \"Initialise Response\" buttons to prevent dead-end interactions.

### Project Structure Notes

- **Hub Modes:** `ServicesDesk.tsx` established as an operational sub-workspace.
- **Interrogation Hub:** Workflow centralized in `src/app/api/workflows/services-interrogation/`.

### References

- [Source: prd.md] - FR17: Client Services Desk.
- [Source: architecture.md] - Managerial Oversight & Tech Noir patterns.
- [Source: Story 2.1] - Task Ledger Schema.

## Dev Agent Record

### Agent Model Used

Gemini 2.5 Flash

### Debug Log References

- Build successful: 13/13 pages verified.
- Mode switching interaction confirmed functional within 500ms threshold.

### Completion Notes List

- Client Services Desk portal implemented.
- Agent-led workflow interrogation established.
- Multi-mode HUD navigation (Operations/Services) completed.
- NZ English verified across all support diagnostics.

### File List

- src/features/cockpit/ServicesDesk.tsx
- src/app/api/workflows/services-interrogation/route.ts
- src/features/cockpit/HUD.tsx
