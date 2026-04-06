import React from 'react';

interface TelemetryCardProps {
  label: string;
  value: string | number;
  trend?: string;
  status?: 'nominal' | 'warning' | 'critical';
}

const TelemetryCard: React.FC<TelemetryCardProps> = ({ label, value, trend, status = 'nominal' }) => {
  return (
    <div className="bg-card-bg border border-white/[0.07] p-5 rounded-lg flex flex-col gap-1 relative overflow-hidden group hover:border-gold/20 transition-all">
      <div className="flex justify-between items-start">
        <p className="text-[10px] font-mono uppercase text-secondary tracking-[0.1em] leading-none">{label}</p>
        {trend && (
          <span className="text-[9px] font-mono text-gold bg-gold/5 px-1.5 py-0.5 rounded-full border border-gold/20 tracking-tighter">
            {trend}
          </span>
        )}
      </div>
      <div className="mt-2 flex items-baseline gap-2">
        <p className="text-3xl font-light font-mono tracking-tighter truncate text-white">
          {value}
        </p>
      </div>
      
      {/* Decorative HUD Corner */}
      <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-white/[0.07] transition-opacity group-hover:border-gold/30" />
      <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white/5 transition-opacity group-hover:border-gold/20" />
    </div>
  );
};

export default TelemetryCard;
