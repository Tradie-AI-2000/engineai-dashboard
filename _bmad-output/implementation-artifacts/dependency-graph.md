# Story Dependency Graph
_Last updated: 2026-04-05T20:55:58Z_

## Stories

| Story | Epic | Title | Sprint Status | Issue | PR | PR Status | Dependencies | Ready to Work |
|-------|------|-------|--------------|-------|----|-----------|--------------|---------------|
| 1.1   | 1    | Project Scaffolding & Tech Noir Theme | review | — | 1 | open | none | ✅ Yes |
| 1.2   | 1    | Secure Executive Auth & Multi-tenant Isolation | backlog | — | — | — | 1.1 | ✅ Yes |
| 1.3   | 1    | The Global Pulse (Monaco Layout) | backlog | — | — | — | 1.2 | ✅ Yes |
| 1.4   | 1    | Division Routing & KPI Dashboards | backlog | — | — | — | 1.3 | ✅ Yes |
| 1.5   | 1    | The Progressive Ribbon (Visualization) | backlog | — | — | — | 1.4 | ✅ Yes |
| 1.6   | 1    | Mobile Oversight (NL Query Core) | backlog | — | — | — | 1.5 | ✅ Yes |
| 2.1   | 2    | The Task Ledger & Handoff Envelope Schema | backlog | — | — | — | epic 1 | ❌ No (epic 1 not complete) |
| 2.2   | 2    | Vercel Workflows Pipeline (The 2-Agent Loop) | backlog | — | — | — | 2.1 | ❌ No (2.1 not merged) |
| 2.3   | 2    | Audit Drill-down & Agent Reasoning Logs | backlog | — | — | — | 2.2 | ❌ No (2.2 not merged) |
| 2.4   | 2    | The Supervisor (SRE Agent) & Self-Healing Logic | backlog | — | — | — | 2.3 | ❌ No (2.3 not merged) |
| 2.5   | 2    | Manual Override (Pause/Terminate) Protocol | backlog | — | — | — | 2.4 | ❌ No (2.4 not merged) |
| 3.1   | 3    | The Quick Look Portal (Glass-morphic Previews) | backlog | — | — | — | epic 2 | ❌ No (epic 2 not complete) |
| 3.2   | 3    | The Decision HUD (Why-First Summaries) | backlog | — | — | — | 3.1 | ❌ No (3.1 not merged) |
| 3.3   | 3    | The Surgical Lock Protocol (HITL Intervention) | backlog | — | — | — | 3.2 | ❌ No (3.2 not merged) |
| 3.4   | 3    | The Validation Guard (Automated Build/Lint Checks) | backlog | — | — | — | 3.3 | ❌ No (3.3 not merged) |
| 3.5   | 3    | AST/Text Sync & UI Flicker Feedback | backlog | — | — | — | 3.4 | ❌ No (3.4 not merged) |
| 4.1   | 4    | The Provisioning Saga Ledger & Idempotency | backlog | — | — | — | epic 3 | ❌ No (epic 3 not complete) |
| 4.2   | 4    | Autonomous Repository Cloning & Branch Management | backlog | — | — | — | 4.1 | ❌ No (4.1 not merged) |
| 4.3   | 4    | AST-based Code Refactoring Engine | backlog | — | — | — | 4.2 | ❌ No (4.2 not merged) |
| 4.4   | 4    | Automated Pull Request & Conflict Resolution | backlog | — | — | — | 4.3 | ❌ No (4.3 not merged) |
| 4.5   | 4    | Secret Injection & Sealed Envelope Pattern | backlog | — | — | — | 4.4 | ❌ No (4.4 not merged) |
| 5.1   | 5    | The Founders' Knowledge Centre (Intelligence Hub UI) | backlog | — | — | — | epic 4 | ❌ No (epic 4 not complete) |
| 5.2   | 5    | Autonomous Research Agent & Industry Intel Curation | backlog | — | — | — | 5.1 | ❌ No (5.1 not merged) |
| 5.3   | 5    | The Idea Forge (Brainstorming & Technical Assessments) | backlog | — | — | — | 5.2 | ❌ No (5.2 not merged) |
| 5.4   | 5    | BMB Hot-Loading (Live Agent & Workflow Activation) | backlog | — | — | — | 5.3 | ❌ No (5.3 not merged) |
| 6.1   | 6    | The Marketing Agent & Social Content Loop | backlog | — | — | — | epic 5 | ❌ No (epic 5 not complete) |
| 6.2   | 6    | The Report Engine (Performance & Slide Decks) | backlog | — | — | — | 6.1 | ❌ No (6.1 not merged) |
| 6.3   | 6    | Client Services Desk & Workflow Interrogation | backlog | — | — | — | 6.2 | ❌ No (6.2 not merged) |
| 6.4   | 6    | IT & Infrastructure Support Agent | backlog | — | — | — | 6.3 | ❌ No (6.3 not merged) |
| 6.5   | 6    | The OpenClaw Bridge (Agent Communication Gateway) | backlog | — | — | — | 6.4 | ❌ No (6.4 not merged) |
| 6.6   | 6    | The Omni-Channel Command Strip | backlog | — | — | — | 6.5 | ❌ No (6.5 not merged) |

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
- All stories initialized in the backlog, with Story 1.1 positioned as the primary development target.
