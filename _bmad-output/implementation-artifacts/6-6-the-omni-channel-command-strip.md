# Story 6.6: The Omni-Channel Command Strip

Status: ready-for-dev

## Story

As a Founder-Orchestrator,
I want a persistent UI bar for one-touch communication and agent interrogation,
so that I can rapidly direct the agency from any view (UX-DR8).

## Acceptance Criteria

1. **Given** any view in the "Client War Room"
   **When** I hover or focus on the persistent "Command Strip"
   **Then** I see one-touch triggers for WhatsApp, Telegram, and Email
2. **And** the strip includes a "Direct Interrogation" input for querying the active agent swarm
3. **And** all triggers utilize auto-drafted templates based on the current project stage.

## Tasks / Subtasks

- [x] Refactor CommandStrip to support desktop (remove `lg:hidden`) (AC: #1)
- [x] Add one-touch triggers for WhatsApp, Telegram, and Email (AC: #1)
- [x] Implement auto-drafted templates based on project context (AC: #3)
- [x] Integrate CommandStrip into the main HUD with project context props (AC: #2)

## Dev Notes

- Component location: `src/features/cockpit/CommandStrip.tsx`
- Icons used: `MessageCircle` (WhatsApp), `Send` (Telegram), `Mail` (Email) from `lucide-react`
- Design System: Tech Noir (#0A0A0A base, #C4A35A gold accents)
- Layout: Fixed bottom bar, responsive for mobile (expandable triggers) and desktop (persistent sidebar triggers)

### Project Structure Notes

- Aligned with `src/features/cockpit/` for operational HUD components.
- Prop-driven context passed from `HUD.tsx`.

### References

- [Source: _bmad-output/planning-artifacts/epics.md#Epic 6]
- [Source: _bmad-output/planning-artifacts/ux-design-specification.md#UX-DR8]
Status: done

### Review Findings

- [x] [Review][Decision] Multi-Tenancy Breach in `HUD.tsx` — Resolved: Kept as Global Agency mode (intentional).
- [x] [Review][Patch] Implement native deep-links [src/features/cockpit/CommandStrip.tsx:50-54] — Use window.open for WA/TG/Email.
- [x] [Review][Patch] Memory Leak in `handleSend` [src/features/cockpit/CommandStrip.tsx:32-48]
- [x] [Review][Patch] Mandate Violation: Vercel AI SDK [src/features/cockpit/CommandStrip.tsx:39-44]
- [x] [Review][Patch] Accessibility (A11y) Gaps [src/features/cockpit/CommandStrip.tsx:64-135]
- [x] [Review][Patch] Hardcoded Magic Numbers [src/features/cockpit/CommandStrip.tsx:61]
- [x] [Review][Patch] State Race Condition [src/features/cockpit/CommandStrip.tsx:50-54]
- [x] [Review][Patch] UI State Persistence [src/features/cockpit/CommandStrip.tsx:44]
- [x] [Review][Patch] Identifier Validation Gap [src/features/cockpit/CommandStrip.tsx:20-29]
- [x] [Review][Defer] Logic Encapsulation [src/features/cockpit/CommandStrip.tsx:12-16] — deferred, pre-existing (state soup)


### Agent Model Used

Gemini 2.0 Flash

### Completion Notes List

- Successfully refactored CommandStrip to be persistent on desktop.
- Added one-touch communication triggers with contextual templates.
- Connected CommandStrip to the primary project context in HUD.tsx.

### File List

- `src/features/cockpit/CommandStrip.tsx`
- `src/features/cockpit/HUD.tsx`
