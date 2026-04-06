'use client'

import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, DollarSign, Zap } from 'lucide-react';

interface FinancialMetricCardProps {
  type: string;
  value: string;
  trend: string;
  currency: string;
  scope: string;
  lastUpdated: string;
}

const FinancialMetricCard: React.FC<FinancialMetricCardProps> = ({ type, value, trend, currency, scope, lastUpdated }) => {
  const isUp = trend.includes('+');
  const isDown = trend.includes('-');

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-[#0A0A0A] border border-gold/20 p-4 rounded-lg relative overflow-hidden group w-full max-w-sm"
    >
      <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-gold/10" />
      
      <header className="flex justify-between items-start mb-2">
        <div>
          <p className="text-[10px] font-mono text-gold/60 uppercase tracking-widest leading-none mb-1">{type}</p>
          <p className="text-[8px] font-mono text-secondary/40 uppercase tracking-tighter">Scope: {scope}</p>
        </div>
        <div className="bg-gold/10 p-1.5 rounded-full border border-gold/20">
          {type.toLowerCase().includes('burn') ? (
            <Zap size={14} className="text-gold" />
          ) : (
            <DollarSign size={14} className="text-gold" />
          )}
        </div>
      </header>

      <div className="my-4">
        <h3 className="text-3xl font-light text-white tracking-tighter leading-none mb-2 font-mono">{value} <span className="text-sm font-light opacity-40 ml-1">{currency}</span></h3>
        <div className="flex items-center gap-1.5">
          {isUp ? <TrendingUp size={12} className="text-emerald-400" /> : isDown ? <TrendingDown size={12} className="text-rose-400" /> : null}
          <span className={`text-[10px] font-mono uppercase tracking-widest ${isUp ? 'text-emerald-400' : isDown ? 'text-rose-400' : 'text-gold'}`}>
            {trend}
          </span>
        </div>
      </div>

      <footer className="mt-4 pt-4 border-t border-white/5 flex justify-between items-center text-secondary/40">
        <span className="text-[8px] font-mono uppercase tracking-tighter">Updated: {new Date(lastUpdated).toLocaleTimeString()}</span>
        <div className="flex gap-1">
          <div className="w-1 h-1 bg-gold/20" />
          <div className="w-1 h-1 bg-gold/40" />
          <div className="w-1 h-1 bg-gold/60" />
        </div>
      </footer>
    </motion.div>
  );
};

export default FinancialMetricCard;
