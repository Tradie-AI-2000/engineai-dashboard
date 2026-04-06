'use client'

import React from 'react';
import { motion } from 'framer-motion';
import { IntelligenceItem } from '@/lib/hub-data';
import { FileText, ExternalLink, Award } from 'lucide-react';

interface IntelligenceCardProps {
  item: IntelligenceItem;
}

const IntelligenceCard: React.FC<IntelligenceCardProps> = ({ item }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="bg-[#1f2228] border border-white/10 p-6 rounded-none flex flex-col gap-4 group relative overflow-hidden h-[280px] transition-opacity hover:opacity-50"
    >
      {/* Decorative HUD Corner */}
      <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-white/10 group-hover:opacity-50 transition-opacity" />
      
      <header className="flex justify-between items-start">
        <div className={`text-[8px] font-mono uppercase px-2 py-0.5 border rounded-none ${
          item.category === 'technical' ? 'border-white/40 text-white' : 'border-white/20 text-white/60'
        }`}>
          {item.category || 'general'}
        </div>
        <div className="flex items-center gap-1.5">
          <Award size={10} className="text-white/40" />
          <span className="text-[10px] font-mono text-white font-light">
            {((item.confidence || 0) * 100).toFixed(0)}%
          </span>
        </div>
      </header>

      <div className="flex-1 space-y-2">
        <h3 className="text-lg font-light font-mono text-white tracking-tight leading-tight uppercase line-clamp-2">{item.title || 'UNTITLED INTEL'}</h3>
        <p className="text-xs font-sans text-white/50 leading-relaxed line-clamp-3 italic">"{item.summary || 'Initialising summary...'}"</p>
      </div>

      <div className="flex flex-wrap gap-2">
        {(item.tags || []).map(tag => (
          <span key={tag} className="text-[8px] font-mono text-white/40 uppercase tracking-tighter bg-white/5 px-1.5 py-0.5 rounded-none border border-white/10">
            #{tag}
          </span>
        ))}
      </div>

      <footer className="mt-4 pt-4 border-t border-white/10 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <FileText size={12} className="text-white/40" />
          <span className="text-[9px] font-mono text-white/60 uppercase truncate max-w-[120px]">{item.source || 'INTERNAL'}</span>
        </div>
        <button 
          aria-label={`View full report for ${item.title}`}
          className="text-white/40 hover:opacity-50 transition-opacity p-1"
        >
          <ExternalLink size={14} />
        </button>
      </footer>
    </motion.div>
  );
};

export default IntelligenceCard;
