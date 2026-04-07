/**
 * Cockpit home — Phase 1a placeholder.
 *
 * Step 5 wires in <BriefForm /> and <RunHistory />. For now, this is the
 * empty shell that proves the chrome + Context + RSC boundary all work.
 */

export default function CockpitHome() {
  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <section>
        <h1 className="font-mono text-xl uppercase tracking-wider text-primary">
          Executive Cockpit
        </h1>
        <p className="mt-2 text-sm text-secondary">
          Phase 1a — Internal Loop Proof. Submit a brief, watch the run, read
          the PRD. <span className="text-muted">(BriefForm + RunHistory land in Step 5.)</span>
        </p>
      </section>

      <section className="rounded-sm border border-border bg-surface px-6 py-8">
        <p className="font-mono text-xs uppercase tracking-wider text-muted">
          shell ready · awaiting step 3 (supabase) and step 4 (agents)
        </p>
      </section>
    </div>
  );
}
