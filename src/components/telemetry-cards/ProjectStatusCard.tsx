'use client'

import React from 'react';
import { motion } from 'framer-motion';
import { Target, Calendar, User, Layout } from 'lucide-react';

interface ProjectStatusCardProps {
  name: string;
  status: string;
  stage: string;
  division: string;
  lastUpdated: string;
}

const ProjectStatusCard: React.FC<ProjectStatusCardProps> = ({ name, status, stage, division, lastUpdated }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-[#0A0A0A] border border-gold/20 p-4 rounded-lg relative overflow-hidden group w-full max-w-sm"
    >
      <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-gold/10" />
      
      <header className="flex justify-between items-start mb-4">
        <div>
          <p className="text-[10px] font-mono text-gold/60 uppercase tracking-widest leading-none mb-1">Project Status</p>
          <h3 className="text-xl font-light text-white tracking-tight leading-tight uppercase truncate">{name}</h3>
        </div>
        <div className="bg-gold/10 px-2 py-0.5 border border-gold/20 rounded-none">
          <span className="text-[8px] font-mono text-gold uppercase tracking-tighter">{status}</span>
        </div>
      </header>

      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="space-y-1">
          <div className="flex items-center gap-1.5">
            <Target size={12} className="text-gold/40" />
            <span className="text-[9px] font-mono text-secondary/60 uppercase tracking-widest">Stage</span>
          </div>
          <p className="text-sm font-light text-white uppercase truncate">{stage}</p>
        </div>
        <div className="space-y-1">
          <div className="flex items-center gap-1.5">
            <Layout size={12} className="text-gold/40" />
            <span className="text-[9px] font-mono text-secondary/60 uppercase tracking-widest">Division</span>
          </div>
          <p className="text-sm font-light text-white uppercase truncate">{division}</p>
        </div>
      </div>

      <footer className="mt-4 pt-4 border-t border-white/5 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Calendar size={12} className="text-gold/40" />
          <span className="text-[9px] font-mono text-secondary/40 uppercase tracking-tighter">Updated: {new Date(lastUpdated).toLocaleDateString()}</span>
        </div>
        <div className="w-2 h-2 rounded-full bg-gold animate-pulse" />
      </footer>
    </motion.div>
  );
};

export default ProjectStatusCard;
