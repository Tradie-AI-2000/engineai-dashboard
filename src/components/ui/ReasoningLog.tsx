import React from 'react';

interface ReasoningLogProps {
  payload: Record<string, any>;
  role: string;
}

interface ToolCall {
  id?: string;
  function?: {
    name: string;
    arguments: string;
  };
  toolName?: string;
  args?: any;
}

interface ToolResult {
  toolName?: string;
  result?: any;
  output?: any;
}

const ToolCallRenderer: React.FC<{ call: ToolCall }> = ({ call }) => (
  <div className="border border-primary/20 bg-primary/5 p-2 rounded-sm mb-2 font-mono">
    <div className="flex items-center gap-2 mb-1 border-b border-primary/10 pb-1">
      <span className="text-[8px] bg-primary/20 text-primary px-1 rounded uppercase tracking-tighter font-bold">TOOL CALL</span>
      <span className="text-[10px] text-primary font-bold">{call.function?.name || call.toolName || 'Unknown Tool'}</span>
      {call.id && <span className="text-[7px] text-primary/40 ml-auto">ID: {call.id.slice(0, 8)}</span>}
    </div>
    <pre className="text-[9px] text-muted overflow-x-auto whitespace-pre-wrap">
      {(() => {
        try {
          const args = call.function?.arguments || call.args || {};
          return typeof args === 'string' ? args : JSON.stringify(args, null, 2);
        } catch (e) {
          return 'Error parsing arguments';
        }
      })()}
    </pre>
  </div>
);

const ToolResultRenderer: React.FC<{ result: ToolResult }> = ({ result }) => (
  <div className="border border-green-500/20 bg-green-500/5 p-2 rounded-sm mb-2 font-mono">
    <div className="flex items-center gap-2 mb-1 border-b border-green-500/10 pb-1">
      <span className="text-[8px] bg-green-500/20 text-green-500 px-1 rounded uppercase tracking-tighter font-bold">TOOL RESULT</span>
      <span className="text-[10px] text-green-500 font-bold">{result.toolName || 'Result'}</span>
    </div>
    <pre className="text-[9px] text-muted/80 overflow-x-auto whitespace-pre-wrap">
      {(() => {
        try {
          const out = result.result || result.output || result;
          return typeof out === 'string' ? out : JSON.stringify(out, null, 2);
        } catch (e) {
          return 'Error parsing result';
        }
      })()}
    </pre>
  </div>
);

const ReasoningLog: React.FC<ReasoningLogProps> = ({ payload = {}, role }) => {
  if (!payload || typeof payload !== 'object') return <p className="text-[10px] font-mono text-red-500">Payload Corrupted</p>;

  // Normalize tool_calls and tool_results if nested in common AI SDK response keys
  const toolCalls = (payload.tool_calls || payload.toolCalls || payload.response?.toolCalls) as ToolCall[] | undefined;
  const toolResults = (payload.tool_results || payload.toolResults || payload.response?.toolResults) as ToolResult[] | undefined;

  return (
    <div className="bg-background/60 border border-primary/10 p-4 rounded-sm font-mono text-[10px] leading-relaxed">
      <div className="flex justify-between items-center mb-3 pb-2 border-b border-primary/5">
        <span className="text-primary uppercase tracking-widest font-bold">{role} Thought Loop</span>
        <div className="flex items-center gap-2">
           <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
           <span className="text-muted-foreground/40 uppercase tracking-tighter">Initialising Trace</span>
        </div>
      </div>
      
      <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-primary/20">
        {/* Render Tool Calls first if they exist */}
        {Array.isArray(toolCalls) && toolCalls.length > 0 && (
          <div className="space-y-1">
            <p className="uppercase tracking-tighter text-primary font-bold mb-2">Active Reasoning Protocol:</p>
            {toolCalls.map((call, idx) => <ToolCallRenderer key={idx} call={call} />)}
          </div>
        )}

        {/* Render Tool Results if they exist */}
        {Array.isArray(toolResults) && toolResults.length > 0 && (
          <div className="space-y-1">
            <p className="uppercase tracking-tighter text-green-500 font-bold mb-2">Execution Results:</p>
            {toolResults.map((res, idx) => <ToolResultRenderer key={idx} result={res} />)}
          </div>
        )}

        {Object.entries(payload).map(([key, value]) => {
          // Skip keys already rendered specifically
          if (['tool_calls', 'toolCalls', 'tool_results', 'toolResults'].includes(key)) return null;
          
          const isCore = ['intent', 'spec', 'prompt', 'response'].includes(key.toLowerCase());
          return (
            <div key={key} className={`space-y-1 ${isCore ? 'bg-primary/5 p-2 border-l border-primary/40' : ''}`}>
              <p className={`uppercase tracking-tighter ${isCore ? 'text-primary font-bold' : 'text-primary/60'}`}>
                {key === 'intent' || key === 'prompt' ? 'System Input' : key === 'spec' || key === 'response' ? 'Agent Output' : key}:
              </p>
              <p className="text-muted whitespace-pre-wrap pl-2 leading-tight">
                {typeof value === 'string' ? value : JSON.stringify(value, null, 2)}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ReasoningLog;
