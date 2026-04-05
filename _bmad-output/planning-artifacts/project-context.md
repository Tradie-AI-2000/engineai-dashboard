---
project_name: 'EngineAI Dashboard'
user_name: 'Joe'
date: '2026-04-05'
status: 'initialised'
sections_completed: []
tech_stack:
  framework: 'Next.js 16'
  orchestration: 'Vercel AI SDK v6'
  workflows: 'Vercel Workflows (Upstash)'
  backend: 'Supabase'
  styling: 'Tailwind CSS'
  logic: 'Node.js (Standard Serverless)'
  ast: 'ts-morph'
---

# Project Context: EngineAI Dashboard

_This document defines the critical implementation rules, patterns, and guidelines for AI agents working on the EngineAI Dashboard. All agents MUST adhere to these standards to ensure architectural integrity._

## Core Technology Stack

- **Frontend:** Next.js 16 (App Router), React 19.
- **Styling:** Tailwind CSS (Tech Noir Theme: #0A0A0A base, #C4A35A gold accents).
- **Orchestration:** Vercel AI SDK v6 (Agent class, built-in tool loops).
- **Durable Logic:** Vercel Workflows (@upstash/workflow).
- **Database/Auth:** Supabase (PostgreSQL with RLS).
- **Code Refactoring:** ts-morph (AST-based).

## Critical Implementation Rules

### 1. Runtime Restrictions (ADR-003)
- **Node.js (Standard Serverless):** Use for all agent reasoning, tool calls, and AST refactoring.
- **Edge Runtime:** Restricted ONLY to UI streaming and Middleware.
- **Rationale:** Complex orchestration and tool calls frequently exceed Edge's 25s/300s limits.

### 2. The Handoff Envelope (Zod Schema)
All agent transitions MUST utilize the `HandoffEnvelopeSchema`.
- Summary cap: 4000 characters.
- Deterministic `effect_id` required for all side effects.
- Must include `workflow_run_id` and `tenant_id`.

### 3. The Sealed Envelope Protocol (Security ADR-005)
- Agents orchestrate triggers; deterministic functions execute values.
- **CRITICAL:** Sensitive credentials (API keys, Supabase secrets) MUST NEVER enter the LLM context window or agent logs.

### 4. Language & Localization
- **NZ English:** Use New Zealand English for all user-facing copy and system logs (e.g., "organisation", "optimise", "initialising").

### 5. Multi-Tenant Isolation (NFR4)
- Every query and action MUST be scoped by `tenant_id`.
- RLS in Supabase is the primary enforcement mechanism; agents must never bypass it.

## Coding Conventions

### File Naming
- **Components:** PascalCase (e.g., `AuditDrilldown.tsx`).
- **Hooks/Utilities/APIs:** kebab-case (e.g., `use-task-ledger.ts`, `ast-engine.ts`).
- **Workflows:** kebab-case (e.g., `marketing-loop/route.ts`).

### Code Organization
- **Features:** Group UI logic in `src/features/[feature-name]/`.
- **Shared UI:** Global primitives in `src/components/ui/`.
- **Domain Logic:** Services and shared logic in `src/lib/`.

## Quality & Verification
- **Build & Lint:** All code MUST pass `next lint` and `tsc` before submission.
- **Testing:** New features MUST include unit or integration tests verifying behavior.
