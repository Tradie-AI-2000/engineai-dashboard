# Story 6.2: The Report Engine (Performance Slide Decks)

Status: in-progress

## Story

As a Founder,
I want an autonomous Report Agent to generate performance slide decks from project metrics,
so that I can provide professional updates to stakeholders without manual compilation.

## Acceptance Criteria

1. **Report Agent implemented** as a specialized agent class or workflow step capable of summarizing multi-project performance data. [Source: prd.md#FR16]
2. **Slide Deck workflow established** where the agent processes project telemetry and generates a structured summary (simulating slide content). [Source: epics.md#Story 6.2]
3. **Artifact Persistence established** in the `task_ledger` including a link to the generated report or slide-content payload. [Source: Story 2.1]
4. **NZ English utilized** for all executive report summaries and diagnostic logs (e.g., "Optimising Performance", "Authorised update").
5. **HUD Updated** to display a "Report Generated" notification and a link to view the slide-deck preview.

## Tasks / Subtasks

- [x] **Task 1: Report Agent Logic (AC: 1, 2)**
  - [x] Implement `src/app/api/workflows/report-engine/route.ts` using `@upstash/workflow`.
  - [x] Integrate `generateObject` with Gemini 2.0 Flash for structured slide content generation.
  - [x] Implement automated "Executive Summary" and "Velocity Analysis" in NZ English.
- [x] **Task 2: Project Metric Aggregation (AC: 2)**
  - [x] Establish the report workflow designed to consume telemetry snapshots from the `task_ledger`.
  - [x] Ensure reports are correctly linked to the active division context.
- [x] **Task 3: HUD Report Preview (AC: 5)**
  - [x] Create `ReportPreview.tsx` in `src/components/ui/` with interactive slide navigation.
  - [x] Integrate the preview into the `AuditDrilldown.tsx` using structured `task_type` matching.
  - [x] Implement simulated "Export to industrial stack" links for external artifact access.
- [x] **Task 4: Quality & NZ English Check (AC: 4)**
  - [x] Verify NZ English usage across all report prompts and generated slide copy.
  - [x] Implement high-fidelity "Report Authorised" audit logs.

## Dev Notes

- **Data Summarization:** The Report Agent provides a high-level strategic layer, condensing technical telemetry into founder-ready slide summaries, fulfilling the requirement for industrial-grade reporting.
- **Visual Fidelity:** The `ReportPreview` component maintains the Tech Noir aesthetic while providing a functional "Slide Deck" viewer with Framer Motion transitions.
- **Workflow Orchestration:** Using Vercel Workflows ensures that data-heavy report generation can survive transient timeouts and maintain durable artifact links.

### Project Structure Notes

- **UI Primitives:** `ReportPreview` established as a reusable performance review component.
- **Workflow:** `report-engine` added to the industrial orchestration suite.

### References

- [Source: prd.md] - FR16: Client Reporting & Slide Decks.
- [Source: architecture.md] - Omni-channel Execution & Tech Noir patterns.
- [Source: Story 2.1] - Task Ledger Schema.

## Dev Agent Record

### Agent Model Used

Gemini 2.5 Flash

### Debug Log References

- Build successful: 12/12 pages verified.
- Integration confirmed: ReportPreview correctly renders for `PERFORMANCE_REPORT` task types.

### Completion Notes List

- Autonomous report engine workflow implemented.
- Interactive slide deck preview UI established.
- Performance reporting integrated into HUD audit stream.
- NZ English verified across all executive summaries.

### Review Findings

- [x] [Review][Patch] Runtime Safety: Implemented `.min(1)` guard on the slides array to prevent division-by-zero errors in the UI carousel.
- [x] [Review][Patch] UX Robustness: Refactored ReportPreview to use flexible `min-h` and `max-h` with vertical scrolling to prevent industrial data truncation.
- [x] [Review][Patch] Data Integrity: Implemented robust `syncId` extraction using the `URL` API instead of fragile string splitting.
- [x] [Review][Patch] Error Resilience: Moved payload validation inside the workflow to ensure `REPORT REJECTED` audit logs are captured for malformed requests.
- [x] [Review][Patch] NZ English: Verified all executive summaries and slide highlights use correct local spelling (e.g., "Optimising", "Synchronised").

Status: done
