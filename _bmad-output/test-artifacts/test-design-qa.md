---
stepsCompleted: ['step-01-detect-mode', 'step-02-load-context', 'step-03-risk-and-testability', 'step-04-coverage-plan', 'step-05-generate-output']
lastStep: 'step-05-generate-output'
lastSaved: '2026-04-05'
workflowType: 'testarch-test-design'
inputDocuments:
  - _bmad-output/planning-artifacts/prd.md
  - _bmad-output/planning-artifacts/architecture.md
  - _bmad-output/planning-artifacts/epics.md
---

# Test Design for QA: EngineAI Dashboard (System-Level)

**Purpose:** Test execution recipe for QA team. Defines what to test, how to test it, and what QA needs from other teams.

**Date:** 2026-04-05
**Author:** Gemini CLI (TEA Specialist)
**Status:** Draft
**Project:** EngineAI Dashboard

**Related:** See Architecture doc (`test-design-architecture.md`) for testability concerns and architectural blockers.

---

## Executive Summary

**Scope:** Comprehensive functional and non-functional testing of the EngineAI Dashboard (Epics 1-6), focusing on multi-tenant security, agent orchestration accuracy, and autonomous refactoring reliability.

**Risk Summary:**
- Total Risks: 6 (2 high-priority score ≥6, 2 medium, 2 low)
- Critical Categories: TECH (AST Engine), SEC (Isolation), DATA (Agent Evals)

**Coverage Summary:**
- P0 tests: 4 (critical paths, security, isolation)
- P1 tests: 4 (agent reasoning, UI feedback, navigation)
- P2 tests: 3 (manual override, brainstorming persistence)
- P3 tests: 1 (dash rendering performance)
- **Total**: ~12 core automated scenarios (~2-3 weeks setup)

---

## Not in Scope

**Components or systems explicitly excluded from this test plan:**

| Item | Reasoning | Mitigation |
| :--- | :--- | :--- |
| **3rd-party LLM Downtime** | Out of project control. | Mock LLM responses for functional tests. |
| **Raw Git Performance** | Infrastructure-level; focus is on automation logic. | Baseline check during weekly perf. |

---

## Dependencies & Test Blockers

**CRITICAL:** QA cannot proceed without these items from other teams.

### Backend/Architecture Dependencies (Pre-Implementation)

1. **AST-001 (Syntax Validation Endpoint)** - Dev Team - P0 Setup
   - Need a way to run `eslint` or `tsc` on stringified code produced by agents.
   - Without this, FR20 testing is non-deterministic.

2. **GIT-001 (Mock Git Provider)** - DevOps/Arch - P0 Setup
   - Need a way to run repo-cloning tests in parallel without API rate limits.
   - Blocks automated PR flow verification.

### QA Infrastructure Setup (Pre-Implementation)

1. **Test Data Factories** - QA
   - `Tenant` factory (Supabase project mapping).
   - `Agent` factory (Capability profile mapping).
   - `Workflow` factory (Durable job state).

2. **Test Environments**
   - Local: Next.js dev server + Supabase local emulator.
   - CI/CD: Vercel Preview Deployments + Supabase Branching.

---

## Entry Criteria

- [ ] Requirements (21 FRs) confirmed as stable.
- [ ] Supabase local emulator configured for RLS testing.
- [ ] Playwright Utils (`@seontechnologies/playwright-utils`) installed.
- [ ] Pre-implementation blockers (AST-001, GIT-001) resolved.

## Exit Criteria

- [ ] 100% P0 tests passing.
- [ ] ≥ 95% P1 tests passing.
- [ ] 0 Cross-tenant data leaks detected.
- [ ] 100% Build success on generated AST artifacts.

---

## Test Coverage Plan

### P0 (Critical)

| Test ID | Requirement | Test Level | Risk Link | Notes |
| :--- | :--- | :--- | :--- | :--- |
| **P0-001** | FR2: Isolation | API/SQL | SEC-01 | Attempt cross-tenant read via agent-logs API. |
| **P0-002** | FR20: AST Engine | API/Unit | TECH-01 | Input complex JSX; verify output build success. |
| **P0-003** | FR1: Auth | E2E | SEC-01 | MFA login flow; verify session tenant lock. |
| **P0-004** | FR19: Auto Clone | E2E/API | OPS-01 | Clone, modify, PR cycle verification. |

### P1 (High)

| Test ID | Requirement | Test Level | Risk Link | Notes |
| :--- | :--- | :--- | :--- | :--- |
| **P1-001** | FR9: Durable Logic | API | TECH-02 | Pod crash simulation; verify workflow recovery. |
| **P1-002** | FR10: Logs | API | DATA-01 | Verify thought-loop persistence and schema. |
| **P1-003** | FR17: Sync UI | E2E | PERF-01 | Terminal flicker feedback real-time updates. |
| **P1-004** | FR21: Service Desk | API (Eval) | DATA-01 | Grade agent accuracy using Gemini 2.0 Flash. |

---

## Execution Strategy

### Every PR: Playwright Functional (~8 min)
- All **P0** and **P1** API/Unit tests.
- Smoke E2E (Auth, Navigation).
- Total: ~10 tests.

### Nightly: Full Suite & Evals (~45 min)
- Full E2E UI flows (HUD, Service Desk).
- Model-graded evaluations (Agent reasoning).
- Workflow idempotency stress tests.

---

## QA Effort Estimate

| Priority | Count | Effort Range | Notes |
| :--- | :---: | :--- | :--- |
| P0 | 4 | ~1 week | Security/AST validation is complex. |
| P1 | 4 | ~1 week | Workflow/Eval setup. |
| P2/P3 | 4 | ~3 days | UI/Perf benchmarks. |
| **Total** | **12** | **~2.5 weeks** | **1 QA specialist** |

---

## Appendix A: Playwright Tagging Strategy

```typescript
// Example P0 Test with Isolation Check
test('@P0 @Security verify tenant isolation', async ({ apiRequest }) => {
  const { status } = await apiRequest({
    method: 'GET',
    path: '/api/agent-logs',
    params: { tenantId: 'target-tenant-id' }, // Attacker tenant ID
    headers: { 'X-Tenant-ID': 'attacker-tenant-id' }
  });
  expect(status).toBe(403); // Forbidden
});
```

**Run specific tags:**
- `npx playwright test --grep @P0`
- `npx playwright test --grep @Security`

---

**Generated by:** BMad TEA Agent
**Workflow:** `bmad-testarch-test-design`
**Version:** 4.0 (BMad v6)
