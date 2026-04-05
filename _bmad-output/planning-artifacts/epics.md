---
stepsCompleted: [1, 2]
inputDocuments:
  - _bmad-output/planning-artifacts/prd.md
  - _bmad-output/planning-artifacts/architecture.md
  - _bmad-output/planning-artifacts/ux-design-specification.md
  - GEMINI.md
---

# EngineAI Dashboard - Epic Breakdown

## Overview

This document provides the complete epic and story breakdown for EngineAI Dashboard, decomposing the requirements from the PRD, UX Design if it exists, and Architecture requirements into implementable stories.

## Requirements Inventory

### Functional Requirements

FR1: [Mobile Oversight] Founders can query system state (MRR, Project stages, Token burn) via Natural Language (Mobile/Telegram) and receive real-time Generative UI summaries.
FR2: [Manual Override] Founder-Orchestrators can manually initiate, pause, or terminate any stage of the autonomous pipelines.
FR3: [Approval Gates] Founders can review, approve, or reject high-leverage agent outputs (PRDs, SOWs, PRs) before they are finalized.
FR4: [Division Routing] The Dashboard provides separate, specialized views for each product division (BIAB, SkunkWorks, Modular, Desktop) with tailored KPIs and financial metrics for each.
FR5: [Audit Drill-down] Founders can drill down into any specific agent task to view detailed reasoning, tool-call logs, and handoff history.
FR6: [Intelligence Hub] The System includes a dedicated "Founders' Knowledge Centre" containing a living knowledge base, industry research archives, and an "Ideation Incubator."
FR7: [Automated Intel Curation] A specialized Research Agent autonomously scans pre-defined technical and industry sources to push summarized "Bleeding Edge" updates to the Hub.
FR8: [The Idea Forge] Founders can input raw ideas or voice notes into the Hub, triggering a Brainstorming Agent to generate initial technical feasibility assessments or BMB workflow sketches.
FR9: [Full Hierarchical Suite] The System possesses a full workforce (Executive, Managerial, and Specialist tiers) initialized in the .agent/ directory and active within the Vercel AI SDK environment. (Phase 1: CEO + Specialist).
FR10: [Agentic Workforce] The System assigns specific agents (Marketing, Finance, Product, Support) to govern and execute tasks across the portfolio divisions.
FR11: [BMB Hot-Loading] The Dashboard can ingest new Agent and Workflow definitions created via the BMAD Builder and activate them within the live environment without a reboot.
FR12: [Industrial Cloner] The System autonomously clones 'Golden Templates' and executes AST-based Code Refactoring to inject client-specific logic and schemas.
FR13: [PR Management] Agents autonomously manage the Git lifecycle: committing changes, opening Pull Requests, and resolving basic merge conflicts.
FR14: [Validation Guard] The System runs automated build and lint checks on all agent-generated code before notifying founders for review.
FR15: [Social Content Loop] The Marketing Agent can research trends, draft branded content, and execute scheduled posts to LinkedIn/X via MCP.
FR16: [Report Engine] To generate weekly performance reports and Markdown-based slide decks.
FR17: [Account & Support Desk] The Client Services Agent triages client queries and provides real-time status updates by querying the internal Workflow Supervisor.
FR18: [IT & Infrastructure] The Support Agent performs system-level tasks (API key rotation, log monitoring, RLS management) via MCP.
FR19: [OpenClaw Bridge] The System provides an Agent-to-Agent Communication Gateway, enabling external "OpenClaw" agents to securely query internal dashboard agents for data.
FR20: [Handoff Integrity] The System enforces a standard communication protocol for all internal and external agent handshakes.
FR21: [The Supervisor] A dedicated SRE Agent monitors all active Vercel Workflows and autonomously attempts 'Self-Healing' upon detecting stalls or errors.

### NonFunctional Requirements

NFR1: [Responsiveness] Core dashboard UI elements must respond to human interactions within 500ms.
NFR2: [Agent Feedback] Generative UI cards or "Agent Reasoning" indicators must begin streaming within 2s of a query.
NFR3: [Data Freshness] Business health metrics (MRR, Token Burn) must synchronize with source-of-truth integrations (Stripe, Supabase) at least every 60 seconds.
NFR4: [Multi-Tenant Isolation] Cryptographically enforced data separation must ensure that no tenant can access another's logs, schemas, or third-party API keys.
NFR5: [Tool-Call Validation] All autonomous agent tool calls must be strictly validated against Zod schemas before execution.
NFR6: [Immutable Audit] System logs must be tamper-proof and retained for at least 12 months for compliance and "Managerial Transparency" audits.
NFR7: [Durable Workflows] 100% of autonomous workflows spanning > 5 minutes must use Vercel Workflows to survive serverless timeout or cold-start events.
NFR8: [Self-Healing Rate] The System should autonomously resolve > 90% of transient API or handoff failures without human intervention.
NFR9: [Tenant Throughput] The Dashboard must support simultaneous operations for up to 50 concurrent SME client instances.
NFR10: [Rapid Deployment] The white-label cloning process (Git clone + Supabase setup + Env injection) must complete in under 60 minutes.
NFR11: [MCP Standardization] 100% of external system integrations (Linear, Notion, Drive, etc.) must utilize standardized Model Context Protocol servers.

### Additional Requirements

- Starter Template: Next.js 16 + Vercel AI SDK v6.
- Runtime Split: Node.js (Standard Serverless) for reasoning/AST; Edge for UI/Streaming.
- Provisioning Saga: Supabase-backed Saga Ledger with compensating transactions and idempotency keys (ADR-004).
- Handoff Protocol: Typed Handoff Envelope (Zod) with 4000-char summary cap and deterministic effect IDs.
- Secret Management: Sealed Envelope Pattern (Agent orchestrates, functions execute) (ADR-005).
- State Management: RSC-First + Zustand for telemetry.

### UX Design Requirements

UX-DR1: [Progressive Ribbon] Implement a segmented horizontal track for real-time project lifecycle visualization (#C4A35A pulse).
UX-DR2: [Surgical Lock] Implement a manual override protocol that pauses agent execution during human intervention via deep-linked portals.
UX-DR3: [Decision HUD] Create a "Why-First" executive summary modal with dual-path resolution (Apply & Edit vs. Manual Rebuild).
UX-DR4: [Telemetry Cards] High-density, card-based HUD layouts using JetBrains Mono for metrics and Inter for text.
UX-DR5: [Visual Theme] Tech Noir aesthetic (#0A0A0A base, #C4A35A gold accents, glass-morphic HUD overlays).
UX-DR6: [Identity Strip] High-contrast basics for client war room (Name, Industry, Contacts).
UX-DR7: [Quick Look Portal] In-dashboard previews of artifacts (PRDs, SoWs, Code) next to their respective ribbon stages.
UX-DR8: [Omni-Channel Command Strip] A persistent bar for one-touch communication (WhatsApp, Telegram, Email) and direct "Agent Interrogation" queries.
UX-DR9: [UI Flicker] 150ms visual "refresh" animation that triggers upon Context Sync to signal agent resumption.
UX-DR10: [Silent Toasts] Minimalist, non-intrusive bottom-right notifications for asynchronous background events.
UX-DR11: [Shift-Light Borders] Thin, glowing borders in Engine Gold (#C4A35A) indicating active "Pulse" states and "Surgical Lock" status.
UX-DR12: [The Idea Forge] Founders can input raw ideas or voice notes into the Hub, triggering a Brainstorming Agent.

### FR Coverage Map

FR1: Epic 1 - Mobile state queries & GenUI summaries.
FR2: Epic 2 - Manual initiation, pause, or termination of pipelines.
FR3: Epic 3 - Approval/rejection gates for high-leverage outputs.
FR4: Epic 1 - Specialized division views (BIAB, SkunkWorks, etc.).
FR5: Epic 2 - Drill-down into agent reasoning & tool-call logs.
FR6: Epic 5 - Founders' Knowledge Centre & Intelligence Hub.
FR7: Epic 5 - Autonomous research & industry updates curation.
FR8: Epic 5 - The Idea Forge (Brainstorming agent for raw ideas).
FR9: Epic 1 - Full hierarchical agent workforce (CEO + Specialists).
FR10: Epic 1 - Specialized agent assignment to divisions.
FR11: Epic 5 - BMB Hot-Loading for live environment updates.
FR12: Epic 4 - Industrial template cloner & AST refactoring logic.
FR13: Epic 4 - Automated Git lifecycle & PR management.
FR14: Epic 3 - Automated validation guard (build/lint checks).
FR15: Epic 6 - Marketing Agent social content loop (MCP).
FR16: Epic 6 - Weekly performance reports & Slide deck generation.
FR17: Epic 6 - Client Services support desk (Workflow queries).
FR18: Epic 6 - IT & Infrastructure maintenance (API keys, RLS, Logs).
FR19: Epic 6 - OpenClaw Agent-to-Agent Communication Bridge.
FR20: Epic 1 - Enforced standard handoff protocol integrity.
FR21: Epic 2 - The Supervisor SRE Agent & self-healing workflows.

## Epic List

### Epic 1: The Executive Cockpit (Operational Oversight)
Establish the "Operational Nervous System" where founders can securely log in, view their global portfolio, and receive real-time updates via a high-density HUD.
**FRs covered:** FR1, FR4, FR9, FR10, FR20.

### Epic 2: The Digital Assembly Line (Durable Orchestration)
Implement the core engine for autonomous task execution using Vercel Workflows and a self-healing supervisor agent.
**FRs covered:** FR2, FR5, FR21.

### Epic 3: Strategic Command & Approval Gates (HITL)
Introduce the "Decision HUD" and "Surgical Lock" protocol to allow founders to review and refine high-leverage agent outputs with context-sync.
**FRs covered:** FR3, FR14.

### Epic 4: The Industrial Cloner (Blueprint-to-Instance)
Build the autonomous provisioning saga that clones "Golden Templates" and refactors code via AST transformations.
**FRs covered:** FR12, FR13.

### Epic 5: The Intelligence Hub (The Idea Forge)
Create a centralized knowledge center for research, brainstorming, and "hot-loading" new agent and workflow capabilities.
**FRs covered:** FR6, FR7, FR8, FR11.

### Epic 6: Specialized Departmental Swarms (Scaling)
Roll out specialized agents for Marketing, Finance, Support, and external API bridges to scale autonomous agency operations.
**FRs covered:** FR15, FR16, FR17, FR18, FR19.

## Epic 1: The Executive Cockpit (Operational Oversight)

Establish the "Operational Nervous System" where founders can securely log in, view their global portfolio, and receive real-time updates via a high-density HUD.

### Story 1.1: Project Scaffolding & Tech Noir Theme

As a Founder-Orchestrator,
I want a Next.js 16 project initialized with the Tech Noir design system,
So that I can begin building the high-fidelity operational cockpit.

**Acceptance Criteria:**

**Given** a clean development environment
**When** I initialize the project with Next.js 16 and Tailwind CSS
**Then** the base background is set to `#0A0A0A` and primary accent to `#C4A35A` (Engine Gold)
**And** JetBrains Mono is configured for monospaced data and Inter for UI text
**And** the project structure includes standard directories for components, agents, and workflows

### Story 1.2: Secure Executive Auth & Multi-tenant Isolation

As a Founder,
I want to securely log in and ensure my data is isolated from client instances,
So that I can maintain total security and managerial privacy.

**Acceptance Criteria:**

**Given** a Supabase project
**When** I implement Supabase Auth with Row Level Security (RLS) on all tables
**Then** I can securely sign in with my executive credentials
**And** I can only access data belonging to my tenant ID (NFR4)
**And** any attempt to access unauthorized client data results in a cryptographic block

### Story 1.3: The Global Pulse (Monaco Layout)

As a Founder-Orchestrator,
I want a high-density "Monaco" layout with a persistent project sidebar and a HUD area,
So that I can maintain a 5-second pulse check on the entire agency (UX-DR4).

**Acceptance Criteria:**

**Given** the authenticated dashboard
**When** I view the home screen
**Then** I see a persistent sidebar listing all active projects with "Shift-Light" status borders (UX-DR11)
**And** the main HUD area displays high-density telemetry cards for "Global Heartbeat" metrics (MRR, Burn, Velocity)
**And** the layout responds to interactions within 500ms (NFR1)

### Story 1.4: Division Routing & KPI Dashboards

As a Founder,
I want specialized views for BIAB, SkunkWorks, Modular, and Desktop divisions,
So that I can monitor financial metrics and progress specific to each business line (FR4).

**Acceptance Criteria:**

**Given** the Global Pulse dashboard
**When** I select a specific division from the navigation
**Then** the HUD updates to show KPIs tailored to that division (e.g., "Build Velocity" for BIAB vs. "R&D Burn" for SkunkWorks)
**And** I can see a filtered list of projects belonging only to that division

### Story 1.5: The Progressive Ribbon (Visualization)

As a Founder,
I want a segmented horizontal track for real-time project lifecycle visualization,
So that I can see exactly where a build is in the 24-hour assembly line (UX-DR1).

**Acceptance Criteria:**

**Given** a project drill-down view
**When** the project is active
**Then** a segmented "Progressive Ribbon" displays the 6-stage lifecycle
**And** the active stage displays an Engine Gold pulsing animation (#C4A35A)
**And** the ribbon updates in real-time based on agent execution state

### Story 1.6: Mobile Oversight (NL Query Core)

As a Founder,
I want to query my system state using natural language from my mobile device,
So that I can maintain oversight while away from my desk (FR1).

**Acceptance Criteria:**

**Given** a Telegram or mobile-web interface
**When** I ask a query like "What is our current token burn for Jackson Construction?"
**Then** the system returns a Generative UI card with the relevant metrics
**And** the feedback begins streaming within 2s of the query (NFR2)

## Epic 2: The Digital Assembly Line (Durable Orchestration)

Implement the core engine for autonomous task execution using Vercel Workflows and a self-healing supervisor agent.

### Story 2.1: The Task Ledger & Handoff Envelope Schema

As a System Architect,
I want a standardized Task Ledger and Handoff Envelope validated by Zod,
So that agent transitions are context-preserved, idempotent, and side-effect safe.

**Acceptance Criteria:**

**Given** a Supabase database
**When** I create the `task_ledger` table with `workflow_run_id`, `step_key`, and `checkpoint` JSONB columns
**Then** all agent handoffs utilize the `HandoffEnvelopeSchema` (Zod) for validation
**And** every task execution generates a unique, deterministic `effect_id` to prevent duplicate side effects
**And** the system can resume an agent's state from the `checkpoint` data after a failure

### Story 2.2: Vercel Workflows Pipeline (The 2-Agent Loop)

As a Founder-Orchestrator,
I want a durable orchestration pipeline using Vercel Workflows for the CEO-Specialist loop,
So that complex project builds can run autonomously for 24+ hours without timeouts.

**Acceptance Criteria:**

**Given** the Vercel AI SDK and Vercel Workflows
**When** I initiate a project build pipeline
**Then** the workflow coordinates the handoff between the CEO and the primary Specialist agent
**And** the workflow state is persisted in the `task_ledger` at every checkpoint
**And** the pipeline survives serverless cold-starts or transient timeouts by resuming from the last successful checkpoint (NFR7)

### Story 2.3: Audit Drill-down & Agent Reasoning Logs

As a Founder-Orchestrator,
I want to drill down into any agent task to view its detailed reasoning and tool-call history,
So that I have total managerial transparency into the "Digital Assembly Line" (FR5).

**Acceptance Criteria:**

**Given** an active or completed project in the dashboard
**When** I click on a specific task in the audit drill-down view
**Then** I see the full "thought loop" of the agent, including internal reasoning and tool-call results
**And** the log displays the `HandoffEnvelope` metadata for every step
**And** the UI remains responsive (<500ms) even when loading dense log data

### Story 2.4: The Supervisor (SRE Agent) & Self-Healing Logic

As a Founder,
I want a dedicated SRE Agent (The Supervisor) to monitor all active workflows,
So that transient failures are autonomously resolved without my intervention (FR21).

**Acceptance Criteria:**

**Given** multiple active Vercel Workflows
**When** a workflow step fails due to a transient API or handoff error
**Then** the SRE Agent is triggered to analyze the failure log
**And** the Supervisor attempts an autonomous retry or remediation based on the `task_ledger` state
**And** the self-healing success rate is tracked, targeting >90% resolution for transient issues (NFR8)

### Story 2.5: Manual Override (Pause/Terminate) Protocol

As a Founder-Orchestrator,
I want one-touch controls to pause or terminate any autonomous pipeline,
So that I maintain absolute sovereignty over the agency's operations (FR2).

**Acceptance Criteria:**

**Given** an active "Digital Assembly Line" workflow
**When** I trigger the "Pause" or "Terminate" action from the dashboard or mobile HUD
**Then** the Vercel Workflow hits a blocking state or halts execution immediately
**And** a "Silent Toast" notification confirms the status change (UX-DR10)
**And** the project's status in the Progressive Ribbon shifts to "Control Slate" (UX-DR11)

## Epic 3: Strategic Command & Approval Gates (HITL)

Introduce the "Decision HUD" and "Surgical Lock" protocol to allow founders to review and refine high-leverage agent outputs with context-sync.

### Story 3.1: The Quick Look Portal (Glass-morphic Previews)

As a Founder-Orchestrator,
I want in-dashboard, glass-morphic previews of agent-generated artifacts,
So that I can verify quality in seconds without context-switching to external tools (UX-DR7).

**Acceptance Criteria:**

**Given** a project in the "War Room" view
**When** I click a completed or active stage on the Progressive Ribbon
**Then** a semi-transparent, glass-morphic overlay displays the artifact's content (Markdown, Code, or SOW)
**And** the preview includes a "Surgical Portal" link to open the source asset directly
**And** the overlay maintains high contrast and follows the Tech Noir aesthetic

### Story 3.2: The Decision HUD (Why-First Summaries)

As a Founder,
I want a "Why-First" executive summary modal for resolving autonomous bottlenecks,
So that I understand the agent's logic before making a high-leverage decision (UX-DR3).

**Acceptance Criteria:**

**Given** a project that has hit a "Red" structural risk or requires approval
**When** I engage the "RESOLVE NOW" trigger
**Then** a modal appears with a natural-language summary explaining the bottleneck and the agent's proposed fix
**And** the HUD displays a syntax-highlighted staging area for the proposed draft
**And** I am presented with dual-path resolution options: [APPLY & EDIT] or [MANUAL REBUILD]

### Story 3.3: The Surgical Lock Protocol (HITL Intervention)

As a Founder-Orchestrator,
I want the system to automatically pause agent execution when I intervene in a build,
So that I have absolute sovereignty and prevent agent conflicts during my refactors (UX-DR2).

**Acceptance Criteria:**

**Given** an active workflow
**When** I click a "Surgical Portal" deep-link or enter an editable area
**Then** the Vercel Workflow enters a blocking "checkpoint" state
**And** the UI state shifts from "Engine Gold" to "Control Slate" (#E0E0E0) to indicate the lock
**And** the agent remains suspended until I manually trigger the "RELEASE" action

### Story 3.4: The Validation Guard (Automated Build/Lint Checks)

As a Founder,
I want automated build and lint checks to run on all agent-generated code,
So that I am only notified to review code that is technically sound (FR14).

**Acceptance Criteria:**

**Given** an agent has completed a code-generation task
**When** the workflow enters the "Validation Guard" stage
**Then** the system triggers a background build and lint process (e.g., `npm run lint`)
**And** the Progressive Ribbon displays a "Scanning" animation during validation
**And** if validation fails, the agent is directed to self-correct before notifying the founder

### Story 3.5: AST/Text Sync & UI Flicker Feedback

As a Founder-Orchestrator,
I want the system to perform a fresh context sync and provide visual feedback when I release an agent,
So that I am confident the agent has ingested my manual changes (UX-DR9).

**Acceptance Criteria:**

**Given** a project under "Surgical Lock"
**When** I click the "RELEASE" button after a manual refactor
**Then** the system executes a fresh AST or text scan of the modified assets
**And** a 150ms "UI Flicker" animation triggers to provide a high-fidelity visual confirmation of the sync
**And** the workflow transitions from "Control Slate" back to "Pulsing Gold" as autonomy resumes

## Epic 4: The Industrial Cloner (Blueprint-to-Instance)

Build the autonomous provisioning saga that clones "Golden Templates" and refactors code via AST transformations.

### Story 4.1: The Provisioning Saga Ledger & Idempotency

As a System Architect,
I want a Supabase-backed Saga Ledger with idempotency keys and compensating transactions,
So that multi-step provisioning tasks across GitHub, Vercel, and Supabase are reliable and recoverable (ADR-004).

**Acceptance Criteria:**

**Given** the `provisioning_ledger` table
**When** I initiate a client instance creation
**Then** every step (Create Repo, Provision DB, Inject Secrets) is tracked with a unique idempotency key
**And** if a step fails, the system uses "Cleanup Refs" to execute a compensating transaction (rollback)
**And** the provisioning state is visible on the dashboard in real-time

### Story 4.2: Autonomous Repository Cloning & Branch Management

As a Founder-Orchestrator,
I want agents to autonomously clone "Golden Templates" and manage GitHub branches,
So that client-specific builds are logically separated and version-controlled (FR13).

**Acceptance Criteria:**

**Given** a "Golden Template" repository on GitHub
**When** a new client project is initiated
**Then** the agent clones the template into a new repository via the GitHub API
**And** the agent creates a dedicated feature branch (e.g., `client-onboarding`) for initial refactors
**And** the agent maintains the Git lifecycle (add, commit, push) throughout the process

### Story 4.3: AST-based Code Refactoring Engine

As a System Architect,
I want an industrial-grade AST refactoring engine to inject client-specific logic,
So that code modifications are 100% syntactically valid and align with client schemas (FR12).

**Acceptance Criteria:**

**Given** a cloned repository and client-specific parameters (e.g., table names, company name)
**When** the agent executes a code refactor
**Then** the engine uses Abstract Syntax Trees (e.g., via `ts-morph` or `jscodeshift`) to identify and modify target nodes
**And** the refactored code passes a syntax validation check
**And** client-specific schemas are correctly injected into database configurations and UI components

### Story 4.4: Automated Pull Request & Conflict Resolution

As a Founder-Orchestrator,
I want agents to autonomously open Pull Requests and resolve basic merge conflicts,
So that the digital assembly line moves smoothly toward final deployment (FR13).

**Acceptance Criteria:**

**Given** a completed feature branch with refactored code
**When** the agent initiates a review cycle
**Then** it opens a Pull Request on GitHub with a clear summary of changes
**And** the agent monitors for merge conflicts and attempts autonomous resolution for basic overlaps (e.g., README or simple config files)
**And** if a complex conflict occurs, the agent triggers a mobile alert for human intervention

### Story 4.5: Secret Injection & Sealed Envelope Pattern

As a Founder,
I want client secrets to be injected into Vercel environments without LLM exposure,
So that the "Blueprint-to-Instance" deployment is secure and takes less than 60 minutes (NFR10 / ADR-005).

**Acceptance Criteria:**

**Given** a set of client secrets (Supabase keys, API keys)
**When** the workflow enters the "Inject Secrets" stage
**Then** a deterministic Node.js function fetches the secrets and pushes them to the Vercel project environment
**And** the agent only sees the success/fail status and never the actual secret values
**And** the entire cloning and deployment process completes within the 60-minute benchmark

## Epic 5: The Intelligence Hub (The Idea Forge)

Create a centralized knowledge center for research, brainstorming, and "hot-loading" new agent and workflow capabilities.

### Story 5.1: The Founders' Knowledge Centre (Intelligence Hub UI)

As a Founder,
I want a dedicated Intelligence Hub view with high-density research and ideation archives,
So that I have a single operational center for all business intelligence and technical research (FR6).

**Acceptance Criteria:**

**Given** the authenticated dashboard
**When** I navigate to the "Intelligence Hub"
**Then** I am presented with a grid-based view of industry research, technical documentation, and project archives
**And** the UI includes a dedicated "Ideation Incubator" section for tracking and refining new product concepts
**And** the hub uses the Tech Noir aesthetic and maintains performance under high data density

### Story 5.2: Autonomous Research Agent & Industry Intel Curation

As a Founder-Orchestrator,
I want a specialized Research Agent to autonomously scan and summarize technical sources,
So that I stay on the "Bleeding Edge" of industry developments without manual research (FR7).

**Acceptance Criteria:**

**Given** a list of pre-defined technical and industry sources (RSS, GitHub, Technical Blogs)
**When** the Research Agent scans the sources periodically
**Then** it generates concise, natural-language summaries of the most relevant updates
**And** the summaries are pushed to the Intelligence Hub and notify the founder via mobile "Pulse" alerts
**And** the agent can categorize research based on Engine AI divisions (e.g., "AST-Refactoring" vs. "Agent Orchestration")

### Story 5.3: The Idea Forge (Brainstorming & Technical Assessments)

As a Founder,
I want to input raw ideas or voice notes into the "Idea Forge" to trigger a Brainstorming Agent,
So that I can rapidly assess the technical feasibility of new BMB workflows (FR8 / UX-DR12).

**Acceptance Criteria:**

**Given** the "Idea Forge" interface in the Intelligence Hub
**When** I input a raw text idea or upload a voice note
**Then** a specialized Brainstorming Agent is triggered to analyze the concept
**And** the agent generates a technical feasibility assessment, including initial workflow sketches and BMB requirements
**And** the output is stored as a new entry in the "Ideation Incubator" for further refinement

### Story 5.4: BMB Hot-Loading (Live Agent & Workflow Activation)

As a Founder-Orchestrator,
I want to ingest and activate new Agent and Workflow definitions from the BMAD Builder in real-time,
So that I can scale agency capabilities without rebooting the system (FR11).

**Acceptance Criteria:**

**Given** a new Agent or Workflow definition generated via the BMAD Builder
**When** I upload the definition to the dashboard
**Then** the system "hot-loads" the new logic into the live environment
**And** the new agent/workflow becomes immediately available for assignment to a division or project
**And** a "Silent Toast" notification confirms successful activation

## Epic 6: Specialized Departmental Swarms (Scaling)

Roll out specialized agents for Marketing, Finance, Support, and external API bridges to scale autonomous agency operations.

### Story 6.1: The Marketing Agent & Social Content Loop

As a Founder,
I want a Marketing Agent that researches trends and drafts branded social content,
So that I can maintain an active social presence autonomously via MCP (FR15).

**Acceptance Criteria:**

**Given** access to LinkedIn/X via Model Context Protocol (MCP) servers
**When** the Marketing Agent identifies a trending industry topic in the Intelligence Hub
**Then** it drafts a branded post in Markdown following the Engine AI voice
**And** the post is scheduled for review in the "Global Pulse" dashboard
**And** upon approval, the agent executes the post via the respective MCP tool

### Story 6.2: The Report Engine (Performance & Slide Decks)

As a Founder-Orchestrator,
I want an automated engine to generate weekly performance reports and slide decks,
So that I have professional, data-driven summaries for stakeholder reviews (FR16).

**Acceptance Criteria:**

**Given** a project completion or weekly milestone
**When** the Report Engine is triggered
**Then** it aggregates metrics from the `task_ledger` and `provisioning_ledger`
**And** it generates a structured Markdown report and a corresponding slide deck (e.g., via Marp)
**And** the generated artifacts are stored in the client's "Quick Look" portal

### Story 6.3: Client Services Desk & Workflow Interrogation

As a SME Client,
I want to query the system for real-time status updates on my project,
So that I am informed without requiring a manual update from the founders (FR17).

**Acceptance Criteria:**

**Given** an external client portal or messaging interface
**When** a client query is received (e.g., "What is the status of my database setup?")
**Then** the Client Services Agent interrogates the internal Workflow Supervisor (SRE Agent)
**And** the agent returns a natural-language status update based on the current `task_ledger` state
**And** complex queries are triaged and escalated to the founder's "Decision HUD" if necessary

### Story 6.4: IT & Infrastructure Support Agent

As a Founder,
I want a Support Agent to handle system-level maintenance tasks via MCP,
So that the dashboard remains secure and operational with zero manual overhead (FR18).

**Acceptance Criteria:**

**Given** access to system logs and cloud provider APIs via MCP
**When** the Support Agent detects a nearing API key expiration or an RLS violation
**Then** it autonomously executes the remediation task (e.g., key rotation)
**And** all infrastructure changes are logged in the "Audit Drill-down" for transparency
**And** a "Silent Toast" notification confirms the maintenance event

### Story 6.5: The OpenClaw Bridge (Agent Communication Gateway)

As a System Architect,
I want a secure Agent-to-Agent Communication Gateway (OpenClaw Bridge),
So that external agents can securely query internal dashboard data (FR19).

**Acceptance Criteria:**

**Given** an external "OpenClaw" agent request
**When** the request hits the dashboard API gateway
**Then** the system validates the request against the "Handoff Integrity" protocol (FR20)
**And** the internal agent provides the requested data without exposing sensitive multi-tenant secrets
**And** the entire communication is logged in the permanent audit trail

### Story 6.6: The Omni-Channel Command Strip

As a Founder-Orchestrator,
I want a persistent UI bar for one-touch communication and agent interrogation,
So that I can rapidly direct the agency from any view (UX-DR8).

**Acceptance Criteria:**

**Given** any view in the "Client War Room"
**When** I hover or focus on the persistent "Command Strip"
**Then** I see one-touch triggers for WhatsApp, Telegram, and Email
**And** the strip includes a "Direct Interrogation" input for querying the active agent swarm
**And** all triggers utilize auto-drafted templates based on the current project stage.


**Acceptance Criteria:**

<!-- for each AC on this story -->

**Given** {{precondition}}
**When** {{action}}
**Then** {{expected_outcome}}
**And** {{additional_criteria}}

<!-- End story repeat -->
tion}}
**When** {{action}}
**Then** {{expected_outcome}}
**And** {{additional_criteria}}

<!-- End story repeat -->
