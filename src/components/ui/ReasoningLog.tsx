import React from 'react';

interface ReasoningLogProps {
  payload: Record<string, any>;
  role: string;
}

const ReasoningLog: React.FC<ReasoningLogProps> = ({ payload = {}, role }) => {
  if (!payload || typeof payload !== 'object') return <p className="text-[10px] font-mono text-red-500">Payload Corrupted</p>;

  return (
    <div className="bg-background/60 border border-primary/10 p-4 rounded-sm font-mono text-[10px] leading-relaxed">
      <div className="flex justify-between items-center mb-3 pb-2 border-b border-primary/5">
        <span className="text-primary uppercase tracking-widest font-bold">{role} Thought Loop</span>
        <span className="text-muted-foreground/40 uppercase">Trace Active</span>
      </div>
      
      <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-primary/20">
        {Object.entries(payload).map(([key, value]) => {
          const isCore = ['intent', 'spec', 'prompt', 'response'].includes(key.toLowerCase());
          return (
            <div key={key} className={`space-y-1 ${isCore ? 'bg-primary/5 p-2 border-l border-primary/40' : ''}`}>
              <p className={`uppercase tracking-tighter ${isCore ? 'text-primary font-bold' : 'text-primary/60'}`}>
                {key === 'intent' || key === 'prompt' ? 'System Input' : key === 'spec' || key === 'response' ? 'Agent Output' : key}:
              </p>
              <p className="text-muted whitespace-pre-wrap pl-2">
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
