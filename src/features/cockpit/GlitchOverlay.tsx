'use client'

import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';

interface GlitchOverlayProps {
  isActive: boolean;
}

const GlitchOverlay: React.FC<GlitchOverlayProps> = ({ isActive }) => {
  if (typeof isActive !== 'boolean' || !isActive) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[300]">
      {/* Red Border Glow */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: [0.2, 0.5, 0.2] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
        className="absolute inset-0 border-4 border-red-500/30 shadow-[inset_0_0_50px_rgba(239,68,68,0.2)]"
      />

      {/* Diagnostic Alert */}
      <div className="absolute top-20 right-8 flex items-center gap-3 bg-red-500/10 border border-red-500/20 p-4 backdrop-blur-md">
        <div className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center animate-pulse">
          <AlertTriangle size={18} className="text-white" />
        </div>
        <div>
          <p className="text-[10px] font-mono text-red-500 font-bold uppercase tracking-[0.2em]">SRE Intervention Active</p>
          <p className="text-[9px] font-mono text-red-400/60 uppercase">Initialising Recovery Sequence...</p>
        </div>
      </div>

      {/* Animated Scanline */}
      <motion.div 
        initial={{ top: '-10%' }}
        animate={{ top: '110%' }}
        transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
        className="absolute left-0 right-0 h-[2px] bg-red-500/10 shadow-[0_0_10px_rgba(239,68,68,0.5)] z-10"
      />
    </div>
  );
};

export default GlitchOverlay;
