import { useState, useMemo, useCallback } from 'react';

interface UseCommandStripProps {
  projectName?: string;
  projectStage?: string;
}

export const COMMAND_PROCESSING_DELAY = 1500;
export const MAX_QUERY_LENGTH = 200;

export type TriggerType = 'whatsapp' | 'telegram' | 'email';

export const useCommandStrip = ({ projectName = '', projectStage = '' }: UseCommandStripProps) => {
  const [query, setQuery] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [response, setResponse] = useState<string | null>(null);
  const [showTriggers, setShowTriggers] = useState(false);

  const safeProjectName = useMemo(() => projectName.trim(), [projectName]);
  const safeProjectStage = useMemo(() => projectStage.trim(), [projectStage]);

  const templates = useMemo(() => {
    const context = safeProjectName ? `[${safeProjectName}]` : '[Global]';
    const stageStr = safeProjectStage ? ` - Stage: ${safeProjectStage.toUpperCase()}` : '';
    
    return {
      whatsapp: `Hi, checking in on the ${safeProjectName || 'project'} progress. Current stage: ${safeProjectStage || 'unknown'}. Any updates?`,
      telegram: `AGENT INTERROGATION: ${context}${stageStr} - REQUESTING FULL TELEMETRY SYNC.`,
      email: `Subject: Project Update - ${safeProjectName || 'EngineAI'}\n\nHi Team,\n\nPlease provide a status report for the current phase: ${safeProjectStage || 'Initialisation'}.`
    };
  }, [safeProjectName, safeProjectStage]);

  const handleSend = useCallback(async (e?: React.FormEvent) => {
    e?.preventDefault();
    const cleanQuery = query.trim();
    
    if (!cleanQuery || isProcessing) return;

    setIsProcessing(true);
    setIsRecording(false);
    setResponse(null);

    try {
      // Simulate API call to agent swarm
      await new Promise(resolve => setTimeout(resolve, COMMAND_PROCESSING_DELAY));
      setResponse(`SYSTEM: Analysing status for "${cleanQuery}". Directing query to Division Supervisor...`);
      setQuery('');
    } catch (error) {
      setResponse("SYSTEM ERROR: Command execution failed.");
    } finally {
      setIsProcessing(false);
    }
  }, [query, isProcessing]);

  const handleTrigger = useCallback((type: TriggerType) => {
    if (isProcessing) return;
    
    const text = templates[type];
    
    try {
      if (type === 'whatsapp') {
        window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
      } else if (type === 'telegram') {
        window.open(`tg://msg?text=${encodeURIComponent(text)}`, '_blank');
      } else if (type === 'email') {
        const [subjectLine, ...bodyParts] = text.split('\n\n');
        const subject = subjectLine.replace('Subject: ', '');
        const body = bodyParts.join('\n\n');
        window.open(`mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`, '_blank');
      }
      setResponse(`COMMUNICATION DRAFTED: Opening ${type.toUpperCase()} client channel.`);
    } catch (err) {
      setResponse(`ERROR: Could not open ${type.toUpperCase()} client.`);
    }
  }, [isProcessing, templates]);

  const toggleRecording = useCallback(() => setIsRecording(prev => !prev), []);
  const toggleTriggers = useCallback(() => setShowTriggers(prev => !prev), []);

  return {
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
  };
};
