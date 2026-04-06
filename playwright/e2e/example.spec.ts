import { test, expect } from '../support/fixtures';
import { createTenant } from '../support/factories/tenant-factory';

test.describe('Dashboard Initial Load', () => {
  test('should load the dashboard for a new tenant', async ({ page, log }) => {
    await log.step('Create test tenant');
    const tenant = createTenant();
    
    await log.step('Navigate to dashboard');
    // In a real test, we would seed the tenant in the DB here
    await page.goto('/');
    
    await log.step('Verify dashboard title');
    // Using a generic check since we haven't implemented specific data-testids yet
    await expect(page).toHaveTitle(/EngineAI/);
  });

  test('@P0 @API verify health check', async ({ apiRequest, log }) => {
    await log.step('Check system health');
    const { status, body } = await apiRequest({
      method: 'GET',
      path: '/api/health', // Assuming a health endpoint exists or will be added
    });

    // This test will likely fail until the endpoint is added, 
    // which is correct for TDD / Readiness Probing.
    expect(status).toBe(200);
    expect(body).toMatchObject({ status: 'ok' });
  });

  test('should allow mock authentication during testing', async ({ page, log }) => {
    await log.step('Mock Supabase network response');
    await page.route('**/auth/v1/token?grant_type=password', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        json: {
          access_token: 'mock-jwt-token',
          refresh_token: 'mock-refresh-token',
          user: {
            id: 'user-id-123',
            aud: 'authenticated',
            role: 'authenticated',
            email: 'operator@engineai.co.nz',
          }
        }
      });
    });

    await log.step('Execute login sequence');
    await page.goto('/login');
    await page.fill('input[type="email"]', 'operator@engineai.co.nz');
    await page.fill('input[type="password"]', 'testpassword');
    await page.click('button[type="submit"]');

    // Wait for network idle or router push
    await page.waitForLoadState('networkidle');
  });
});
