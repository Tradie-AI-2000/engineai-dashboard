# EngineAI Dashboard - Design Specification (Tech Noir HUD)

## 1. Vision: The Executive Cockpit
The dashboard is an "Operational Nervous System" for high-stakes business orchestration. It should feel like a high-density, real-time command center—precise, glowing, and information-rich.

## 2. Visual Theme: Tech Noir
- **Background:** Deep `#0A0A0A` with a subtle 145-degree gradient.
- **Accents:** Engine Gold (`#C4A35A`) used for "Active Pulse" states and primary actions.
- **Glass-morphism:** Use `backdrop-blur-2xl` and semi-transparent `card-bg` (`rgba(12, 12, 12, 0.84)`) for HUD overlays.
- **Atmosphere:** Ambient grid overlays and "blur blobs" to create depth without visual noise.

## 3. Interaction Patterns
- **The Progressive Ribbon:** A segmented horizontal track that pulses in Engine Gold when an agent is active. Transitions to "Control Slate" (muted gray) during manual overrides.
- **High-Density Telemetry:** Use JetBrains Mono for all numeric data and agent reasoning logs to signal technical precision.
- **Surgical Lock:** Visual borders glow gold when the system is in autonomous mode and shift to a static white border when under human control.

## 4. Typography Hierarchy
- **Executive Summaries:** Inter (Light weight) with negative tracking for a cinematic feel.
- **Operational Data:** JetBrains Mono (Regular) for all tool-calls, logs, and financial metrics.
- **Command Strip:** JetBrains Mono (Uppercase, wide tracking) for one-touch triggers.

## 5. UI Components
- **Buttons:** Rounded-full (pill) shape. Gold background for "Commit/Approve", ghost/glass for "Interrogate/Review".
- **Cards:** Large radius (1.75rem) with subtle borders (`white/[0.07]`).
- **Audit Logs:** Monospace-first, scrollable vertical tracks with color-coded handoff status (Gold = Active, White = Completed, Red = Risk).
