# Story 1.4: Division Routing & KPI Dashboards

Status: review

## Story

As a Founder,
I want specialized views for BIAB, SkunkWorks, Modular, and Desktop divisions,
so that I can monitor financial metrics and progress specific to each business line (FR4).

## Acceptance Criteria

1. **Given** the Global Pulse dashboard
2. **When** I select a specific division from the navigation
3. **Then** the HUD updates to show KPIs tailored to that division (e.g., "Build Velocity" for BIAB vs. "R&D Burn" for SkunkWorks)
4. **And** I can see a filtered list of projects belonging only to that division

## Tasks / Subtasks

- [x] **Navigation & Routing Implementation** (AC: #1, #2)
  - [x] Implement division-specific routes using Next.js App Router (e.g., `/dashboard/[division]`).
  - [x] Add a "Division Selector" to the "Monaco" sidebar or HUD header (Story 1.3 alignment).
  - [x] Ensure navigation between divisions is seamless and < 500ms (NFR1).
- [x] **KPI Dashboard Components** (AC: #3)
  - [x] Design a "Division KPI HUD" component that accepts a division prop.
  - [x] Map division-specific KPIs:
    - **BIAB:** Build Velocity, MRR, Onboarding Completion.
    - **SkunkWorks:** R&D Burn, Breakthrough Rate, Resource Allocation.
    - **Modular:** Unit Sales, Integration Success, SKU Velocity.
    - **Desktop:** Token Burn, Active Installs, Query Throughput.
  - [x] Use `JetBrains Mono` for all numeric metrics and `Engine Gold` (#C4A35A) for active pulse states.
- [x] **Filtered Project List** (AC: #4)
  - [x] Update the project sidebar/list to filter based on the active division.
  - [x] Implement Supabase query logic with division filtering (RLS compliant).
- [x] **Visual Theme Integration** (AC: All)
  - [x] Apply "Tech Noir" aesthetics: Background `#0A0A0A`, Glass-morphism `backdrop-blur-2xl`.
  - [x] Ensure telemetry cards use the Engine AI standard card pattern.

## Dev Notes

### Architecture Compliance
- **Tech Stack:** Next.js 16, Tailwind CSS, Supabase.
- **Routing:** Use dynamic segments `[division]` for clear URL-state mapping.
- **State Management:** Use URL search params or path segments for shareable division views.
- **Performance:** NFR1 (500ms interaction) and NFR3 (60s data sync) are critical.

### source tree components to touch
- `src/app/division/[slug]/page.tsx` (New)
- `src/components/dashboard/DivisionSelector.tsx` (New)
- `src/components/dashboard/KPIHUD.tsx` (New)
- `src/features/cockpit/HUD.tsx` (Updated for dynamic KPIs)
- `src/features/cockpit/Sidebar.tsx` (Update for filtering and division selection)
- `src/hooks/useFilteredProjects.ts` (New hook for shared filtering logic)

### References
- [Source: _bmad-output/planning-artifacts/prd.md#FR4]
- [Source: _bmad-output/planning-artifacts/epics.md#Story 1.4]
- [Source: BRAND.md]
- [Source: DESIGN.md]

## Dev Agent Record

### Agent Model Used
Gemini 2.5 Flash

### Debug Log References
- Dynamic route `/division/[slug]` correctly identified and rendering HUD.
- KPI mapping verified for all 5 business lines (Global + 4 Divisions).
- Sidebar filtering logic centralized in `useFilteredProjects` hook.
- Transition performance verified under 500ms.

### Completion Notes List
- Implemented `src/app/division/[slug]/page.tsx` for dynamic routing.
- Enhanced `HUD.tsx` to support division-specific telemetry.
- Updated `Sidebar.tsx` with division navigation and filtered project list.
- Created `useFilteredProjects.ts` hook for reusable filtering logic.
- Applied "Tech Noir" styling across all division views.

### File List
- src/app/division/[slug]/page.tsx
- src/features/cockpit/HUD.tsx
- src/features/cockpit/Sidebar.tsx
- src/hooks/useFilteredProjects.ts
- src/lib/data.ts
- _bmad-output/implementation-artifacts/1-4-division-routing-kpi-dashboards.md
