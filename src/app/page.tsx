'use client'

import React, { useState } from 'react';
import HUD from "@/features/cockpit/HUD";
import ManualOverride from "@/features/cockpit/ManualOverride";

export default function Home() {
  const [systemStatus, setSystemStatus] = useState<'active' | 'paused' | 'terminated'>('active');

  const handleOverride = async (state: 'active' | 'paused' | 'terminated') => {
    setSystemStatus(state);
    
    // Industrial Logging: Record intervention to Task Ledger
    if (state !== 'active') {
      console.log(`SYSTEM: Executive Override Initiated - State: ${state.toUpperCase()}`);
      // Actual database logging would happen here in a real build via createLedgerTask
    }
  };

  const isPaused = systemStatus === 'paused' || systemStatus === 'terminated';

  return (
    <div className="min-h-screen bg-[#1f2228] text-white/60 selection:bg-white selection:text-[#1f2228]">
      {/* HUD Header Bar */}
      <nav className="h-16 border-b border-white/10 flex items-center justify-between px-6 bg-[#1f2228] sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 bg-white/5 border border-white/10 flex items-center justify-center rounded-none">
            <span className="text-white font-light font-mono">EA</span>
          </div>
          <span className="font-light font-mono tracking-tighter text-white uppercase">EngineAI <span className="text-white/40 tracking-[0.1em] ml-1 font-mono">OS</span></span>
        </div>
        
        <div className="flex gap-6 items-center">
          <div className="hidden md:flex gap-4">
            <span className={`text-[10px] font-mono uppercase transition-colors ${systemStatus !== 'active' ? 'text-white/60' : 'text-white/40'}`}>
              System: {systemStatus.toUpperCase()}
            </span>
            <span className="text-[10px] font-mono text-white/40 uppercase">Tenant: Executive</span>
          </div>

          <div className="h-8 w-[1px] bg-white/10 hidden md:block" />

          <ManualOverride onOverride={handleOverride} systemStatus={systemStatus} />
          
          <button className="bg-white/5 border border-white/10 text-[10px] font-mono text-white px-3 py-1.5 hover:opacity-50 transition-opacity uppercase tracking-[0.1em] font-light rounded-none">
            Initialise
          </button>
        </div>
      </nav>

      <HUD isSystemPaused={isPaused} />
    </div>
  );
}
