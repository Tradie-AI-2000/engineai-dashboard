'use client'

import React from 'react';
import ReasoningLog from '@/components/ui/ReasoningLog';
import SocialPreview from '@/components/ui/SocialPreview';
import ReportPreview from '@/components/ui/ReportPreview';
import { X, ChevronRight } from 'lucide-react';
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

const TaskAncestry: React.FC<{ task: AuditTask; depth: number }> = ({ task, depth }) => {
  if (depth > MAX_AUDIT_DEPTH) return <div className="text-[8px] text-white/40 uppercase font-mono">Max Depth Exceeded</div>;
  return (
    <>
      {task.parent && <TaskAncestry task={task.parent} depth={depth + 1} />}
      <div className={`flex items-center gap-3 ${depth > 0 ? 'opacity-40 grayscale' : ''}`}>
        <div className={`w-2 h-2 rounded-none ${depth === 0 ? 'bg-white' : 'border border-white/40'}`} />
        <p className={`text-[10px] font-mono uppercase truncate ${depth === 0 ? 'text-white font-light' : 'text-white/40'}`}>
          {task.task_title}
        </p>
        {depth > 0 && <ChevronRight size={12} className="text-white/20" />}
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
      className="fixed inset-y-0 right-0 w-full lg:w-[500px] bg-[#1f2228] border-l border-white/10 z-[200] flex flex-col"
    >
      <header className="p-6 border-b border-white/10 flex justify-between items-center bg-white/2 font-mono">
        <div>
          <p className="text-[10px] text-white/40 uppercase tracking-[0.1em] mb-1">Audit Sequence Trace</p>
          <h2 className="text-lg font-light font-mono text-white tracking-tight uppercase truncate max-w-[300px]">{task.task_title}</h2>
        </div>
        <button onClick={onClose} aria-label="Close trace" className="p-2 hover:opacity-50 text-white/40 transition-opacity rounded-none">
          <X size={20} />
        </button>
      </header>

      <main className="flex-1 overflow-y-auto p-6 space-y-8">
        <section className="space-y-4">
          <h3 className="text-[10px] font-mono text-white/40 uppercase tracking-[0.1em] font-light">Handoff Ancestry (Deep Trace)</h3>
          <div className="flex flex-col gap-3">
            <TaskAncestry task={task} depth={0} />
          </div>
        </section>

        {isMarketingDraft && (
          <section className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-500">
            <h3 className="text-[10px] font-mono text-white/40 uppercase tracking-[0.1em] font-light">Social Content Preview</h3>
            <SocialPreview linkedin={task.payload?.linkedin} twitter={task.payload?.twitter} />
          </section>
        )}

        {isPerformanceReport && (
          <section className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-500">
            <h3 className="text-[10px] font-mono text-white/40 uppercase tracking-[0.1em] font-light">Performance Report Preview</h3>
            <ReportPreview 
              summary={task.payload?.summary} 
              slides={task.payload?.slides} 
              artifactUrl={task.payload?.artifact_url} 
            />
          </section>
        )}

        <section className="space-y-4">
          <h3 className="text-[10px] font-mono text-white/40 uppercase tracking-[0.1em] font-light">Reasoning Log</h3>
          <ReasoningLog payload={task.payload} role={task.recipient_role} />
        </section>

        <div className="pt-4 border-t border-white/5 text-center">
          <p className="text-[9px] font-mono text-white/40 uppercase tracking-[0.1em]">Authorisation Verified via Omni-channel Protocol</p>
        </div>
      </main>
    </motion.div>
  );
};

export default AuditDrilldown;
