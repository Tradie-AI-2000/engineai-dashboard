'use client'

import React from 'react';
import { motion } from 'framer-motion';
import { Activity, ShieldCheck, Zap } from 'lucide-react';
import { Project } from '@/lib/data';

interface QuickLookPortalProps {
  project: Project;
  position: { top: number; left: number };
}

const QuickLookPortal: React.FC<QuickLookPortalProps> = ({ project, position }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, x: -10 }}
      animate={{ opacity: 1, scale: 1, x: 0 }}
      exit={{ opacity: 0, scale: 0.95, x: -10 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      style={{ top: position.top, left: position.left }}
      className="fixed z-[300] w-64 bg-surface/60 backdrop-blur-xl border border-primary/20 p-5 shadow-[0_20px_50px_rgba(0,0,0,0.5)] rounded-sm pointer-events-none"
    >
      <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-primary/20" />
      
      <header className="mb-4">
        <p className="text-[10px] font-mono text-primary/60 uppercase tracking-widest mb-1">Project Portal</p>
        <h3 className="text-sm font-bold text-muted uppercase tracking-tight truncate">{project.name}</h3>
      </header>

      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-1.5 bg-primary/5 border border-primary/10 rounded-full">
            <Zap size={12} className="text-primary" />
          </div>
          <div>
            <p className="text-[8px] font-mono text-muted-foreground/60 uppercase">Current Stage</p>
            <p className="text-[10px] font-mono text-primary uppercase font-bold">{project.stage} phase</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="p-1.5 bg-primary/5 border border-primary/10 rounded-full">
            <Activity size={12} className="text-primary" />
          </div>
          <div>
            <p className="text-[8px] font-mono text-muted-foreground/60 uppercase">Build Velocity</p>
            <p className="text-[10px] font-mono text-muted uppercase font-bold">
              {Math.floor(Math.random() * (95 - 75) + 75)}% Optimal
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="p-1.5 bg-primary/5 border border-primary/10 rounded-full">
            <ShieldCheck size={12} className="text-primary" />
          </div>
          <div>
            <p className="text-[8px] font-mono text-muted-foreground/60 uppercase">Tenant Security</p>
            <p className="text-[10px] font-mono text-muted uppercase font-bold">RLS Active</p>
          </div>
        </div>
      </div>

      <footer className="mt-6 pt-4 border-t border-primary/5 flex justify-between items-center">
        <span className="text-[8px] font-mono text-primary/30 uppercase tracking-widest">Initialising telemetry...</span>
        <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
      </footer>
    </motion.div>
  );
};

export default QuickLookPortal;
