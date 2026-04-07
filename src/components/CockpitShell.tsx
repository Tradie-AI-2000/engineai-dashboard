'use client'

import React, { createContext, useContext, useState } from 'react'
import ManualOverride from '@/features/cockpit/ManualOverride'

type SystemStatus = 'active' | 'paused' | 'terminated'

interface CockpitShellContextValue {
  systemStatus: SystemStatus
  isSystemPaused: boolean
}

const CockpitShellContext = createContext<CockpitShellContextValue>({
  systemStatus: 'active',
  isSystemPaused: false,
})

/**
 * Read the cockpit shell state (paused / terminated overrides) from
 * inside any descendant of <CockpitShell>. Returns the default state
 * (`active`, not paused) when called outside the shell, so consumers
 * stay safe in routes that intentionally render bare (e.g. /login).
 */
export function useCockpitShell() {
  return useContext(CockpitShellContext)
}

interface CockpitShellProps {
  children: React.ReactNode
}

/**
 * The standard EngineAI cockpit chrome: top nav with brand, system
 * status, manual override, and an Initialise button. Wraps the HUD on
 * the home page (`/`) and every division page (`/division/[slug]`).
 *
 * State (system override) lives in this component and is exposed to
 * descendants via React Context (`useCockpitShell`). The plain
 * `children: ReactNode` shape lets server components compose this
 * shell — render-prop style children would not survive the
 * server -> client boundary.
 *
 * Lives here (rather than in app/layout.tsx) because the /login route
 * intentionally renders bare without the cockpit chrome.
 */
export default function CockpitShell({ children }: CockpitShellProps) {
  const [systemStatus, setSystemStatus] = useState<SystemStatus>('active')

  const handleOverride = async (state: SystemStatus) => {
    setSystemStatus(state)
    if (state !== 'active') {
      // eslint-disable-next-line no-console
      console.log(`SYSTEM: Executive Override Initiated - State: ${state.toUpperCase()}`)
      // Real database logging via createLedgerTask will go here.
    }
  }

  const isSystemPaused = systemStatus === 'paused' || systemStatus === 'terminated'

  return (
    <CockpitShellContext.Provider value={{ systemStatus, isSystemPaused }}>
      <div className="min-h-screen bg-background text-white/60 selection:bg-white selection:text-background">
        <nav className="h-16 border-b border-white/10 flex items-center justify-between px-6 bg-background sticky top-0 z-50">
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 bg-white/5 border border-white/10 flex items-center justify-center rounded-none">
              <span className="text-white font-light font-mono">EA</span>
            </div>
            <span className="font-light font-mono tracking-tighter text-white uppercase">
              EngineAI <span className="text-white/40 tracking-[0.1em] ml-1 font-mono">OS</span>
            </span>
          </div>

          <div className="flex gap-6 items-center">
            <div className="hidden md:flex gap-4">
              <span
                className={`text-[10px] font-mono uppercase transition-colors ${
                  systemStatus !== 'active' ? 'text-white/60' : 'text-white/40'
                }`}
              >
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

        {children}
      </div>
    </CockpitShellContext.Provider>
  )
}
