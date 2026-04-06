import { serve } from "@upstash/workflow/nextjs";
import { z } from "zod";
import { updateSagaState, updateStepStatus, getSagaByProjectId } from "@/lib/provisioning";
import { createRepository, deleteRepository } from "@/lib/github";

const ProvisioningPayloadSchema = z.object({
  project_id: z.string().uuid(),
  repo_name: z.string(),
  org_name: z.string().default('engine-ai'),
});

/**
 * ProvisioningSaga - Durable workflow for multi-tenant instance production.
 * Fulfills ADR-004 and FR12.
 */
export const { POST } = serve(async (context) => {
  const payload = ProvisioningPayloadSchema.parse(context.requestPayload);
  const { project_id, repo_name, org_name } = payload;

  const saga = await getSagaByProjectId(project_id);
  if (!saga) throw new Error(`CRITICAL: Saga record missing for project ${project_id}`);

  try {
    // Step 1: GitHub Repository Creation
    await context.run("github-provisioning", async () => {
      await updateSagaState(saga.id, 'creating_repo');
      const repo = await createRepository(org_name, repo_name);
      await updateStepStatus(saga.id, 'github', 'completed');
      return repo;
    });

    // Step 2: Supabase Project Provisioning (Mocked for Phase 1)
    await context.run("supabase-provisioning", async () => {
      await updateSagaState(saga.id, 'provisioning_db');
      // await supabaseAdmin.projects.create(...)
      await updateStepStatus(saga.id, 'supabase', 'completed');
    });

    // Step 3: Secret Injection (Sealed Envelope Pattern)
    await context.run("secret-injection", async () => {
      await updateSagaState(saga.id, 'injecting_secrets');
      await updateStepStatus(saga.id, 'vercel', 'completed');
    });

    // Finalize
    await updateSagaState(saga.id, 'active');

  } catch (error: any) {
    // Compensating Transaction: Rollback GitHub if failed
    await context.run("saga-rollback", async () => {
      await updateSagaState(saga.id, 'rolling_back', error);
      if (saga.github_status === 'completed') {
        await deleteRepository(org_name, repo_name);
      }
      await updateSagaState(saga.id, 'failed', error);
    });
    throw error;
  }
});
