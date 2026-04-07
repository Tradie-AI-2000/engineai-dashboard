/**
 * Model provider shim — Phase 1a.
 *
 * Single source of truth for "which LLM does an agent talk to". Agents
 * import getModel() from here instead of any specific provider package.
 * Swapping providers (OpenAI, OpenRouter, Groq, Ollama, a local model,
 * a different Anthropic tier) is a one-line change in this file plus an
 * env var flip — no agent code changes.
 *
 * Why: Claude is expensive and not the only option. Phase 1a is a holding
 * pattern. The agent runtime should be model-agnostic so we can A/B cost
 * and quality without touching agent prompts.
 *
 * Env contract:
 *   LLM_PROVIDER  — 'anthropic' (default). Future: 'openai', 'openrouter',
 *                   'ollama', 'openai-compatible'.
 *   LLM_MODEL     — provider-specific model id. Default depends on provider.
 *
 * Adding a new provider:
 *   1. npm install the SDK (e.g. @ai-sdk/openai)
 *   2. Add a case to the switch below
 *   3. Set LLM_PROVIDER + LLM_MODEL in .env.local
 *   4. No agent code changes needed.
 */

import { anthropic } from '@ai-sdk/anthropic';
import type { LanguageModel } from 'ai';

type Provider = 'anthropic';

const DEFAULT_MODELS: Record<Provider, string> = {
  anthropic: 'claude-sonnet-4-5',
};

function resolveProvider(): Provider {
  const raw = (process.env.LLM_PROVIDER ?? 'anthropic').toLowerCase();
  if (raw === 'anthropic') return 'anthropic';
  throw new Error(
    `[agents/model] Unknown LLM_PROVIDER: ${raw}. ` +
      `Supported in Phase 1a: anthropic. Add a case in src/lib/agents/model.ts to extend.`,
  );
}

export function getModel(): LanguageModel {
  const provider = resolveProvider();
  const modelId = process.env.LLM_MODEL ?? DEFAULT_MODELS[provider];

  switch (provider) {
    case 'anthropic':
      return anthropic(modelId);
    default: {
      // Exhaustiveness check — TS will complain if a Provider value is missed.
      const _exhaustive: never = provider;
      throw new Error(`unreachable: ${String(_exhaustive)}`);
    }
  }
}
