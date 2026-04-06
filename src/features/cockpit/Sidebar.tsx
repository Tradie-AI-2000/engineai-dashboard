'use client'

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { DivisionSlug, DIVISIONS, Project } from '@/lib/data';
import { useFilteredProjects } from '@/hooks/useFilteredProjects';
import QuickLookPortal from '@/components/ui/QuickLookPortal';
import { AnimatePresence } from 'framer-motion';

interface SidebarProps {
  activeDivision?: DivisionSlug;
}

const Sidebar: React.FC<SidebarProps> = ({ activeDivision = 'global' }) => {
  const filteredProjects = useFilteredProjects(activeDivision);
  const [isTriggering, setIsTriggering] = useState(false);
  
  // Quick-Look Portal State
  const [hoveredProject, setHoveredProject] = useState<Project | null>(null);
  const [portalPos, setPortalPos] = useState({ top: 0, left: 0 });

  // Boundary-aware positioning
  const handleMouseEnter = (e: React.MouseEvent, project: Project) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const portalWidth = 256; // w-64
    let left = rect.right + 10;
    
    // Flip to left if overflowing right edge
    if (left + portalWidth > window.innerWidth) {
      left = rect.left - 10 - portalWidth;
    }

    setPortalPos({ top: rect.top, left });
    setHoveredProject(project);
  };

  // Close portal on scroll or division change
  useEffect(() => {
    const handleScroll = () => setHoveredProject(null);
    window.addEventListener('scroll', handleScroll, true);
    return () => window.removeEventListener('scroll', handleScroll, true);
  }, []);

  useEffect(() => {
    setHoveredProject(null);
  }, [activeDivision]);

  const initiateLoop = async () => {
    setIsTriggering(true);
    try {
      const res = await fetch('/api/workflows/agent-loop', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          tenant_id: '00000000-0000-0000-0000-000000000000', 
          project_name: 'Jackson Construction',
          project_brief: 'Initialise industrial refactor for Construction suite.'
        })
      });
      if (res.ok) {
        alert('SYSTEM: Agent Handoff Loop Initialised. Check Audit Stream.');
      } else {
        throw new Error('Response not OK');
      }
    } catch (err) {
      alert('SYSTEM ERROR: Workflow Initiation Failed.');
    } finally {
      setIsTriggering(false);
    }
  };

  return (
    <>
      {/* Mobile Division Strip */}
      <div className="lg:hidden flex overflow-x-auto p-2 gap-2 bg-background border-b border-white/[0.07] scrollbar-hide">
        {Array.isArray(DIVISIONS) && DIVISIONS.map((d) => (
          <Link 
            key={`mobile-${d.slug}`}
            href={d.slug === 'global' ? '/' : `/division/${d.slug}`}
            aria-label={`Switch to ${d.name} view`}
            className={`text-[9px] font-mono uppercase px-3 py-1 rounded-full whitespace-nowrap transition-all flex-shrink-0 ${
              activeDivision === d.slug 
                ? 'bg-gold text-black' 
                : 'text-secondary border border-white/[0.07] hover:border-white/20'
            }`}
          >
            {d.slug}
          </Link>
        ))}
      </div>

      <aside className="hidden lg:flex w-64 border-r border-white/[0.07] bg-background h-full flex-col">
        <div className="p-4 border-b border-white/[0.07] overflow-y-auto flex-1 text-xs">
          <p className="text-[10px] font-mono uppercase text-secondary tracking-[0.1em] mb-4">Division Access</p>
          <div className="grid grid-cols-1 gap-1 mb-6">
            {Array.isArray(DIVISIONS) && DIVISIONS.map((d) => (
              <Link 
                key={d.slug}
                href={d.slug === 'global' ? '/' : `/division/${d.slug}`}
                aria-label={`Switch to ${d.name} view`}
                className={`text-[10px] font-mono uppercase px-3 py-1.5 rounded-full transition-all ${
                  activeDivision === d.slug 
                    ? 'bg-gold text-black' 
                    : 'text-secondary border border-transparent hover:border-white/[0.07] hover:bg-white/[0.02]'
                }`}
              >
                {d.slug}
              </Link>
            ))}
          </div>

          <div className="flex flex-col gap-2 mb-6">
            <p className="text-[10px] font-mono uppercase text-secondary tracking-[0.1em]">Operations</p>
            <button 
              disabled={isTriggering}
              onClick={initiateLoop}
              className="w-full bg-gold border border-gold/30 text-[10px] font-sans font-semibold text-black px-3 py-2 hover:brightness-110 transition-all uppercase text-left flex justify-between items-center group disabled:opacity-30 rounded-full tracking-[0.08em]"
            >
              <span>{isTriggering ? 'Initialising...' : 'Initiate Handoff Loop'}</span>
              <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
            </button>
          </div>

          <p className="text-[10px] font-mono uppercase text-secondary tracking-[0.1em] mb-4">Project Portfolio</p>
          <div className="space-y-2">
            {!filteredProjects || filteredProjects.length === 0 ? (
              <p className="text-[10px] font-mono text-secondary/40 uppercase p-3">No active projects</p>
            ) : (
              filteredProjects.map((project) => (
                <div
                  key={project.id}
                  onMouseEnter={(e) => handleMouseEnter(e, project)}
                  onMouseLeave={() => setHoveredProject(null)}
                  className={`p-3 bg-white/[0.02] border-l-2 cursor-pointer transition-all group relative rounded-r-lg ${
                    project.status === 'active'
                      ? 'border-gold gold-glow'
                      : project.status === 'blocked'
                      ? 'border-red-500/50'
                      : 'border-transparent'
                  } hover:bg-white/[0.05]`}
                >
                  <p className="text-xs font-mono font-light text-white uppercase truncate">{project.name}</p>
                  <div className="flex justify-between items-center mt-1">
                    <p className="text-[10px] font-mono text-secondary uppercase">{project.stage}</p>
                    <div className={`w-1 h-1 rounded-full ${
                      project.status === 'active' ? 'bg-gold animate-pulse' : project.status === 'blocked' ? 'bg-red-500' : 'bg-secondary'
                    }`} />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
        
        <div className="p-4 border-t border-white/[0.07] mt-auto">
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              const target = e.target as HTMLFormElement;
              const input = target.elements.namedItem('command') as HTMLInputElement;
              if (input && input.value.trim()) {
                alert(`SYSTEM: Executing command "${input.value.trim()}"...`);
                input.value = '';
              }
            }}
            className="relative group mb-4 hidden lg:block"
          >
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary/40">
              <span className="text-[10px] font-mono">$</span>
            </div>
            <input
              name="command"
              type="text"
              placeholder="COMMAND..."
              className="w-full bg-white/[0.02] border border-white/[0.07] p-2 pl-7 text-white focus:border-gold/40 focus:ring-1 focus:ring-gold/20 outline-none transition-all font-mono text-[9px] uppercase tracking-[0.1em] rounded-full"
            />
          </form>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center">
              <span className="text-[10px] font-mono text-gold font-light">JD</span>
            </div>
            <div>
              <p className="text-[10px] font-mono font-light text-white uppercase tracking-tight">Founder Orchestrator</p>
              <p className="text-[9px] font-mono text-secondary uppercase">Session: {activeDivision?.toUpperCase()}</p>
            </div>
          </div>
        </div>
      </aside>

      <AnimatePresence>
        {hoveredProject && (
          <QuickLookPortal 
            project={hoveredProject} 
            position={portalPos} 
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;
