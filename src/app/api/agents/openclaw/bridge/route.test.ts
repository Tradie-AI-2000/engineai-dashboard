import { describe, it, expect } from 'vitest';

describe('OpenClaw Bridge API', () => {
  it('should reject unauthorized requests', async () => {
    const res = await fetch('http://localhost:3000/api/agents/openclaw/bridge', {
      method: 'POST',
      body: JSON.stringify({}),
    });
    expect(res.status).toBe(401);
  });

  it('should validate the Handoff Envelope', async () => {
    const res = await fetch('http://localhost:3000/api/agents/openclaw/bridge', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer test-key',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ invalid: 'data' }),
    });
    expect(res.status).toBe(400);
  });
});
