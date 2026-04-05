# Story 5.4: BMB Hot-Loading & Live Agent Workflow Activation

Status: in-progress

## Story

As a Founder,
I want to "Hot-Load" incubated ideas into live agent workflows,
so that I can rapidly transform strategic research into operational automation.

## Acceptance Criteria

1. **"Hot-Load" interface implemented** allowing founders to activate an incubated idea from the Intelligence Hub. [Source: epics.md#Story 5.4]
2. **Live Workflow Activation established** where clicking "Activate" triggers a specialized Vercel Workflow to bootstrap the new module. [Source: architecture.md#Industrial Automation]
3. **Module State synchronization** implemented where the idea status transitions from `incubated` to `active` in the `incubated_ideas` table. [Source: Story 5.3]
4. **NZ English utilized** for all activation logs and system diagnostics (e.g., "Initialising Hot-Load", "Authorising Live Activation").
5. **HUD Updated** to display the newly activated module within the "Active Deliveries" stream.

## Tasks / Subtasks

- [x] **Task 1: Activation Workflow (AC: 2, 3)**
  - [x] Implement `src/app/api/workflows/module-activation/route.ts` using `@upstash/workflow`.
  - [x] Add state transition logic to update `incubated_ideas` status to `active`.
  - [x] Log "Hot-Load Synchronised" to the `task_ledger` for industrial audit.
- [x] **Task 2: Hot-Load UI (AC: 1, 5)**
  - [x] Update `IdeaForge.tsx` to include a functional "Initialise Live Activation" button.
  - [x] Implement real `fetch` call to the module activation workflow.
  - [x] Add visual pulsing and `Zap` icons for the hot-loading state.
- [x] **Task 3: Operational HUD Sync (AC: 5)**
  - [x] Create `src/hooks/useActiveModules.ts` to fetch hot-loaded modules from Supabase.
  - [x] Update `HUD.tsx` to dynamically merge active modules into the "Active Deliveries" stream.
  - [x] Implement `Rocket` icon and "Hot-Loaded" badges for new delivery items.
- [x] **Task 4: Linguistic & Quality Audit (AC: 4)**
  - [x] Verify NZ English usage across all activation diagnostics (e.g., "Authorising", "Synchronising").
  - [x] Implement robust error handling for activation failures.

## Dev Notes

- **Dynamic Ingestion:** The HUD now reactively consumes data from both the static `MOCK_PROJECTS` and the dynamic `incubated_ideas` table, fulfilling the requirement for a self-evolving agency cockpit.
- **Workflow Reliability:** The module activation is handled as a durable saga, ensuring that the state transition and ledger logging are atomic.
- **Type Safety:** Refactored the HUD's delivery mapping to ensure hot-loaded modules share a consistent type interface with existing projects, preventing runtime rendering failures.

### Project Structure Notes

- **Workflows:** `module-activation` established as the bridge between research and operations.
- **Hooks:** `useActiveModules` added to the data-access layer.

### References

- [Source: prd.md] - FR14: Founder's Intelligence Hub.
- [Source: architecture.md] - Industrial Automation & Tech Noir patterns.
- [Source: Story 5.3] - Incubated Ideas.

## Dev Agent Record

### Agent Model Used

Gemini 2.5 Flash

### Debug Log References

- Build successful: 10/10 pages verified.
- Fixed relative import path in `useActiveModules.ts`.
- Resolved type mismatch for `lockedStages` in HUD project mapping.

### Completion Notes List

- BMB Hot-Loading workflow implemented.
- Live agent activation trigger added to Idea Forge.
- Real-time HUD integration for active modules completed.
- NZ English verified across all system diagnostics.

### Review Findings

- [x] [Review][Critical] Functional Integration: Replaced `setTimeout` simulation in IdeaForge with a real `fetch` call to the `module-activation` workflow.
- [x] [Review][Patch] Build Integrity: Corrected relative import path in `useActiveModules.ts` from `./supabase` to `@/lib/supabase`.
- [x] [Review][Patch] Type Safety: Updated HUD project mapping to include `lockedStages: []` for hot-loaded modules, resolving the TypeScript property access error.
- [x] [Review][Patch] UX Polish: Added pulsing `Rocket` icon and "Hot-Loaded" badges to delivery cards for activated modules.

Status: done
