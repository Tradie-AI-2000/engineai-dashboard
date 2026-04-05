import { NextRequest, NextResponse } from 'next/server';
import { createLedgerTask } from '@/lib/tasks';
import { createClient } from '@/lib/supabase-server';
import { HandoffEnvelopeSchema, HandoffEnvelope } from '@/lib/schemas/handoff';
import { generateObject } from 'ai';
import { google } from '@ai-sdk/google';
import { z } from 'zod';

// Security: No default hardcoded key in production
const OPENCLAW_API_KEY = process.env.OPENCLAW_API_KEY;
const DEFAULT_MODEL = "gemini-2.0-flash-001";

interface BridgeResponse {
  intent: 'QUERY_STATUS' | 'QUERY_LOGS' | 'UNKNOWN';
  status: 'COMPLETED' | 'FAILED' | 'DELEGATING';
  data?: any;
  rationale?: string;
}

export async function POST(req: NextRequest) {
  // Security: Constant-time comparison or simple check without default
  const authHeader = req.headers.get('Authorization');
  if (!OPENCLAW_API_KEY || authHeader !== `Bearer ${OPENCLAW_API_KEY}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  let rawBody: any;
  try {
    rawBody = await req.json();
  } catch (e) {
    return NextResponse.json({ error: 'Invalid JSON payload' }, { status: 400 });
  }

  const parseResult = HandoffEnvelopeSchema.safeParse(rawBody);
  if (!parseResult.success) {
    // Protocol Alignment: Log failed handshake attempt
    console.warn('Handoff Integrity Violation:', parseResult.error.format());
    return NextResponse.json({ 
      error: 'Invalid Handoff Envelope', 
      details: parseResult.error.format() 
    }, { status: 400 });
  }

  const envelope = parseResult.data;
  const supabase = await createClient();

  try {
    // Step 3: Sealed Envelope Protocol & Agent Logic
    // Security: Sanitize payload for prompt to mitigate injection
    const sanitizedPayload = JSON.stringify(envelope.payload).slice(0, 2000);

    const triage = await generateObject({
      model: google(DEFAULT_MODEL),
      schema: z.object({
        intent: z.enum(['QUERY_STATUS', 'QUERY_LOGS', 'UNKNOWN']),
        project_id: z.string().optional(),
        rationale: z.string(),
      }),
      prompt: `You are the OpenClaw Bridge Agent. Triage this request from an external agent:
               Title: ${envelope.task_title}
               Payload Snippet: ${sanitizedPayload}
               
               Intent should be one of:
               - QUERY_STATUS: For general project progress or health.
               - QUERY_LOGS: For detailed task audit logs.
               - UNKNOWN: For everything else.
               
               Rationale must be in NZ English.`,
    });

    let bridgeResponse: BridgeResponse = { 
      intent: triage.object.intent,
      status: 'FAILED',
      rationale: triage.object.rationale 
    };

    if (triage.object.intent === 'QUERY_STATUS') {
      const { data: statusData, error: statusError } = await supabase
        .from('provisioning_ledger')
        .select('state, github_repo_url, supabase_status, vercel_status, ast_status, updated_at')
        .eq('tenant_id', envelope.tenant_id)
        .order('updated_at', { ascending: false })
        .limit(1)
        .maybeSingle();
      
      if (statusError) throw new Error(`Supabase Status Error: ${statusError.message}`);
      
      if (statusData) {
        bridgeResponse = {
          intent: 'QUERY_STATUS',
          status: 'COMPLETED',
          data: statusData
        };
      }
    } else if (triage.object.intent === 'QUERY_LOGS') {
      const { data: logData, error: logError } = await supabase
        .from('task_ledger')
        .select('task_title, sender_role, recipient_role, status, executive_rationale, created_at')
        .eq('tenant_id', envelope.tenant_id)
        .order('created_at', { ascending: false })
        .limit(5);
      
      if (logError) throw new Error(`Supabase Log Error: ${logError.message}`);
      
      if (logData) {
        bridgeResponse = {
          intent: 'QUERY_LOGS',
          status: 'COMPLETED',
          data: logData
        };
      }
    }

    // Step 4: Audit Logging
    await createLedgerTask({
      ...envelope,
      sender_role: 'openclaw',
      recipient_role: 'executive',
      task_title: `OpenClaw Bridge: ${envelope.task_title}`,
      executive_rationale: triage.object.rationale,
      payload: {
        task_type: 'OPENCLAW_BRIDGE',
        intent: triage.object.intent,
        bridge_status: bridgeResponse.status,
        internal_rationale: triage.object.rationale
      },
      status: bridgeResponse.status === 'COMPLETED' ? 'completed' : 'failed'
    });

    // Protocol Alignment: Return standardized HandoffEnvelope
    const responseEnvelope: HandoffEnvelope = {
      tenant_id: envelope.tenant_id,
      sender_role: 'specialist',
      recipient_role: 'openclaw',
      task_title: `RE: ${envelope.task_title}`,
      payload: bridgeResponse,
      status: bridgeResponse.status === 'COMPLETED' ? 'completed' : 'failed',
      executive_rationale: bridgeResponse.rationale || triage.object.rationale
    };

    return NextResponse.json(responseEnvelope);

  } catch (error: any) {
    console.error('OpenClaw Bridge Error:', error);
    
    // Safety: Ensure failures are logged to the audit trail
    await createLedgerTask({
      tenant_id: envelope.tenant_id,
      sender_role: 'openclaw',
      recipient_role: 'executive',
      task_title: `SYSTEM ALERT: Bridge Failure`,
      executive_rationale: `Emergency stop: External bridge handshake failed. ${error.message}`,
      payload: { error: error.message, task_type: 'OPENCLAW_BRIDGE' },
      status: 'failed'
    });

    return NextResponse.json({ error: 'Internal Server Error', message: error.message }, { status: 500 });
  }
}
