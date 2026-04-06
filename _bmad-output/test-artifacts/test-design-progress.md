---
stepsCompleted: ['step-01-detect-mode', 'step-02-load-context', 'step-03-risk-and-testability', 'step-04-coverage-plan', 'step-05-generate-output']
lastStep: 'step-05-generate-output'
lastSaved: '2026-04-05'
inputDocuments:
  - _bmad-output/planning-artifacts/prd.md
  - _bmad-output/planning-artifacts/architecture.md
  - _bmad-output/planning-artifacts/epics.md
  - .gemini/skills/bmad-testarch-test-design/resources/knowledge/adr-quality-readiness-checklist.md
  - .gemini/skills/bmad-testarch-test-design/resources/knowledge/test-levels-framework.md
  - .gemini/skills/bmad-testarch-test-design/resources/knowledge/risk-governance.md
  - .gemini/skills/bmad-testarch-test-design/resources/knowledge/test-quality.md
  - .gemini/skills/bmad-testarch-test-design/resources/knowledge/playwright-cli.md
  - .gemini/skills/bmad-testarch-test-design/resources/knowledge/fixture-architecture.md
  - .gemini/skills/bmad-testarch-test-design/resources/knowledge/network-first.md
  - .gemini/skills/bmad-testarch-test-design/resources/knowledge/data-factories.md
  - .gemini/skills/bmad-testarch-test-design/resources/knowledge/probability-impact.md
  - .gemini/skills/bmad-testarch-test-design/resources/knowledge/test-priorities-matrix.md
  - .gemini/skills/bmad-testarch-test-design/resources/knowledge/test-healing-patterns.md
  - .gemini/skills/bmad-testarch-test-design/resources/knowledge/selector-resilience.md
  - .gemini/skills/bmad-testarch-test-design/resources/knowledge/overview.md
  - .gemini/skills/bmad-testarch-test-design/resources/knowledge/api-request.md
  - .gemini/skills/bmad-testarch-test-design/resources/knowledge/auth-session.md
---

# Step 1: Detect Mode & Prerequisites

## Mode Selection
- **Selected Mode**: System-Level Mode
- **Reasoning**: Both PRD/Architecture and Epic/Story documentation are available. Per BMad protocol, System-Level Mode is preferred to ensure holistic coverage of the application's functional requirements (21 FRs).

## Prerequisite Check
- [x] PRD: Found at `_bmad-output/planning-artifacts/prd.md`
- [x] Architecture/ADR: Found at `_bmad-output/planning-artifacts/architecture.md`
- [x] Tech Spec: Found at `_bmad-output/planning-artifacts/architecture.md`

# Step 2: Load Context & Knowledge Base

## Configuration
- `tea_use_playwright_utils`: `true`
- `detected_stack`: `fullstack` (Next.js 16)
- `test_artifacts`: `_bmad-output/test-artifacts`

## Loaded Artifacts
- PRD (21 Functional Requirements)
- Architecture (Vercel AI SDK, Workflows, Supabase Saga)
- Epic List (Epics 1-6)

## Loaded Knowledge Fragments
- **Core**: Fixture Architecture, Network-First, Data Factories, Risk Governance, Probability/Impact, Test Quality, Test Levels, Test Priorities, Test Healing, Selector Resilience, Playwright Utils Overview, API Request, Auth Session, Playwright CLI.
- **Extended**: ADR Quality Readiness Checklist.

# Step 3: Testability & Risk Assessment

## 1. System-Level Testability Review

### 🚨 Testability Concerns
- **AST Refactoring Integrity (FR20)**: Generating code via AST transformations is inherently complex. Testing requires a robust feedback loop that runs a full build/lint cycle on the *generated* code before it's considered "correct."
- **External System Dependencies (FR19)**: Autonomous cloning and PR management depend on GitHub's availability and rate limits. Testing needs a "Mock GitHub" or "Mock Git Server" to be hermetic and parallel-safe.
- **Durable Workflow Idempotency (FR9)**: Vercel Workflows are self-healing but testing their idempotency across 24h+ cycles requires specialized "time-traveling" test runners or simulated clock advances.
- **Agent Output Determinism (FR21/FR22)**: Natural language outputs from agents are non-deterministic. Testing requires "Model-Graded Evaluation" (using a stronger LLM like Gemini 2.0 Flash/Pro) to validate reasoning accuracy against the capability contract.

### ✅ Testability Assessment Summary
- **Controllability**: Strong. Supabase RLS and Next.js 16 modularity allow for clean state seeding and component-level isolation.
- **Observability**: Excellent. Built-in "Agent Reasoning Logs" (FR10) and "Durable Logic Traces" (FR9) provide high-fidelity introspection for automated assertions.
- **Reliability**: Multi-tenant isolation (FR2) provides a clear boundary for parallel safe test execution (one tenant per worker).

### Architecturally Significant Requirements (ASRs)
- **FR2: Multi-tenant isolation** [ACTIONABLE] - Must verify RLS and data leakage prevention.
- **FR11: Self-healing logic** [ACTIONABLE] - Requires fault injection testing (simulated network/API failures).
- **FR20: AST-based refactoring** [ACTIONABLE] - Requires 100% build-success validation.
- **FR10: Agent reasoning logs** [FYI] - Key observability point for debugging test failures.

## 2. Risk Assessment Matrix

| Category | Risk Description | Prob (1-3) | Imp (1-3) | Score | Action | Mitigation Strategy |
| :--- | :--- | :---: | :---: | :---: | :--- | :--- |
| **TECH** | **AST refactor breaks syntax** | 3 | 3 | **9** | **BLOCK** | Automated build/lint check in Vercel Workflows before PR creation. |
| **SEC** | **Tenant Data Leakage** | 1 | 3 | 3 | DOCUMENT | Monthly automated RLS audit; strict Supabase RLS testing in E2E. |
| **TECH** | **Agent Reasoning Hallucinations** | 3 | 2 | **6** | **MITIGATE** | Model-graded evaluation (Gemini 2.0 Flash) of agent reasoning steps. |
| **TECH** | **Workflow Idempotency Failure** | 2 | 2 | 4 | MONITOR | Durable execution monitoring; retry counters and dead-letter queues. |
| **OPS** | **GitHub API Rate Limiting** | 2 | 2 | 4 | MONITOR | Backoff strategies; cached blueprints; personal access token rotation. |
| **PERF** | **Dashboard "Pulse" Lag** | 2 | 1 | 2 | DOCUMENT | Visual regression tests on progressive ribbon rendering (FR7). |

## 3. Risk Findings Summary
- **Critical Path**: The **AST Refactoring Engine (FR20)** is the highest risk. Any failure here directly breaks the 24-hour client delivery promise. We must prioritize "Build-as-Validation" tests.
- **Safety Gate**: **Multi-tenant isolation (FR2)** is the primary security risk. We must implement cross-tenant leak detection tests.
- **Reliability**: **Agent Accuracy (FR21)** is high-probability risk. We will use model-graded evaluation to ensure the "Self-Operating Agency" doesn't provide incorrect business advice.

# Step 4: Coverage Plan & Execution Strategy

## 1. Coverage Matrix

| Requirement / Risk | Atomic Test Scenario | Level | Priority |
| :--- | :--- | :--- | :---: |
| **FR2: Isolation** | Verify Tenant A cannot query/read Tenant B's agent logs via API. | API/SQL | **P0** |
| **FR20: AST Engine** | Run AST refactor on complex Next.js 16 component and verify 100% build success. | Unit/API | **P0** |
| **FR1: Executive Auth** | Multi-factor login flow with tenant-locked session persistence. | E2E | **P0** |
| **FR19: Auto Cloning** | Clone private repo, inject secrets, modify via agent, and verify PR creation. | E2E/API | **P0** |
| **FR9: Durable Logic** | Simulate pod crash mid-workflow; verify Vercel Workflow self-heals/resumes. | API | **P1** |
| **FR17: Sync UI** | Verify terminal-style flicker feedback updates in real-time during AST jobs. | E2E | **P1** |
| **FR21: Service Desk** | Query knowledge base; use Gemini 2.0 Flash to grade agent response accuracy. | API (Eval) | **P1** |
| **FR4: HUD Routing** | Navigation between Agency Pulse, SkunkWorks Forge, and OpenClaw Bridge. | E2E | **P1** |
| **FR7: Pulse Ribbon** | Visual regression check on progressive ribbon rendering under dynamic state. | Component | **P2** |
| **FR12: Override** | Force pause/terminate a running durable workflow via Management Dashboard. | E2E | **P2** |
| **FR23: Idea Forge** | Persistence check for brainstorming sessions and automated tech assessments. | API | **P2** |
| **Risk: Pulse Lag** | Performance benchmark for dashboard rendering at 10 updates/second. | Perf | **P3** |

## 2. Execution Strategy

- **PR (CI Gate)**:
    - Mandatory: All **P0** scenarios.
    - Mandatory: All **Unit** and **API** tests for core logic.
    - Threshold: Must complete in < 10 minutes.
- **Nightly (Durable/Eval)**:
    - All **P1** and **P2** scenarios (Full UI flows, HUD navigation).
    - Model-graded evaluations for agent accuracy.
    - Long-running workflow idempotency checks.
- **Weekly (Audit/Perf)**:
    - **P3** Performance benchmarks and visual regression suites.
    - Automated RLS/Security audit of the Supabase schema.

## 3. Resource Estimates (Ranges)

- **P0 Implementation**: ~30–50 engineering hours.
- **P1 Implementation**: ~25–40 engineering hours.
- **P2 Implementation**: ~15–30 engineering hours.
- **P3 Implementation**: ~5–10 engineering hours.
- **Total Project Setup**: ~75–130 engineering hours.

## 4. Quality Gates

- **P0 Requirement**: 100% Pass Rate required for any deployment.
- **P1 Requirement**: ≥ 95% Pass Rate (exceptions must be documented/waived).
- **AST Integrity**: 100% Syntax validation / Build success required for refactored artifacts.
- **Security**: 0 Cross-tenant data leakage detected in automated API probes.
- **Coverage**: ≥ 85% of Functional Requirements (FR1-FR21) mapped to active automated tests.

# Step 5: Generate Outputs & Validate

## 🏁 Completion Report

- **Mode Used**: System-Level Mode (Holistic Dashboard Coverage)
- **Output Files**:
    - `_bmad-output/test-artifacts/test-design-architecture.md`
    - `_bmad-output/test-artifacts/test-design-qa.md`
    - `_bmad-output/test-artifacts/test-design/EngineAI Dashboard-handoff.md`
- **Key Risks Identified**:
    - AST Refactoring Engine Reliability (Score 9 - BLOCKER)
    - Agent Reasoning Hallucinations (Score 6 - MITIGATE)
- **Gate Thresholds**:
    - 100% Pass Rate for P0 scenarios (Isolation, AST, Auth).
    - 100% Build Success for all generated code artifacts.
- **Open Assumptions**:
    - Playwright can be seamlessly integrated into Vercel Workflow runtimes for build-as-validation probes.

**Test Design Phase Complete.** All artifacts are ready for review and implementation.
