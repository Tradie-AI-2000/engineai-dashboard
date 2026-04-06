# Story 1.6: Mobile Oversight (NL Query Core)

Status: ready-for-dev

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a Founder,
I want to query my system state using natural language from my mobile device,
so that I can maintain oversight while away from my desk.

## Acceptance Criteria

1. **Given** a Telegram or mobile-web interface
2. **When** I ask a query like "What is our current token burn for Jackson Construction?"
3. **Then** the system returns a Generative UI card with the relevant metrics
4. **And** the feedback begins streaming within 2s of the query (NFR2)
5. **And** the system correctly identifies and extracts intent for MRR, Project stages, and Token burn queries (FR1)

## Tasks / Subtasks

- [ ] Implement API route for mobile queries (AC: #1)
  - [ ] Create `src/app/api/mobile/query/route.ts`
  - [ ] Implement Zod validation for inbound query payloads
- [ ] Integrate Vercel AI SDK v6 with Executive Agent (AC: #3, #4)
  - [ ] Configure `streamText` or `generateText` with the CEO/Executive agent logic
  - [ ] Implement system prompt for context-aware business oversight
- [ ] Define and Connect MCP Tools for Data Retrieval (AC: #5)
  - [ ] Connect Supabase MCP for project stage queries
  - [ ] Connect Stripe/Financial MCP for MRR and Token burn data
- [ ] Implement Generative UI Response Logic (AC: #3)
  - [ ] Design a set of "Telemetry Card" schemas for different metric types
  - [ ] Ensure responses are optimized for mobile-responsive rendering
- [ ] Verification & Testing (AC: #4)
  - [ ] Verify 2s streaming start time for NL responses
  - [ ] Test intent extraction across various NL phrasing for MRR and Token burn

## Dev Notes

- **Orchestration:** Use Vercel AI SDK v6. The agent should be a "Managerial" level agent (CEO Agent).
- **Design Adherence:** Generative UI cards MUST follow the Silverstone-Monaco hybrid style (Tech Noir: #0A0A0A base, #C4A35A gold accents).
- **Data Source:** Fetch real-time metrics from Supabase and external financial integrations via MCP.
- **Latency:** Prioritize stream start time to meet the <2s NFR.

### Project Structure Notes

- API Route: `src/app/api/mobile/query/route.ts`
- Agent Logic: `src/agents/ceo-agent.ts` (or similar existing agent location)
- UI Components: `src/components/telemetry-cards/`

### References

- [Source: _bmad-output/planning-artifacts/prd.md#Executive Oversight & Portfolio Management]
- [Source: _bmad-output/planning-artifacts/ux-design-specification.md#Platform Strategy]
- [Source: _bmad-output/planning-artifacts/architecture.md]

## Dev Agent Record

### Agent Model Used

gemini-2.0-pro-exp-02-05

### Debug Log References

### Completion Notes List

### File List
- _bmad-output/implementation-artifacts/1-6-mobile-oversight-nl-query-core.md
