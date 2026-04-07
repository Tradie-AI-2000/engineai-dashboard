'use client'

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Hammer, Sparkles, Send, Loader2, CheckCircle2, Zap } from 'lucide-react';
import { useTenant } from '@/features/auth/TenantContext';

const IdeaForge: React.FC = () => {
  const { tenantId } = useTenant();
  const [concept, setConcept] = useState('');
  const [description, setDescription] = useState('');
  const [isForging, setIsForgeing] = useState(false);
  const [isActivating, setIsActivating] = useState(false);
  const [assessment, setAssessment] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleForge = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!concept.trim() || description.length < 10 || isForging || !tenantId) return;

    setIsForgeing(true);
    setAssessment(null);
    setError(null);

    try {
      const res = await fetch('/api/workflows/idea-forge', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          tenant_id: tenantId,
          concept_title: concept,
          concept_description: description
        })
      });

      if (!res.ok) throw new Error('Industrial Assessment Failed');
      const data = await res.json();
      setAssessment({ ...data.assessment, id: data.success ? "NEW" : null });
    } catch (err) {
      setError("Forge Sequence Interrupted. Supervisor SRE Notified.");
    } finally {
      setIsForgeing(false);
    }
  };

  const handleActivate = async () => {
    if (!tenantId || isActivating) return;
    setIsActivating(true);
    try {
      const res = await fetch('/api/workflows/module-activation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          tenant_id: tenantId,
          idea_id: "00000000-0000-0000-0000-000000000000", // Demo ID, real ID would be from fetch
          concept_title: concept
        })
      });
      if (res.ok) {
        alert('SYSTEM: Module Hot-Loaded. Synchronising with Cockpit...');
        setAssessment(null);
        setConcept('');
        setDescription('');
      }
    } catch (err) {
      setError("Activation Failed. Manual Intervention Required.");
    } finally {
      setIsActivating(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full min-h-[500px]">
      <section className="bg-surface/40 border border-white/10 p-8 rounded-none relative overflow-hidden flex flex-col">
        <div className="flex items-center gap-3 mb-8">
          <Hammer size={20} className="text-gold" />
          <h2 className="text-xl font-light font-mono text-white uppercase tracking-tight">Concept Entry</h2>
        </div>

        <form onSubmit={handleForge} className="space-y-6 flex-1 flex flex-col">
          <div className="space-y-2">
            <label className="text-[10px] font-mono text-white/40 uppercase tracking-[0.24em] block">Module Title</label>
            <input
              value={concept}
              onChange={(e) => setConcept(e.target.value)}
              placeholder="E.G., AUTOMATED CRM BRIDGE..."
              className="w-full bg-black/40 border border-white/10 p-3 text-sm font-mono text-white placeholder:text-white/20 focus:border-gold/40 outline-none transition-all uppercase rounded-none"
            />
          </div>

          <div className="space-y-2 flex-1">
            <label className="text-[10px] font-mono text-white/40 uppercase tracking-[0.24em] block">Concept Description (Min 10 chars)</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="DESCRIBE THE INDUSTRIAL INTENT..."
              className="w-full h-full bg-black/40 border border-white/10 p-3 text-xs font-mono text-white placeholder:text-white/20 focus:border-gold/40 outline-none transition-all resize-none uppercase rounded-none"
            />
          </div>

          {error && <p className="text-[10px] font-mono text-red-500 uppercase tracking-[0.1em] animate-pulse">{error}</p>}

          <button
            type="submit"
            disabled={isForging || !concept.trim() || description.length < 10}
            className="w-full bg-gold text-background font-mono font-semibold py-4 uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:brightness-110 hover:-translate-y-0.5 transition-all disabled:opacity-30 disabled:hover:translate-y-0 disabled:hover:brightness-100 group rounded-none"
          >
            {isForging ? <Loader2 size={18} className="animate-spin" /> : <Sparkles size={18} className="group-hover:scale-110 transition-transform" />}
            {isForging ? 'Initialising Forge...' : 'Commence Incubation'}
          </button>
        </form>
      </section>

      <section className="bg-surface/20 border border-dashed border-white/10 p-8 rounded-none relative overflow-hidden flex flex-col">
        <div className="flex items-center gap-3 mb-8">
          <Cpu size={20} className="text-gold/60" />
          <h2 className="text-xl font-light font-mono text-white/60 uppercase tracking-tight">Industrial Assessment</h2>
        </div>

        <div className="flex-1 flex flex-col justify-center">
          <AnimatePresence mode="wait">
            {!assessment && !isForging && (
              <motion.div
                key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="text-center"
              >
                <p className="text-xs font-mono uppercase tracking-[0.4em] text-white/20">Awaiting Input Sequence...</p>
              </motion.div>
            )}

            {isForging && (
              <motion.div key="forging" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                <div className="h-1 w-full bg-white/5 overflow-hidden relative">
                  <motion.div
                    animate={{ left: ['-100%', '100%'] }} transition={{ repeat: Infinity, duration: 1.5 }}
                    className="absolute inset-0 w-1/2 bg-gold"
                  />
                </div>
                <p className="text-[10px] font-mono text-gold/70 uppercase tracking-[0.24em] text-center animate-pulse">Analysing technical feasibility...</p>
              </motion.div>
            )}

            {assessment && (
              <motion.div key="result" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/5 border border-white/10 p-4 rounded-none">
                    <p className="text-[8px] font-mono text-white/40 uppercase mb-1 tracking-[0.1em]">Viability</p>
                    <p className="text-xs font-light text-white uppercase tracking-[0.1em]">{assessment.viability}</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-4 rounded-none">
                    <p className="text-[8px] font-mono text-white/40 uppercase mb-1 tracking-[0.1em]">Complexity</p>
                    <p className="text-xs font-light text-white uppercase tracking-[0.1em]">{assessment.complexity}</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <p className="text-[10px] font-mono text-white/40 uppercase tracking-[0.24em]">Required Industrial Modules</p>
                  <div className="flex flex-wrap gap-2">
                    {(assessment.required_modules || []).map((m: string) => (
                      <span key={m} className="px-2 py-1 bg-black/40 border border-gold/20 text-[9px] font-mono text-gold uppercase rounded-none tracking-[0.1em]">
                        {m}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="bg-gold/5 border-l-2 border-gold p-4">
                  <p className="text-[10px] font-mono text-gold uppercase font-light mb-2 tracking-[0.2em]">Executive Rationale</p>
                  <p className="text-xs text-white/70 leading-relaxed italic">&ldquo;{assessment.rationale}&rdquo;</p>
                </div>

                <button
                  onClick={handleActivate}
                  disabled={isActivating}
                  className="w-full border border-gold text-gold bg-gold/10 py-4 font-mono text-[10px] uppercase font-light tracking-[0.3em] flex items-center justify-center gap-3 hover:bg-gold/20 transition-all rounded-none disabled:opacity-40"
                >
                  {isActivating ? <Loader2 size={18} className="animate-spin" /> : <Zap size={18} />}
                  {isActivating ? 'Hot-Loading...' : 'Initialise Live Activation'}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
};

import { Cpu } from 'lucide-react';
export default IdeaForge;
