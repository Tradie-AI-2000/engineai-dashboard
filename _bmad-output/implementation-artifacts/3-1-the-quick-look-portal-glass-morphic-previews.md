---
story_id: 3.1
story_key: 3-1-the-quick-look-portal-glass-morphic-previews
epic_id: 3
title: The Quick-Look Portal (Glass-morphic Previews)
status: ready-for-dev
date: 2026-04-05
author: Gemini CLI
---

# Story 3.1: The Quick-Look Portal (Glass-morphic Previews)

## User Story
**As a Founder-Orchestrator,**
**I want** in-dashboard, glass-morphic previews of agent-generated artifacts,
**So that** I can verify quality in seconds without context-switching to external tools (UX-DR7).

## Acceptance Criteria

### 1. Glass-morphic Overlay Component
- **Given** a project in the "War Room" view
- **When** I click a completed or active stage on the Progressive Ribbon
- **Then** a semi-transparent, glass-morphic overlay displays the artifact's content (Markdown, Code, or SOW)
- **And** the overlay maintains high contrast and follows the Tech Noir aesthetic (Background: `#0A0A0A` at low opacity, Accent: `#C4A35A`)
- **And** the overlay includes a blur effect (e.g., `backdrop-blur-md`) to ensure legibility over the dense dashboard background.

### 2. Artifact Content Rendering
- **Given** the `QuickLookPortal` component
- **When** an artifact is selected for preview
- **Then** Markdown content is rendered with clean typography (Inter/JetBrains Mono)
- **And** Code artifacts are displayed with syntax highlighting (e.g., using `react-syntax-highlighter` or similar)
- **And** Scope of Work (SOW) or other structured documents are formatted for high readability.

### 3. Surgical Portal Deep-link
- **Given** the preview overlay is active
- **When** I view an artifact
- **Then** a "Surgical Portal" link is visible
- **And** clicking the link opens the source asset directly (e.g., in a dedicated editor view or external tool) for manual intervention.

### 4. High-Fidelity Interaction
- **Given** the War Room dashboard
- **When** I toggle the preview
- **Then** the transition is smooth (e.g., 200ms fade-in/out)
- **And** the preview can be dismissed by clicking outside or via a dedicated "Close" trigger.

## Developer Context & Guardrails

### Technical Requirements
- **Frontend:** Next.js 16, Tailwind CSS.
- **Styling:** Strictly follow `BRAND.md` and `DESIGN.md`. Use Vanilla CSS or Tailwind utility classes for the glass-morphic effect.
- **Components:** Integrate with the existing `ProgressiveRibbon` and `QuickLookPortal` (if partially implemented).

### Architecture Compliance
- **UX-DR7:** Minimize context-switching by providing high-fidelity previews.
- **Tech Noir Aesthetic:** High-density HUD style with gold accents and dark, semi-transparent backgrounds.

### File Structure Requirements
- `src/components/ui/QuickLookPortal.tsx`: Core component for the preview overlay.
- `src/features/cockpit/HUD.tsx`: Integration point for the preview system.

## Testing Requirements
- **Visual Regression:** Ensure the glass-morphic effect looks consistent across different backgrounds.
- **Content Rendering:** Verify that Markdown and Code artifacts render correctly within the overlay.
- **Link Functionality:** Confirm the "Surgical Portal" deep-link directs to the correct resource.

## Status
- **Status:** `ready-for-dev`
- **Context:** This is the first story in Epic 3, focusing on the visual verification layer.

### Review Findings

#### Patches
- [x] [Review][Patch] Hardcoded Brand Colors and Tokens [src/components/ui/QuickLookPortal.tsx]
- [x] [Review][Patch] Broken Portal Hover Logic [src/features/cockpit/Sidebar.tsx]
- [x] [Review][Patch] Hardcoded Language for Syntax Highlighter [src/components/ui/QuickLookPortal.tsx:84]
- [ ] [Review][Patch] Non-functional Surgical Portal Link [src/components/ui/QuickLookPortal.tsx:112]
- [x] [Review][Patch] Backdrop Blur Value Mismatch [src/components/ui/QuickLookPortal.tsx:26]
- [ ] [Review][Patch] Performance: Heavy Dependencies in UI Component [src/components/ui/QuickLookPortal.tsx]
- [ ] [Review][Patch] Missing ARIA Roles and Accessibility [src/components/ui/QuickLookPortal.tsx]
- [ ] [Review][Patch] Magic Z-index [src/components/ui/QuickLookPortal.tsx:26]

#### Deferred
- [x] [Review][Defer] Portal Position Stale on Resize [src/features/cockpit/Sidebar.tsx] — deferred, pre-existing
- [x] [Review][Defer] Hardcoded "Optimal" System Health [src/components/ui/QuickLookPortal.tsx:55] — deferred, pre-existing

