# Story 6.4: IT Infrastructure Support Agent

Status: in-progress

## Story

As an Automated Agency,
I want a specialized IT Support Agent to monitor and diagnose infrastructure health,
so that I can ensure 100% operational uptime for the "Digital Assembly Line."

## Acceptance Criteria

1. **IT Support Agent implemented** as a specialized agent class or workflow step capable of analyzing system health telemetry. [Source: epics.md#Story 6.4]
2. **Infrastructure Health workflow established** where the agent periodically checks Vercel, Supabase, and GitHub status (simulated). [Source: prd.md#FR1]
3. **Health Metrics persisted** to the `task_ledger` including response latencies and service availability. [Source: Story 2.1]
4. **NZ English utilized** for all technical diagnostics and system logs (e.g., "Synchronising Infrastructure", "Optimising Latency").
5. **HUD Updated** to display a "System Health" telemetry card driven by real IT Agent data. [Source: Story 1.3]

## Tasks / Subtasks

- [x] **Task 1: IT Agent Logic (AC: 1, 2)**
  - [x] Implement `src/app/api/workflows/it-support/route.ts` using `@upstash/workflow`.
  - [x] Integrate `generateObject` with Gemini 2.0 Flash for structured infrastructure auditing.
  - [x] Simulate status checks for Vercel, Supabase, and GitHub with automated latency calculations.
- [x] **Task 2: Health Persistence (AC: 3)**
  - [x] Establish the `IT_HEALTH` task type for persistent system health logging.
  - [x] Ensure health records are isolated via multi-tenant RLS in the `task_ledger`.
- [x] **Task 3: HUD Health Integration (AC: 5)**
  - [x] Update `HUD.tsx` to memoize and map the "System Health" telemetry card to real IT Agent data.
  - [x] Implement visual status mapping for `OPTIMAL` (nominal), `DEGRADED` (warning), and `CRITICAL` (critical) states.
- [x] **Task 4: Quality & NZ English Check (AC: 4)**
  - [x] Verify NZ English usage across all IT diagnostics (e.g., "Synchronising", "Initialising").
  - [x] Implement high-fidelity "System Integrity Verified" audit logs.

## Dev Notes

- **Autonomous Maintenance:** The IT Support Agent provides a critical background layer for the self-operating agency, ensuring that technical dependencies are healthy before orchestration proceeds.
- **Dynamic Telemetry:** The "System Health" HUD card is now data-driven, transitioning from a static placeholder to a live reflection of the latest infrastructure audit.
- **Visual Fidelity:** Leveraged the project's existing `TelemetryCard` status props to provide cinematic feedback for degraded system states.

### Project Structure Notes

- **Workflow:** `it-support` added to the industrial maintenance suite.
- **HUD:** Telemetry mapping logic expanded to handle specialized health payloads.

### References

- [Source: prd.md] - FR1: Real-time Orchestration.
- [Source: architecture.md] - Durable Logic & Tooling.
- [Source: Story 1.3] - Global Pulse HUD.

## Dev Agent Record

### Agent Model Used

Gemini 2.5 Flash

### Debug Log References

- Build successful: 14/14 pages verified.
- Telemetry mapping confirmed to correctly handle the `IT_HEALTH` task type.

### Completion Notes List

- IT Support Agent workflow implemented with durable steps.
- Real-time infrastructure health persistence established.
- HUD system health card integrated with dynamic agent data.
- NZ English verified across all technical diagnostics.

### File List

- src/app/api/workflows/it-support/route.ts
- src/features/cockpit/HUD.tsx

Status: done
