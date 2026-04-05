'use client'

import React from 'react';
import ReasoningLog from '@/components/ui/ReasoningLog';
import SocialPreview from '@/components/ui/SocialPreview';
import ReportPreview from '@/components/ui/ReportPreview';
import { X } from 'lucide-react';
import { motion } from 'framer-motion';

export interface AuditTask {
  id: string;
  task_title: string;
  sender_role: string;
  recipient_role: string;
  status: string;
  payload: Record<string, any>;
  created_at: string;
  parent?: AuditTask | null;
}

interface AuditDrilldownProps {
  task: AuditTask;
  onClose: () => void;
}

const MAX_AUDIT_DEPTH = 10;

const getStatusConfig = (status?: string) => {
  const s = status?.toLowerCase() || 'pending';
  const isCompleted = s === 'completed' || s === 'success';
  const isFailed = s === 'failed' || s === 'error';
  const isInProgress = s === 'in_progress' || s === 'running';

  if (isCompleted) return { color: 'bg-green-500', border: 'border-green-500/30', label: 'bg-green-500/20 text-green-500' };
  if (isFailed) return { color: 'bg-red-500', border: 'border-red-500/30', label: 'bg-red-500/20 text-red-500' };
  if (isInProgress) return { color: 'bg-amber-500 shadow-[0_0_8px_#F59E0B]', border: 'border-amber-500/30', label: 'bg-primary/20 text-primary' };
  return { color: 'bg-primary/40', border: 'border-primary/20', label: 'bg-primary/20 text-primary' };
};

const TaskAncestry: React.FC<{ task: AuditTask; depth: number }> = ({ task, depth }) => {
  if (depth > MAX_AUDIT_DEPTH) {
    return (
      <div className="relative pl-6 pb-2 border-l border-red-500/20">
        <div className="absolute left-[-4px] top-0 w-2 h-2 rounded-full bg-red-500" />
        <div className="text-[8px] text-red-500 uppercase font-mono italic">Max Depth Exceeded</div>
      </div>
    );
  }
  
  const config = getStatusConfig(task.status);
  const formattedTime = (() => {
    try {
      const date = new Date(task.created_at);
      return isNaN(date.getTime()) ? 'Unknown Time' : date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    } catch (e) {
      return 'Invalid Date';
    }
  })();

  return (
    <>
      {task.parent && <TaskAncestry task={task.parent} depth={depth + 1} />}
      <div className={`relative pl-6 pb-6 border-l ${depth === 0 ? 'border-transparent' : 'border-primary/20'} last:pb-2`}>
        {/* The Connector Dot */}
        <div className={`absolute left-[-5.5px] top-0 w-2.5 h-2.5 rounded-full ${config.color} border-2 border-background z-10`} />
        
        <div className={`flex flex-col gap-1 p-2 rounded-sm border ${config.border} ${depth === 0 ? 'bg-primary/5' : 'bg-background/20'} transition-all hover:bg-white/5`}>
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className={`text-[8px] px-1 rounded font-bold uppercase tracking-tighter ${config.label}`}>
                {task.recipient_role || 'Agent'}
              </span>
              <p className={`text-[10px] font-mono uppercase truncate max-w-[200px] ${depth === 0 ? 'text-primary font-bold' : 'text-muted'}`}>
                {task.task_title}
              </p>
            </div>
            <span className="text-[8px] font-mono text-muted-foreground/30 uppercase">
              {formattedTime}
            </span>
          </div>
          
          {depth === 0 && (
            <div className="flex items-center gap-2 mt-1 pt-1 border-t border-primary/5">
              <span className="text-[7px] text-primary/40 uppercase tracking-widest">Active Node</span>
              <div className="flex-1 h-[1px] bg-primary/10" />
              <span className="text-[7px] text-muted-foreground/40 font-mono italic">{task.id.slice(0, 8)}</span>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

const AuditDrilldown: React.FC<AuditDrilldownProps> = ({ task, onClose }) => {
  const isMarketingDraft = task.payload?.task_type === 'MARKETING_DRAFT' || task.task_title?.includes('Creative Draft');
  const isPerformanceReport = task.payload?.task_type === 'PERFORMANCE_REPORT' || task.task_title?.includes('Performance Report');

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="fixed inset-y-0 right-0 w-full lg:w-[550px] bg-surface/95 backdrop-blur-2xl border-l border-primary/20 z-[200] flex flex-col shadow-2xl"
    >
      <header className="p-6 border-b border-primary/10 flex justify-between items-center bg-background/40 font-mono relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent pointer-events-none" />
        <div className="relative z-10">
          <p className="text-[10px] text-primary/60 uppercase tracking-[0.2em] mb-1">Initialising Trace Sequence</p>
          <h2 className="text-lg font-bold text-muted tracking-tight uppercase truncate max-w-[350px]">{task.task_title}</h2>
        </div>
        <button onClick={onClose} aria-label="Close trace" className="p-2 hover:bg-white/5 rounded-full text-primary/60 hover:text-primary transition-colors relative z-10">
          <X size={20} />
        </button>
      </header>

      <main className="flex-1 overflow-y-auto p-6 space-y-8 scrollbar-thin scrollbar-thumb-primary/10">
        <section className="space-y-4">
          <div className="flex items-center justify-between border-b border-primary/5 pb-2">
            <h3 className="text-[10px] font-mono text-primary/40 uppercase tracking-widest font-bold">Handoff Ancestry (Deep Trace)</h3>
            <span className="text-[8px] font-mono text-muted-foreground/30 uppercase tracking-tighter italic">Depth: 10 Nodes Max</span>
          </div>
          <div className="pl-2 pt-2 max-h-[250px] overflow-y-auto scrollbar-thin scrollbar-thumb-primary/5">
            <TaskAncestry task={task} depth={0} />
          </div>
        </section>

        {isMarketingDraft && (
          <section className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-500">
            <h3 className="text-[10px] font-mono text-primary/40 uppercase tracking-widest font-bold">Social Content Preview</h3>
            <SocialPreview linkedin={task.payload?.linkedin} twitter={task.payload?.twitter} />
          </section>
        )}

        {isPerformanceReport && (
          <section className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-500">
            <h3 className="text-[10px] font-mono text-primary/40 uppercase tracking-widest font-bold">Performance Report Preview</h3>
            <ReportPreview 
              summary={task.payload?.summary} 
              slides={task.payload?.slides} 
              artifactUrl={task.payload?.artifact_url} 
            />
          </section>
        )}

        <section className="space-y-4">
          <h3 className="text-[10px] font-mono text-primary/40 uppercase tracking-widest font-bold">Reasoning Log</h3>
          <ReasoningLog payload={task.payload} role={task.recipient_role} />
        </section>

        <div className="pt-4 border-t border-primary/5 text-center">
          <p className="text-[9px] font-mono text-primary/30 uppercase tracking-[0.1em]">Authorisation Verified via Omni-channel Protocol</p>
        </div>
      </main>
    </motion.div>
  );
};

export default AuditDrilldown;
