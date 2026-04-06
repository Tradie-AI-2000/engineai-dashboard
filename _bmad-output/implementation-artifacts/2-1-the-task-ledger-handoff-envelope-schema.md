---
story_id: 2.1
story_key: 2-1-the-task-ledger-handoff-envelope-schema
epic_id: 2
title: The Task Ledger (Handoff Envelope Schema)
status: ready-for-dev
date: 2026-04-05
author: Wardo
---

# Story 2.1: The Task Ledger (Handoff Envelope Schema)

## User Story
**As a System Architect,**
**I want** a standardized Task Ledger and Handoff Envelope validated by Zod,
**So that** agent transitions are context-preserved, idempotent, and side-effect safe.

## Acceptance Criteria

### 1. High-Integrity Task Ledger (Supabase)
- **Given** the existing `task_ledger` table
- **When** I apply a migration to upgrade the schema to the "ADR-004" standard
- **Then** the table must include:
    - `workflow_run_id` (TEXT)
    - `step_key` (TEXT)
    - `status` (Enum: pending, running, checkpoint, completed, failed, dead_letter)
    - `checkpoint` (JSONB) - For resumable state
    - `tool_cache` (JSONB) - For caching tool results
    - `effects_log` (JSONB) - The "Outbox" for side effects
    - `attempts` / `max_attempts` (INTEGER)
    - `last_error` (TEXT)
    - `UNIQUE (workflow_run_id, step_key)` constraint
- **And** RLS policies must strictly isolate data by `tenant_id`

### 2. High-Integrity Handoff Envelope (Zod)
- **Given** the existing `src/lib/schemas/handoff.ts`
- **When** I refactor the `HandoffEnvelopeSchema` to align with the Architecture Spec
- **Then** it must include:
    - `workflow_run_id`
    - `checkpoint` object (`current_phase`, `summary`, `intermediate_artifacts`)
    - `effects_log` array (`effect_id`, `type`, `status`, `result`, `executed_at`)
    - `constraints` (timeouts, max tool calls)
- **And** `AgentRoleSchema` and `TaskStatusSchema` must be updated to match the new ledger statuses

### 3. Side-Effect Idempotency (Deterministic effect_id)
- **Given** a task execution context
- **When** a side effect is triggered (e.g., tool call)
- **Then** it must generate a deterministic `effect_id` (e.g., `hash(workflow_run_id + step_key + type + params)`)
- **And** the system must check the `effects_log` to prevent duplicate execution of the same effect

### 4. Resumption Logic
- **Given** a failed or checkpointed workflow
- **When** the agent resumes execution
- **Then** it must ingest the `checkpoint.summary` and `checkpoint.intermediate_artifacts` from the last valid ledger entry
- **And** it must replay tool results from `tool_cache` to ensure idempotency

## Developer Context & Guardrails

### Technical Requirements
- **Stack:** Next.js 16, Supabase, Zod.
- **Migration:** Create a new migration `supabase/migrations/20260405040001_upgrade_task_ledger.sql` (or similar) to avoid conflicts with the existing baseline.
- **Durable Logic:** This schema is the foundation for Epic 2's Vercel Workflows.

### Architecture Compliance
- **ADR-004:** Follow the exact SQL schema provided for `task_ledger`.
- **Handoff Protocol:** Follow the exact Zod schema provided in the Architecture document.

### File Structure Requirements
- `src/lib/schemas/handoff.ts`: Authority for Zod schemas.
- `src/lib/tasks.ts`: Data access layer for ledger operations.
- `supabase/migrations/`: SQL migration for schema upgrade.

## Testing Requirements
- **Zod Validation:** Unit tests for `HandoffEnvelopeSchema` with valid/invalid payloads.
- **Migration Verification:** Ensure the `UNIQUE` constraint and `JSONB` defaults are correctly applied.
- **Idempotency Check:** Verify `effect_id` generation is deterministic.

## Status
- **Status:** `ready-for-dev`
- **Context:** Initial baseline exists but requires upgrade to high-integrity standard.
