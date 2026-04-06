# EngineAI Dashboard - Test Framework (Playwright)

This directory contains the automated E2E and API testing suite for the EngineAI Dashboard, built using **Playwright** and **@seontechnologies/playwright-utils**.

## 🏗️ Architecture

- **`e2e/`**: System-level journey tests and API contract validations.
- **`support/fixtures/`**: Composable test infrastructure. Use the merged `test` object from `index.ts`.
- **`support/factories/`**: Faker-based data generation for multi-tenant entities (e.g., Tenants, Agents).
- **`support/helpers/`**: Shared utilities for DB seeding and auth management.

## 🚀 Getting Started

### 1. Prerequisites
Ensure you have the dependencies installed:
```bash
npm install
```

### 2. Environment Setup
Copy `.env.local.example` to `.env.local` and ensure the testing variables are set:
```env
TEST_ENV=local
BASE_URL=http://localhost:3000
API_URL=http://localhost:3000/api
```

### 3. Install Browsers
```bash
npx playwright install
```

## 🛠️ Running Tests

| Command | Description |
| :--- | :--- |
| `npm run test:e2e` | Run all tests in headless mode. |
| `npm run test:e2e:ui` | Open Playwright UI for interactive testing. |
| `npm run test:e2e:p0` | Run only critical P0 / Smoke tests. |
| `npm run test:e2e:debug` | Run tests in debug mode. |

## 🧪 Best Practices

- **Selectors**: Always prioritize `data-testid` or ARIA roles. Avoid brittle CSS selectors.
- **Isolation**: Each test should be hermetic. Use `Tenant` factories to create isolated state.
- **API-First**: Seed data via API or DB helpers before navigating to the UI.
- **Cleanup**: Use fixtures with automatic cleanup to prevent data pollution.

## 📚 References
- [Playwright Documentation](https://playwright.dev/docs/intro)
- [Playwright Utils Guide](../.gemini/skills/bmad-testarch-framework/resources/knowledge/overview.md)
- [Risk-Based Testing](../_bmad-output/test-artifacts/test-design-qa.md)
