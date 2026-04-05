# Story 1.5: The Progressive Ribbon (Visualization)

Status: in-progress

## Story

As a Founder,
I want a high-fidelity "Progressive Ribbon" timeline for project lifecycles,
so that I can visually track the "Digital Assembly Line" in real-time.

## Acceptance Criteria

1. **SVG-based Ribbon component implemented** displaying project stages (Analysis, Plan, Solution, Build, Deploy). [Source: epics.md#Story 1.5]
2. **"Glitch-less" real-time updates** enabled where project stage transitions are animated using Framer Motion. [Source: prd.md#FR1]
3. **Cinematic UI transitions** applied to the Ribbon, featuring Engine Gold glows for the active stage. [Source: ux-design-specification.md#Cinematic UI]
4. **Data-driven rendering** where the Ribbon updates based on the selected project's metadata from `src/lib/data.ts`.
5. **Responsiveness maintained** with the Ribbon scaling correctly on different viewports without visual degradation.

## Tasks / Subtasks

- [x] **Task 1: Ribbon Component Architecture (AC: 1, 5)**
  - [x] Create `ProgressiveRibbon.tsx` in `src/components/ui/`.
  - [x] Implement SVG path-like connection lines and node-based rendering.
  - [x] Ensure Ribbon scales fluidly via `overflow-x-auto` and `min-w` constraints.
- [x] **Task 2: Cinematic Animations (AC: 2, 3)**
  - [x] Integrate `framer-motion` for animated progress lines and active node pulsing.
  - [x] Implement "Engine Gold" glows and shadow effects for the `currentStage`.
  - [x] Add real-time "Processing" heartbeat indicators.
- [x] **Task 3: Integration with Cockpit (AC: 4)**
  - [x] Update `HUD.tsx` to include `ProgressiveRibbon` for every active project delivery.
  - [x] Map `MOCK_PROJECTS` stages to the visualization system.
- [x] **Task 4: State-Driven Visuals (AC: 4)**
  - [x] Add logic to highlight active phase and dim completed/future phases.
  - [x] Verify layout performance meets the 500ms responsiveness rule.

## Dev Notes

- **Animations:** Used Framer Motion `motion.div` for the progress line width and node scaling to ensure a "Glitch-less" feel.
- **Tech Noir Styling:** Applied `shadow-[0_0_15px_#C4A35A]` to the active stage node for the HUD projection effect.
- **Data Integrity:** Synchronized `src/lib/data.ts` mock project stages with the Ribbon's ID system.

### Project Structure Notes

- **Visualization:** `ProgressiveRibbon` established as a reusable UI primitive in `src/components/ui/`.

### References

- [Source: prd.md] - FR1: Real-time Orchestration.
- [Source: ux-design-specification.md] - Cinematic UI & Stage Visuals.
- [Source: BRAND.md] - Engine Gold (#C4A35A) tokens.

## Dev Agent Record

### Agent Model Used

Gemini 2.5 Flash

### Debug Log References

- Build successful: 4/4 pages verified with Framer Motion integration.
- Fixed JSX parsing error in `Sidebar.tsx` during integration.

### Completion Notes List

- SVG timeline implemented with project phases (Analysis -> Deploy).
- Dynamic progress line updates based on current stage index.
- Engine Gold pulse animations added for active stages.
- Filtered project list in HUD now displays full visualization for each delivery.

### Review Findings

- [x] [Review][Patch] Spec Compliance: Refactored Ribbon connection lines to use SVG `<line>` primitives (AC 1).
- [x] [Review][Patch] Runtime Safety: Added guard for division-by-zero when calculating progress percentage.
- [x] [Review][Patch] Data Resilience: Added optional chaining to `division.kpis` mapping in HUD.tsx.
- [x] [Review][Patch] Mobile UX: Removed `scrollbar-hide` to provide visual hinting for horizontal scroll on small viewports.

Status: done
