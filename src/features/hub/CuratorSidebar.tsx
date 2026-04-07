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
    <aside className="hidden lg:flex w-72 border-r border-white/10 bg-surface/40 flex-col font-mono h-auto">
      <div className="p-6 space-y-8">
        <section>
          <p className="text-[10px] text-white/40 uppercase tracking-[0.3em] mb-4">Ingestion Stream</p>
          <button
            aria-label="Add new industrial intel"
            className="w-full bg-gold/5 border border-gold/20 p-3 flex items-center justify-between group hover:bg-gold/10 hover:border-gold/40 transition-all rounded-none"
          >
            <span className="text-[10px] text-gold uppercase font-light tracking-[0.1em]">New Industrial Intel</span>
            <Plus size={14} className="text-gold" />
          </button>
        </section>

        <section className="space-y-4">
          <p className="text-[10px] text-white/40 uppercase tracking-[0.3em]">Knowledge Base</p>
          <div className="space-y-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => onCategoryChange(cat)}
                className={`w-full flex items-center gap-3 p-2 transition-colors group rounded-none border ${
                  activeCategory === cat
                    ? 'bg-gold/10 text-gold border-gold/30'
                    : 'text-white/40 hover:text-white hover:bg-white/5 border-transparent'
                }`}
              >
                <Inbox size={14} className={activeCategory === cat ? 'text-gold' : 'text-white/30 group-hover:text-gold/70'} />
                <span className="text-[10px] uppercase font-light tracking-[0.2em]">{cat}</span>
              </button>
            ))}
          </div>
        </section>

        <section>
          <p className="text-[10px] text-white/40 uppercase tracking-[0.3em] mb-4">System Pulse</p>
          <div className="bg-background/40 border border-white/10 p-4 rounded-none space-y-3">
            <div>
              <p className="text-[8px] text-white/30 uppercase mb-1 tracking-[0.1em]">Vector Store</p>
              <p className="text-[10px] text-gold font-light uppercase tracking-[0.1em]">Initialised</p>
            </div>
            <div>
              <p className="text-[8px] text-white/30 uppercase mb-1 tracking-[0.1em]">RAG Context</p>
              <p className="text-[10px] text-white/70 font-light uppercase tracking-[0.1em]">Active</p>
            </div>
          </div>
        </section>
      </div>

      <div className="mt-auto p-6 border-t border-white/10 text-center">
        <p className="text-[8px] text-white/20 uppercase tracking-[0.2em] italic">Optimising knowledge density...</p>
      </div>
    </aside>
  );
};

export default CuratorSidebar;
