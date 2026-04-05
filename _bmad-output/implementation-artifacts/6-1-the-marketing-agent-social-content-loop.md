# Story 6.1: The Marketing Agent (Social Content Loop)

Status: in-progress

## Story

As a Founder,
I want an autonomous Marketing Agent to generate social content from project milestones,
so that I can maintain an active market presence with zero manual copywriting overhead.

## Acceptance Criteria

1. **Marketing Agent implemented** as a specialized agent class or workflow step capable of generating creative social copy (LinkedIn, Twitter/X). [Source: epics.md#Story 6.1]
2. **Social Content workflow established** where completing a `task_ledger` milestone triggers the agent to generate draft posts. [Source: prd.md#FR15]
3. **Multi-Platform Support established** with specific templates for LinkedIn (Professional/Strategic) and Twitter (Gritty/Technical).
4. **NZ English utilized** for all marketing copy and creative rationales (e.g., "Optimising reach", "Initialising campaign").
5. **HUD Updated** to display a "Draft Social Post" preview for executive review before external publishing.

## Tasks / Subtasks

- [x] **Task 1: Marketing Agent Logic (AC: 1, 3)**
  - [x] Implement `src/app/api/workflows/marketing-loop/route.ts` using `@upstash/workflow`.
  - [x] Integrate `generateObject` with Gemini 2.0 Flash for platform-specific copy (LinkedIn, Twitter).
  - [x] Implement automated "Creative Rationale" and "Tone Audit" in NZ English.
- [x] **Task 2: Milestone Trigger (AC: 2)**
  - [x] Establish the marketing workflow entry point designed for industrial milestone signals.
  - [x] Persist marketing drafts to the `task_ledger` with "Creative Draft" titles.
- [x] **Task 3: HUD Social Preview (AC: 5)**
  - [x] Create `SocialPreview.tsx` in `src/components/ui/` with platform-specific branding.
  - [x] Integrate the preview into the `AuditDrilldown.tsx` using conditional title matching.
  - [x] Implement "Copy to Clipboard" functionality for executive review efficiency.
- [x] **Task 4: Linguistic & Quality Audit (AC: 4)**
  - [x] Verify NZ English usage across all marketing prompts and generated outputs.
  - [x] Implement high-fidelity "Creative Authorised" audit logs.

## Dev Notes

- **Omni-channel Execution:** The Marketing Agent provides the first layer of external agency presence, translating technical milestones into strategic market signals.
- **Visual Fidelity:** The `SocialPreview` component maintains the Tech Noir aesthetic while providing clear functional separation between LinkedIn and Twitter content.
- **Workflow Durability:** Using Vercel Workflows ensures that creative generation can handle potentially long LLM response times or platform-specific template logic.

### Project Structure Notes

- **UI Primitives:** `SocialPreview` established as a reusable creative review component.
- **Workflow:** `marketing-loop` added to the industrial orchestration suite.

### References

- [Source: prd.md] - FR15: Marketing Content Engine.
- [Source: architecture.md] - Omni-channel Execution & Tech Noir patterns.
- [Source: Story 2.1] - Task Ledger Schema.

## Dev Agent Record

### Agent Model Used

Gemini 2.5 Flash

### Debug Log References

- Build successful: 11/11 pages verified.
- Integration confirmed: SocialPreview correctly renders when `task_title` includes "Creative Draft".

### Completion Notes List

- Autonomous marketing content workflow implemented.
- LinkedIn and Twitter template support established.
- High-fidelity social preview UI integrated into HUD drill-down.
- NZ English verified across all creative outputs.

### Review Findings

- [x] [Review][Patch] Error Resilience: Refactored workflow to use `safeParse` and log `MARKETING REJECTED` audits for malformed triggers.
- [x] [Review][Patch] UX Safety: Added null-guards and Clipboard API checks to SocialPreview to prevent component crashes.
- [x] [Review][Patch] Data Integrity: Implemented a character limit guard and warning for the Twitter copy button.
- [x] [Review][Patch] Architecture: Introduced a structured `task_type: 'MARKETING_DRAFT'` field in the ledger to decouple UI rendering from string-matching.
- [x] [Review][Patch] Performance: Added `useEffect` cleanup to the clipboard 'Copied' state to prevent timer race conditions.

Status: done
