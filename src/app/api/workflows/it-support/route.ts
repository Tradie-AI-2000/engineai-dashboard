import { serve } from "@upstash/workflow/nextjs";
import { createLedgerTask } from "@/lib/tasks";
import { generateObject } from "ai";
import { google } from "@ai-sdk/google";
import { z } from "zod";

const ITSupportPayloadSchema = z.object({
  tenant_id: z.string().uuid(),
});

const DEFAULT_MODEL = "gemini-2.0-flash-001";

export const { POST } = serve(async (context) => {
  const parseResult = ITSupportPayloadSchema.safeParse(context.requestPayload);
  if (!parseResult.success) throw new Error("CRITICAL: Malformed IT Support Payload.");

  const { tenant_id } = parseResult.data;

  try {
    // Step 1: IT Agent - Infrastructure Health Audit
    const auditResult = await context.run("system-health-audit", async () => {
      const { object } = await generateObject({
        model: google(DEFAULT_MODEL),
        schema: z.object({
          system_status: z.enum(['OPTIMAL', 'DEGRADED', 'CRITICAL']),
          latency_ms: z.number(),
          service_health: z.object({
            vercel: z.string(),
            supabase: z.string(),
            github: z.string(),
          }),
          rationale: z.string(),
        }),
        prompt: `You are the IT Support Agent. Perform an industrial audit of the agency infrastructure.
                 1. Simulate status checks for Vercel, Supabase, and GitHub.
                 2. Determine overall system status.
                 3. Provide a 1-sentence rationale in NZ English (e.g., synchronising, optimising).`,
      });

      return object;
    });

    // Step 2: Persistence - Ledger Audit Log
    await context.run("log-infrastructure-audit", async () => {
      await createLedgerTask({
        tenant_id,
        sender_role: 'specialist', // IT Agent
        recipient_role: 'executive',
        task_title: `Infrastructure Audit: System ${auditResult.system_status}`,
        executive_rationale: auditResult.rationale,
        payload: { 
          task_type: 'IT_HEALTH',
          status: auditResult.system_status,
          latency: `${auditResult.latency_ms}ms`,
          services: auditResult.service_health
        },
        status: 'completed'
      });
    });

    return { success: true, audit: auditResult };

  } catch (error: any) {
    await context.run("it-failure-audit", async () => {
      const msg = error instanceof Error ? error.message : "Infrastructure Audit Failure";
      if (tenant_id) {
        await createLedgerTask({
          tenant_id,
          sender_role: 'specialist',
          recipient_role: 'executive',
          task_title: `SYSTEM ALERT: Audit Failure`,
          executive_rationale: "Emergency stop: Infrastructure monitor sequence failed. Supervisor SRE notified.",
          payload: { error: msg },
          status: 'failed'
        });
      }
    });
    throw error;
  }
});
