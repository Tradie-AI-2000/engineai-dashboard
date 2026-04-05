import { serve } from "@upstash/workflow/nextjs";
import { createLedgerTask } from "@/lib/tasks";
import { generateObject } from "ai";
import { google } from "@ai-sdk/google";
import { z } from "zod";

const InterrogationPayloadSchema = z.object({
  tenant_id: z.string().uuid(),
  query: z.string().min(5).max(1000),
  project_context: z.string().optional(),
});

const DEFAULT_MODEL = "gemini-2.0-flash-001";

export const { POST } = serve(async (context) => {
  const rawPayload = context.requestPayload;
  const parseResult = InterrogationPayloadSchema.safeParse(rawPayload);
  
  if (!parseResult.success) {
    const partialTenantId = (rawPayload as any)?.tenant_id;
    if (partialTenantId) {
      await createLedgerTask({
        tenant_id: partialTenantId,
        sender_role: 'specialist',
        recipient_role: 'executive',
        task_title: `INTERROGATION REJECTED: Malformed Payload`,
        executive_rationale: "Ensuring industrial data integrity by rejecting unvalidated interrogation triggers.",
        payload: { error: parseResult.error.message },
        status: 'failed'
      });
    }
    throw new Error(`CRITICAL: Malformed Interrogation Payload. ${parseResult.error.message}`);
  }

  const { tenant_id, query, project_context } = parseResult.data;

  try {
    // Step 1: Agentic Interrogation - Root Cause Analysis
    const result = await context.run("workflow-interrogation-trace", async () => {
      // Safety: Escape quotes in query for prompt interpolation
      const safeQuery = query.replace(/"/g, '\\"');
      
      const { object } = await generateObject({
        model: google(DEFAULT_MODEL),
        schema: z.object({
          findings: z.string().min(10),
          root_cause: z.string().min(10),
          resolution_path: z.string().min(10),
          rationale: z.string(),
        }),
        prompt: `You are the Supervisor SRE Agent. Interrogate the active workflow for: "${safeQuery}".
                 Project Context: "${project_context || 'Global'}".
                 1. Provide technical findings.
                 2. Identify root cause.
                 3. Propose a resolution path.
                 4. Provide executive rationale in NZ English.`,
      });

      return object;
    });

    // Step 2: Persistence - Ledger Support Audit
    await context.run("log-interrogation-audit", async () => {
      await createLedgerTask({
        tenant_id,
        sender_role: 'executive',
        recipient_role: 'specialist',
        task_title: `Workflow Interrogation: ${query.substring(0, 30)}...`,
        executive_rationale: result.rationale,
        payload: { 
          task_type: 'INTERROGATION_REPORT',
          findings: result.findings,
          root_cause: result.root_cause,
          resolution: result.resolution_path
        },
        status: 'completed'
      });
    });

  } catch (error: any) {
    await context.run("interrogation-failure-audit", async () => {
      const msg = error instanceof Error ? error.message : "Interrogation Sequence Failure";
      if (tenant_id) {
        try {
          await createLedgerTask({
            tenant_id,
            sender_role: 'executive',
            recipient_role: 'specialist',
            task_title: `INTERROGATION FAILURE: ${query.substring(0, 20)}`,
            executive_rationale: "Emergency stop: Interrogation sequence failed. Supervisor SRE notified.",
            payload: { error: msg },
            status: 'failed'
          });
        } catch (dbErr) {
          console.error("INTERROGATION: Primary and secondary audit failure.");
        }
      }
    });
    throw error;
  }
});
