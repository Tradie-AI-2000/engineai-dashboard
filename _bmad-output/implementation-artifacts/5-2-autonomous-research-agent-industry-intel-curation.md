# Story 5.2: Autonomous Research Agent (Industry Intel Curation)

Status: in-progress

## Story

As a Founder,
I want an autonomous Research Agent to curate industry intel and summarize papers,
so that I can stay informed on AI trends without manual research overhead.

## Acceptance Criteria

1. **Research Agent implemented** as a specialized agent class or workflow step capable of summarizing technical text/PDFs. [Source: architecture.md#Tooling]
2. **Automated Curation workflow established** where the agent processes raw data and generates `IntelligenceCard` records. [Source: epics.md#Story 5.2]
3. **Intel Persistence established** in a dedicated `intelligence_records` table with multi-tenant RLS. [Source: prd.md#FR14]
4. **NZ English utilized** for all research summaries and confidence diagnostics (e.g., "Analysing trends", "Authorised source").
5. **HUD Updated** to reflect the arrival of "New Industrial Intel" via visual notifications.

## Tasks / Subtasks

- [x] **Task 1: Intelligence Database Schema (AC: 3)**
  - [x] Create SQL migration for `public.intelligence_records` table with `metadata` JSONB support.
  - [x] Implement multi-tenant RLS policies using `user_metadata.tenant_id`.
  - [x] Add automated `updated_at` trigger for the research table.
- [x] **Task 2: Research Agent Logic (AC: 1, 2)**
  - [x] Implement `src/app/api/workflows/research-curator/route.ts` using `@upstash/workflow`.
  - [x] Integrate `generateObject` with Gemini 2.0 Flash for structured research summarisation.
  - [x] Implement automated confidence scoring and category mapping logic.
- [x] **Task 3: Real-time Integration (AC: 5)**
  - [x] Create `src/lib/hub-client.ts` for efficient client-side data retrieval.
  - [x] Update `IntelligenceHub` UI to poll real-time records from the "Master Vault".
  - [x] Add high-fidelity "Synchronisation Pulse" indicator to the header.
- [x] **Task 4: Linguistic Audit (AC: 4)**
  - [x] Verify NZ English usage across all agent prompts and generated summaries.
  - [x] Add robust error audit logging to the `task_ledger` for curation failures.

## Dev Notes

- **Autonomous Curation:** The Research Agent now acts as a durable background process, capable of transforming raw industrial text into structured, auditable intelligence records.
- **Data Integrity:** The move from `MOCK_INTEL` to real-time `intelligence_records` ensures that the "Foundation" of the project is data-driven and secure.
- **Performance:** Implemented a 10s polling interval for the Hub UI to maintain fresh data without overwhelming the Supabase connection pool.

### Project Structure Notes

- **Workflow:** `research-curator` established as a specialized industrial pipeline.
- **Client Logic:** `hub-client.ts` decoupled from server components to prevent Next.js 16 build boundary conflicts.

### References

- [Source: prd.md] - FR14: Founder's Intelligence Hub.
- [Source: architecture.md] - Industrial Automation & Data Models.
- [Source: Story 5.1] - Intelligence Hub UI.

## Dev Agent Record

### Agent Model Used

Gemini 2.5 Flash

### Debug Log References

- Build successful: 8/8 pages verified.
- Workflow confirmed to persist `record_id` in the task ledger for full audit traceability.

### Completion Notes List

- Autonomous research agent workflow implemented.
- Multi-tenant research persistence established in Supabase.
- Intelligence Hub transitioned to real-time database results.
- NZ English verified across all curation diagnostics.

### Review Findings

- [x] [Review][Patch] Error Resilience: Moved payload validation inside the workflow to ensure `RESEARCH REJECTED` audit logs are created for malformed requests.
- [x] [Review][Patch] Atomicity: Decoupled database insertion from ledger logging into separate steps to prevent duplicate records on retry.
- [x] [Review][Patch] NZ English: Updated Research Agent prompt to explicitly enforce NZ standard spelling for summaries, titles, and rationales.
- [x] [Review][Patch] UI Accuracy: Refactored time calculation to correctly display `NZST` (Pacific/Auckland) regardless of system local.
- [x] [Review][Patch] Scalability: Implemented `isMounted` guards and relaxed polling to 15s to ensure robust performance under high latency.

Status: done
