# Story 2.3: Audit Drill-down & Agent Reasoning Logs

Status: ready-for-dev

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a Founder-Orchestrator,
I want to drill down into any task in the ledger to see the full agent reasoning chain,
so that I can eliminate "human blindness" and understand why specific decisions were made.

## Acceptance Criteria

1. **Recursive Audit UI implemented** allowing users to click a task in the HUD and see its `parent_task` and children in a hierarchical view. [Source: prd.md#FR10]
2. **"Thought Loop" Overlay established** displaying the raw prompt and completion for any agent-led task (CEO, Architect). [Source: architecture.md#Managerial Transparency]
3. **Audit depth supported** up to 10 levels of recursion to reconstruct complex "Digital Assembly Line" handoffs. [Source: epics.md#Story 2.3]
4. **NZ English utilized** for all system status messages in the drill-down (e.g., "Initialising Trace", "Authorisation Verified").
5. **Tech Noir Aesthetic maintained** using glass-morphic `backdrop-blur-2xl` and Engine Gold (#C4A35A) accents for the drill-down drawer. [Source: ux-design-specification.md]

## Tasks / Subtasks

- [ ] **Task 1: Audit Drill-down Component (AC: 1, 3, 5)**
  - [ ] Create/Refine `AuditDrilldown.tsx` in `src/features/cockpit/`.
  - [ ] Implement a right-aligned motion drawer (Framer Motion) that slides in over the HUD.
  - [ ] Build a recursive `TaskAncestry` component to render up to 10 levels of `parent_task` links.
  - [ ] Apply "Cinematic UI" styling: right-aligned, simulating "opening an encrypted file."
- [ ] **Task 2: Reasoning Log Viewer (AC: 2, 5)**
  - [ ] Create/Refine `ReasoningLog.tsx` in `src/components/ui/`.
  - [ ] Use `JetBrains Mono` for the log text to reinforce the technical/precision aesthetic.
  - [ ] Map JSONB `payload` keys to labeled sections: `intent`/`prompt` -> "SYSTEM INPUT", `spec`/`response` -> "AGENT OUTPUT".
  - [ ] Ensure scrollable, high-density layout for long "Thought Loops".
- [ ] **Task 3: HUD Integration & Handoff Metadata (AC: 1, 5)**
  - [ ] Update `HUD.tsx` to manage `selectedTask` state and trigger the drawer.
  - [ ] Display `HandoffEnvelope` metadata (e.g., effect IDs, sender/recipient roles) within the drill-down.
  - [ ] Add a visual "heartbeat" or pulse indicator to the active trace line.

## Dev Notes

- **Managerial Transparency:** This is a core "Anti-SaaS" feature. We don't hide the complexity; we make it readable.
- **Cinematic Experience:** The drill-down should feel like a "Surgical Deep-Dive." Use subtle flickering or scan-line animations if possible during data load.
- **Performance:** Ensure the recursive fetching (if not already hydrated in the ledger) handles depth efficiently without blocking the UI thread.
- **NZ English:** Ensure labels like "Initialising Trace" and "Authorisation Verified" are used precisely.

### Project Structure Notes

- **Feature Location:** `src/features/cockpit/` for orchestration components.
- **UI Primitives:** `src/components/ui/` for the raw log viewer.
- **State:** Use local state or a lightweight `selectedTask` atom if multiple components need to trigger the drill-down.

### References

- [Source: prd.md] - FR5: Audit Drill-down, FR10: Agentic Workforce.
- [Source: architecture.md] - Managerial Transparency, Handoff Protocol.
- [Source: ux-design-specification.md] - Tech Noir Aesthetic, Surgical Intervention.
- [Source: epics.md] - Story 2.3.

## Dev Agent Record

### Agent Model Used

- N/A (Ready for Dev)

### Debug Log References

### Completion Notes List

### File List
