# Story 1.2: Secure Executive Auth & Multi-tenant Isolation

Status: ready-for-dev

## Story

As a Founder,
I want to securely log in and ensure my data is isolated from client instances,
so that I can maintain total security and managerial privacy.

## Acceptance Criteria

1. **Supabase Auth Integration:** Implement executive sign-in using Supabase Auth (Email/Password or Provider). [Source: _bmad-output/planning-artifacts/epics.md#Story 1.2]
2. **Multi-tenant Isolation (NFR4):** Cryptographically enforced data separation using Row Level Security (RLS) on all tables (`task_ledger`, `provisioning_ledger`, etc.) based on `tenant_id`. [Source: _bmad-output/planning-artifacts/prd.md#NFR4]
3. **Executive Permissions:** Ensure only authenticated executive users can access the global dashboard and divisional views. [Source: _bmad-output/planning-artifacts/architecture.md#RBAC Matrix]
4. **Data Access Control:** Any attempt to access unauthorized client data or another tenant's logs results in a cryptographic block (RLS failure). [Source: _bmad-output/planning-artifacts/epics.md#Story 1.2]
5. **Tech Noir Auth UI:** Login screen follows the visual theme (#0A0A0A base, #C4A35A accents, JetBrains Mono for inputs). [Source: _bmad-output/planning-artifacts/ux-design-specification.md#Visual Design Foundation]

## Tasks / Subtasks

- [ ] **Task 1: Supabase Environment Configuration (AC: 1, 2)**
  - [ ] Initialize Supabase client in `src/lib/supabase.ts`.
  - [ ] Define `tenant_id` handling in middleware or session context.
- [ ] **Task 2: Database Schema & RLS (AC: 2, 4)**
  - [ ] Apply RLS policies to `task_ledger` and `provisioning_ledger` tables.
  - [ ] Ensure `tenant_id` is automatically populated on insert where possible (via triggers or application logic).
  - [ ] Implement `check_tenant_access` SQL function if needed for complex RLS.
- [ ] **Task 3: Executive Auth UI (AC: 5)**
  - [ ] Create `src/app/login/page.tsx` with Tech Noir styling.
  - [ ] Implement login form with "Engine Gold" (#C4A35A) pulse on submit.
  - [ ] Ensure typography uses JetBrains Mono for technical inputs.
- [ ] **Task 4: Authentication Middleware (AC: 3)**
  - [ ] Implement `src/middleware.ts` to protect `/dashboard` and `/api` routes.
  - [ ] Redirect unauthenticated users to `/login`.
- [ ] **Task 5: Validation & Testing (AC: 4)**
  - [ ] Verify RLS by attempting to query data with a mismatched `tenant_id` session.
  - [ ] Ensure 403/RLS errors are handled gracefully in the UI.

## Dev Notes

- **Multi-tenant Isolation:** This is critical for NFR4. We must ensure that the `auth.uid()` and its associated `tenant_id` (stored in a `profiles` or `users` table) are used in every RLS policy.
- **Middleware Integration:** Next.js 16 Middleware should handle the initial auth check and session refresh.
- **Sealed Envelope Pattern (ADR-005):** Auth is the foundation for this. Agents will trigger workflows, but the workflow execution context (Supabase Service Role) must still respect the `tenant_id` provided in the `HandoffEnvelope`.

### Project Structure Notes

- **New Files:** `src/lib/supabase.ts`, `src/app/login/page.tsx`, `src/middleware.ts`.
- **Modifications:** `supabase/migrations/` for RLS policies.

### References

- [Source: _bmad-output/planning-artifacts/prd.md#NFR4] - Multi-tenant Isolation requirement.
- [Source: _bmad-output/planning-artifacts/architecture.md#ADR-005] - Sealed Envelope Pattern.
- [Source: _bmad-output/planning-artifacts/ux-design-specification.md#Visual Design Foundation] - Tech Noir aesthetic tokens.
- [Source: _bmad-output/planning-artifacts/epics.md#Story 1.2] - Epic 1: Story 1.2 definition.

## Dev Agent Record

### Agent Model Used

Gemini 2.5 Flash

### Debug Log References

### Completion Notes List

### File List
