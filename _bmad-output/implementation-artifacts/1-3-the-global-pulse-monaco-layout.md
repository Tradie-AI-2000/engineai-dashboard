# Story 1.3: The Global Pulse (Monaco Layout)

Status: in-progress

## Story

As a Founder-Orchestrator,
I want a high-density "Monaco" layout with a persistent project sidebar and a HUD area,
so that I can maintain a 5-second pulse check on the entire agency.

## Acceptance Criteria

1. **Persistent Sidebar established** listing all active projects with "Shift-Light" status borders (Engine Gold pulse for active, Static Red for blocked). [Source: epics.md#Story 1.3]
2. **Main HUD area implemented** with high-density telemetry cards for "Global Heartbeat" metrics (MRR, Burn, Velocity). [Source: ux-design-specification.md#Telemetry Cards]
3. **Monaco Layout responsive** and adapts to different screen sizes, with a 500ms interaction threshold. [Source: prd.md#NFR1]
4. **JetBrains Mono utilized for all technical telemetry** and Inter for executive summaries. [Source: ux-design-specification.md#Typography System]
5. **Glass-morphic effects applied** to HUD overlays following the Tech Noir aesthetic. [Source: ux-design-specification.md#Visual Theme]

## Tasks / Subtasks

- [x] **Task 1: Sidebar Implementation (AC: 1)**
  - [x] Create `Sidebar.tsx` in `src/features/cockpit/`.
  - [x] Implement project list with "Shift-Light" borders using Tailwind `animate-pulse-gold` and red status indicators.
  - [x] Integrate mock project data for initial pulse verification.
- [x] **Task 2: HUD Telemetry Cards (AC: 2, 4)**
  - [x] Create `TelemetryCard.tsx` in `src/components/ui/`.
  - [x] Implement high-density metrics layout with JetBrains Mono.
  - [x] Apply Tech Noir styling (`bg-surface`, `border-primary/10`, custom corner accents).
- [x] **Task 3: Monaco Layout Scaffolding (AC: 3, 5)**
  - [x] Update `src/app/page.tsx` to use the new layout structure (Navigation + Sidebar + HUD).
  - [x] Add glass-morphic HUD effects using Tailwind `backdrop-blur-md` and `bg-surface/80`.
  - [x] Verify interaction responsiveness (<500ms).
- [x] **Task 4: HUD Integration (AC: 1, 2)**
  - [x] Integrate `Sidebar` and `TelemetryCard` into the main `HUD.tsx` component.
  - [x] Establish high-density grid for "Global Heartbeat" metrics.

## Dev Notes

- **Monaco Layout:** Successfully established a 2-pane structure with a persistent project sidebar and a scrollable telemetry-rich main area.
- **Visuals:** Followed the "Silverstone-Monaco" hybrid aesthetic with Engine Gold pulse animations and high-contrast monospaced data.
- **Responsiveness:** Verified the layout adapts to large desktop and tablet viewports.

### Project Structure Notes

- **Components:** `TelemetryCard` added to `src/components/ui/` for reuse.
- **Cockpit Feature:** `Sidebar` and `HUD` established in `src/features/cockpit/`.

### References

- [Source: ux-design-specification.md] - Layout patterns and Telemetry Card specs.
- [Source: prd.md] - NFR1: Responsiveness.
- [Source: BRAND.md] - Color and Font tokens.

## Dev Agent Record

### Agent Model Used

Gemini 2.5 Flash

### Debug Log References

- Build successful: 4/4 pages verified.
- Tailwind pulse animation confirmed working on "Active" project status.

### Completion Notes List

- Monaco layout implemented with persistent sidebar.
- Telemetry cards established for MRR, Velocity, and Token Burn.
- Glass-morphic HUD styling applied.
- Agent activity feed placeholder added to HUD.

### Review Findings

- [x] [Review][Patch] Text Safety: Added truncation to sidebar and telemetry values.
- [x] [Review][Patch] Mobile Layout: Fixed sidebar squeezing by adding lg: breakpoint.
- [x] [Review][Patch] Empty State: Added "No active projects" placeholder to sidebar.
- [x] [Review][Patch] Glass-morphism: Applied backdrop-blur-md and surface transparency to HUD cards (AC 5).
- [x] [Review][Patch] Brand Alignment: Refined typography tracking and case for HUD labels.

Status: done
