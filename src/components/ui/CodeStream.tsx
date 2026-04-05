'use client'

import React, { useState, useEffect, useRef } from 'react';

const REFACTOR_LOGS = [
  "AST: Parsing target repository tree...",
  "AST: Mapping 'Organisation' references",
  "TRANSFORM: Updating tailwind.config.ts",
  "AST: Injecting tenant_id middleware",
  "VALIDATE: Syntax check completed",
  "AST: Renaming blueprint constants",
  "SYNC: Pushing AST changes to main branch",
  "AST: Optimising imports for Node.js 20",
];

interface CodeStreamProps {
  isActive: boolean;
}

const CodeStream: React.FC<CodeStreamProps> = ({ isActive }) => {
  const [logs, setLogs] = useState<string[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isActive) {
      setLogs([]);
      return;
    }

    const interval = setInterval(() => {
      setLogs(prev => {
        const nextLog = REFACTOR_LOGS.length > 0 
          ? REFACTOR_LOGS[Math.floor(Math.random() * REFACTOR_LOGS.length)] 
          : "SYSTEM: IDLE";
        return [...prev.slice(-5), `> ${nextLog}`];
      });
    }, 800);

    return () => clearInterval(interval);
  }, [isActive]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  if (!isActive) return null;

  return (
    <div 
      ref={scrollRef}
      className="bg-black/40 border border-primary/10 p-3 font-mono text-[9px] text-primary/80 h-24 overflow-hidden rounded-xs leading-tight"
    >
      <div className="flex flex-col gap-1">
        {logs.map((log, i) => (
          <p key={`${log}-${i}`} className="animate-in fade-in slide-in-from-left-1 duration-300 truncate">
            {log}
          </p>
        ))}
        <div className="w-1.5 h-3 bg-primary/40 animate-pulse" />
      </div>
    </div>
  );
};

export default CodeStream;
