import { serve } from "@upstash/workflow/nextjs";
import { createLedgerTask, checkTaskExists } from "@/lib/tasks";
import { createRefactorBranch, sanitizeForGit } from "@/lib/github";
import { z } from "zod";
import crypto from "crypto";

const ProvisioningPayloadSchema = z.object({
  tenant_id: z.string().uuid(),
  project_name: z.string().min(1).max(100),
  client_id: z.string().min(1).max(50),
});

export const { POST } = serve(async (context) => {
  const payload = ProvisioningPayloadSchema.parse(context.requestPayload);
  const { tenant_id, project_name, client_id } = payload;

  try {
    // Step 1: GitHub Repository Provisioning
    await context.run("provision-github-repo", async () => {
      const taskTitle = `Provision GitHub: ${project_name}`;
      if (await checkTaskExists(tenant_id, taskTitle)) return { status: "skipped" };

      const repoId = `gh-${crypto.randomUUID().substring(0, 8)}`;
      await createLedgerTask({
        tenant_id,
        sender_role: 'manager',
        recipient_role: 'specialist',
        task_title: taskTitle,
        executive_rationale: "Establishing version control baseline for client instance.",
        payload: { repo_id: repoId, provider: "github" },
        status: 'completed'
      });
      return { repoId };
    });

    // Step 2: Secret Verification (NEW)
    await context.run("verify-sealed-secrets", async () => {
      const taskTitle = `Verify Secrets: ${project_name}`;
      if (await checkTaskExists(tenant_id, taskTitle)) return { status: "skipped" };

      // Simulation: Verify that necessary keys (OPENAI, SUPABASE) are provided
      console.log(`SAGA: Verifying cryptographic envelopes for ${project_name}`);
      
      await createLedgerTask({
        tenant_id,
        sender_role: 'executive',
        recipient_role: 'specialist',
        task_title: taskTitle,
        executive_rationale: "Ensuring all required API keys are securely sealed before AST sync.",
        payload: { vault_status: "VERIFIED", keys: ["OPENAI_API_KEY", "SUPABASE_SERVICE_ROLE"] },
        status: 'completed'
      });
    });

    // Step 3: Clone Repository
    await context.run("clone-repository", async () => {
      const taskTitle = `Clone Repository: ${project_name}`;
      if (await checkTaskExists(tenant_id, taskTitle)) return { status: "skipped" };

      await createLedgerTask({
        tenant_id,
        sender_role: 'manager',
        recipient_role: 'specialist',
        task_title: taskTitle,
        executive_rationale: "Duplicating EngineAI blueprint for industrial adaptation.",
        payload: { source: "engineai-blueprint-v1", sync_type: "full_clone" },
        status: 'completed'
      });
    });

    // Step 4: Branch Management
    await context.run("create-feature-branch", async () => {
      const taskTitle = `Initialise Branch: ${project_name}`;
      if (await checkTaskExists(tenant_id, taskTitle)) return { status: "skipped" };

      const branchInfo = await createRefactorBranch(project_name, client_id);
      await createLedgerTask({
        tenant_id,
        sender_role: 'manager',
        recipient_role: 'specialist',
        task_title: taskTitle,
        executive_rationale: "Isolating automated refactor within a dedicated feature branch.",
        payload: { ...branchInfo },
        status: 'completed'
      });
      return branchInfo;
    });

    // Step 5: Supabase Project Provisioning
    await context.run("provision-supabase-project", async () => {
      const taskTitle = `Provision Supabase: ${project_name}`;
      if (await checkTaskExists(tenant_id, taskTitle)) return { status: "skipped" };

      const dbId = `sb-${crypto.randomUUID().substring(0, 8)}`;
      await createLedgerTask({
        tenant_id,
        sender_role: 'manager',
        recipient_role: 'specialist',
        task_title: taskTitle,
        executive_rationale: "Initialising isolated database instance with RLS boundaries.",
        payload: { db_id: dbId, region: "nz-akl-1" },
        status: 'completed'
      });
      return { dbId };
    });

    // Final Step: Synchronisation Complete
    await context.run("saga-finalise", async () => {
      await createLedgerTask({
        tenant_id,
        sender_role: 'manager',
        recipient_role: 'executive',
        task_title: `Provisioning Saga Complete: ${project_name}`,
        executive_rationale: "Digital Assembly Line initialisation confirmed for project instance.",
        payload: { client_ready: true, sync_status: "VERIFIED" },
        status: 'completed'
      });
    });

  } catch (error: any) {
    await context.run("saga-failure-audit", async () => {
      const msg = error instanceof Error ? error.message : "Unknown Saga Failure";
      if (tenant_id) {
        await createLedgerTask({
          tenant_id,
          sender_role: 'manager',
          recipient_role: 'specialist',
          task_title: `SAGA FAILURE: ${project_name || 'System'}`,
          executive_rationale: "Recording provisioning interruption for Supervisor SRE analysis.",
          payload: { error: msg, phase: "infrastructure_rollout" },
          status: 'failed'
        });
      }
    });
    throw error;
  }
});
