import { NextResponse } from 'next/server';

/**
 * P0 Health Check Endpoint
 * Used for TEA Readiness Probes.
 */
export async function GET() {
  return NextResponse.json({ status: 'ok' }, { status: 200 });
}
