'use client'

import React, { useState, useEffect } from 'react';
import { Linkedin, Twitter, Copy, CheckCircle2, AlertCircle } from 'lucide-react';

interface SocialPreviewProps {
  linkedin?: string;
  twitter?: string;
}

const SocialPreview: React.FC<SocialPreviewProps> = ({ linkedin = '', twitter = '' }) => {
  const [copied, setCopied] = useState<'li' | 'tw' | null>(null);

  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => setCopied(null), 2000);
      return () => clearTimeout(timer);
    }
  }, [copied]);

  const handleCopy = (text: string, platform: 'li' | 'tw') => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopied(platform);
    }
  };

  const isTwitterValid = twitter.length <= 280;

  return (
    <div className="space-y-6 font-mono">
      {/* LinkedIn Section */}
      <div className="bg-background/60 border border-primary/10 p-4 rounded-sm relative overflow-hidden">
        <div className="flex justify-between items-center mb-3 relative z-10">
          <div className="flex items-center gap-2 text-primary">
            <Linkedin size={14} />
            <span className="text-[10px] uppercase font-bold tracking-widest">LinkedIn Strategy</span>
          </div>
          <button 
            onClick={() => handleCopy(linkedin, 'li')}
            className="text-primary/40 hover:text-primary transition-colors flex items-center gap-1 text-[8px] uppercase p-1"
          >
            {copied === 'li' ? <CheckCircle2 size={10} /> : <Copy size={10} />}
            {copied === 'li' ? 'Copied' : 'Copy'}
          </button>
        </div>
        <p className="text-[11px] text-muted-foreground leading-relaxed whitespace-pre-wrap relative z-10">{linkedin || 'No content generated.'}</p>
      </div>

      {/* Twitter Section */}
      <div className={`bg-background/60 border p-4 rounded-sm relative overflow-hidden transition-colors ${!isTwitterValid ? 'border-red-500/40' : 'border-primary/10'}`}>
        <div className="flex justify-between items-center mb-3 relative z-10">
          <div className="flex items-center gap-2 text-primary">
            <Twitter size={14} className={!isTwitterValid ? "text-red-500" : ""} />
            <span className={`text-[10px] uppercase font-bold tracking-widest ${!isTwitterValid ? "text-red-500" : ""}`}>
              Twitter/X Broadcast
            </span>
          </div>
          <button 
            disabled={!isTwitterValid}
            onClick={() => handleCopy(twitter, 'tw')}
            className="text-primary/40 hover:text-primary transition-colors flex items-center gap-1 text-[8px] uppercase p-1 disabled:opacity-20"
          >
            {copied === 'tw' ? <CheckCircle2 size={10} /> : <Copy size={10} />}
            {copied === 'tw' ? 'Copied' : 'Copy'}
          </button>
        </div>
        <p className="text-[11px] text-muted-foreground leading-relaxed italic relative z-10">
          {twitter ? `"${twitter}"` : 'No content generated.'}
        </p>
        <div className="mt-3 flex justify-between items-center relative z-10">
          {!isTwitterValid && (
            <div className="flex items-center gap-1 text-red-500 text-[8px] uppercase">
              <AlertCircle size={10} /> Over Limit
            </div>
          )}
          <span className={`text-[8px] ml-auto font-bold ${!isTwitterValid ? 'text-red-500 animate-pulse' : 'text-primary/40'}`}>
            {twitter.length}/280 CHARS
          </span>
        </div>
      </div>
    </div>
  );
};

export default SocialPreview;
