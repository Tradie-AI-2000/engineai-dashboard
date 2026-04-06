'use client'

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock } from 'lucide-react';

/**
 * 6-Stage Lifecycle for the Progressive Ribbon
 * Discovery -> Analysis -> Plan -> Solutioning -> Implementation -> Handoff
 */
const STAGES = [
  { id: 'discovery', label: 'Discovery' },
  { id: 'analysis', label: 'Analysis' },
  { id: 'plan', label: 'Plan' },
  { id: 'solutioning', label: 'Solutioning' },
  { id: 'implementation', label: 'Implementation' },
  { id: 'handoff', label: 'Handoff' },
];

interface ProgressiveRibbonProps {
  currentStageId: string;
  lockedStages?: string[];
  onToggleLock?: (stageId: string) => void;
}

const ProgressiveRibbon: React.FC<ProgressiveRibbonProps> = ({ 
  currentStageId, 
  lockedStages = [], 
  onToggleLock 
}) => {
  const currentIndex = STAGES.findIndex(s => s.id === currentStageId);
  // Default to first stage if not found
  const activeIndex = currentIndex === -1 ? 0 : currentIndex;
  const progressPercent = STAGES.length > 1 ? (activeIndex / (STAGES.length - 1)) * 100 : 100;

  return (
    <div className="w-full py-8 px-4 overflow-x-auto scrollbar-hide">
      <div className="min-w-[700px] relative h-20">
        {/* SVG Track Background */}
        <svg className="absolute top-1/2 left-0 w-full h-1 -translate-y-1/2 overflow-visible">
          {/* Base Track */}
          <line 
            x1="0" y1="0" x2="100%" y2="0" 
            className="stroke-white/[0.07]" 
            strokeWidth="1" 
          />
          {/* Progress Indicator */}
          <motion.line 
            x1="0" y1="0" x2={`${progressPercent}%`} y2="0" 
            className="stroke-gold" 
            strokeWidth="1.5"
            initial={{ x2: 0 }}
            animate={{ x2: `${progressPercent}%` }}
            transition={{ duration: 1.2, ease: "circOut" }}
          />
          
          {/* Scan-line Effect */}
          <motion.line
            x1="0" y1="0" x2="20" y2="0"
            className="stroke-gold/50"
            strokeWidth="2"
            animate={{ x: ["0%", "100%"] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          />
        </svg>

        <div className="flex justify-between relative z-10 h-full items-center">
          {STAGES.map((stage, index) => {
            const isActive = index === activeIndex;
            const isCompleted = index < activeIndex;
            const isLocked = (lockedStages || []).includes(stage.id);

            return (
              <div key={stage.id} className="flex flex-col items-center justify-center gap-3 px-2">
                <button 
                  onClick={() => onToggleLock?.(stage.id)}
                  aria-label={isLocked ? `Unlock ${stage.label}` : `Lock ${stage.label} for manual intervention`}
                  className="relative group transition-opacity hover:opacity-80 active:scale-95 outline-none"
                >
                  {/* Node Visualization */}
                  <motion.div
                    className={`w-3.5 h-3.5 rounded-sm rotate-45 border transition-all duration-500 ${
                      isLocked 
                        ? 'bg-red-500 border-red-400 shadow-[0_0_15px_rgba(239,68,68,0.4)]'
                        : isActive 
                        ? 'bg-gold border-gold shadow-[0_0_20px_rgba(196,163,90,0.6)]' 
                        : isCompleted 
                        ? 'bg-gold/60 border-gold/40' 
                        : 'bg-[#0A0A0A] border-white/20'
                    }`}
                    animate={isActive && !isLocked ? { 
                      scale: [1, 1.15, 1],
                      boxShadow: [
                        "0 0 10px rgba(196,163,90,0.4)", 
                        "0 0 25px rgba(196,163,90,0.8)", 
                        "0 0 10px rgba(196,163,90,0.4)"
                      ]
                    } : {}}
                    transition={isActive && !isLocked ? { 
                      repeat: Infinity, 
                      duration: 1.5,
                      ease: "easeInOut"
                    } : {}}
                  />
                  
                  {/* Lock Indicator */}
                  <AnimatePresence>
                    {isLocked && (
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.5, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                        className="absolute -top-7 left-1/2 -translate-x-1/2 text-red-500"
                      >
                        <Lock size={14} className="animate-pulse" />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Active Aura */}
                  {isActive && !isLocked && (
                    <motion.div
                      className="absolute inset-0 rounded-sm rotate-45 border border-gold/50"
                      animate={{ scale: [1, 1.8], opacity: [0.5, 0] }}
                      transition={{ repeat: Infinity, duration: 1.5, ease: "easeOut" }}
                    />
                  )}

                  <div className="absolute -inset-3 border border-white/0 group-hover:border-white/10 rounded-full transition-colors" />
                </button>

                {/* Stage Metadata */}
                <div className="text-center min-h-[35px] pointer-events-none">
                  <p className={`text-[10px] font-mono font-medium uppercase tracking-[0.15em] transition-colors duration-500 ${
                    isLocked ? 'text-red-400' : isActive ? 'text-gold' : isCompleted ? 'text-white/80' : 'text-white/20'
                  }`}>
                    {stage.label}
                  </p>
                  
                  <div className="h-4">
                    {isLocked ? (
                      <p className="text-[8px] font-mono text-red-500/80 uppercase mt-1 tracking-tighter font-light">Intervention Active</p>
                    ) : isActive ? (
                      <motion.p 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-[8px] font-mono text-gold/60 uppercase mt-1 tracking-widest font-light"
                      >
                        Active Phase
                      </motion.p>
                    ) : null}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProgressiveRibbon;
