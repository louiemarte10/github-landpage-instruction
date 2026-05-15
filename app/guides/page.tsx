import type { Metadata } from "next";
import Link from "next/link";
import { BookOpen, Clock, ArrowRight, ChevronRight } from "lucide-react";
import { guides } from "@/lib/guides";

export const metadata: Metadata = {
  title: "Guides",
  description:
    "Step-by-step Git workflow guides — from deploying a new repository to safely syncing remote changes.",
};

const DIFFICULTY_COLORS = {
  beginner: "text-green-400 bg-green-400/10 border-green-400/20",
  intermediate: "text-yellow-400 bg-yellow-400/10 border-yellow-400/20",
};

export default function GuidesPage() {
  return (
    <div className="bg-slate-950 min-h-screen">
      {/* Page header */}
      <div className="border-b border-slate-800 bg-slate-900/50">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center gap-3 mb-3">
            <BookOpen size={22} className="text-green-400" />
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-100">
              Workflow Guides
            </h1>
          </div>
          <p className="text-slate-400 max-w-xl">
            End-to-end step-by-step guides for real Git scenarios — not just
            command references, but full procedures with context and
            explanations.
          </p>
        </div>
      </div>

      {/* Guide cards */}
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {guides.map((guide, i) => (
            <Link
              key={guide.slug}
              href={`/guides/${guide.slug}`}
              className="group rounded-2xl border border-slate-800 bg-slate-900 p-7 hover:border-green-500/30 hover:bg-slate-800/60 transition-all flex flex-col"
            >
              {/* Guide number */}
              <div className="flex items-center justify-between mb-5">
                <span className="text-xs font-bold text-slate-600 bg-slate-800 border border-slate-700 rounded px-2.5 py-1 font-mono">
                  Guide {String(i + 1).padStart(2, "0")}
                </span>
                <span
                  className={`text-xs font-medium border rounded px-2.5 py-1 capitalize ${
                    DIFFICULTY_COLORS[guide.difficulty]
                  }`}
                >
                  {guide.difficulty}
                </span>
              </div>

              <h2 className="text-xl font-bold text-slate-100 mb-2 leading-snug">
                {guide.title}
              </h2>
              <p className="text-slate-400 text-sm leading-relaxed mb-5 flex-1">
                {guide.subtitle}
              </p>

              {/* Meta */}
              <div className="flex items-center gap-4 text-xs text-slate-600 mb-6">
                <span className="flex items-center gap-1.5">
                  <Clock size={12} />
                  {guide.estimatedTime}
                </span>
                <span className="flex items-center gap-1.5">
                  <ChevronRight size={12} />
                  {guide.sections.length} sections
                </span>
              </div>

              {/* Prerequisites preview */}
              <div className="rounded-lg border border-slate-800 bg-slate-950 p-4 mb-5">
                <p className="text-xs text-slate-500 uppercase tracking-wider font-medium mb-2">
                  Prerequisites
                </p>
                <ul className="space-y-1">
                  {guide.prerequisites.slice(0, 2).map((p, j) => (
                    <li
                      key={j}
                      className="text-xs text-slate-500 flex items-start gap-2"
                    >
                      <span className="text-green-500 mt-0.5 shrink-0">✓</span>
                      <span className="line-clamp-1">{p}</span>
                    </li>
                  ))}
                  {guide.prerequisites.length > 2 && (
                    <li className="text-xs text-slate-600">
                      +{guide.prerequisites.length - 2} more
                    </li>
                  )}
                </ul>
              </div>

              <div className="flex items-center gap-1.5 text-sm text-slate-600 group-hover:text-green-400 transition-colors font-medium">
                Read guide
                <ArrowRight size={14} />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
