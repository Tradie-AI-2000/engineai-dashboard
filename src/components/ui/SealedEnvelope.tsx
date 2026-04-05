'use client'

import React, { useState, useEffect } from 'react';
import { Shield, ShieldCheck, Lock, Unlock, Eye, EyeOff } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface SealedEnvelopeProps {
  label: string;
  onSeal: (value: string) => Promise<void> | void;
  isSealed: boolean;
}

const SealedEnvelope: React.FC<SealedEnvelopeProps> = ({ label, onSeal, isSealed }) => {
  const [value, setValue] = useState('');
  const [showPlain, setShowPlain] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSeal = async () => {
    if (!value.trim()) return;
    setIsProcessing(true);
    try {
      // Safety: Only clear if the seal is successfully acknowledged by the system
      await onSeal(value);
      setValue('');
    } catch (err) {
      console.error("VAULT FAILURE: Manual Intervention Required.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="w-full bg-background/40 border border-primary/10 p-4 rounded-sm relative overflow-hidden group">
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center gap-2">
          <Shield size={14} className={isSealed ? "text-green-500" : "text-primary/40"} />
          <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">{label}</p>
        </div>
        {isSealed && (
          <div className="flex items-center gap-1 bg-green-500/10 border border-green-500/20 px-2 py-0.5 rounded-xs">
            <ShieldCheck size={10} className="text-green-500" />
            <span className="text-[8px] font-mono text-green-500 uppercase font-bold">Vault Secured</span>
          </div>
        )}
      </div>

      {!isSealed ? (
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <input
              type={showPlain ? "text" : "password"}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder={isProcessing ? "SEALING..." : "ENTER SECRET..."}
              disabled={isProcessing}
              maxLength={2048}
              className="w-full bg-black/40 border border-primary/20 p-2 pr-10 text-xs text-muted font-mono uppercase focus:border-primary/60 outline-none transition-colors disabled:opacity-50"
            />
            <button
              onClick={() => setShowPlain(!showPlain)}
              disabled={isProcessing}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-primary/40 hover:text-primary transition-colors disabled:opacity-0"
            >
              {showPlain ? <EyeOff size={14} /> : <Eye size={14} />}
            </button>
          </div>
          <button
            onClick={handleSeal}
            disabled={!value.trim() || isProcessing}
            className="bg-primary text-primary-foreground font-mono font-bold text-[10px] px-4 uppercase tracking-widest hover:opacity-90 disabled:opacity-30 transition-all flex items-center gap-2"
          >
            <Lock size={12} /> {isProcessing ? 'Processing' : 'Seal'}
          </button>
        </div>
      ) : (
        <div className="flex items-center justify-between bg-black/20 p-2 border border-primary/5 rounded-xs">
          <p className="text-[10px] font-mono text-muted-foreground/40 italic">••••••••••••••••••••</p>
          <div className="flex items-center gap-3">
            <span className="text-[8px] font-mono text-primary/40 uppercase tracking-tighter">Synchronised with Executive Vault</span>
            <Unlock size={12} className="text-primary/20 cursor-not-allowed" />
          </div>
        </div>
      )}

      {/* Decorative HUD Scanline */}
      <motion.div 
        animate={{ left: ['-100%', '100%'] }}
        transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
        className="absolute bottom-0 left-0 w-1/2 h-[1px] bg-primary/10 shadow-[0_0_10px_#C4A35A] pointer-events-none"
      />
    </div>
  );
};

export default SealedEnvelope;
