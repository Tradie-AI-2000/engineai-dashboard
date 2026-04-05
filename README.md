# 🌌 EngineAI Dashboard: The Self-Operating Agency

> **Operational Status:** PHASE 1 COMPLETE (ALPHA)  
> **Architecture:** Vercel AI SDK v6 + Next.js 16 + Supabase  
> **Design System:** Tech Noir (#0A0A0A / #C4A35A)

The **EngineAI Dashboard** is the autonomous operational nervous system for Engine AI. It transforms manual founder-led tasks into autonomous orchestration via a "Digital Assembly Line" of specialized hierarchical AI agents.

---

## 🛠️ Technology Stack

- **Frontend:** Next.js 16 (App Router), React 19, Tailwind CSS, Framer Motion.
- **Orchestration:** Vercel AI SDK v6 (Agent class, built-in tool loops).
- **Durable Logic:** Vercel Workflows (@upstash/workflow) for 24h+ pipelines.
- **Database/Auth:** Supabase (PostgreSQL with Row Level Security).
- **Engineering:** `ts-morph` for AST-based code refactoring.
- **Communication:** Model Context Protocol (MCP) for external integrations.

---

## 🏗️ Operational Environments

### 1. Development & Testing Mode (Local)
For rapid iteration, UI testing, and "Simulated Swarm" execution.

#### **Prerequisites**
- Node.js >= 20.10.0
- GitHub CLI (`gh`)
- Supabase CLI

#### **Initialisation**
```bash
# 1. Clone & Install
git clone https://github.com/Tradie-AI-2000/engineai-dashboard.git
cd engineai-dashboard
npm install

# 2. Configure Environment
# Copy the example and fill in keys (Gemini, Supabase, Upstash)
cp .env.local.example .env.local

# 3. Synchronise Database
npx supabase start
npx drizzle-kit push # If using drizzle, otherwise run migrations in /supabase/migrations
```

#### **Execution**
```bash
npm run dev
```
- **Cockpit Access:** `http://localhost:3000`
- **Audit Logs:** View real-time "Thought Loops" in the HUD.
- **Simulation:** Workflows default to a 1.5s delay to simulate agent reasoning.

---

### 2. Full Production Mode (Industrial)
The high-availability environment for client "Business in a Box" (BIAB) deployment.

#### **Infrastructure Configuration**
1.  **Vercel Deployment:**
    - Connect your GitHub repository to Vercel.
    - Set the **Root Directory** to project root.
    - **CRITICAL:** Ensure `NODE_OPTIONS="--max-old-space-size=4096"` is set for AST refactoring tasks.
2.  **Upstash Workflow Setup:**
    - Configure `QSTASH_URL`, `QSTASH_TOKEN`, and `UPSTASH_WORKFLOW_URL` in Vercel environment variables.
3.  **Supabase Production:**
    - Deploy migrations to a hosted Supabase project.
    - Enable **Row Level Security (RLS)** on `task_ledger` and `provisioning_ledger`.

#### **The "Sealed Envelope" Deployment**
Production builds utilise the **Sealed Envelope Pattern (ADR-005)**:
- Agents (LLMs) trigger deployment but **never** touch client secrets.
- Secrets are injected via deterministic Node.js functions in the Node.js Standard Runtime.

---

## 🛰️ System Architecture

### 1. The Executive Cockpit (`/src/features/cockpit`)
- **HUD.tsx**: The primary high-density HUD tracking global MRR, Burn, and Velocity.
- **ProgressiveRibbon.tsx**: Real-time visualization of the 6-stage delivery pipeline.
- **CommandStrip.tsx**: One-touch omni-channel triggers (WhatsApp, Telegram, Email).

### 2. The Specialist Swarms (`/src/app/api/workflows`)
- **Marketing Loop**: Trending industry research → Branded Drafts → Review.
- **IT Support**: Autonomous log monitoring and API key rotation.
- **Report Engine**: Aggregates `task_ledger` data into Markdown-based slide decks (Marp).

### 3. The OpenClaw Bridge (`/api/agents/openclaw/bridge`)
A secure API gateway allowing external agents to query the dashboard via the **Handoff Envelope Protocol**.

---

## 📜 Core Development Rules (For AI Agents)

1.  **Runtime Split:** Reasoning and AST tasks **MUST** use Node.js runtime. UI/Streaming uses Edge.
2.  **NZ English:** All user-facing copy MUST use New Zealand English (e.g., *optimising*, *initialising*).
3.  **Handoff Integrity:** Every agent transition must be validated against `HandoffEnvelopeSchema` (Zod).
4.  **Multi-Tenant Isolation:** All queries MUST be scoped by `tenant_id`.

---

## 🧪 Quality Assurance

- **Linting:** `npm run lint` (Strict ESLint 9 configuration).
- **Type Checking:** `tsc --noEmit`.
- **Validation Guard:** Built-in workflow step that runs automated checks on agent-generated code before notifying the Founder.

---

## 📡 Support & Interrogation

Founder-Orchestrators can interrogate any active workflow via the **Command Strip**. 
> *Example:* `[TELEGRAM] REQUESTING FULL TELEMETRY SYNC FOR PROJECT ALPHA`

---

**Built by Engine AI.** *Transforming Business via Autonomous Orchestration.*
