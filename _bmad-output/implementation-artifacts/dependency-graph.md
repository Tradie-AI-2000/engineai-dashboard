# Story Dependency Graph
_Last updated: 2026-04-06T15:30:00Z_

## Stories

| Story | Epic | Title | Sprint Status | Issue | PR | PR Status | Dependencies | Ready to Work |
|-------|------|-------|--------------|-------|----|-----------|--------------|---------------|
| 1.1   | 1    | Project Scaffolding & Tech Noir Theme | done | — | 1 | merged | none | ✅ Yes |
| 1.2   | 1    | Secure Executive Auth & Multi-tenant Isolation | done | — | 2 | merged | 1.1 | ✅ Yes |
| 1.3   | 1    | The Global Pulse (Monaco Layout) | done | — | 4 | merged | 1.2 | ✅ Yes |
| 1.4   | 1    | Division Routing & KPI Dashboards | done | — | 3 | merged | 1.3 | ✅ Yes |
| 1.5   | 1    | The Progressive Ribbon (Visualization) | done | — | 5 | merged | 1.4 | ✅ Yes |
| 1.6   | 1    | Mobile Oversight (NL Query Core) | done | — | 6 | merged | 1.5 | ✅ Yes |
| 2.1   | 2    | The Task Ledger & Handoff Envelope Schema | done | — | 9 | merged | epic 1 | ✅ Yes |
| 2.2   | 2    | Vercel Workflows Pipeline (The 2-Agent Loop) | done | — | 8 | merged | 2.1 | ✅ Yes |
| 2.3   | 2    | Audit Drill-down & Agent Reasoning Logs | done | — | 7 | merged | 2.2 | ✅ Yes |
| 2.4   | 2    | The Supervisor (SRE Agent) & Self-Healing Logic | done | — | 11 | merged | 2.3 | ✅ Yes |
| 2.5   | 2    | Manual Override (Pause/Terminate) Protocol | done | — | 10 | merged | 2.4 | ✅ Yes |
| 3.1   | 3    | The Quick Look Portal (Glass-morphic Previews) | done | — | 13 | merged | epic 2 | ✅ Yes |
| 3.2   | 3    | The Decision HUD (Why-First Summaries) | done | — | — | merged | 3.1 | ✅ Yes |
| 3.3   | 3    | The Surgical Lock Protocol (HITL Intervention) | done | — | 12 | merged | 3.2 | ✅ Yes |
| 3.4   | 3    | The Validation Guard (Automated Build/Lint Checks) | done | — | — | merged | 3.3 | ✅ Yes |
| 3.5   | 3    | AST/Text Sync & UI Flicker Feedback | done | — | — | merged | 3.4 | ✅ Yes |
| 4.1   | 4    | The Provisioning Saga Ledger & Idempotency | done | — | 16 | merged | epic 3 | ✅ Yes |
| 4.2   | 4    | Autonomous Repository Cloning & Branch Management | done | — | 14 | merged | 4.1 | ✅ Yes |
| 4.3   | 4    | AST-based Code Refactoring Engine | done | — | 15 | merged | 4.2 | ✅ Yes |
| 4.4   | 4    | Automated Pull Request & Conflict Resolution | in-progress | — | — | — | 4.3 | ✅ Yes |
| 4.5   | 4    | Secret Injection & Sealed Envelope Pattern | backlog | — | — | — | 4.4 | ❌ No |
| 5.1   | 5    | The Founders' Knowledge Centre (Intelligence Hub UI) | backlog | — | — | — | epic 4 | ❌ No |
| 5.2   | 5    | Autonomous Research Agent & Industry Intel Curation | backlog | — | — | — | 5.1 | ❌ No |
| 5.3   | 5    | The Idea Forge (Brainstorming & Technical Assessments) | backlog | — | — | — | 5.2 | ❌ No |
| 5.4   | 5    | BMB Hot-Loading (Live Agent & Workflow Activation) | backlog | — | — | — | 5.3 | ❌ No |
| 6.1   | 6    | The Marketing Agent & Social Content Loop | backlog | — | — | — | epic 5 | ❌ No |
| 6.2   | 6    | The Report Engine (Performance & Slide Decks) | backlog | — | — | — | 6.1 | ❌ No |
| 6.3   | 6    | Client Services Desk & Workflow Interrogation | backlog | — | — | — | 6.2 | ❌ No |
| 6.4   | 6    | IT & Infrastructure Support Agent | backlog | — | — | — | 6.3 | ❌ No |
| 6.5   | 6    | The OpenClaw Bridge (Agent Communication Gateway) | backlog | — | — | — | 6.4 | ❌ No |
| 6.6   | 6    | The Omni-Channel Command Strip | backlog | — | — | — | 6.5 | ❌ No |

## Dependency Chains

- **1.2** depends on: 1.1
- **1.3** depends on: 1.2
- **1.4** depends on: 1.3
- **1.5** depends on: 1.4
- **1.6** depends on: 1.5
- **Epic 2** depends on: Epic 1
- **Epic 3** depends on: Epic 2
- **Epic 4** depends on: Epic 3
- **Epic 5** depends on: Epic 4
- **Epic 6** depends on: Epic 5

## Notes
- Sequential dependency chain identified to ensure stability of the "Executive Cockpit" before scaling to departmental swarms.
- Phase 0 Reconciliation (2026-04-06): Verified that stories 1.1 through 4.3 are merged into master via cumulative commits.
- Story 4.4 is the current active target.
