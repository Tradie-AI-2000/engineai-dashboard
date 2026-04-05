import { serve } from "@upstash/workflow/nextjs";
import { createLedgerTask } from "@/lib/tasks";
import { generateObject } from "ai";
import { google } from "@ai-sdk/google";
import { z } from "zod";

const MarketingPayloadSchema = z.object({
  tenant_id: z.string().uuid(),
  project_name: z.string(),
  milestone_title: z.string(),
  technical_summary: z.string(),
});

const DEFAULT_MODEL = "gemini-2.0-flash-001";

export const { POST } = serve(async (context) => {
  const rawPayload = context.requestPayload;
  const parseResult = MarketingPayloadSchema.safeParse(rawPayload);
  
  if (!parseResult.success) {
    const partialTenantId = (rawPayload as any)?.tenant_id;
    if (partialTenantId) {
      await createLedgerTask({
        tenant_id: partialTenantId,
        sender_role: 'specialist',
        recipient_role: 'executive',
        task_title: `MARKETING REJECTED: Malformed Payload`,
        executive_rationale: "Ensuring industrial creative standards by rejecting unvalidated content triggers.",
        payload: { error: parseResult.error.message },
        status: 'failed'
      });
    }
    throw new Error(`CRITICAL: Malformed Marketing Payload. ${parseResult.error.message}`);
  }

  const { tenant_id, project_name, milestone_title, technical_summary } = parseResult.data;

  try {
    const creativeResult = await context.run("generate-social-content", async () => {
      const { object } = await generateObject({
        model: google(DEFAULT_MODEL),
        schema: z.object({
          linkedin_post: z.string().min(1),
          twitter_post: z.string().min(1).max(280),
          creative_rationale: z.string(),
          tone_audit: z.string(),
        }),
        prompt: `You are the Marketing Agent. Milestone: "${milestone_title}" for "${project_name}".
                 Technical Context: "${technical_summary}".
                 1. Generate LinkedIn post (strategic).
                 2. Generate Twitter/X post (max 280 chars, technical).
                 3. 1-sentence rationale.
                 4. Tone check (Tech Noir).
                 5. ALL copy MUST use NZ English.`,
      });

      return object;
    });

    await context.run("log-marketing-draft", async () => {
      await createLedgerTask({
        tenant_id,
        sender_role: 'specialist',
        recipient_role: 'executive',
        task_title: `Creative Draft: ${milestone_title}`,
        executive_rationale: creativeResult.creative_rationale,
        payload: { 
          task_type: 'MARKETING_DRAFT',
          linkedin: creativeResult.linkedin_post,
          twitter: creativeResult.twitter_post,
          tone_audit: creativeResult.tone_audit,
          project_name
        },
        status: 'completed'
      });
    });

  } catch (error: any) {
    await context.run("marketing-failure-audit", async () => {
      const msg = error instanceof Error ? error.message : "Unknown Marketing Failure";
      await createLedgerTask({
        tenant_id,
        sender_role: 'specialist',
        recipient_role: 'executive',
        task_title: `CREATIVE FAILURE: ${milestone_title}`,
        executive_rationale: "Recording content generation interruption for Supervisor SRE analysis.",
        payload: { error: msg, phase: "copywriting" },
        status: 'failed'
      });
    });
    throw error;
  }
});
