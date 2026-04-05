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
      className="bg-surface/40 backdrop-blur-xl border border-primary/10 p-6 rounded-2xl flex flex-col gap-4 group relative overflow-hidden h-[280px] shadow-[0_10px_30px_rgba(0,0,0,0.3)] hover:shadow-[0_20px_50px_rgba(196,163,90,0.1)] transition-shadow"
    >
      {/* Decorative HUD Corner */}
      <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-primary/20 group-hover:border-primary/40 transition-colors" />
      
      <header className="flex justify-between items-start">
        <div className={`text-[8px] font-mono uppercase px-2 py-0.5 border rounded-xs ${
          item.category === 'technical' ? 'border-primary/40 text-primary' : 'border-muted-foreground/20 text-muted-foreground'
        }`}>
          {item.category || 'general'}
        </div>
        <div className="flex items-center gap-1.5">
          <Award size={10} className="text-primary/60" />
          <span className="text-[10px] font-mono text-primary font-bold">
            {((item.confidence || 0) * 100).toFixed(0)}%
          </span>
        </div>
      </header>

      <div className="flex-1 space-y-2">
        <h3 className="text-lg font-bold text-muted tracking-tight leading-tight uppercase line-clamp-2">{item.title || 'UNTITLED INTEL'}</h3>
        <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3 italic">"{item.summary || 'Initialising summary...'}"</p>
      </div>

      <div className="flex flex-wrap gap-2">
        {(item.tags || []).map(tag => (
          <span key={tag} className="text-[8px] font-mono text-primary/40 uppercase tracking-tighter bg-primary/5 px-1.5 py-0.5 rounded-xs border border-primary/5">
            #{tag}
          </span>
        ))}
      </div>

      <footer className="mt-4 pt-4 border-t border-primary/5 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <FileText size={12} className="text-primary/40" />
          <span className="text-[9px] font-mono text-muted-foreground/60 uppercase truncate max-w-[120px]">{item.source || 'INTERNAL'}</span>
        </div>
        <button 
          aria-label={`View full report for ${item.title}`}
          className="text-primary/40 hover:text-primary transition-colors p-1"
        >
          <ExternalLink size={14} />
        </button>
      </footer>
    </motion.div>
  );
};

export default IntelligenceCard;
