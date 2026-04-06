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
      className="fixed z-[300] w-64 bg-[#1f2228] border border-white/10 p-5 rounded-none pointer-events-none"
    >
      <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-white/10" />
      
      <header className="mb-4">
        <p className="text-[10px] font-mono text-white/50 uppercase tracking-[0.1em] mb-1">Project Portal</p>
        <h3 className="text-sm font-mono font-light text-white uppercase tracking-tight truncate">{project.name}</h3>
      </header>

      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-1.5 bg-white/5 border border-white/10 rounded-none">
            <Zap size={12} className="text-white" />
          </div>
          <div>
            <p className="text-[8px] font-mono text-white/40 uppercase">Current Stage</p>
            <p className="text-[10px] font-mono text-white uppercase">{project.stage} phase</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="p-1.5 bg-white/5 border border-white/10 rounded-none">
            <Activity size={12} className="text-white" />
          </div>
          <div>
            <p className="text-[8px] font-mono text-white/40 uppercase">Build Velocity</p>
            <p className="text-[10px] font-mono text-white uppercase">
              {Math.floor(Math.random() * (95 - 75) + 75)}% Optimal
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="p-1.5 bg-white/5 border border-white/10 rounded-none">
            <ShieldCheck size={12} className="text-white" />
          </div>
          <div>
            <p className="text-[8px] font-mono text-white/40 uppercase">Tenant Security</p>
            <p className="text-[10px] font-mono text-white uppercase">RLS Active</p>
          </div>
        </div>
      </div>

      <footer className="mt-6 pt-4 border-t border-white/10 flex justify-between items-center">
        <span className="text-[8px] font-mono text-white/40 uppercase tracking-[0.1em]">Initialising telemetry...</span>
        <div className="w-1.5 h-1.5 rounded-none bg-white opacity-50 animate-pulse" />
      </footer>
    </motion.div>
  );
};

export default QuickLookPortal;
