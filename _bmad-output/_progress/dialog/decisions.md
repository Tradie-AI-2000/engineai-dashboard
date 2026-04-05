# Key Decisions

**Project:** EngineAI Dashboard
**Last Updated:** 2026-04-04

---

## Strategic Decisions

### Decision: Tech Stack & Architecture
- **Decision:** Next.js 16, Vercel AI SDK v6, Supabase, and Vercel Workflows.
- **Rationale:** Most economical and "fit-for-purpose" for a web-native application. AI SDK v6 provides superior agent abstractions and MCP support.
- **Implications:** Enables real-time UI streaming and durable autonomous execution without the overhead of separate Python backends.

### Decision: Business Model Focus
- **Decision:** Focus 100% on **Internal Engine AI Operations** for the initial build.
- **Rationale:** Founders need a "battle-hardened" system first. Shelving external client/B2B exploration prevents premature complexity.
- **Implications:** Design priority is system connectivity and autonomous pipeline execution (Discovery -> SOW). White-labeling remains a future roadmap item.

### Decision: Success Criteria & Metrics
- **Decision:** Focus on the "Scalability Multiplier," "One-Day Delivery," and "Consistency & Confidence" metrics.
- **Rationale:** Success is defined by decoupling client volume from founder effort, achieving a 24-hour lead-to-build velocity, and maintaining 100% client satisfaction through high-fidelity template consistency.
- **Implications:** Requires robust autonomous handoff logic and high-quality "Golden Templates" that minimize the need for human refactoring.

### Decision: Competitive Landscape & Unfair Advantage
- **Decision:** Position the dashboard as a "Conductor" rather than a replacement for existing tools (Linear, Slack, Notion).
- **Rationale:** Leverages the reliability of specialized tools via MCP integration while solving the "fragmentation" problem. The unfair advantage is the founders' pragmatic, grassroots business problem-solving lens combined with technical architectural expertise.
- **Implications:** Focus on building robust MCP bridges and orchestration logic that "reaches into" existing tools rather than rebuilding their functionality.

### Decision: Design Constraints & Parameters
- **Decision:** Target a 1-week functional MVP with a strict dark/premium/gold Engine AI aesthetic and comprehensive tool integration (Telegram, Discord, Drive, Workspace, Claude).
- **Rationale:** Proving the "Operator" model requires immediate high-velocity delivery. The aesthetic reinforces the premium consultancy brand.
- **Implications:** Focus on building wide-reaching MCP bridges immediately to handle the vast integration surface area.

### Decision: Platform & Device Strategy
- **Decision:** Desktop-First Responsive Web Application (Persistent Cloud Connection).
- **Rationale:** Optimized for the laptop as the primary founder workstation ("Executive Cockpit"). Laptop provides necessary screen real estate for complex multi-agent oversight.
- **Implications:** Focus on high-information-density desktop layouts. Primary interactions are Visual Cards + Agent Chat + Voice commands. Mobile view remains secondary for metric checks.

### Decision: Tone of Voice
- **Decision:** "Senior Operator" tone: Direct, Grounded, Calmly Authoritative, and Technical/Precise.
- **Rationale:** Aligns with the "@BRAND.md" mandate of "Operators, not consultants" and respects the technical depth of the Founder-Orchestrators (Ben & Joe).
- **Implications:** Use minimalist, outcome-focused microcopy. Replace generic SaaS phrases with precise operational terms (e.g., "Agent reasoning in progress," "Initiate Pipeline").

### Product Brief Synthesis (Step 12)

**Final narrative presented:** Yes

**Adjustments during synthesis:**
- Clarified that "Business in a Box" (BIAB) components are EngineAI-specific for the internal version.

**User confirmation:** Confirmed

**Brief generated:** _bmad-output/planning-artifacts/A-Product-Brief/product-brief.md

**Completion:** 2026-04-04 
