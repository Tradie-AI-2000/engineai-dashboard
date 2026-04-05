'use client'

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, LifeBuoy, Search, Info, CheckCircle2, UserCircle, HelpCircle } from 'lucide-react';

interface Inquiry {
  id: string;
  client: string;
  subject: string;
  status: 'pending' | 'resolving' | 'closed';
  priority: 'low' | 'medium' | 'high';
  timestamp: string;
}

const MOCK_INQUIRIES: Inquiry[] = [
  { id: 'q1', client: 'Jackson Construction', subject: 'AST Sync Verification', status: 'pending', priority: 'high', timestamp: '2026-04-05 14:22' },
  { id: 'q2', client: 'Stellar Logistics', subject: 'Database RLS Boundary clarification', status: 'resolving', priority: 'medium', timestamp: '2026-04-05 13:10' },
];

const ServicesDesk: React.FC = () => {
  const [inquiries, setInquiries] = useState(MOCK_INQUIRIES);

  const handleInitialise = (id: string) => {
    alert(`SYSTEM: Initialising resolution sequence for Enquiry ${id}...`);
  };

  return (
    <div className="flex-1 flex flex-col gap-8 h-full min-h-[600px] font-mono">
      <section className="bg-blue-500/5 border border-blue-500/20 p-8 rounded-sm relative overflow-hidden flex flex-col">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <LifeBuoy size={20} className="text-blue-400" />
            <h2 className="text-xl font-bold text-muted uppercase tracking-tight">Active Inquiries</h2>
          </div>
          <div className="px-2 py-0.5 bg-blue-500/10 border border-blue-500/20 rounded-xs">
            <p className="text-[8px] text-blue-400 animate-pulse uppercase tracking-[0.2em] font-bold">Support Pulse: Active</p>
          </div>
        </div>

        <div className="space-y-4 flex-1">
          {inquiries.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-32 opacity-20">
              <HelpCircle size={24} className="mb-2" />
              <p className="text-[10px] uppercase tracking-widest">No active inquiries</p>
            </div>
          ) : (
            inquiries.map((q) => (
              <div key={q.id} className="bg-black/40 border border-blue-500/10 p-4 rounded-sm group hover:border-blue-500/30 transition-all cursor-pointer">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-3">
                    <div className={`w-1.5 h-1.5 rounded-full ${q.status === 'pending' ? 'bg-red-500' : 'bg-blue-400'}`} />
                    <p className="text-[10px] font-bold text-muted uppercase">{q.client}</p>
                  </div>
                  <span className={`text-[8px] px-1.5 py-0.5 border rounded-xs uppercase ${q.priority === 'high' ? 'border-red-500/40 text-red-500' : 'border-blue-500/20 text-blue-400'}`}>
                    {q.priority} priority
                  </span>
                </div>
                <h3 className="text-sm font-bold text-muted-foreground uppercase group-hover:text-blue-400 transition-colors mb-1">{q.subject}</h3>
                <div className="flex justify-between items-center mt-4 pt-3 border-t border-blue-500/5">
                  <p className="text-[8px] text-muted-foreground/40 uppercase tracking-tighter">{q.timestamp} UTC</p>
                  <button 
                    onClick={(e) => { e.stopPropagation(); handleInitialise(q.id); }}
                    className="text-[9px] text-blue-400/60 hover:text-blue-400 uppercase font-bold underline p-1"
                  >
                    Initialise Response
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      <section className="bg-surface/20 border border-dashed border-primary/10 p-8 rounded-sm relative overflow-hidden flex flex-col h-[300px]">
        <div className="flex items-center gap-3 mb-8 opacity-40">
          <Info size={20} className="text-primary" />
          <h2 className="text-xl font-bold text-muted uppercase tracking-tight">Workflow Interrogation</h2>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center opacity-20 text-center">
          <MessageSquare size={32} className="mb-4 text-primary" />
          <p className="text-xs uppercase tracking-[0.4em]">Use Command Strip to query active pipelines</p>
          <p className="text-[8px] mt-2 italic">Example: "Interrogate Jackson Construction AST Sync"</p>
        </div>
      </section>
    </div>
  );
};

export default ServicesDesk;
