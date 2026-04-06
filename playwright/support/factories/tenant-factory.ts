import { faker } from '@faker-js/faker';

export interface Tenant {
  id: string;
  name: string;
  subdomain: string;
  createdAt: string;
}

/**
 * Creates a mock Tenant object for testing.
 * @param overrides Optional property overrides
 */
export function createTenant(overrides: Partial<Tenant> = {}): Tenant {
  const name = faker.company.name();
  return {
    id: faker.string.uuid(),
    name,
    subdomain: faker.helpers.slugify(name).toLowerCase(),
    createdAt: new Date().toISOString(),
    ...overrides,
  };
}
