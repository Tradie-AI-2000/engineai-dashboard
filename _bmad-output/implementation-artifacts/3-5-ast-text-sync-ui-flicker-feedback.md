# Story 3.5: AST Text-Sync & UI Flicker Feedback

Status: in-progress

## Story

As a Founder-Orchestrator,
I want cinematic visual feedback during autonomous AST refactoring,
so that I can "feel" the system adapt and adapt the blueprint-to-instance repository.

## Acceptance Criteria

1. **"UI Flicker" effect implemented** using CSS animations and Framer Motion, triggered during simulated AST code transformations. [Source: ux-design-specification.md#Cinematic UI]
2. **AST-Sync status established** in the HUD displaying rapid-fire "Refactoring..." logs (e.g., "AST: Renaming Organisation constant"). [Source: prd.md#FR13]
3. **High-fidelity "Code Stream" animation** implemented within the HUD's active delivery cards. [Source: ux-design-specification.md#Cinematic UI]
4. **NZ English utilized** for all transformation logs (e.g., "Optimising Component", "Initialising Refactor").
5. **Responsiveness maintained** (<500ms) for the interaction layer, even during high-intensity visual feedback.

## Tasks / Subtasks

- [x] **Task 1: Flicker Animation System (AC: 1)**
  - [x] Create `FlickerOverlay.tsx` in `src/components/ui/`.
  - [x] Implement rapid opacity shifts and "Scan-line" noise using Framer Motion.
  - [x] Apply `z-index` layering to ensure the effect covers delivery cards during refactor.
- [x] **Task 2: Code Stream Visualization (AC: 3)**
  - [x] Create `CodeStream.tsx` in `src/components/ui/`.
  - [x] Implement a scrolling "Matrix-style" log generator for simulated AST changes.
  - [x] Use JetBrains Mono and `primary/80` coloring for the terminal aesthetic.
- [x] **Task 3: HUD Integration (AC: 2, 5)**
  - [x] Update `HUD.tsx` to handle global `isRefactoring` state for the demo.
  - [x] Integrate `FlickerOverlay` and `CodeStream` into the project delivery cards.
  - [x] Implement "AST Text-Sync" pulsing indicator in the HUD header.
- [x] **Task 4: Transformation Metadata (AC: 4)**
  - [x] Establish `REFACTOR_LOGS` with NZ English terminology (e.g., "Optimising", "Initialising").
  - [x] Add "AST DEBUG" toggle to HUD footer for manual UI verification.

## Dev Notes

- **Cinematic UI:** The flicker and code-stream animations are designed to provide high-impact visual feedback, making the autonomous system feel "Alive" and active.
- **AST Feedback:** These visuals represent the FR13 requirement for AST-based refactoring oversight, translating complex backend transformations into human-digestible pulses.
- **Performance:** Verified that high-frequency opacity animations do not degrade interaction responsiveness (<500ms).

### Project Structure Notes

- **UI Primitives:** `FlickerOverlay` and `CodeStream` established as cockpit visual decorators.
- **Feature Logic:** Refactoring simulation logic integrated into the main HUD loop.

### References

- [Source: prd.md] - FR13: AST-based Refactoring.
- [Source: ux-design-specification.md] - Cinematic UI & Design tokens.
- [Source: BRAND.md] - Color and Font tokens.

## Dev Agent Record

### Agent Model Used

Gemini 2.5 Flash

### Debug Log References

- Build successful: 5/5 pages verified with complex animation layering.
- Console logs confirmed for "AST Text-Sync Active" signals.

### Completion Notes List

- UI Flicker effect implemented with scan-line noise.
- Terminal-style Code Stream visualization established.
- HUD integration for real-time refactor status completed.
- NZ English verified across all transformation logs.

### Review Findings

- [x] [Review][Patch] Runtime Safety: Added empty-array guards to CodeStream random log generator.
- [x] [Review][Patch] Visual Polish: Increased `z-index` of FlickerOverlay to ensure total HUD coverage during refactor pulses.
- [x] [Review][Patch] Data Integrity: Implemented robust date parsing and fallback for "Last Context Sync" to prevent "Invalid Date" errors.
- [x] [Review][Patch] UI Stability: Refined project name parsing from task titles with explicit null-guards.
- [x] [Review][Patch] Performance: Improved React key strategy in CodeStream to prevent unnecessary animation resets.

Status: done
