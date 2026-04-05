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
    <div className="min-h-screen bg-background text-muted selection:bg-primary selection:text-primary-foreground">
      {/* HUD Header Bar */}
      <nav className="h-16 border-b border-primary/20 flex items-center justify-between px-6 bg-surface/80 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 bg-primary/10 border border-primary/30 flex items-center justify-center shadow-[0_0_15px_rgba(196,163,90,0.1)]">
            <span className="text-primary font-bold">EA</span>
          </div>
          <span className="font-bold tracking-tighter text-muted uppercase">EngineAI <span className="text-primary tracking-widest ml-1 font-mono">OS</span></span>
        </div>
        
        <div className="flex gap-6 items-center">
          <div className="hidden md:flex gap-4">
            <span className={`text-[10px] font-mono uppercase transition-colors ${systemStatus !== 'active' ? 'text-amber-500' : 'text-primary/60'}`}>
              System: {systemStatus.toUpperCase()}
            </span>
            <span className="text-[10px] font-mono text-primary/60 uppercase">Tenant: Executive</span>
          </div>

          <div className="h-8 w-[1px] bg-primary/10 hidden md:block" />

          <ManualOverride onOverride={handleOverride} systemStatus={systemStatus} />
          
          <button className="bg-primary/10 border border-primary/20 text-[10px] font-mono text-primary px-3 py-1.5 hover:bg-primary/20 transition-colors uppercase tracking-widest font-bold">
            Initialise
          </button>
        </div>
      </nav>

      <HUD isSystemPaused={isPaused} />
    </div>
  );
}
