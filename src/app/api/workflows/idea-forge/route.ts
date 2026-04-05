import { serve } from "@upstash/workflow/nextjs";
import { createLedgerTask } from "@/lib/tasks";
import { generateObject } from "ai";
import { google } from "@ai-sdk/google";
import { z } from "zod";
import { createClient } from "@/lib/supabase-server";

const IdeaForgePayloadSchema = z.object({
  tenant_id: z.string().uuid(),
  concept_title: z.string().min(3).max(100),
  concept_description: z.string().min(10),
});

const DEFAULT_MODEL = "gemini-2.0-flash-001";

export const { POST } = serve(async (context) => {
  const parseResult = IdeaForgePayloadSchema.safeParse(context.requestPayload);
  if (!parseResult.success) throw new Error("CRITICAL: Malformed Idea Forge Payload.");

  const { tenant_id, concept_title, concept_description } = parseResult.data;

  try {
    // Step 1: Research Agent - Industrial Assessment
    const assessmentResult = await context.run("industrial-feasibility-assessment", async () => {
      const { object } = await generateObject({
        model: google(DEFAULT_MODEL),
        schema: z.object({
          viability: z.string(),
          complexity: z.string(),
          required_modules: z.array(z.string()).min(1),
          rationale: z.string(),
        }),
        prompt: `You are the Research Agent. Assess this module concept: "${concept_title}" 
                 Description: "${concept_description}".
                 1. Provide viability assessment.
                 2. Provide technical complexity level.
                 3. List 3-5 required EngineAI modules.
                 4. Provide a 1-sentence executive rationale in NZ English.`,
      });

      return object;
    });

    // Step 2: Atomic Persistence (Idea Vault)
    const idea = await context.run("persist-incubated-idea", async () => {
      const supabase = await createClient();
      const { data, error } = await supabase
        .from('incubated_ideas')
        .insert({
          tenant_id,
          concept_title,
          concept_description,
          assessment: assessmentResult,
          status: 'incubated'
        })
        .select('id')
        .single();

      if (error) throw error;
      return data;
    });

    // Step 3: Atomic Persistence (Audit Ledger)
    await context.run("audit-incubation", async () => {
      await createLedgerTask({
        tenant_id,
        sender_role: 'specialist',
        recipient_role: 'executive',
        task_title: `Incubation Synchronised: ${concept_title}`,
        executive_rationale: assessmentResult.rationale,
        payload: { idea_id: idea.id, viability: assessmentResult.viability },
        status: 'completed'
      });
    });

    return { success: true, assessment: assessmentResult };

  } catch (error: any) {
    await context.run("incubation-failure-audit", async () => {
      const msg = error instanceof Error ? error.message : "Unknown Incubation Failure";
      if (tenant_id) {
        try {
          await createLedgerTask({
            tenant_id,
            sender_role: 'specialist',
            recipient_role: 'executive',
            task_title: `INCUBATION FAILURE: ${concept_title}`,
            executive_rationale: "Recording incubation interruption for Supervisor SRE analysis.",
            payload: { error: msg },
            status: 'failed'
          });
        } catch (dbError) {
          console.error("INCUBATION: Double-fault failure.");
        }
      }
    });
    throw error;
  }
});
