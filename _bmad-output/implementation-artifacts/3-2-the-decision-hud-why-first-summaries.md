# Story 3.2: The Decision HUD (Why-First Summaries)

Status: ready-for-dev

## Story

As a Founder,
I want a "Why-First" executive summary modal for resolving autonomous bottlenecks,
So that I understand the agent's logic before making a high-leverage decision.

## Acceptance Criteria

1. **Given** a project that has hit a "Red" structural risk or requires approval
2. **When** I engage the "RESOLVE NOW" trigger
3. **Then** a modal appears with a natural-language summary explaining the bottleneck and the agent's proposed fix
4. **And** the HUD displays a syntax-highlighted staging area for the proposed draft
5. **And** I am presented with dual-path resolution options: `[APPLY & EDIT]` or `[MANUAL REBUILD]`

## Tasks / Subtasks

- [ ] **Task 1: Design and Scaffolding** (AC: #3, #4)
  - [ ] Create `DecisionHUD` component using Radix UI/Shadcn primitives.
  - [ ] Implement the Tech Noir theme (#0A0A0A base, #C4A35A accents).
  - [ ] Configure JetBrains Mono for the syntax-highlighted staging area.
- [ ] **Task 2: State Management & Data Fetching** (AC: #1, #2, #3)
  - [ ] Integrate with the `task_ledger` in Supabase to fetch the latest agent reasoning and proposed fix.
  - [ ] Implement the "RESOLVE NOW" trigger logic in the Project Cockpit.
- [ ] **Task 3: Action Handlers (Dual-Path Resolution)** (AC: #5)
  - [ ] Implement `APPLY & EDIT` path: Stages the draft and prepares for deep-linking (Story 3.3).
  - [ ] Implement `MANUAL REBUILD` path: Discards the draft and resets the task state.
- [ ] **Task 4: UI/UX Refinement** (AC: #3, #4)
  - [ ] Add glass-morphic HUD overlay effect (UX-DR7).
  - [ ] Implement "Silent Toasts" for action confirmation (UX-DR10).

## Dev Notes

- **Architecture Compliance:**
  - Use **Vercel AI SDK v6** patterns for any agent interactions.
  - State should be derived from the `task_ledger` (checkpoint JSONB).
  - Ensure < 500ms responsiveness for UI interactions (NFR1).
- **Styling:**
  - Background: `#0A0A0A`.
  - Accent: `#C4A35A` (Engine Gold).
  - Fonts: Inter (UI) / JetBrains Mono (Data/Code).
- **Components:**
  - Use **Radix UI Dialog** for the modal.
  - Use a syntax highlighter like `prism-react-renderer` or similar for the staging area.

### Project Structure Notes

- Components: `src/components/cockpit/decision-hud.tsx`
- Hooks: `src/hooks/use-task-resolution.ts`
- Feature: `src/features/cockpit/`

### References

- [Source: _bmad-output/planning-artifacts/prd.md#Functional-Requirements] (FR3, FR5)
- [Source: _bmad-output/planning-artifacts/epics.md#Story-3-2]
- [Source: _bmad-output/planning-artifacts/architecture.md#Data-Models--Schemas] (Task Ledger)
- [Source: _bmad-output/planning-artifacts/ux-design-specification.md#The-RESOLVE-NOW-Decision-HUD] (UX-DR3)

## Dev Agent Record

### Agent Model Used

Gemini 2.0 Flash (CLI Agent)

### Debug Log References

### Completion Notes List

### File List
