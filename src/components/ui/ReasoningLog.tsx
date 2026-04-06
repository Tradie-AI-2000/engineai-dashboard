import React from 'react';

interface ReasoningLogProps {
  payload: Record<string, any>;
  role: string;
}

const ReasoningLog: React.FC<ReasoningLogProps> = ({ payload = {}, role }) => {
  if (!payload || typeof payload !== 'object') return <p className="text-[10px] font-mono text-red-500">Payload Corrupted</p>;

  return (
    <div className="bg-background border border-white/10 p-4 rounded-none font-mono text-[10px] leading-relaxed">
      <div className="flex justify-between items-center mb-3 pb-2 border-b border-white/5">
        <span className="text-white uppercase tracking-[0.1em] font-bold">{role} THOUGHT LOOP</span>
        <span className="text-secondary uppercase">TRACE ACTIVE</span>
      </div>
      
      <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 scrollbar-hide">
        {Object.entries(payload).map(([key, value]) => {
          const isCore = ['intent', 'spec', 'prompt', 'response'].includes(key.toLowerCase());
          return (
            <div key={key} className={`space-y-1 ${isCore ? 'bg-white/5 p-2 border-l border-white/20' : ''}`}>
              <p className={`uppercase tracking-tighter ${isCore ? 'text-white font-bold' : 'text-secondary'}`}>
                {key === 'intent' || key === 'prompt' ? 'SYSTEM INPUT' : key === 'spec' || key === 'response' ? 'AGENT OUTPUT' : key.toUpperCase()}:
              </p>
              <p className="text-foreground whitespace-pre-wrap pl-2">
                {typeof value === 'string' ? value : JSON.stringify(value, null, 2)}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ReasoningLog;
