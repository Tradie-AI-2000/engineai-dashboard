# Story 4.3: AST-based Code Refactoring Engine

Status: in-progress

## Story

As an Autonomous Engineer,
I want an AST-based refactoring engine to adapt repository blueprints for client instances,
so that I can ensure 100% syntax validity during automated "Fill-in-the-Blanks" transformations.

## Acceptance Criteria

1. **`ts-morph` integration established** allowing the agent to parse and modify TypeScript files via AST. [Source: architecture.md#Industrial Automation]
2. **"Fill-in-the-Blanks" logic implemented** where specific blueprint placeholders (e.g., `ORG_NAME`, `CLIENT_ID`) are replaced with client metadata. [Source: prd.md#FR13]
3. **100% Syntax Validity guaranteed** by using AST transformations rather than regex for all structural code changes. [Source: prd.md#FR13]
4. **NZ English utilized** for all transformation logs and resulting code comments (e.g., "Optimising client configuration").
5. **HUD Updated** to show real-time "AST Refactor" status and progress logs. [Source: Story 3.5]

## Tasks / Subtasks

- [x] **Task 1: AST Engine Infrastructure (AC: 1)**
  - [x] Install and configure `ts-morph` for high-fidelity code parsing.
  - [x] Implement `src/lib/ast-engine.ts` with `Project` and `SourceFile` utilities.
- [x] **Task 2: Transformation Logic (AC: 2, 3)**
  - [x] Implement `refactorBlueprint` to dynamically update variable initialisers.
  - [x] Add automated JSDoc injection for NZ English code comments.
  - [x] Ensure pre-emit diagnostics check for 100% syntax validity before saving.
- [x] **Task 3: Integration with Agent Loop (AC: 2, 5)**
  - [x] Update `src/app/api/workflows/agent-loop/route.ts` to include an "AST Sync" durable step.
  - [x] Map real-time transformation progress to the `task_ledger` for HUD visualization.
- [x] **Task 4: Quality & Linguistic Check (AC: 4)**
  - [x] Verify NZ English usage across all generated comments and logs (e.g., "Optimising", "Initialising").
  - [x] Implement error handling for "AST FAILURE" scenarios.

## Dev Notes

- **Type Safety:** By using `ts-morph` instead of regex, we guarantee that code transformations respect the underlying TypeScript structure, preventing broken syntax in automated PRs.
- **Workflow Orchestration:** The "AST Sync" step occurs after the "Validation Guard", ensuring only vetted technical specs are passed to the refactoring engine.
- **Linguistic Standards:** Refined the `addJsDoc` logic to correctly traverse from `VariableDeclaration` to `VariableStatement` to satisfy the TypeScript compiler.

### Project Structure Notes

- **Automation:** AST Engine logic centralized in `src/lib/ast-engine.ts`.
- **Workflow:** `agent-loop` expanded to a 4-step industrial cycle.

### References

- [Source: prd.md] - FR13: AST-based Refactoring.
- [Source: architecture.md] - Industrial Automation & Tech Noir patterns.
- [Source: Story 3.5] - AST visual feedback.

## Dev Agent Record

### Agent Model Used

Gemini 2.5 Flash

### Debug Log References

- Build successful: 6/6 pages verified.
- TS Morph pre-emit diagnostics confirmed working for syntax validation.

### Completion Notes List

- AST refactoring engine implemented with ts-morph.
- 100% syntax validity check integrated into the transformation loop.
- Automated JSDoc generation established.
- HUD "AST Sync" logs connected to real workflow progress.

### Review Findings

- [x] [Review][Patch] Syntax Safety: Refactored `setInitializer` to use `JSON.stringify`, preventing broken syntax from quotes in AI output.
- [x] [Review][Patch] File System: Added recursive `mkdirSync` to ensure blueprint placeholders can be created in new directories.
- [x] [Review][Patch] Reliability: Refactored SAGA catch block to safely handle non-Error objects and missing payload fields.
- [x] [Review][Patch] Explicit Failure: Updated variable mapping to throw an error if a target constant is missing from the blueprint (AC 2).

Status: done
