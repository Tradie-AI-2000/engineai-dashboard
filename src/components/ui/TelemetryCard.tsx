import React from 'react';

interface TelemetryCardProps {
  label: string;
  value: string | number;
  trend?: string;
  status?: 'nominal' | 'warning' | 'critical';
}

const TelemetryCard: React.FC<TelemetryCardProps> = ({ label, value, trend, status = 'nominal' }) => {
  return (
    <div className="bg-surface/60 backdrop-blur-md border border-primary/10 p-5 rounded-sm flex flex-col gap-1 relative overflow-hidden group">
      <div className="flex justify-between items-start">
        <p className="text-[10px] font-mono uppercase text-primary/40 tracking-[0.2em] leading-none">{label}</p>
        {trend && (
          <span className="text-[9px] font-mono text-primary/80 bg-primary/5 px-1.5 py-0.5 rounded-full border border-primary/10 tracking-tighter">
            {trend}
          </span>
        )}
      </div>
      <div className="mt-2 flex items-baseline gap-2">
        <p className={`text-3xl font-bold font-mono tracking-tighter truncate ${
          status === 'critical' ? 'text-red-500' : status === 'warning' ? 'text-amber-500' : 'text-muted'
        }`}>
          {value}
        </p>
      </div>
...
      {/* Decorative HUD Corner */}
      <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-primary/20 transition-colors group-hover:border-primary/40" />
      <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-primary/10 transition-colors group-hover:border-primary/30" />
    </div>
  );
};

export default TelemetryCard;
