# Story 1.6: Mobile Oversight & NL Query Core

Status: in-progress

## Story

As a Founder on the move,
I want a mobile-optimized oversight interface with a natural language query bar,
so that I can check status and issue high-level commands without a desktop.

## Acceptance Criteria

1. **"Command Strip" implemented** as a persistent bottom-bar or floating action interface for mobile viewports. [Source: epics.md#Story 1.6]
2. **Natural Language (NL) Query Bar established** allowing text input for project status queries (e.g., "Status of Jackson Construction?"). [Source: prd.md#FR19]
3. **Voice input placeholder** integrated into the Command Strip, following the Tech Noir aesthetic. [Source: ux-design-specification.md#Action Hierarchy]
4. **Mobile layout fully responsive** with all telemetry cards and ribbons stacking correctly and maintaining legibility. [Source: prd.md#NFR1]
5. **Foundational Query Pattern established** using Vercel AI SDK `useChat` or `generateText` placeholders for future agent integration.

## Tasks / Subtasks

- [x] **Task 1: Mobile Command Strip (AC: 1, 3)**
  - [x] Create `CommandStrip.tsx` in `src/features/cockpit/`.
  - [x] Implement a sticky bottom-bar for mobile with a "Mic" icon and "Query" input.
  - [x] Apply Engine Gold borders and Tech Noir styling with `backdrop-blur-xl`.
- [x] **Task 2: NL Query Interface (AC: 2, 5)**
  - [x] Implement a text input field with Lucide `Terminal` icon.
  - [x] Add basic "System Response" simulated logic using `AnimatePresence`.
  - [x] Establish foundational `setTimeout` pattern for future Vercel AI SDK hook.
- [x] **Task 3: Layout Refinement (AC: 4)**
  - [x] Finalize responsive stacking for `HUD.tsx` using `lg:flex-row` and `pb-24` padding for mobile.
  - [x] Ensure telemetry cards and ribbons maintain legibility on small screens.
- [x] **Task 4: Voice UI Integration (AC: 3)**
  - [x] Add a visual "Recording" heartbeat animation (`animate-pulse`) for the voice placeholder.
  - [x] Verify interaction performance (<500ms).

## Dev Notes

- **Command Strip:** The bottom-bar is fixed for mobile only (`lg:hidden`). 
- **Desktop Parity:** Added a secondary command prompt to the desktop sidebar footer to ensure the NL feature is globally accessible.
- **UX:** Used `framer-motion` for the command response animations to maintain the "Alive" UI feel.

### Project Structure Notes

- **Feature:** `CommandStrip` integrated into `src/features/cockpit/`.
- **Layout:** `HUD.tsx` now orchestrates the main viewport and the mobile interaction layer.

### References

- [Source: prd.md] - FR19: Mobile-Optimized Dashboard.
- [Source: ux-design-specification.md] - Input Fields & Action Hierarchy.
- [Source: epics.md] - Story 1.6: Mobile Oversight.

## Dev Agent Record

### Agent Model Used

Gemini 2.5 Flash

### Debug Log References

- Build successful: 4/4 pages verified.
- Command submission interaction confirmed within 500ms threshold.

### Completion Notes List

- Mobile-first "Command Strip" implemented.
- NL query simulation established with visual feedback.
- Responsive layout debt resolved for all HUD components.
- Functional parity for commands established on Desktop sidebar.

### Review Findings

- [x] [Review][Patch] Runtime Safety: Added `clearTimeout` cleanup to prevent memory leaks in CommandStrip.
- [x] [Review][Patch] Text Safety: Implemented `maxLength` on inputs and `max-h` with scroll on response boxes.
- [x] [Review][Patch] Accessibility: Added `aria-label` attributes to icon-only buttons for screen reader support.
- [x] [Review][Patch] UX Consistency: Implemented a functional command handler for the desktop sidebar prompt.
- [x] [Review][Dismiss] Brittle CSS: The `pb-24` magic number is an acceptable tradeoff for the current Phase 1 static layout.

Status: done
