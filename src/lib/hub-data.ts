export type IntelCategory = 'industry' | 'technical' | 'market' | 'modular';

export interface IntelligenceItem {
  id: string;
  title: string;
  summary: string;
  category: IntelCategory;
  source: string;
  confidence: number;
  tags: string[];
  created_at: string;
}

export const MOCK_INTEL: IntelligenceItem[] = [
  {
    id: 'i1',
    title: "Industrial AST Transformation Trends 2026",
    summary: "Analysing the shift from regex-based refactoring to industrial-grade AST synchronisation in autonomous agencies.",
    category: 'technical',
    source: "MIT Technical Review",
    confidence: 0.94,
    tags: ["AST", "Automation", "Refactoring"],
    created_at: "2026-04-01T10:00:00Z"
  },
  {
    id: 'i2',
    title: "SME 'Business In A Box' Market Penetration",
    summary: "Market research indicates a 40% increase in demand for rapid repo-cloning solutions for small-scale construction firms.",
    category: 'market',
    source: "NZ Commerce Audit",
    confidence: 0.88,
    tags: ["BIAB", "SME", "Construction"],
    created_at: "2026-04-03T14:30:00Z"
  },
  {
    id: 'i3',
    title: "Modular Agent Handoff Latency Benchmarks",
    summary: "Evaluating the overhead of durable Vercel Workflows in multi-step agent coordination pipelines.",
    category: 'technical',
    source: "EngineAI Internal R&D",
    confidence: 0.98,
    tags: ["Performance", "Workflows", "Agents"],
    created_at: "2026-04-04T09:15:00Z"
  }
];
