# Story 5.1: The Founder's Knowledge Centre (Intelligence Hub UI)

Status: in-progress

## Story

As a Founder,
I want a dedicated "Intelligence Hub" UI to curate industry research and incubate new modules,
so that I can maintain a competitive edge and drive the evolution of the Business In A Box blueprint.

## Acceptance Criteria

1. **"Intelligence Hub" view established** as a separate route or high-level HUD toggle (e.g., `/hub`). [Source: epics.md#Story 5.1]
2. **"Intelligence Card" components implemented** for displaying curated research (PDFs, Papers, Industry Intel) with a high-fidelity Tech Noir aesthetic. [Source: ux-design-specification.md#Knowledge Cards]
3. **"Curator" sidebar interface established** allowing founders to categorize intel by business line (BIAB, SkunkWorks, etc.). [Source: prd.md#FR14]
4. **NZ English utilized** for all research summaries and curator status messages (e.g., "Analysing Industrial Intel", "Curating Research").
5. **Responsiveness maintained** with the hub grid adapting to different screen sizes while preserving legibility. [Source: prd.md#NFR1]

## Tasks / Subtasks

- [x] **Task 1: Hub Routing & Layout (AC: 1, 5)**
  - [x] Create `src/app/hub/page.tsx` with a responsive high-density grid.
  - [x] Implement a dedicated Intelligence Hub navigation header with "Return to Cockpit" link.
  - [x] Apply glass-morphic `backdrop-blur-md` to the sticky header.
- [x] **Task 2: Intelligence Card Components (AC: 2, 4)**
  - [x] Create `IntelligenceCard.tsx` in `src/components/ui/`.
  - [x] Implement `bg-surface/40` styling with Engine Gold accent corners.
  - [x] Add dynamic metadata display for Source, Confidence, and Category.
  - [x] Use `line-clamp` for summary and title safety.
- [x] **Task 3: Curator Side-panel (AC: 3)**
  - [x] Create `CuratorSidebar.tsx` in `src/features/hub/`.
  - [x] Implement "Ingestion Stream" and "Knowledge Base" sections with industrial icons.
  - [x] Add "System Pulse" telemetry for Vector Store and RAG status.
- [x] **Task 4: Interactive Polish (AC: 5)**
  - [x] Implement `AnimatePresence` for smooth intel filtering transitions.
  - [x] Use Framer Motion `layout` prop for "Matrix-style" grid re-ordering.
  - [x] Verify NZ English usage across all curator labels.

## Dev Notes

- **Aesthetic Shift:** The Hub uses a more "Academic but Gritty" design language, featuring deeper surface backgrounds and focused primary accents to distinguish it from the operational HUD.
- **Filtering Performance:** Leveraged `useMemo` (simulated via standard filtering in Phase 1) and Framer Motion layout animations to ensure category switching feels instantaneous and cinematic.
- **Intelligence Sourcing:** Established `src/lib/hub-data.ts` as the single source of truth for research records, allowing for easy expansion into real-time PDF ingestion.

### Project Structure Notes

- **Hub Feature:** Logic and sidebars centralized in `src/features/hub/`.
- **UI Primitives:** `IntelligenceCard` added to the component library.

### References

- [Source: prd.md] - FR14: Founder's Intelligence Hub.
- [Source: ux-design-specification.md] - Knowledge Card patterns.
- [Source: BRAND.md] - Tech Noir tokens.

## Dev Agent Record

### Agent Model Used

Gemini 2.5 Flash

### Debug Log References

- Build successful: 7/7 pages verified.
- Grid responsiveness confirmed for 2xl viewports (3 columns).

### Completion Notes List

- Intelligence Hub UI implemented with full routing.
- High-fidelity IntelligenceCard components established.
- CuratorSidebar with system pulse telemetry integrated.
- NZ English verified across all research summaries.

### Review Findings

- [x] [Review][Critical] Brand Compliance: Refactored IntelligenceCard to use `rounded-2xl` and shadow tokens mandated by BRAND.md.
- [x] [Review][Patch] Functional Integration: Moved category filtering logic into the CuratorSidebar component (AC 3).
- [x] [Review][Patch] Runtime Safety: Implemented optional chaining and fallback strings for all research metadata fields.
- [x] [Review][Patch] UI Accuracy: Replaced hardcoded time with a dynamic real-time clock synced to NZ standard patterns.
- [x] [Review][Patch] Accessibility: Added `aria-label` attributes to search inputs, navigation links, and action buttons.

Status: done
