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

# Test Design for Architecture: EngineAI Dashboard (System-Level)

**Purpose:** Architectural concerns, testability gaps, and NFR requirements for review by Architecture/Dev teams. Serves as a contract between QA and Engineering on what must be addressed before test development begins.

**Date:** 2026-04-05
**Author:** Gemini CLI (TEA Specialist)
**Status:** Architecture Review Pending
**Project:** EngineAI Dashboard
**PRD Reference:** `_bmad-output/planning-artifacts/prd.md`
**ADR Reference:** `_bmad-output/planning-artifacts/architecture.md`

---

## Executive Summary

**Scope:** Full operational dashboard for the EngineAI Self-Operating Agency, covering hierarchical agent orchestration, durable logic pipelines, and autonomous repository management.

**Business Context** (from PRD):
- **Revenue/Impact:** High. Operational nervous system for the "Business in a Box" (BIAB) model.
- **Problem:** Manual founder-led tasks limit scalability; requires autonomous orchestration via a digital assembly line.
- **GA Launch:** Target implementation complete (Epics 1-6 done).

**Architecture** (from ADR):
- **Key Decision 1:** Vercel AI SDK v6 for agent orchestration and built-in tool loops.
- **Key Decision 2:** Vercel Workflows for durable, self-healing logic (>24h pipelines).
- **Key Decision 3:** Supabase Saga pattern for distributed transactions and multi-tenant isolation.

**Expected Scale**:
- SME client scale (50+ concurrent provisioning jobs, multi-tenant).

**Risk Summary:**
- **Total risks**: 6
- **High-priority (≥6)**: 2 risks requiring immediate mitigation (AST Integrity, Agent Hallucination).
- **Test effort**: ~15-20 core automated scenarios (~2-3 weeks for implementation).

---

## Quick Guide

### 🚨 BLOCKERS - Team Must Decide (Can't Proceed Without)

**Pre-Implementation Critical Path** - These MUST be completed before QA can write integration tests:

1. **AST-001: Automated Build/Lint Endpoint** - Architecture must provide a way to trigger a `next build` or `eslint` check on *generated* code artifacts within the Vercel Workflow environment. (Owner: Dev Lead)
2. **GIT-001: Mock GitHub Provider** - A hermetic way to simulate repository cloning, secret injection, and PR creation without hitting GitHub API rate limits. (Owner: Architect)

**What we need from team:** Complete these 2 items pre-implementation or test development for the critical path (FR19/FR20) is blocked.

---

### ⚠️ HIGH PRIORITY - Team Should Validate (We Provide Recommendation, You Approve)

1. **RLS-001: Tenant Isolation Probes** - We recommend a suite of automated SQL/API probes that attempt cross-tenant reads to validate Supabase RLS. (Approve: Architect)
2. **EVAL-001: Model-Graded Evaluation** - We recommend using Gemini 2.0 Flash to grade agent reasoning logs against the capability contract. (Approve: PM)

**What we need from team:** Review recommendations and approve.

---

### 📋 INFO ONLY - Solutions Provided (Review, No Decisions Needed)

1. **Test strategy**: 60% API/SQL (Isolation, Logic), 30% E2E (HUD Navigation, Auth), 10% Component (Visuals).
2. **Tooling**: Playwright + Playwright Utils (@seontechnologies), Gemini 2.0 Flash for Evals.
3. **Tiered CI/CD**: PR (P0/Functional), Nightly (Evals/Durable), Weekly (Perf/Audit).
4. **Coverage**: 21 Functional Requirements mapped to risk-based scenarios.
5. **Quality gates**: 100% P0 pass rate; 100% build success on AST artifacts.

**What we need from team:** Just review and acknowledge.

---

## For Architects and Devs - Open Topics 👷

### Risk Assessment

**Total risks identified**: 6 (2 high-priority score ≥6, 2 medium, 2 low)

#### High-Priority Risks (Score ≥6) - IMMEDIATE ATTENTION

| Risk ID | Category | Description | Probability | Impact | Score | Mitigation | Owner | Timeline |
| :--- | :--- | :--- | :---: | :---: | :---: | :--- | :--- | :--- |
| **TECH-01** | **TECH** | **AST refactor breaks syntax** | 3 | 3 | **9** | Automated build/lint check in Vercel Workflows before PR creation. | Dev Lead | Immediate |
| **DATA-01** | **DATA** | **Agent Reasoning Hallucinations** | 3 | 2 | **6** | Model-graded evaluation (Gemini 2.0 Flash) of agent reasoning steps. | PM | Next Sprint |

#### Medium-Priority Risks (Score 3-5)

| Risk ID | Category | Description | Probability | Impact | Score | Mitigation | Owner |
| :--- | :--- | :--- | :---: | :---: | :---: | :--- | :--- |
| OPS-01 | OPS | GitHub API Rate Limiting | 2 | 2 | 4 | Backoff strategies; cached blueprints; token rotation. | DevOps |
| TECH-02 | TECH | Workflow Idempotency Failure | 2 | 2 | 4 | Durable execution monitoring; retry counters. | Dev Lead |

#### Low-Priority Risks (Score 1-2)

| Risk ID | Category | Description | Probability | Impact | Score | Action |
| :--- | :--- | :--- | :---: | :---: | :---: | :--- |
| SEC-01 | SEC | Tenant Data Leakage | 1 | 3 | 3 | Monthly automated RLS audit. | Architect |
| PERF-01 | PERF | Dashboard "Pulse" Lag | 2 | 1 | 2 | Monitor visual regression. | QA |

---

### Testability Concerns and Architectural Gaps

**🚨 ACTIONABLE CONCERNS - Architecture Team Must Address**

#### 1. Blockers to Fast Feedback (WHAT WE NEED FROM ARCHITECTURE)

| Concern | Impact | What Architecture Must Provide | Owner | Timeline |
| :--- | :--- | :--- | :--- | :--- |
| **AST Validation** | Cannot verify FR20 reliability | POST /api/validate-syntax endpoint | Dev Lead | P0 Test Setup |
| **GitHub Sandbox** | Cannot run parallel cloning tests | Isolated test org or Git server mock | Architect | P0 Test Setup |

#### 2. Architectural Improvements Needed (WHAT SHOULD BE CHANGED)

1. **State Snapshotting**
   - **Current problem**: Vercel Workflows state is internal.
   - **Required change**: Expose a read-only debug endpoint for workflow state.
   - **Impact if not fixed**: Tests must wait for full lifecycle (slow).
   - **Owner**: Dev Lead
   - **Timeline**: P1 Test Setup

---

### Testability Assessment Summary

#### What Works Well
- ✅ **API-First Design**: Supabase and Vercel AI SDK provide clean entry points for automated testing.
- ✅ **Observability**: "Agent Reasoning Logs" (FR10) provide high-fidelity state for assertions.
- ✅ **Multi-Tenant Isolation**: Clear boundary for parallel safe test execution (one tenant per worker).

#### Accepted Trade-offs (No Action Required)
- **Manual 2FA Testing**: Automated 2FA bypass for test accounts is acceptable for Phase 1.
- **Workflow Speed**: Testing 24h+ pipelines via simulated clock advances is deferred; will use shortened cycles for now.

---

### Assumptions and Dependencies

#### Assumptions
1. Playwright can be installed and run in the Vercel Workflow environment if needed.
2. Supabase RLS policies are the primary defense against data leakage.

#### Dependencies
1. **Playwright Utils**: Required for API-first setup and token management.
2. **Gemini API Access**: Required for model-graded evaluations.

---

**End of Architecture Document**
