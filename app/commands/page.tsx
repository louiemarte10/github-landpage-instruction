"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Search, ArrowRight, X } from "lucide-react";
import { commands, CATEGORIES, CommandCategory } from "@/lib/commands";

const ALL = "all";

export default function CommandsPage() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<CommandCategory | typeof ALL>(ALL);

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    return commands.filter((cmd) => {
      const matchesCategory =
        activeCategory === ALL || cmd.category === activeCategory;
      const matchesQuery =
        !q ||
        cmd.name.toLowerCase().includes(q) ||
        cmd.summary.toLowerCase().includes(q) ||
        cmd.category.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [query, activeCategory]);

  const categories = Object.entries(CATEGORIES) as [CommandCategory, string][];

  return (
    <div className="bg-slate-950 min-h-screen">
      {/* Page header */}
      <div className="border-b border-slate-800 bg-slate-900/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-100">
            Command Reference
          </h1>
          <p className="mt-3 text-slate-400 max-w-xl">
            {commands.length} Git commands with syntax, flags, and practical
            examples. Search by name or filter by category.
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
              placeholder="Search commands…"
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

          {/* Category filters */}
          <div className="mt-4 flex flex-wrap gap-2">
            <button
              onClick={() => setActiveCategory(ALL)}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                activeCategory === ALL
                  ? "bg-green-500/20 text-green-400 border border-green-500/30"
                  : "bg-slate-800 text-slate-400 border border-slate-700 hover:text-slate-200 hover:border-slate-600"
              }`}
            >
              All ({commands.length})
            </button>
            {categories.map(([key, label]) => {
              const count = commands.filter((c) => c.category === key).length;
              return (
                <button
                  key={key}
                  onClick={() => setActiveCategory(key)}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                    activeCategory === key
                      ? "bg-green-500/20 text-green-400 border border-green-500/30"
                      : "bg-slate-800 text-slate-400 border border-slate-700 hover:text-slate-200 hover:border-slate-600"
                  }`}
                >
                  {label} ({count})
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        {filtered.length === 0 ? (
          <div className="text-center py-20 text-slate-500">
            <Search size={32} className="mx-auto mb-4 opacity-40" />
            <p className="text-lg font-medium text-slate-400">No commands found</p>
            <p className="mt-1 text-sm">
              Try a different keyword or{" "}
              <button
                onClick={() => { setQuery(""); setActiveCategory(ALL); }}
                className="text-green-400 hover:text-green-300 underline"
              >
                clear filters
              </button>
            </p>
          </div>
        ) : (
          <>
            <p className="text-sm text-slate-500 mb-6">
              Showing {filtered.length} of {commands.length} commands
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filtered.map((cmd) => (
                <Link
                  key={cmd.slug}
                  href={`/commands/${cmd.slug}`}
                  className="group rounded-xl border border-slate-800 bg-slate-900 p-5 hover:border-green-500/30 hover:bg-slate-800/60 transition-all"
                >
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <code className="text-green-400 font-mono text-sm font-semibold">
                      {cmd.name}
                    </code>
                    <span className="shrink-0 text-xs text-slate-500 bg-slate-800 border border-slate-700 rounded px-2 py-0.5 capitalize">
                      {CATEGORIES[cmd.category]}
                    </span>
                  </div>
                  <p className="text-slate-500 text-sm leading-relaxed line-clamp-2">
                    {cmd.summary}
                  </p>
                  <div className="mt-4 flex items-center gap-1 text-xs text-slate-600 group-hover:text-green-400 transition-colors">
                    <span>
                      {cmd.examples.length} example
                      {cmd.examples.length !== 1 ? "s" : ""}
                    </span>
                    <span className="mx-1.5">·</span>
                    <span>
                      {cmd.flags.length} flag
                      {cmd.flags.length !== 1 ? "s" : ""}
                    </span>
                    <ArrowRight size={11} className="ml-auto" />
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
