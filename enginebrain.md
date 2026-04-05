# Pre-PRD: Engine AI Operations Dashboard ("Business in a Box")

## Project Vision

To build a beautifully functional, AI-driven operations dashboard that serves as the central nervous system for Engine AI (founded by Ben Duchateu and Joe Ward). This system will orchestrate an "agent swarm" to autonomously run business operations. Crucially, the platform is designed from day one as a future white-label "business in a box" template. It will be refined internally and pushed to GitHub as both a working platform and a template repository, enabling rapid deployment for future clients via `git clone`, environment variable injection, and Vercel hosting.

## Target Audience

1. **Primary (Internal):** Engine AI founders and internal AI agents (using it to manage agency operations, leads, and finances).

2. **Secondary (Clients):** Future Engine AI clients who will receive a cloned, customized version of this operations dashboard to run their own businesses.

3. **Tertiary (Agents):** "Openclaw / Open core" agents that need to seamlessly read, understand, and interact with the platform's codebase and data.

## Core Features (Initial Thoughts)

* **AI Agent Swarm Integration:** Specialized, hierarchical agents including a CEO, Marketing Manager, Communications Manager, Finance Manager, plus others and their respective sub-agents. Please advise how we should set these agents up - do we need any agent hosting or will creating agent.md and skill.md files be sufficient?? do we use the google ADK framework or similar in order for the agents to work properly. advise and brainstorm - we want simplicity at the start so if we can just create simple agent.md files for each agent and sub agent then happy days.

* **Dual Interaction Modes:**
  * *Chat Interface:* A built-in UI for human founders to converse with and instruct the agent swarm directly.
  * *Autonomous Execution:* Event-driven task execution (e.g., a "Lead Onboarding Agent" that detects website leads, sends welcome emails, outlines next steps, redirects to the 'Discovery Engine', and books calendar events).

* **Centralized Ecosystem Connections:** Seamless integration with the main Engine AI website, the "Discovery Engine" web app, and other future client-facing tools.

* **Agent-Optimized Codebase:** The repository will house an `agent.md` and `llms-full.txt` file at the root, ensuring autonomous agents can easily read project context and execute tasks.

* **Rapid Deployment Architecture:** Built as a reusable GitHub template to allow < 1 hour turnaround times for new clients by injecting company-specific data.

## Tech Stack

* **Frontend/Framework:** Next.js, React
* **Database/Backend:** Supabase (connected to open core agents)
* **Hosting/Deployment:** Vercel
* **Version Control:** GitHub (Template Repository)

## B-MAD Considerations

* **Recommended Track:** **BMad Method** (Complex) or **Enterprise**. The multi-agent architecture and "template-for-clients" requirement introduces complexities that should bypass the "Quick Flow".

* **Architecture Phase Focus (Phase 3):** Needs highly specific Architectural Decision Records (ADRs) detailing how the frontend communicates with the agent swarm (e.g., API routes vs. websockets) and how Supabase schemas are structured to be easily cloned/wiped for new clients.

* **Project Context (`project-context.md`):** Must strictly define rules for Next.js App Router/Pages usage, Supabase client initialization, and the mandatory presence/updating of `agent.md` and `llms-full.txt` during all AI developer agent workflows.

## Known Constraints / Unknowns

* **Agent Orchestration:** Which framework/backend will run the actual agent swarm logic (e.g., Manual/bespoke, Vercel, Google ADK, Vercel AI SDK), and how is state maintained between autonomous actions and the chat interface?

* **Template Configuration:** What is the exact mechanism for injecting client-specific data upon cloning? (e.g., a setup script, a structured JSON config file, or environment variables).

* **Security & Permissions:** Ensuring autonomous agents have the right permission scopes within Supabase to perform tasks without exposing sensitive data.