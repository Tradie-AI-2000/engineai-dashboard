'use client'

import React from 'react';
import { motion } from 'framer-motion';

interface FlickerOverlayProps {
  isActive: boolean;
}

const FlickerOverlay: React.FC<FlickerOverlayProps> = ({ isActive }) => {
  if (!isActive) return null;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 0.15, 0.05, 0.2, 0] }}
      transition={{ repeat: Infinity, duration: 0.2 }}
      className="absolute inset-0 bg-primary/10 pointer-events-none z-[100]"
    >
      {/* Scanline Noise Effect */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] pointer-events-none" />
    </motion.div>
  );
};

export default FlickerOverlay;
