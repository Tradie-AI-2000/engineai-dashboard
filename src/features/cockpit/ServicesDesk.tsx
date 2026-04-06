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
      <section className="bg-white/2 border border-white/10 p-8 rounded-none relative overflow-hidden flex flex-col">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <LifeBuoy size={20} className="text-white" />
            <h2 className="text-xl font-light text-foreground uppercase tracking-tight">Active Inquiries</h2>
          </div>
          <div className="px-2 py-0.5 bg-white/5 border border-white/10 rounded-none">
            <p className="text-[8px] text-white animate-pulse uppercase tracking-[0.2em] font-bold">Support Pulse: Active</p>
          </div>
        </div>

        <div className="space-y-4 flex-1">
          {inquiries.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-32 opacity-20">
              <HelpCircle size={24} className="mb-2" />
              <p className="text-[10px] uppercase tracking-widest text-secondary">No active inquiries</p>
            </div>
          ) : (
            inquiries.map((q) => (
              <div key={q.id} className="bg-black/20 border border-white/10 p-4 rounded-none group hover:opacity-50 transition-all cursor-pointer">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-3">
                    <div className={`w-1.5 h-1.5 rounded-none ${q.status === 'pending' ? 'bg-white' : 'border border-white/40'}`} />
                    <p className="text-[10px] font-bold text-secondary uppercase">{q.client}</p>
                  </div>
                  <span className={`text-[8px] px-1.5 py-0.5 border rounded-none uppercase ${q.priority === 'high' ? 'border-white/40 text-white font-bold' : 'border-white/10 text-white/60'}`}>
                    {q.priority} priority
                  </span>
                </div>
                <h3 className="text-sm font-bold text-foreground uppercase mb-1">{q.subject}</h3>
                <div className="flex justify-between items-center mt-4 pt-3 border-t border-white/5">
                  <p className="text-[8px] text-secondary uppercase tracking-tighter">{q.timestamp} UTC</p>
                  <button 
                    onClick={(e) => { e.stopPropagation(); handleInitialise(q.id); }}
                    className="text-[9px] text-white/80 hover:text-white uppercase font-bold underline p-1"
                  >
                    Initialise Response
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      <section className="bg-white/2 border border-dashed border-white/10 p-8 rounded-none relative overflow-hidden flex flex-col h-[300px]">
        <div className="flex items-center gap-3 mb-8 opacity-60">
          <Info size={20} className="text-white" />
          <h2 className="text-xl font-light text-foreground uppercase tracking-tight">Workflow Interrogation</h2>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center opacity-40 text-center">
          <MessageSquare size={32} className="mb-4 text-white" />
          <p className="text-xs uppercase tracking-[0.4em] text-secondary">Use Command Strip to query active pipelines</p>
          <p className="text-[8px] mt-2 italic text-secondary">Example: "Interrogate Jackson Construction AST Sync"</p>
        </div>
      </section>
    </div>
  );
};

export default ServicesDesk;
