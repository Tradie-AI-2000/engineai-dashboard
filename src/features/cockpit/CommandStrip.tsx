'use client'

import React, { useRef, useEffect } from 'react';
import { Mic, Send, Terminal, MessageCircle, Mail, MoreVertical, X, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCommandStrip, MAX_QUERY_LENGTH } from '@/hooks/useCommandStrip';
import ProjectStatusCard from '@/components/telemetry-cards/ProjectStatusCard';
import FinancialMetricCard from '@/components/telemetry-cards/FinancialMetricCard';

interface CommandStripProps {
  projectName?: string;
  projectStage?: string;
}

const CommandStrip: React.FC<CommandStripProps> = ({ projectName = '', projectStage = '' }) => {
  const {
    query,
    setQuery,
    isRecording,
    isProcessing,
    messages,
    showTriggers,
    safeProjectName,
    handleSend,
    handleTrigger,
    toggleRecording,
    toggleTriggers,
    clearMessages
  } = useCommandStrip({ projectName, projectStage });

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100] safe-area-inset-bottom" role="region" aria-label="Command Strip">
      {/* Response Display Area (Mobile-First) */}
      <AnimatePresence>
        {messages.length > 0 && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="max-h-[60vh] overflow-y-auto bg-background/95 backdrop-blur-3xl border-t border-white/[0.07] px-4 py-6 custom-scrollbar"
            ref={scrollRef}
          >
            <div className="max-w-xl mx-auto space-y-6 pb-4">
              <div className="flex justify-between items-center border-b border-white/5 pb-2 mb-4">
                <div className="flex items-center gap-2">
                  <Sparkles size={12} className="text-gold" />
                  <span className="text-[10px] font-mono text-gold uppercase tracking-[0.2em]">Executive Intelligence Sync</span>
                </div>
                <button 
                  onClick={clearMessages}
                  className="text-secondary/40 hover:text-white p-1"
                >
                  <X size={14} />
                </button>
              </div>

              {messages.map((m) => (
                <div key={m.id} className={`flex flex-col gap-2 ${m.role === 'user' ? 'items-end' : 'items-start'}`}>
                  {m.role === 'user' ? (
                    <div className="bg-white/5 border border-white/10 px-3 py-2 rounded-2xl rounded-tr-none max-w-[85%]">
                      <p className="text-xs text-white/80 font-sans">{m.content}</p>
                    </div>
                  ) : (
                    <div className="space-y-4 w-full">
                      {m.content && (
                        <div className="bg-gold/5 border border-gold/10 px-3 py-2 rounded-2xl rounded-tl-none max-w-[90%]">
                          <p className="text-xs text-gold/90 font-mono leading-relaxed">{m.content}</p>
                        </div>
                      )}
                      
                      {/* Generative UI Cards from Tool Invocations/Results */}
                      {m.toolInvocations?.map((toolInvocation) => {
                        const { toolName, toolCallId, state } = toolInvocation;

                        if (state === 'result') {
                          const { result } = toolInvocation;
                          if (toolName === 'getProjectStatus' && !result.error) {
                            return <ProjectStatusCard key={toolCallId} {...result} />;
                          }
                          if (toolName === 'getFinancialMetrics' && !result.error) {
                            return <FinancialMetricCard key={toolCallId} {...result} />;
                          }
                          if (result.error) {
                            return (
                              <div key={toolCallId} className="p-3 border border-red-500/20 bg-red-500/5 text-[10px] font-mono text-red-400 uppercase">
                                ERROR: {result.error}
                              </div>
                            );
                          }
                        } else {
                          return (
                            <div key={toolCallId} className="flex items-center gap-2 text-[10px] font-mono text-gold/40 animate-pulse uppercase">
                              <Terminal size={12} />
                              Executing {toolName}...
                            </div>
                          );
                        }
                        return null;
                      })}
                    </div>
                  )}
                </div>
              ))}
              
              {isProcessing && !messages[messages.length-1]?.content && (
                <div className="flex items-center gap-3 text-gold/40 animate-pulse">
                  <div className="w-1.5 h-1.5 rounded-full bg-gold" />
                  <span className="text-[10px] font-mono uppercase tracking-[0.2em]">Agent Thinking...</span>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="bg-background/80 backdrop-blur-2xl border-t border-white/[0.07] p-4">
        <div className="max-w-2xl mx-auto flex flex-col gap-4">
          
          <form onSubmit={handleSend} className="flex items-center gap-2 w-full" role="search">
            <button
              type="button"
              onClick={toggleTriggers}
              className={`p-3 rounded-full border transition-all ${
                showTriggers ? 'bg-gold text-black border-gold' : 'bg-white/[0.02] border-white/[0.07] text-secondary'
              }`}
            >
              <MoreVertical size={20} />
            </button>

            <div className="flex-1 relative">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={isProcessing ? "SYNCING..." : "QUERY EXECUTIVE AGENT..."}
                disabled={isProcessing}
                className="w-full bg-white/[0.03] border border-white/10 p-3.5 px-5 text-white focus:border-gold/40 focus:ring-1 focus:ring-gold/20 outline-none transition-all font-mono text-xs uppercase tracking-wider rounded-full placeholder:text-secondary/30"
              />
            </div>

            <button
              type="submit"
              disabled={isProcessing || !query.trim()}
              className="p-3.5 bg-gold text-black rounded-full disabled:opacity-30 transition-all active:scale-95 shadow-[0_0_20px_rgba(196,163,90,0.2)]"
            >
              <Send size={20} />
            </button>
          </form>

          {/* Mobile Shortcut Drawer */}
          <AnimatePresence>
            {showTriggers && (
              <motion.nav 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 20, opacity: 0 }}
                className="grid grid-cols-3 gap-2"
              >
                {[
                  { id: 'whatsapp', icon: MessageCircle, label: 'WhatsApp', color: 'text-emerald-400' },
                  { id: 'telegram', icon: Send, label: 'Telegram', color: 'text-sky-400' },
                  { id: 'email', icon: Mail, label: 'Email', color: 'text-amber-400' }
                ].map((trigger) => (
                  <button 
                    key={trigger.id}
                    onClick={() => handleTrigger(trigger.id as any)}
                    className="flex flex-col items-center justify-center gap-2 bg-white/[0.02] border border-white/[0.07] p-4 rounded-2xl hover:bg-white/[0.05] transition-colors"
                  >
                    <trigger.icon size={24} className={trigger.color} />
                    <span className="text-[10px] font-mono text-secondary uppercase tracking-widest">{trigger.label}</span>
                  </button>
                ))}
              </motion.nav>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default CommandStrip;
