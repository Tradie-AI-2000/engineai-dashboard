---
title: 'TEA Test Design → BMAD Handoff Document'
version: '1.0'
workflowType: 'testarch-test-design-handoff'
inputDocuments:
  - _bmad-output/test-artifacts/test-design-architecture.md
  - _bmad-output/test-artifacts/test-design-qa.md
sourceWorkflow: 'testarch-test-design'
generatedBy: 'TEA Master Test Architect'
generatedAt: '2026-04-05'
projectName: 'EngineAI Dashboard'
---

# TEA → BMAD Integration Handoff

## Purpose

This document bridges TEA's test design outputs with BMAD's epic/story decomposition workflow (`create-epics-and-stories`). It provides structured integration guidance so that quality requirements, risk assessments, and test strategies flow into implementation planning.

## TEA Artifacts Inventory

| Artifact | Path | BMAD Integration Point |
| :--- | :--- | :--- |
| Test Design Architecture | `_bmad-output/test-artifacts/test-design-architecture.md` | Architectural Significance, Testability Gaps |
| Test Design QA | `_bmad-output/test-artifacts/test-design-qa.md` | Story Acceptance Criteria, Priority Mapping |
| Progress Ledger | `_bmad-output/test-artifacts/test-design-progress.md` | Audit Trail, Context History |

## Epic-Level Integration Guidance

### Risk References
- **TECH-01 (AST Engine Reliability)**: Should be a core quality gate for Epic 4 (Industrial Automation).
- **SEC-01 (Tenant Isolation)**: Primary gate for Epic 1 (Executive Auth) and Epic 2 (Agent Lifecycle).
- **DATA-01 (Agent Accuracy)**: Gate for Epic 6 (Autonomous Ops) and Epic 5 (Knowledge Centre).

### Quality Gates
- **Epic 1 & 2**: Must pass unauthenticated probe tests (403 Forbidden checks).
- **Epic 4**: 100% build-success required for all refactored repo outputs.
- **Epic 6**: Model-graded evaluation score ≥ 0.85 for service desk responses.

## Story-Level Integration Guidance

### P0/P1 Test Scenarios → Story Acceptance Criteria
- **Story 1.2 (Executive Auth)**: Add AC: "Session must be tenant-locked; manual cookie injection from Tenant B must fail."
- **Story 2.1 (Task Ledger)**: Add AC: "Handoff envelopes must be schema-validated via @P1 API tests."
- **Story 4.3 (AST Engine)**: Add AC: "Any AST modification that fails `next build` must trigger an automatic workflow rollback."
- **Story 6.3 (Service Desk)**: Add AC: "Agent responses must pass automated fact-check eval via Gemini 2.0 Flash."

### Data-TestId Requirements
- **Progressive Ribbon (FR7)**: `data-testid="hud-pulse-ribbon"`
- **Agent Logs (FR10)**: `data-testid="agent-reasoning-step-{index}"`
- **Manual Override (FR12)**: `data-testid="force-kill-workflow"`

## Risk-to-Story Mapping

| Risk ID | Category | P×I | Recommended Story/Epic | Test Level |
| :--- | :--- | :---: | :--- | :--- |
| TECH-01 | TECH | 9 | Story 4.3 (AST Engine) | Unit/API |
| DATA-01 | DATA | 6 | Story 6.3 (Service Desk) | API (Eval) |
| SEC-01 | SEC | 3 | Story 1.2 (Auth) | API/SQL |
| OPS-01 | OPS | 4 | Story 4.2 (Cloning) | E2E |

## Recommended BMAD → TEA Workflow Sequence

1. **TEA Test Design** (`TD`) → produces this handoff document (COMPLETED)
2. **BMAD Create Epics & Stories** → consumes this handoff, embeds quality requirements
3. **TEA ATDD** (`AT`) → generates acceptance tests per story
4. **BMAD Implementation** → developers implement with test-first guidance
5. **TEA Automate** (`TA`) → generates full test suite
6. **TEA Trace** (`TR`) → validates coverage completeness

## Phase Transition Quality Gates

| From Phase | To Phase | Gate Criteria |
| :--- | :--- | :--- |
| Test Design | Epic/Story Creation | All P0 risks have mitigation strategy |
| Epic/Story Creation | ATDD | Stories have acceptance criteria from test design |
| ATDD | Implementation | Failing acceptance tests exist for all P0/P1 scenarios |
| Implementation | Test Automation | All acceptance tests pass |
| Test Automation | Release | Trace matrix shows ≥85% coverage of FRs |
