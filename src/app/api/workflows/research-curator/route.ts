import { serve } from "@upstash/workflow/nextjs";
import { createLedgerTask } from "@/lib/tasks";
import { generateObject } from "ai";
import { google } from "@ai-sdk/google";
import { z } from "zod";
import { createClient } from "@/lib/supabase-server";

const ResearchPayloadSchema = z.object({
  tenant_id: z.string().uuid(),
  source_url: z.string().url().optional(),
  raw_text: z.string().min(10),
  category_hint: z.string().optional(),
});

const DEFAULT_MODEL = "gemini-2.0-flash-001";

export const { POST } = serve(async (context) => {
  // Safety: Manual parse inside workflow to ensure failure audit is possible
  const rawPayload = context.requestPayload;
  const parseResult = ResearchPayloadSchema.safeParse(rawPayload);
  
  if (!parseResult.success) {
    // Attempt audit if tenant_id is available in raw payload
    const partialTenantId = (rawPayload as any)?.tenant_id;
    if (partialTenantId) {
      await createLedgerTask({
        tenant_id: partialTenantId,
        sender_role: 'specialist',
        recipient_role: 'executive',
        task_title: `RESEARCH REJECTED: Malformed Payload`,
        executive_rationale: "Ensuring industrial data integrity by rejecting unvalidated research inputs.",
        payload: { error: parseResult.error.message },
        status: 'failed'
      });
    }
    throw new Error(`CRITICAL: Malformed Research Payload. ${parseResult.error.message}`);
  }

  const { tenant_id, raw_text, source_url, category_hint } = parseResult.data;

  try {
    // Step 1: Research Agent - Analysis & Summarisation
    const intelResult = await context.run("analyse-industrial-intel", async () => {
      const { object } = await generateObject({
        model: google(DEFAULT_MODEL),
        schema: z.object({
          title: z.string(),
          summary: z.string(),
          category: z.enum(['industry', 'technical', 'market', 'modular']),
          confidence: z.number().min(0).max(1),
          tags: z.array(z.string()),
          rationale: z.string(),
        }),
        prompt: `You are the Research Agent. Analyse: "${raw_text}".
                 1. Provide title and summary.
                 2. Categorise intel (hint: ${category_hint || 'automatic'}).
                 3. Confidence score (0-1).
                 4. Extract tags.
                 5. ALL text (summary, rationale, title) MUST use NZ English (e.g., prioritising, optimising, organisation).`,
      });

      return object;
    });

    // Step 2: Atomic Persistence (Vault)
    const recordId = await context.run("persist-intel-record", async () => {
      const supabase = await createClient();
      const { data, error } = await supabase
        .from('intelligence_records')
        .insert({
          tenant_id,
          title: intelResult.title,
          summary: intelResult.summary,
          category: intelResult.category,
          source: source_url || "INTERNAL_RESEARCH",
          confidence: intelResult.confidence,
          tags: intelResult.tags,
          metadata: { rationale: intelResult.rationale }
        })
        .select('id')
        .single();

      if (error) throw error;
      return data.id;
    });

    // Step 3: Atomic Persistence (Ledger)
    await context.run("audit-intel-curation", async () => {
      await createLedgerTask({
        tenant_id,
        sender_role: 'specialist',
        recipient_role: 'executive',
        task_title: `Intel Curated: ${intelResult.title}`,
        executive_rationale: intelResult.rationale,
        payload: { record_id: recordId, category: intelResult.category },
        status: 'completed'
      });
    });

  } catch (error: any) {
    await context.run("research-failure-audit", async () => {
      const msg = error instanceof Error ? error.message : "Unknown Research Failure";
      await createLedgerTask({
        tenant_id,
        sender_role: 'specialist',
        recipient_role: 'executive',
        task_title: `RESEARCH FAILURE: ${source_url || 'System'}`,
        executive_rationale: "Recording curation interruption for Supervisor SRE analysis.",
        payload: { error: msg, phase: "intel_curation" },
        status: 'failed'
      });
    });
    throw error;
  }
});
