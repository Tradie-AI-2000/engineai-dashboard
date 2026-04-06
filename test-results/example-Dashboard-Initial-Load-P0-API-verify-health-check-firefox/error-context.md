# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: example.spec.ts >> Dashboard Initial Load >> @P0 @API verify health check
- Location: playwright/e2e/example.spec.ts:18:7

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: 200
Received: 500
```

# Test source

```ts
  1  | import { test, expect } from '../support/fixtures';
  2  | import { createTenant } from '../support/factories/tenant-factory';
  3  | 
  4  | test.describe('Dashboard Initial Load', () => {
  5  |   test('should load the dashboard for a new tenant', async ({ page, log }) => {
  6  |     await log.step('Create test tenant');
  7  |     const tenant = createTenant();
  8  |     
  9  |     await log.step('Navigate to dashboard');
  10 |     // In a real test, we would seed the tenant in the DB here
  11 |     await page.goto('/');
  12 |     
  13 |     await log.step('Verify dashboard title');
  14 |     // Using a generic check since we haven't implemented specific data-testids yet
  15 |     await expect(page).toHaveTitle(/EngineAI/);
  16 |   });
  17 | 
  18 |   test('@P0 @API verify health check', async ({ apiRequest, log }) => {
  19 |     await log.step('Check system health');
  20 |     const { status, body } = await apiRequest({
  21 |       method: 'GET',
  22 |       path: '/api/health', // Assuming a health endpoint exists or will be added
  23 |     });
  24 | 
  25 |     // This test will likely fail until the endpoint is added, 
  26 |     // which is correct for TDD / Readiness Probing.
> 27 |     expect(status).toBe(200);
     |                    ^ Error: expect(received).toBe(expected) // Object.is equality
  28 |     expect(body).toMatchObject({ status: 'ok' });
  29 |   });
  30 | });
  31 | 
```