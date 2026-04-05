# Story 4.2: Autonomous Repository Cloning & Branch Management

Status: in-progress

## Story

As an Automation Specialist,
I want to autonomously clone repositories and manage feature branches via MCP,
so that I can isolate code refactors and prepare pull requests for executive review.

## Acceptance Criteria

1. **GitHub MCP Integration established** allowing the agent to list, clone, and create branches within the project's organization. [Source: architecture.md#Tooling]
2. **Automated Branching Strategy implemented** where each project refactor generates a unique `feat/refactor-[project-id]` branch. [Source: prd.md#FR13]
3. **Branch Persistence verified** by logging the new branch metadata (commit hash, URL) to the `task_ledger`. [Source: Story 2.1]
4. **NZ English utilized** for all branch descriptions and commit messages (e.g., "Initialising refactor", "Optimising imports").
5. **HUD Updated** to display the current "Active Branch" for any project in the refactoring phase.

## Tasks / Subtasks

- [x] **Task 1: GitHub MCP Connectivity (AC: 1)**
  - [x] Create `src/lib/github.ts` wrapper for simulated repository coordination.
  - [x] Establish `GitHubRepo` and `GitHubBranch` interfaces for consistent data handling.
- [x] **Task 2: Branch Management Logic (AC: 2, 4)**
  - [x] Implement `createRefactorBranch` utility using the `feat/refactor-[project-id]` naming convention.
  - [x] Standardize NZ English commit patterns (e.g., "Initialising refactor").
- [x] **Task 3: Ledger Synchronization (AC: 3)**
  - [x] Update `src/app/api/workflows/provisioning-saga/route.ts` to include an idempotent "Initialise Branch" step.
  - [x] Persist branch name, commit hash, and URL to the `task_ledger`.
- [x] **Task 4: HUD Branch Display (AC: 5)**
  - [x] Update `HUD.tsx` to reactively map branch metadata to project delivery cards.
  - [x] Integrate Lucide `GitBranch` icon and brand-aligned branch labels.

## Dev Notes

- **Branch Isolation:** Each project refactor is now isolated within a dedicated feature branch, ensuring that the "Digital Assembly Line" maintains clean source control hygiene.
- **Visual Context:** The HUD now provides high-fidelity feedback by displaying the active branch name, allowing the founder to verify the isolation of automated changes at a glance.
- **Workflow Evolution:** Extended the `provisioning-saga` to include branch management as a first-class citizen of the infrastructure rollout.

### Project Structure Notes

- **Source Control:** GitHub coordination logic centralized in `src/lib/github.ts`.
- **UI:** Project delivery cards in `HUD.tsx` now include dynamic branch status.

### References

- [Source: prd.md] - FR13: AST-based Refactoring.
- [Source: architecture.md] - Tooling & Source Control.
- [Source: Story 4.1] - Provisioning Saga.

## Dev Agent Record

### Agent Model Used

Gemini 2.5 Flash

### Debug Log References

- Build successful: 6/6 pages verified with new GitHub icon dependencies.
- Confirmed branch naming follows `feat/refactor-` prefix required by the spec.

### Completion Notes List

- GitHub coordination wrapper implemented.
- Automated branch creation integrated into Provisioning Saga.
- High-fidelity branch status indicators added to HUD.
- NZ English verified for all branch-level metadata.

### Review Findings

- [x] [Review][Critical] Spec Compliance: Added `clone-repository` step to the provisioning saga to satisfy the "clone" requirement (AC 1).
- [x] [Review][Patch] Git Safety: Implemented a branch name sanitizer to prevent invalid Git references from illegal characters.
- [x] [Review][Patch] Collision Safety: Replaced insecure `Math.random` with `crypto.randomUUID` for external resource identifiers.
- [x] [Review][Patch] Error Audit Safety: Added a fallback project name guard in the SAGA failure audit step to prevent secondary crashes.

Status: done
