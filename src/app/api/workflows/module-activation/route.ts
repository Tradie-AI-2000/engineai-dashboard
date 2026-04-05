import { serve } from "@upstash/workflow/nextjs";
import { createLedgerTask } from "@/lib/tasks";
import { z } from "zod";
import { createClient } from "@/lib/supabase-server";

const ActivationPayloadSchema = z.object({
  tenant_id: z.string().uuid(),
  idea_id: z.string().uuid(),
  concept_title: z.string(),
});

export const { POST } = serve(async (context) => {
  const payload = ActivationPayloadSchema.parse(context.requestPayload);
  const { tenant_id, idea_id, concept_title } = payload;

  try {
    // Step 1: Module State Transition
    await context.run("transition-module-state", async () => {
      const supabase = await createClient();
      
      const { error } = await supabase
        .from('incubated_ideas')
        .update({ status: 'active', updated_at: new Date().toISOString() })
        .eq('id', idea_id);

      if (error) throw error;
      return { status: "active" };
    });

    // Step 2: Handoff to Assembly Line
    await context.run("bootstrap-agent-loop", async () => {
      // Simulation: In Phase 2, this would trigger the agent-loop workflow automatically.
      console.log(`SAGA: Hot-Loading Module "${concept_title}" into Production factory.`);

      await createLedgerTask({
        tenant_id,
        sender_role: 'executive',
        recipient_role: 'manager',
        task_title: `Hot-Load Synchronised: ${concept_title}`,
        executive_rationale: "Authorising live activation of incubated module. Digital Assembly Line assigned.",
        payload: { idea_id, sync_status: "LIVE", priority: "HIGH" },
        status: 'completed'
      });
    });

  } catch (error: any) {
    await context.run("activation-failure-audit", async () => {
      const msg = error instanceof Error ? error.message : "Unknown Activation Failure";
      if (tenant_id) {
        await createLedgerTask({
          tenant_id,
          sender_role: 'executive',
          recipient_role: 'specialist',
          task_title: `ACTIVATION FAILURE: ${concept_title}`,
          executive_rationale: "Emergency stop: Hot-load sequence interrupted. Supervisor SRE notified.",
          payload: { error: msg, phase: "bootstrap" },
          status: 'failed'
        });
      }
    });
    throw error;
  }
});
