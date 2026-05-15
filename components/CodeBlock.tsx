"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";

interface CodeBlockProps {
  code: string;
  language?: string;
  showCopy?: boolean;
  compact?: boolean;
}

export default function CodeBlock({
  code,
  language = "bash",
  showCopy = true,
  compact = false,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-lg border border-slate-700 bg-slate-900 overflow-hidden font-mono text-sm">
      {/* Terminal title bar */}
      {!compact && (
        <div className="flex items-center justify-between px-4 py-2.5 bg-slate-800 border-b border-slate-700">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-red-500/60" />
            <span className="w-3 h-3 rounded-full bg-yellow-500/60" />
            <span className="w-3 h-3 rounded-full bg-green-500/60" />
          </div>
          <span className="text-xs text-slate-500">{language}</span>
          {showCopy && (
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-200 transition-colors"
            >
              {copied ? (
                <Check size={13} className="text-green-400" />
              ) : (
                <Copy size={13} />
              )}
              <span>{copied ? "Copied!" : "Copy"}</span>
            </button>
          )}
        </div>
      )}

      {/* Code content */}
      <div className="relative group">
        <pre className={`overflow-x-auto text-slate-300 leading-relaxed ${compact ? "p-3 text-xs" : "p-5"}`}>
          <code>{code}</code>
        </pre>
        {compact && showCopy && (
          <button
            onClick={handleCopy}
            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded bg-slate-700 text-slate-400 hover:text-slate-200"
            aria-label="Copy code"
          >
            {copied ? <Check size={12} className="text-green-400" /> : <Copy size={12} />}
          </button>
        )}
      </div>
    </div>
  );
}
