'use client'

import React, { useState, useEffect } from 'react';
import { Power, Pause, Play, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ManualOverrideProps {
  onOverride: (state: 'active' | 'paused' | 'terminated') => void;
  systemStatus: 'active' | 'paused' | 'terminated';
}

const ManualOverride: React.FC<ManualOverrideProps> = ({ onOverride, systemStatus }) => {
  const [showConfirm, setShowConfirm] = useState(false);
  const isPaused = systemStatus === 'paused';
  const isTerminated = systemStatus === 'terminated';

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setShowConfirm(false);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  const handleTerminate = () => {
    setShowConfirm(false);
    onOverride('terminated');
  };

  return (
    <div className="flex items-center gap-2">
      <button
        disabled={isTerminated}
        onClick={() => onOverride(isPaused ? 'active' : 'paused')}
        aria-label={isPaused ? "Resume orchestration" : "Pause orchestration"}
        className={`p-2 rounded-sm border transition-all ${
          isPaused 
            ? 'bg-amber-500/20 border-amber-500 text-amber-500 animate-pulse' 
            : 'bg-primary/5 border-primary/20 text-primary/60 hover:bg-amber-500/10 hover:border-amber-500/40 hover:text-amber-500 disabled:opacity-30'
        }`}
      >
        {isPaused ? <Play size={16} /> : <Pause size={16} />}
      </button>

      <button
        disabled={isTerminated}
        onClick={() => setShowConfirm(true)}
        aria-label="Terminate all sequences"
        className="p-2 bg-red-500/5 border border-red-500/20 text-red-500/60 hover:bg-red-500/20 hover:border-red-500 hover:text-red-500 transition-all rounded-sm group disabled:opacity-30"
      >
        <Power size={16} className="group-hover:scale-110 transition-transform" />
      </button>

      <AnimatePresence>
        {showConfirm && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 z-[400] flex items-center justify-center p-4 bg-background/80 backdrop-blur-md"
          >
            <div className="bg-surface border border-red-500/40 p-8 max-w-sm w-full shadow-2xl relative overflow-hidden">
              <div className="absolute inset-0 bg-red-500/5 pointer-events-none" />
              
              <div className="relative z-10 text-center">
                <div className="w-12 h-12 bg-red-500/20 border border-red-500/40 rounded-full flex items-center justify-center mx-auto mb-4">
                  <AlertCircle size={24} className="text-red-500" />
                </div>
                <h2 className="text-lg font-bold text-red-500 uppercase tracking-tighter mb-2 font-mono">Termination Sequence</h2>
                <p className="text-xs text-muted-foreground uppercase leading-relaxed mb-8">
                  Confirm absolute termination of all active agent loops. This action is irreversible and will be logged to the Executive Ledger.
                </p>
                
                <div className="flex flex-col gap-3">
                  <button
                    onClick={handleTerminate}
                    className="w-full bg-red-500 text-white font-mono font-bold py-3 uppercase tracking-widest text-xs hover:bg-red-600 transition-colors"
                  >
                    Confirm Termination
                  </button>
                  <button
                    onClick={() => setShowConfirm(false)}
                    className="w-full bg-background border border-primary/20 text-primary/60 font-mono py-2 uppercase tracking-widest text-[10px] hover:bg-primary/5 transition-colors"
                  >
                    Abort Override
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ManualOverride;
