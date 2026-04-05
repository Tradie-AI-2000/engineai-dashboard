# Story 1.4: Division Routing & KPI Dashboards

Status: in-progress

## Story

As a Founder,
I want specialized views for BIAB, SkunkWorks, Modular, and Desktop divisions,
so that I can monitor financial metrics and progress specific to each business line.

## Acceptance Criteria

1. **Division navigation established** allowing switching between Global, BIAB, SkunkWorks, Modular, and Desktop views. [Source: epics.md#Story 1.4]
2. **Dynamic KPI updates** implemented where selecting a division updates the HUD telemetry cards with relevant metrics (e.g., "Build Velocity" for BIAB, "R&D Burn" for SkunkWorks). [Source: prd.md#FR4]
3. **Filtered project list** displayed in the sidebar based on the active division. [Source: epics.md#Story 1.4]
4. **URL-based routing** implemented for each division (e.g., `/biab`, `/skunkworks`) to support deep-linking.
5. **UI responsiveness maintained** (<500ms) during division transitions. [Source: prd.md#NFR1]

## Tasks / Subtasks

- [x] **Task 1: Division Routing (AC: 1, 4)**
  - [x] Implement Next.js dynamic routing via `src/app/division/[slug]/page.tsx`.
  - [x] Update `Sidebar` to handle division-specific navigation with `Link` components.
  - [x] Add "Division Access" selector to the sidebar.
- [x] **Task 2: Dynamic Telemetry (AC: 2)**
  - [x] Implement dynamic KPI mapping in `HUD.tsx` using the `DIVISIONS` registry.
  - [x] Update `HUD` main content to render different metrics based on the active division.
- [x] **Task 3: Sidebar Filtering (AC: 3)**
  - [x] Implement project filtering logic in the `Sidebar` based on `activeDivision`.
  - [x] Centralize mock data in `src/lib/data.ts` with division metadata.
- [x] **Task 4: Transition Polish (AC: 5)**
  - [x] Add `backdrop-blur-sm` and layout transitions for division swaps.
  - [x] Verify transition performance meets NFR1 benchmarks.

## Dev Notes

- **Dynamic Routing:** Utilized Next.js 16 App Router `params` pattern for division sub-routes.
- **Data Architecture:** Created `src/lib/data.ts` as the single source of truth for division metadata and mock project state.
- **Performance:** Verified that division switching occurs within the 500ms threshold.

### Project Structure Notes

- **Data Source:** `src/lib/data.ts` established for global state simulation.
- **Routing:** `/division/[slug]` handles specialized views.

### References

- [Source: prd.md] - FR4: Division Routing.
- [Source: epics.md] - Story 1.4 Acceptance Criteria.
- [Source: ux-design-specification.md] - Navigation & Portal Patterns.

## Dev Agent Record

### Agent Model Used

Gemini 2.5 Flash

### Debug Log References

- Build successful: Dynamic route `/division/[slug]` correctly identified.
- TypeScript fix applied to `HUD.tsx` for division property access.

### Completion Notes List

- Division sub-routes implemented for BIAB, SkunkWorks, Modular, and Desktop.
- Telemetry cards update dynamically based on the selected division.
- Sidebar projects are filtered by the active division.
- Centralized `DIVISIONS` and `MOCK_PROJECTS` data structure.

### Review Findings

- [x] [Review][Patch] Runtime Safety: Added multi-level division fallback and crash-guard in HUD.tsx.
- [x] [Review][Patch] Mobile Accessibility: Implemented a horizontal division selector strip for mobile viewports.
- [x] [Review][Patch] Key Uniqueness: Appended division slug and index to KPI keys to prevent reconciliation errors.
- [x] [Review][Dismiss] Data Coupling: Mock data in HUD is acceptable for the current Phase 1 development stage.

Status: done
