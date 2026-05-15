"use client";

import { useState, useMemo } from "react";
import { Search, X, AlertTriangle, ChevronDown, ChevronUp } from "lucide-react";
import { troubleshootingItems } from "@/lib/troubleshooting";
import CodeBlock from "@/components/CodeBlock";

function TroubleshootingCard({ item }: { item: (typeof troubleshootingItems)[number] }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900 overflow-hidden">
      {/* Header — always visible */}
      <button
        className="w-full text-left px-6 py-5 flex items-start justify-between gap-4 hover:bg-slate-800/50 transition-colors"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex-1 min-w-0">
          <div className="flex items-start gap-3 mb-1.5">
            <AlertTriangle size={16} className="text-yellow-500 shrink-0 mt-0.5" />
            <h3 className="font-semibold text-slate-100 leading-snug">
              {item.title}
            </h3>
          </div>
          <p className="text-sm text-slate-500 ml-7">{item.cause}</p>
        </div>
        <div className="shrink-0 text-slate-500 mt-0.5">
          {expanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </div>
      </button>

      {/* Expanded content */}
      {expanded && (
        <div className="border-t border-slate-800 px-6 py-5 space-y-5">
          <p className="text-slate-400 text-sm leading-relaxed">
            {item.description}
          </p>

          <div className="space-y-4">
            {item.fixes.map((fix, i) => (
              <div key={i}>
                <p className="text-xs text-slate-500 mb-2 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400 font-mono text-xs shrink-0">
                    {i + 1}
                  </span>
                  {fix.label}
                </p>
                <CodeBlock code={fix.code} language="bash" />
              </div>
            ))}
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 pt-1">
            {item.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs text-slate-600 bg-slate-800 border border-slate-700 rounded px-2 py-0.5"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function TroubleshootingPage() {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return troubleshootingItems;
    return troubleshootingItems.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.cause.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.tags.some((t) => t.includes(q))
    );
  }, [query]);

  return (
    <div className="bg-slate-950 min-h-screen">
      {/* Page header */}
      <div className="border-b border-slate-800 bg-slate-900/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center gap-3 mb-3">
            <AlertTriangle size={22} className="text-yellow-500" />
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-100">
              Troubleshooting
            </h1>
          </div>
          <p className="text-slate-400 max-w-xl">
            {troubleshootingItems.length} common Git errors — each with a root
            cause explanation and step-by-step fix. Click any item to expand.
          </p>

          {/* Search */}
          <div className="mt-6 relative max-w-md">
            <Search
              size={16}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none"
            />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search errors…"
              className="w-full pl-10 pr-10 py-2.5 rounded-lg bg-slate-800 border border-slate-700 text-slate-200 placeholder-slate-500 text-sm focus:outline-none focus:border-green-500/50 focus:ring-1 focus:ring-green-500/30 transition-colors"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
              >
                <X size={15} />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Items */}
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-10">
        {filtered.length === 0 ? (
          <div className="text-center py-20 text-slate-500">
            <Search size={32} className="mx-auto mb-4 opacity-40" />
            <p className="text-lg font-medium text-slate-400">No results found</p>
            <p className="mt-1 text-sm">
              Try a different keyword or{" "}
              <button
                onClick={() => setQuery("")}
                className="text-green-400 hover:text-green-300 underline"
              >
                clear search
              </button>
            </p>
          </div>
        ) : (
          <>
            {query && (
              <p className="text-sm text-slate-500 mb-6">
                {filtered.length} result{filtered.length !== 1 ? "s" : ""} for &ldquo;{query}&rdquo;
              </p>
            )}
            <div className="space-y-3">
              {filtered.map((item) => (
                <TroubleshootingCard key={item.slug} item={item} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
