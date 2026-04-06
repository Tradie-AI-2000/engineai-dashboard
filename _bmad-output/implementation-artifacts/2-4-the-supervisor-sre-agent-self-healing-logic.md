# Story 2.4: The Supervisor SRE Agent (Self-healing Logic)

Status: ready-for-dev

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a Founder,
I want a dedicated SRE Agent (The Supervisor) to monitor all active workflows,
so that transient failures are autonomously resolved without my intervention.

## Acceptance Criteria

1. **SRE Agent Implementation:** A specialized agent logic (Supervisor) that can analyze `failed` tasks in the `task_ledger`. [Source: prd.md#FR21, architecture.md#Task Ledger]
2. **Self-Healing Loop:** Transient failures in the Vercel Workflows pipeline (e.g., API timeouts) trigger the SRE agent to attempt a retry with a context refresh or a "Reprompt". [Source: prd.md#FR21, NFR8]
3. **Idempotency & Resilience:** All repair attempts are idempotent and logged in the `effects_log` of the `task_ledger`. [Source: architecture.md#ADR-004]
4. **Cinematic Glitch UI:** Display a "Static Red Glow" border and scan-line overlay when the SRE agent is actively repairing a pipeline. [Source: ux-design-specification.md#Status Palette]
5. **NZ English Diagnostics:** System status labels use NZ English (e.g., "Initialising Recovery", "Synchronisation Restored"). [Source: GEMINI.md#Core Development Rules]

## Tasks / Subtasks

- [ ] **Task 1: SRE Agent Core Logic (AC: 1, 2, 3)**
  - [ ] Implement `src/lib/agents/sre.ts` to handle recovery reasoning.
  - [ ] Integrate a `catch` block or a `handleFailure` step in `src/app/api/workflows/agent-loop/route.ts`.
  - [ ] Ensure the SRE agent can read the failing task's `checkpoint` and `last_error`.
- [ ] **Task 2: Durable Recovery Workflow (AC: 2, 3)**
  - [ ] Use `context.run` to encapsulate the SRE repair logic within the Vercel Workflow.
  - [ ] Implement logic to update `task_ledger` with the recovery status and attempt count.
- [ ] **Task 3: Glitch Overlay UI Integration (AC: 4)**
  - [ ] Implement (or refine) `src/features/cockpit/GlitchOverlay.tsx` with the Tech Noir aesthetic.
  - [ ] Integrate the overlay into `HUD.tsx` and drive it via a `isSreActive` property or global state.
- [ ] **Task 4: Diagnostic Copy & Localization (AC: 5)**
  - [ ] Add NZ English status messages for the recovery cycle.
  - [ ] Verify that all SRE-led labels follow the brand voice.

## Dev Notes

- **Self-Healing Logic:** The SRE agent should be designed to handle common transient issues (network timeouts, rate limits) autonomously by adjusting the retry strategy or refreshing the context window for the failing sub-agent.
- **Workflow Durability:** Refer to `architecture.md#ADR-002`. All recovery steps must be durable using `@upstash/workflow`.
- **UI Aesthetic:** The `GlitchOverlay` is a cinematic element. It should be disruptive but informative. Use #FF4B4B for the glow.
- **NZ English:** Be strict about "Initialising", "Authorisation", and "Organisation".

### Project Structure Notes

- **Agents:** `src/lib/agents/sre.ts`.
- **UI:** `src/features/cockpit/GlitchOverlay.tsx`.
- **Workflows:** `src/app/api/workflows/agent-loop/route.ts`.

### References

- [Source: _bmad-output/planning-artifacts/prd.md#FR21] - The Supervisor (SRE Agent).
- [Source: _bmad-output/planning-artifacts/architecture.md#Durable Logic] - Workflow patterns.
- [Source: _bmad-output/planning-artifacts/ux-design-specification.md#Status Palette] - Glitch/Red Glow feedback.
- [Source: _bmad-output/implementation-artifacts/2-3-audit-drill-down-agent-reasoning-logs.md] - Previous task ledger context.

## Dev Agent Record

### Agent Model Used

Gemini 2.5 Flash

### Debug Log References

### Completion Notes List

### File List
