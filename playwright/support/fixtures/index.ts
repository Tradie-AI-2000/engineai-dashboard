import { mergeTests } from '@playwright/test';
import { test as apiRequestFixture } from '@seontechnologies/playwright-utils/api-request/fixtures';
import { test as recurseFixture } from '@seontechnologies/playwright-utils/recurse/fixtures';
import { 
  createAuthFixtures, 
  setAuthProvider, 
  authStorageInit, 
  configureAuthSession 
} from '@seontechnologies/playwright-utils/auth-session';
import { log } from '@seontechnologies/playwright-utils/log';
import mockAuthProvider from '../auth/mock-auth-provider';
import path from 'path';

/**
 * Initialize and configure auth session persistence.
 */
authStorageInit();
configureAuthSession({
  authStoragePath: path.resolve(process.cwd(), '.auth'),
});

// Register the mock provider early
setAuthProvider(mockAuthProvider);

/**
 * Merge playwright-utils fixtures.
 */
const mergedUtils = mergeTests(
  apiRequestFixture,
  recurseFixture
);

/**
 * Extend with auth fixtures and custom log fixture.
 */
export const test = mergedUtils.extend({
  ...createAuthFixtures(),
  
  // Override log fixture to support the .step() syntax used in sample tests
  log: async ({}, use) => {
    await use(log);
  },
});

export { expect } from '@playwright/test';
