'use client'

import React from 'react';
import { Database, Plus, Inbox, TrendingUp } from 'lucide-react';
import { IntelCategory } from '@/lib/hub-data';

interface CuratorSidebarProps {
  activeCategory: IntelCategory | 'all';
  onCategoryChange: (cat: IntelCategory | 'all') => void;
}

const CuratorSidebar: React.FC<CuratorSidebarProps> = ({ activeCategory, onCategoryChange }) => {
  const categories: (IntelCategory | 'all')[] = ['all', 'technical', 'market', 'industry', 'modular'];

  return (
    <aside className="hidden lg:flex w-72 border-r border-primary/10 bg-surface/20 flex-col font-mono h-auto">
      <div className="p-6 space-y-8">
        <section>
          <p className="text-[10px] text-primary/40 uppercase tracking-[0.3em] mb-4">Ingestion Stream</p>
          <button 
            aria-label="Add new industrial intel"
            className="w-full bg-primary/5 border border-primary/20 p-3 flex items-center justify-between group hover:bg-primary/10 transition-all rounded-sm"
          >
            <span className="text-[10px] text-primary uppercase font-bold">New Industrial Intel</span>
            <Plus size={14} className="text-primary" />
          </button>
        </section>

        <section className="space-y-4">
          <p className="text-[10px] text-primary/40 uppercase tracking-[0.3em]">Knowledge Base</p>
          <div className="space-y-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => onCategoryChange(cat)}
                className={`w-full flex items-center gap-3 p-2 transition-colors group rounded-sm ${
                  activeCategory === cat ? 'bg-primary/10 text-primary border border-primary/20' : 'text-muted-foreground/60 hover:text-muted hover:bg-white/5 border border-transparent'
                }`}
              >
                <Inbox size={14} className={activeCategory === cat ? "text-primary" : "text-primary/40 group-hover:text-primary"} />
                <span className="text-[10px] uppercase font-bold tracking-widest">{cat}</span>
              </button>
            ))}
          </div>
        </section>

        <section>
          <p className="text-[10px] text-primary/40 uppercase tracking-[0.3em] mb-4">System Pulse</p>
          <div className="bg-background/40 border border-primary/5 p-4 rounded-sm space-y-3 opacity-60">
            <div>
              <p className="text-[8px] text-muted-foreground uppercase mb-1">Vector Store</p>
              <p className="text-[10px] text-primary font-bold uppercase">INITIALISED</p>
            </div>
            <div>
              <p className="text-[8px] text-muted-foreground uppercase mb-1">RAG Context</p>
              <p className="text-[10px] text-muted font-bold uppercase">ACTIVE</p>
            </div>
          </div>
        </section>
      </div>

      <div className="mt-auto p-6 border-t border-primary/5 text-center">
        <p className="text-[8px] text-primary/20 uppercase tracking-widest italic">Optimising knowledge density...</p>
      </div>
    </aside>
  );
};

export default CuratorSidebar;
