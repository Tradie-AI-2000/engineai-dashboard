'use client'

import React, { useState, useEffect, useMemo } from 'react';
import IntelligenceCard from '@/components/ui/IntelligenceCard';
import CuratorSidebar from '@/features/hub/CuratorSidebar';
import IdeaForge from '@/features/hub/IdeaForge';
import { IntelligenceItem, IntelCategory } from '@/lib/hub-data';
import { getIntelligenceRecords } from '@/lib/hub-client';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, BookOpen, ChevronLeft, Loader2, Sparkles } from 'lucide-react';
import Link from 'next/link';

type HubMode = 'research' | 'forge';

export default function IntelligenceHub() {
  const [mode, setMode] = useState<HubMode>('research');
  const [intel, setIntel] = useState<IntelligenceItem[]>([]);
  const [filter, setFilter] = useState<IntelCategory | 'all'>('all');
  const [search, setSearch] = useState('');
  const [currentTime, setCurrentTime] = useState('');
  const [loading, setLoading] = useState(true);

  // Dynamic NZ Time Display
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('en-NZ', { 
        timeZone: 'Pacific/Auckland', 
        hour12: false,
        hour: '2-digit',
        minute: '2-digit'
      }) + ' NZST');
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  // Real-time Vault Sync
  useEffect(() => {
    let isMounted = true;
    async function loadIntel() {
      try {
        const data = await getIntelligenceRecords();
        if (isMounted) setIntel(data);
      } catch (err) {
        console.error("HUB: Failed to sync with Master Vault.");
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    loadIntel();
    const interval = setInterval(loadIntel, 15000); // 15s poll
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  const filteredIntel = useMemo(() => {
    const cleanSearch = search.trim().toLowerCase();
    return intel.filter(item => {
      const matchesFilter = filter === 'all' || item.category === filter;
      const matchesSearch = (item.title?.toLowerCase() || '').includes(cleanSearch) || 
                           (item.tags || []).some(t => t?.toLowerCase()?.includes(cleanSearch));
      return matchesFilter && matchesSearch;
    });
  }, [intel, filter, search]);

  return (
    <div className="min-h-screen bg-background text-muted selection:bg-primary selection:text-primary-foreground flex flex-col">
      {/* Top Header */}
      <header className="h-20 px-6 lg:px-10 border-b border-primary/10 flex items-center justify-between sticky top-0 bg-background/80 backdrop-blur-md z-50">
        <div className="flex items-center gap-6">
          <Link href="/" aria-label="Return to operational cockpit" className="p-2 border border-primary/20 text-primary/60 hover:text-primary hover:border-primary transition-all rounded-sm flex items-center gap-2 group">
            <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            <span className="text-[10px] font-mono uppercase tracking-widest font-bold">Return to Cockpit</span>
          </Link>
          <div className="h-8 w-[1px] bg-primary/10" />
          <div className="flex items-center gap-3">
            <BookOpen size={20} className="text-primary" />
            <h1 className="text-xl font-bold tracking-tighter text-muted uppercase">Intelligence Hub</h1>
            <div className="flex gap-2 ml-6">
              <button 
                onClick={() => setMode('research')}
                className={`text-[10px] font-mono uppercase px-3 py-1 rounded-sm transition-all border ${mode === 'research' ? 'bg-primary/20 border-primary text-primary' : 'border-transparent text-muted-foreground/40 hover:text-muted'}`}
              >
                Research
              </button>
              <button 
                onClick={() => setMode('forge')}
                className={`text-[10px] font-mono uppercase px-3 py-1 rounded-sm transition-all border flex items-center gap-2 ${mode === 'forge' ? 'bg-primary/20 border-primary text-primary' : 'border-transparent text-muted-foreground/40 hover:text-muted'}`}
              >
                <Sparkles size={10} /> Idea Forge
              </button>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4 font-mono">
          <div className="relative group hidden md:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-primary/40 group-focus-within:text-primary transition-colors" size={14} />
            <input 
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="SEARCH VAULT..."
              aria-label="Search intelligence records"
              className="bg-surface/40 border border-primary/10 p-2 pl-10 text-[10px] uppercase focus:border-primary outline-none transition-all w-64"
            />
          </div>
          <div className="text-right hidden sm:block">
            <p className="text-[8px] text-primary/40 uppercase tracking-widest">NZ Standard Time</p>
            <p className="text-[10px] text-muted uppercase">{currentTime || 'INITIALISING...'}</p>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden relative">
        <CuratorSidebar activeCategory={filter} onCategoryChange={setFilter} />
        
        <main className="flex-1 p-6 lg:p-10 overflow-y-auto bg-background/50">
          <AnimatePresence mode="wait">
            {mode === 'research' ? (
              <motion.div 
                key="research"
                initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }}
              >
                {loading ? (
                  <div className="h-64 flex flex-col items-center justify-center gap-4 opacity-40">
                    <Loader2 size={24} className="animate-spin text-primary" />
                    <p className="text-[10px] font-mono uppercase tracking-[0.3em]">Initialising Vault Sync...</p>
                  </div>
                ) : (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-6">
                      <AnimatePresence mode="popLayout">
                        {filteredIntel.map((item) => (
                          <IntelligenceCard key={item.id} item={item} />
                        ))}
                      </AnimatePresence>
                    </div>
                    {filteredIntel.length === 0 && (
                      <div className="h-64 flex flex-col items-center justify-center opacity-20 border border-dashed border-primary/20 rounded-sm">
                        <p className="text-xs font-mono uppercase tracking-widest italic font-bold">No matching intel records found in Master Vault</p>
                      </div>
                    )}
                  </>
                )}
              </motion.div>
            ) : (
              <motion.div 
                key="forge"
                initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }}
                className="h-full"
              >
                <IdeaForge />
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>

      <footer className="h-10 px-6 lg:px-10 border-t border-primary/5 flex justify-between items-center opacity-40 bg-surface/20 font-mono relative z-20">
        <p className="text-[8px] uppercase tracking-[0.2em] leading-none">Curator Agent v1.0.4 - System: Authorised</p>
        <p className="text-[8px] uppercase tracking-widest leading-none">Mode: {mode.toUpperCase()}</p>
      </footer>
    </div>
  );
}
