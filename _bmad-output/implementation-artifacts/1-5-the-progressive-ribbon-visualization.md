# Story 1.5: The Progressive Ribbon (Visualization)

Status: ready-for-dev

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a Founder,
I want a segmented horizontal track for real-time project lifecycle visualization,
so that I can see exactly where a build is in the 24-hour assembly line (UX-DR1).

## Acceptance Criteria

1. [Given] a project drill-down view
2. [When] the project is active
3. [Then] a segmented "Progressive Ribbon" displays the 6-stage lifecycle
4. [And] the active stage displays an Engine Gold pulsing animation (#C4A35A)
5. [And] the ribbon updates in real-time based on agent execution state

## Tasks / Subtasks

- [x] Implement `ProgressiveRibbon` component (AC: 3, 4)
  - [x] Define the 6 stages (Discovery, Analysis, Plan, Solutioning, Implementation, Handoff)
  - [x] Implement segmented track visualization using Tailwind CSS
- [ ] Connect ribbon to project state and Vercel Workflow status (AC: 5)
  - [ ] Use established project state management (Supabase real-time or Vercel AI SDK state)
- [ ] Add pulsing animation to active stage (AC: 4)
  - [ ] Use `#C4A35A` (Engine Gold) for the pulse
- [ ] Integrate ribbon into the project detail view / War Room (AC: 1, 2)
  - [ ] Ensure it follows the Tech Noir aesthetic (#0A0A0A base, #C4A35A gold)

## Dev Notes

- **Design System:** Tech Noir aesthetic (#0A0A0A base, #C4A35A gold).
- **Typography:** JetBrains Mono for telemetry data, Inter for labels.
- **Performance:** Ensure UI updates are < 500ms (NFR1).
- **State:** Ribbon should respond to `is_active` state of the Vercel Workflow.
- **Animation:** Use Framer Motion for the "heartbeat" pulse and "Scan-line" effect.

### Project Structure Notes

- Component Location: `src/features/dashboard/components/ProgressiveRibbon.tsx`
- Integration: `src/features/dashboard/components/ProjectWarRoom.tsx` (verify if this exists)

### References

- [Source: _bmad-output/planning-artifacts/prd.md#Executive-Oversight-&-Portfolio-Management-(The-Cockpit)]
- [Source: _bmad-output/planning-artifacts/ux-design-specification.md#The-Progressive-Ribbon]
- [Source: _bmad-output/planning-artifacts/epics.md#Story-1.5:-The-Progressive-Ribbon-(Visualization)]

## Dev Agent Record

### Agent Model Used

Gemini 2.5 Flash

### Debug Log References

### Completion Notes List

### File List
