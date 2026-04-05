# Story 1.1: Project Scaffolding & Tech Noir Theme

Status: in-progress

## Story

As a Founder-Orchestrator,
I want a Next.js 16 project initialized with the Tech Noir design system,
so that I can begin building the high-fidelity operational cockpit.

## Acceptance Criteria

1. **Next.js 16 + Tailwind CSS initialized** using the App Router and Turbopack. [Source: _bmad-output/planning-artifacts/architecture.md#ADR-003]
2. **Base background set to `#0A0A0A`** and primary accent to `#C4A35A` (Engine Gold) in Tailwind config. [Source: BRAND.md]
3. **JetBrains Mono configured for monospaced data** and Inter for UI text via `next/font/google`. [Source: _bmad-output/planning-artifacts/ux-design-specification.md#Visual Design Foundation]
4. **Project structure includes standard directories** for `src/components`, `src/agents`, and `src/workflows`. [Source: _bmad-output/planning-artifacts/epics.md#Story 1.1]
## Tasks / Subtasks

- [x] **Task 1: Project Initialization (AC: 1)**
  - [x] Scaffold Next.js 16 project using manual creation for precision.
  - [x] Ensure Turbopack is enabled for development (`next dev --turbo`).
- [x] **Task 2: Design System Setup (AC: 2, 3)**
  - [x] Configure `tailwind.config.ts` with custom colors:
    - `background: "#0A0A0A"`
    - `primary: "#C4A35A"`
    - `surface: "#121212"`
  - [x] Implement Google Fonts (`Inter` and `JetBrains Mono`) in `src/app/layout.tsx`.
  - [x] Set global CSS variables for the Tech Noir aesthetic in `src/app/globals.css`.
- [x] **Task 3: Directory Scaffolding (AC: 4)**
  - [x] Create `src/agents/`, `src/workflows/`, and `src/features/cockpit/` folders.
  - [x] Create initial empty `BRAND.md` reference in the root for agent consumption.
- [x] **Task 4: Base Layout Implementation (AC: 5)**
  - [x] Implement the root layout with the matte `#0A0A0A` background.
  - [x] Add a basic "HUD initialization" placeholder to verify fonts and colors.

## Dev Notes

- **Next.js 16 Patterns:** Project successfully initialized with Next.js 16 and Turbopack. `npm run build` verified.
- **Tailwind Config:** Engine Gold (`#C4A35A`) accents and pulse animation implemented.
- **Agent Readiness:** `src/agents/` and `src/workflows/` directories established for Phase 1.

### Project Structure Notes

- **Unified Structure:** All logic resides within `src/`.
- **Convention:** Using New Zealand English for UI labels where applicable (e.g., "Operational Nervous System").

### References

- [Source: BRAND.md] - Visual tokens and branding rules.
- [Source: _bmad-output/planning-artifacts/architecture.md] - ADR-003: Runtime Split (Node.js for agents).
- [Source: _bmad-output/planning-artifacts/ux-design-specification.md] - Visual Design Foundation and Emotional Goals.
- [Source: _bmad-output/planning-artifacts/epics.md] - Epic 1: The Executive Cockpit.

## Dev Agent Record

### Agent Model Used

Gemini 2.5 Flash

### Debug Log References

- Turbopack build successful in 1679.9ms.
- Next.js 16 CLI command `lint` appears to have moved/changed in current environment, but `build` (which includes TS checks) passed 100%.

### Review Findings

- [x] [Review][Patch] Tailwind Content Scanner: Missing src/features in tailwind.config.ts
- [x] [Review][Patch] Animation Glow: shadow property used instead of box-shadow in tailwind.config.ts
- [x] [Review][Patch] Node.js Version: Missing engines in package.json
- [x] [Review][Patch] Mobile Viewport: Missing viewport metadata in src/app/layout.tsx

Status: done
