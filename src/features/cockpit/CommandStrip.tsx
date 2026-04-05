'use client'

import React from 'react';
import { Mic, Send, Terminal, MessageCircle, Mail, Smartphone, MoreVertical } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCommandStrip, MAX_QUERY_LENGTH } from '@/hooks/useCommandStrip';

interface CommandStripProps {
  projectName?: string;
  projectStage?: string;
}

/**
 * CommandStrip - Persistent UI bar for one-touch communication and agent interrogation.
 * Fulfills UX-DR8 and FR1/FR2.
 * Refactored to use custom hook for logic encapsulation and improved maintainability.
 */
const CommandStrip: React.FC<CommandStripProps> = ({ projectName = '', projectStage = '' }) => {
  const {
    query,
    setQuery,
    isRecording,
    isProcessing,
    response,
    showTriggers,
    safeProjectName,
    handleSend,
    handleTrigger,
    toggleRecording,
    toggleTriggers
  } = useCommandStrip({ projectName, projectStage });

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100]" role="region" aria-label="Command Strip">
      <div className="bg-surface/90 backdrop-blur-xl border-t border-primary/20 p-3 lg:p-4 shadow-[0_-10px_40px_rgba(0,0,0,0.5)]">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-4">
          
          {/* One-Touch Communication Triggers (Desktop) */}
          <nav className="flex items-center gap-2 border-r border-primary/10 pr-4 hidden lg:flex" aria-label="Communication Shortcuts">
            <button 
              onClick={() => handleTrigger('whatsapp')}
              aria-label="Draft WhatsApp Message"
              title="WhatsApp Client"
              className="p-2 hover:bg-primary/10 text-primary/60 hover:text-primary transition-all rounded-sm group relative"
            >
              <MessageCircle size={18} />
              <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-background border border-primary/20 text-[8px] px-2 py-1 hidden group-hover:block whitespace-nowrap">WHATSAPP DRAFT</span>
            </button>
            <button 
              onClick={() => handleTrigger('telegram')}
              aria-label="Draft Telegram Interrogation"
              title="Telegram Channel"
              className="p-2 hover:bg-primary/10 text-primary/60 hover:text-primary transition-all rounded-sm group relative"
            >
              <Send size={18} className="-rotate-12" />
              <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-background border border-primary/20 text-[8px] px-2 py-1 hidden group-hover:block whitespace-nowrap">TELEGRAM INTERROGATION</span>
            </button>
            <button 
              onClick={() => handleTrigger('email')}
              aria-label="Draft Email Update"
              title="Email Report"
              className="p-2 hover:bg-primary/10 text-primary/60 hover:text-primary transition-all rounded-sm group relative"
            >
              <Mail size={18} />
              <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-background border border-primary/20 text-[8px] px-2 py-1 hidden group-hover:block whitespace-nowrap">EMAIL UPDATE</span>
            </button>
          </nav>

          <div className="flex-1 w-full flex flex-col gap-2">
            <AnimatePresence mode="wait">
              {response && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="p-2 bg-primary/5 border border-primary/10 rounded-sm"
                  role="status"
                  aria-live="polite"
                >
                  <p className="text-[9px] font-mono text-primary leading-tight uppercase tracking-tight">{response}</p>
                </motion.div>
              )}
            </AnimatePresence>

            <form onSubmit={handleSend} className="flex items-center gap-3 w-full" role="search">
              {/* Mobile Trigger Toggle */}
              <button
                type="button"
                onClick={toggleTriggers}
                aria-label={showTriggers ? "Hide communication triggers" : "Show communication triggers"}
                className="lg:hidden p-3 bg-primary/5 border border-primary/20 text-primary/60 rounded-full focus:ring-1 focus:ring-primary outline-none"
              >
                <MoreVertical size={18} />
              </button>

              <button
                type="button"
                aria-label={isRecording ? "Stop voice command recording" : "Start voice command recording"}
                onClick={toggleRecording}
                className={`p-3 rounded-full border transition-all focus:ring-1 focus:ring-primary outline-none ${
                  isRecording 
                    ? 'bg-red-500/20 border-red-500 text-red-500 animate-pulse' 
                    : 'bg-primary/5 border-primary/20 text-primary/60'
                }`}
              >
                <Mic size={18} />
              </button>

              <div className="flex-1 relative group">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-primary/40" aria-hidden="true">
                  <Terminal size={14} />
                </div>
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={isProcessing ? "PROCESSING..." : `COMMAND AGENT SWARM ${safeProjectName ? `[${safeProjectName.toUpperCase()}]` : ''}...`}
                  disabled={isProcessing}
                  aria-label="Enter agent command"
                  maxLength={MAX_QUERY_LENGTH}
                  className="w-full bg-background border border-primary/20 p-2.5 pl-10 text-muted focus:border-primary outline-none transition-colors font-mono text-[10px] uppercase tracking-wider placeholder:text-muted-foreground/20"
                />
                {isProcessing && (
                  <motion.div 
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 border-2 border-primary/20 border-t-primary rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                    aria-label="Command is processing"
                  />
                )}
              </div>

              <button
                type="submit"
                aria-label="Send command"
                disabled={isProcessing || !query.trim()}
                className="p-3 bg-primary text-primary-foreground rounded-sm disabled:opacity-30 transition-opacity focus:ring-1 focus:ring-primary outline-none"
              >
                <Send size={18} />
              </button>
            </form>

            <AnimatePresence>
              {showTriggers && (
                <motion.nav 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="lg:hidden flex justify-around p-2 border-t border-primary/10 mt-2"
                  aria-label="Mobile communication shortcuts"
                >
                  <button 
                    onClick={() => handleTrigger('whatsapp')} 
                    className="flex flex-col items-center gap-1 text-[8px] text-primary/60 p-2"
                    aria-label="Open WhatsApp to draft message"
                  >
                    <MessageCircle size={20} />
                    WHATSAPP
                  </button>
                  <button 
                    onClick={() => handleTrigger('telegram')} 
                    className="flex flex-col items-center gap-1 text-[8px] text-primary/60 p-2"
                    aria-label="Open Telegram for interrogation"
                  >
                    <Send size={20} className="-rotate-12" />
                    TELEGRAM
                  </button>
                  <button 
                    onClick={() => handleTrigger('email')} 
                    className="flex flex-col items-center gap-1 text-[8px] text-primary/60 p-2"
                    aria-label="Open Email for update report"
                  >
                    <Mail size={20} />
                    EMAIL
                  </button>
                </motion.nav>
              )}
            </AnimatePresence>
          </div>
          
          {/* System Status (Desktop) */}
          <div className="hidden xl:flex items-center gap-3 border-l border-primary/10 pl-4" aria-hidden="true">
            <div className="text-right">
              <p className="text-[8px] font-mono text-primary/40 uppercase tracking-widest leading-none">System</p>
              <p className="text-[10px] font-mono text-primary uppercase font-bold tracking-tighter">Ready</p>
            </div>
            <div className="w-8 h-8 rounded-full border border-primary/20 flex items-center justify-center bg-primary/5">
              <Smartphone size={14} className="text-primary/40" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommandStrip;
