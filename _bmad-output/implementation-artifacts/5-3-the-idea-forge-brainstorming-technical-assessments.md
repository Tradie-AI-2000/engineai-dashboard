# Story 5.3: The Idea Forge (Brainstorming & Technical Assessments)

Status: in-progress

## Story

As a Founder,
I want an "Idea Forge" interface to brainstorm and assess new module concepts with the Research Agent,
so that I can rapidly incubate viable products for the Business In A Box pipeline.

## Acceptance Criteria

1. **"Idea Forge" workspace implemented** within the Intelligence Hub, featuring a split-pane layout for "Concept Input" and "Agent Assessment." [Source: epics.md#Story 5.3]
2. **Interactive Brainstorming workflow established** where founders can submit module ideas and receive a technical "Industrial Assessment" from the agent. [Source: prd.md#FR14]
3. **Assessment Schema established** using Zod to define structured output (Viability, Complexity, Required Modules, Rationale). [Source: architecture.md#Managerial Transparency]
4. **NZ English utilized** for all assessment terminology (e.g., "Analysing Viability", "Optimising Resource Path").
5. **Incubation state persisted** where approved concepts are stored in a new `incubated_ideas` table for future BMB activation.

## Tasks / Subtasks

- [x] **Task 1: Idea Persistence Schema (AC: 5)**
  - [x] Create SQL migration for `public.incubated_ideas` table with `assessment` JSONB support.
  - [x] Implement multi-tenant RLS policies using `user_metadata.tenant_id`.
  - [x] Add automated `updated_at` trigger for the incubation table.
- [x] **Task 2: Idea Forge UI (AC: 1, 5)**
  - [x] Create `IdeaForge.tsx` in `src/features/hub/`.
  - [x] Implement split-pane "Concept Entry" and "Industrial Assessment" layout.
  - [x] Add cinematic HUD pulse effects and AnimatePresence for state transitions.
- [x] **Task 3: Assessment Workflow (AC: 2, 3)**
  - [x] Implement `src/app/api/workflows/idea-forge/route.ts` using `@upstash/workflow`.
  - [x] Integrate `generateObject` with Gemini 2.0 Flash for structured viability and complexity analysis.
  - [x] Establish Zod schema for structured industrial assessments.
- [x] **Task 4: Quality & NZ English Check (AC: 4)**
  - [x] Verify NZ English usage across all curator prompts and assessment outputs.
  - [x] Implement explicit "Incubation Synchronised" logs in the task ledger.

## Dev Notes

- **Foundry Aesthetic:** The Idea Forge uses a dedicated "Foundry" style with Amber/Gold pulse animations to distinguish the incubation process from standard research curation.
- **Structured Assessment:** Leveraged Zod-driven structured outputs to ensure agent assessments include specific viability scores and module requirements, fulfilling the requirement for technical oversight.
- **Workflow Resilience:** Implemented as a durable workflow to ensure complex technical brainstorming can persist through long-running reasoning loops.

### Project Structure Notes

- **Hub Feature:** `IdeaForge` integrated as a high-level mode within the Intelligence Hub.
- **Persistence:** All brainstormed concepts are securely isolated via RLS in the `incubated_ideas` table.

### References

- [Source: prd.md] - FR14: Founder's Intelligence Hub.
- [Source: architecture.md] - Industrial Automation & Tech Noir patterns.
- [Source: Story 5.1] - Intelligence Hub UI.

## Dev Agent Record

### Agent Model Used

Gemini 2.5 Flash

### Debug Log References

- Build successful: 9/9 pages verified.
- Workflow confirmed to produce structured viability and complexity payloads.

### Completion Notes List

- Idea Forge workspace implemented with split-pane layout.
- Interactive brainstorming workflow established with Research Agent.
- Multi-tenant persistence for incubated ideas completed.
- NZ English verified across all technical assessment terminology.

### Review Findings

- [x] [Review][Critical] Functional Integration: Refactored IdeaForge handleForge to use real `fetch` calls to the Vercel Workflow API.
- [x] [Review][Patch] Data Integrity: Decoupled database persistence from ledger logging into atomic context steps to prevent duplicate ideas on retry.
- [x] [Review][Patch] Type Safety: Integrated `useTenant` hook to provide required `tenant_id` context for all Forge submissions.
- [x] [Review][Patch] Validation: Implemented frontend character count guards to match backend Zod schema requirements.
- [x] [Review][Patch] Reliability: Refactored incubation failure audit to handle double-fault scenarios without crashing the workflow.

Status: done
