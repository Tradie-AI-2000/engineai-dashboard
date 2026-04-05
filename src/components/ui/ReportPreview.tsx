'use client'

import React, { useState } from 'react';
import { Presentation, ChevronRight, ChevronLeft, Download, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Slide {
  title: string;
  content: string[];
  metric_highlight?: string;
}

interface ReportPreviewProps {
  summary?: string;
  slides?: Slide[];
  artifactUrl?: string;
}

const ReportPreview: React.FC<ReportPreviewProps> = ({ 
  summary = 'Initialising summary...', 
  slides = [], 
  artifactUrl = '' 
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const safeSlides = Array.isArray(slides) && slides.length > 0 ? slides : [];
  const slideCount = safeSlides.length;

  const nextSlide = () => setCurrentSlide(prev => (prev + 1) % slideCount);
  const prevSlide = () => setCurrentSlide(prev => (prev - 1 + slideCount) % slideCount);

  // Robust sync ID extraction
  const syncId = useMemo(() => {
    try {
      return new URL(artifactUrl).pathname.split('/').filter(Boolean).pop() || 'N/A';
    } catch {
      return 'INTERNAL';
    }
  }, [artifactUrl]);

  return (
    <div className="space-y-6 font-mono">
      <div className="bg-primary/10 border-l-2 border-primary p-4">
        <p className="text-[10px] text-primary uppercase font-bold mb-1 tracking-widest">Executive Summary</p>
        <p className="text-xs text-muted-foreground leading-relaxed italic">"{summary}"</p>
      </div>

      <div className="bg-background/60 border border-primary/10 rounded-sm overflow-hidden flex flex-col min-h-[350px]">
        <header className="p-3 border-b border-primary/5 flex justify-between items-center bg-black/20">
          <div className="flex items-center gap-2 text-primary/60">
            <Presentation size={12} />
            <span className="text-[9px] uppercase tracking-widest">
              {slideCount > 0 ? `Slide ${currentSlide + 1} of ${slideCount}` : 'Awaiting Data...'}
            </span>
          </div>
          {slideCount > 1 && (
            <div className="flex gap-1">
              <button onClick={prevSlide} className="p-1 hover:bg-primary/10 text-primary transition-colors"><ChevronLeft size={14} /></button>
              <button onClick={nextSlide} className="p-1 hover:bg-primary/10 text-primary transition-colors"><ChevronRight size={14} /></button>
            </div>
          )}
        </header>

        <div className="flex-1 p-6 flex flex-col gap-4 relative overflow-y-auto max-h-[400px]">
          <AnimatePresence mode="wait">
            {slideCount > 0 ? (
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="space-y-4"
              >
                <h3 className="text-sm font-bold text-primary uppercase tracking-tight border-b border-primary/10 pb-2">
                  {safeSlides[currentSlide]?.title}
                </h3>
                <ul className="space-y-2">
                  {safeSlides[currentSlide]?.content.map((item, i) => (
                    <li key={i} className="text-[10px] text-muted-foreground flex gap-2">
                      <span className="text-primary/40">•</span> {item}
                    </li>
                  ))}
                </ul>
                {safeSlides[currentSlide]?.metric_highlight && (
                  <div className="mt-4 pt-4 border-t border-primary/5">
                    <p className="text-[8px] text-primary/40 uppercase mb-1">Industrial Highlight</p>
                    <p className="text-lg font-bold text-muted tracking-tighter">{safeSlides[currentSlide].metric_highlight}</p>
                  </div>
                )}
              </motion.div>
            ) : (
              <p className="text-[10px] text-primary/20 uppercase tracking-widest text-center mt-20">Parsing industrial records...</p>
            )}
          </AnimatePresence>
        </div>

        <footer className="p-3 border-t border-primary/5 bg-black/20 flex justify-between items-center mt-auto">
          <button 
            disabled={!artifactUrl}
            className="flex items-center gap-2 text-[8px] text-primary/60 hover:text-primary transition-colors uppercase font-bold tracking-widest disabled:opacity-20"
          >
            <Download size={10} /> Export to industrial stack
          </button>
          <span className="text-[8px] text-muted-foreground/40 uppercase tracking-tighter">Sync ID: {syncId}</span>
        </footer>
      </div>
    </div>
  );
};

import { useMemo } from 'react';
export default ReportPreview;
