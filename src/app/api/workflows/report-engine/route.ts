import { serve } from "@upstash/workflow/nextjs";
import { createLedgerTask } from "@/lib/tasks";
import { generateObject } from "ai";
import { google } from "@ai-sdk/google";
import { z } from "zod";

const ReportPayloadSchema = z.object({
  tenant_id: z.string().uuid(),
  report_title: z.string().min(3),
  division_slug: z.string().optional().default('global'),
  telemetry_snapshot: z.record(z.any()),
});

const DEFAULT_MODEL = "gemini-2.0-flash-001";

export const { POST } = serve(async (context) => {
  const rawPayload = context.requestPayload;
  const parseResult = ReportPayloadSchema.safeParse(rawPayload);
  
  if (!parseResult.success) {
    const partialTenantId = (rawPayload as any)?.tenant_id;
    if (partialTenantId) {
      await createLedgerTask({
        tenant_id: partialTenantId,
        sender_role: 'specialist',
        recipient_role: 'executive',
        task_title: `REPORT REJECTED: Malformed Payload`,
        executive_rationale: "Ensuring industrial data integrity by rejecting unvalidated report triggers.",
        payload: { error: parseResult.error.message },
        status: 'failed'
      });
    }
    throw new Error(`CRITICAL: Malformed Report Payload. ${parseResult.error.message}`);
  }

  const { tenant_id, report_title, division_slug, telemetry_snapshot } = parseResult.data;

  try {
    const reportResult = await context.run("generate-slide-deck", async () => {
      const { object } = await generateObject({
        model: google(DEFAULT_MODEL),
        schema: z.object({
          executive_summary: z.string(),
          slides: z.array(z.object({
            title: z.string(),
            content: z.array(z.string()).min(1),
            metric_highlight: z.string().optional(),
          })).min(1), // Guard against division-by-zero in UI
          rationale: z.string(),
        }),
        prompt: `You are the Report Agent. Title: "${report_title}" (${division_slug}).
                 Telemetry: ${JSON.stringify(telemetry_snapshot).substring(0, 2000)}.
                 1. 1-sentence summary. 2. 3-5 slides. 3. Use NZ English. 4. Focus on industrial progress.`,
      });

      return object;
    });

    await context.run("log-report-artifact", async () => {
      await createLedgerTask({
        tenant_id,
        sender_role: 'specialist',
        recipient_role: 'executive',
        task_title: `Performance Report: ${report_title}`,
        executive_rationale: reportResult.rationale,
        payload: { 
          task_type: 'PERFORMANCE_REPORT',
          summary: reportResult.executive_summary,
          slides: reportResult.slides,
          division: division_slug,
          artifact_url: `https://engineai.co.nz/reports/${tenant_id}/${Date.now()}`
        },
        status: 'completed'
      });
    });

  } catch (error: any) {
    await context.run("report-failure-audit", async () => {
      const msg = error instanceof Error ? error.message : "Unknown Reporting Failure";
      if (tenant_id) {
        await createLedgerTask({
          tenant_id,
          sender_role: 'specialist',
          recipient_role: 'executive',
          task_title: `REPORT FAILURE: ${report_title}`,
          executive_rationale: "Recording compilation interruption for Supervisor SRE analysis.",
          payload: { error: msg, phase: "compilation" },
          status: 'failed'
        });
      }
    });
    throw error;
  }
});
