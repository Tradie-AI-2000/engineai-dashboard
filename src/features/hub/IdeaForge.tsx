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
      <section className="bg-surface/40 border border-primary/10 p-8 rounded-sm relative overflow-hidden flex flex-col">
        <div className="flex items-center gap-3 mb-8">
          <Hammer size={20} className="text-primary" />
          <h2 className="text-xl font-bold text-muted uppercase tracking-tight">Concept Entry</h2>
        </div>

        <form onSubmit={handleForge} className="space-y-6 flex-1 flex flex-col">
          <div className="space-y-2">
            <label className="text-[10px] font-mono text-primary/60 uppercase tracking-widest block">Module Title</label>
            <input 
              value={concept}
              onChange={(e) => setConcept(e.target.value)}
              placeholder="E.G., AUTOMATED CRM BRIDGE..."
              className="w-full bg-black/40 border border-primary/20 p-3 text-sm font-mono text-muted focus:border-primary outline-none transition-all uppercase"
            />
          </div>

          <div className="space-y-2 flex-1">
            <label className="text-[10px] font-mono text-primary/60 uppercase tracking-widest block">Concept Description (Min 10 chars)</label>
            <textarea 
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="DESCRIBE THE INDUSTRIAL INTENT..."
              className="w-full h-full bg-black/40 border border-primary/20 p-3 text-xs font-mono text-muted focus:border-primary outline-none transition-all resize-none uppercase"
            />
          </div>

          {error && <p className="text-[10px] font-mono text-red-500 uppercase animate-pulse">{error}</p>}

          <button 
            type="submit"
            disabled={isForging || !concept.trim() || description.length < 10}
            className="w-full bg-primary text-primary-foreground font-mono font-bold py-4 uppercase tracking-[0.3em] flex items-center justify-center gap-3 hover:opacity-90 transition-all disabled:opacity-30 group"
          >
            {isForging ? <Loader2 size={18} className="animate-spin" /> : <Sparkles size={18} className="group-hover:scale-110 transition-transform" />}
            {isForging ? 'Initialising Forge...' : 'Commence Incubation'}
          </button>
        </form>
      </section>

      <section className="bg-surface/20 border border-dashed border-primary/10 p-8 rounded-sm relative overflow-hidden flex flex-col">
        <div className="flex items-center gap-3 mb-8 opacity-40">
          <Cpu size={20} className="text-primary" />
          <h2 className="text-xl font-bold text-muted uppercase tracking-tight">Industrial Assessment</h2>
        </div>

        <div className="flex-1 flex flex-col justify-center">
          <AnimatePresence mode="wait">
            {!assessment && !isForging && (
              <motion.div 
                key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="text-center opacity-20"
              >
                <p className="text-xs font-mono uppercase tracking-[0.4em]">Awaiting Input Sequence...</p>
              </motion.div>
            )}

            {isForging && (
              <motion.div key="forging" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                <div className="h-1 w-full bg-primary/10 overflow-hidden relative">
                  <motion.div 
                    animate={{ left: ['-100%', '100%'] }} transition={{ repeat: Infinity, duration: 1.5 }}
                    className="absolute inset-0 w-1/2 bg-primary"
                  />
                </div>
                <p className="text-[10px] font-mono text-primary/60 uppercase tracking-widest text-center animate-pulse">Analysing technical feasibility...</p>
              </motion.div>
            )}

            {assessment && (
              <motion.div key="result" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-primary/5 border border-primary/10 p-4 rounded-xs">
                    <p className="text-[8px] font-mono text-primary/40 uppercase mb-1">Viability</p>
                    <p className="text-xs font-bold text-muted uppercase">{assessment.viability}</p>
                  </div>
                  <div className="bg-primary/5 border border-primary/10 p-4 rounded-xs">
                    <p className="text-[8px] font-mono text-primary/40 uppercase mb-1">Complexity</p>
                    <p className="text-xs font-bold text-muted uppercase">{assessment.complexity}</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <p className="text-[10px] font-mono text-primary/40 uppercase tracking-widest font-bold">Required Industrial Modules</p>
                  <div className="flex flex-wrap gap-2">
                    {(assessment.required_modules || []).map((m: string) => (
                      <span key={m} className="px-2 py-1 bg-black/40 border border-primary/20 text-[9px] font-mono text-primary uppercase rounded-xs">
                        {m}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="bg-primary/10 border-l-2 border-primary p-4">
                  <p className="text-[10px] font-mono text-primary uppercase font-bold mb-2">Executive Rationale</p>
                  <p className="text-xs text-muted-foreground leading-relaxed italic">"{assessment.rationale}"</p>
                </div>

                <button 
                  onClick={handleActivate}
                  disabled={isActivating}
                  className="w-full border border-primary text-primary bg-primary/10 py-4 font-mono text-[10px] uppercase font-bold tracking-[0.3em] flex items-center justify-center gap-3 hover:bg-primary/20 transition-all animate-pulse"
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
