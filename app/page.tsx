import Link from "next/link";
import {
  Terminal,
  Search,
  Zap,
  BookOpen,
  ArrowRight,
  AlertTriangle,
  Clock,
} from "lucide-react";
import { commands } from "@/lib/commands";
import { guides } from "@/lib/guides";

const FEATURES = [
  {
    icon: BookOpen,
    title: "Complete Command Reference",
    description:
      "18 Git commands documented with descriptions, flags, and practical examples — covering setup through advanced workflows.",
  },
  {
    icon: Search,
    title: "Searchable by Name or Category",
    description:
      "Filter commands instantly by keyword or browse by category: staging, branching, remote, undoing, and more.",
  },
  {
    icon: AlertTriangle,
    title: "Troubleshooting Guide",
    description:
      "12 common Git errors explained with their root causes and step-by-step fixes — from merge conflicts to auth failures.",
  },
  {
    icon: Zap,
    title: "Copy-Ready Code Blocks",
    description:
      "Every example ships with a one-click copy button. Paste directly into your terminal and get back to work.",
  },
];

const QUICK_START_STEPS = [
  {
    step: "01",
    title: "Configure your identity",
    code: 'git config --global user.name "Your Name"\ngit config --global user.email "you@example.com"',
  },
  {
    step: "02",
    title: "Initialize a repository",
    code: "mkdir my-project\ncd my-project\ngit init",
  },
  {
    step: "03",
    title: "Stage and commit",
    code: 'git add .\ngit commit -m "Initial commit"',
  },
  {
    step: "04",
    title: "Push to GitHub",
    code: "git remote add origin https://github.com/user/repo.git\ngit push -u origin main",
  },
];

const FEATURED_COMMANDS = commands.slice(0, 6);

export default function HomePage() {
  return (
    <div className="bg-slate-950">
      {/* ── Hero ──────────────────────────────────────────── */}
      <section className="relative overflow-hidden">
        {/* Grid background */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(#94a3b8 1px, transparent 1px), linear-gradient(90deg, #94a3b8 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        {/* Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-green-500/5 blur-3xl rounded-full" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-24 pb-20 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-green-500/30 bg-green-500/10 text-green-400 text-xs font-medium mb-6">
            <Terminal size={12} />
            Open Source · MIT Licensed
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-50 leading-tight max-w-4xl mx-auto">
            Master Git from the{" "}
            <span className="text-green-400">Command Line</span>
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
            A comprehensive, searchable reference covering setup, core
            workflows, every essential command, and fixes for the errors you
            will actually run into.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/commands"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-green-500 text-slate-950 font-semibold text-sm hover:bg-green-400 transition-colors"
            >
              Browse Commands
              <ArrowRight size={16} />
            </Link>
            <Link
              href="/troubleshooting"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-slate-700 text-slate-300 font-semibold text-sm hover:border-slate-500 hover:text-slate-100 hover:bg-slate-800 transition-colors"
            >
              Troubleshooting Guide
            </Link>
          </div>

          {/* Stats */}
          <div className="mt-16 flex flex-wrap items-center justify-center gap-8 text-sm">
            {[
              { value: "18", label: "Commands documented" },
              { value: "12", label: "Troubleshooting fixes" },
              { value: "7", label: "Command categories" },
              { value: "MIT", label: "Open source license" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl font-bold text-green-400">{stat.value}</div>
                <div className="text-slate-500 mt-0.5">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ──────────────────────────────────────── */}
      <section className="border-t border-slate-800 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-slate-100">
              Everything you need to work with Git
            </h2>
            <p className="mt-3 text-slate-500 max-w-xl mx-auto">
              Designed for developers who want answers fast — no scrolling
              through walls of text.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURES.map((f) => (
              <div
                key={f.title}
                className="rounded-xl border border-slate-800 bg-slate-900 p-6 hover:border-slate-700 transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-green-500/10 border border-green-500/20 flex items-center justify-center mb-4">
                  <f.icon size={18} className="text-green-400" />
                </div>
                <h3 className="font-semibold text-slate-100 mb-2">{f.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  {f.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Guides ────────────────────────────────────────── */}
      <section className="border-t border-slate-800 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="text-3xl font-bold text-slate-100">
                Workflow Guides
              </h2>
              <p className="mt-2 text-slate-500">
                Step-by-step procedures for real scenarios — not just command
                lists.
              </p>
            </div>
            <Link
              href="/guides"
              className="hidden sm:inline-flex items-center gap-1.5 text-sm text-green-400 hover:text-green-300 transition-colors font-medium"
            >
              All guides →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {guides.map((guide, i) => (
              <Link
                key={guide.slug}
                href={`/guides/${guide.slug}`}
                className="group rounded-xl border border-slate-800 bg-slate-900 p-6 hover:border-green-500/30 hover:bg-slate-800/60 transition-all"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold text-slate-600 bg-slate-800 border border-slate-700 rounded px-2 py-0.5 font-mono">
                    Guide {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-slate-600">
                    <Clock size={11} />
                    {guide.estimatedTime}
                  </span>
                </div>
                <h3 className="font-semibold text-slate-100 mb-2 leading-snug">
                  {guide.title}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-4 line-clamp-2">
                  {guide.subtitle}
                </p>
                <div className="flex items-center gap-1 text-xs text-slate-600 group-hover:text-green-400 transition-colors">
                  Read guide <ArrowRight size={11} className="ml-auto" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Quick Start ───────────────────────────────────── */}
      <section className="border-t border-slate-800 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-slate-100">
              From zero to first push
            </h2>
            <p className="mt-3 text-slate-500">
              The four steps every new Git project starts with.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-4xl mx-auto">
            {QUICK_START_STEPS.map((item) => (
              <div
                key={item.step}
                className="rounded-xl border border-slate-800 bg-slate-900 p-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-xs font-bold text-green-400 bg-green-400/10 border border-green-400/20 rounded px-2 py-0.5 font-mono">
                    {item.step}
                  </span>
                  <h3 className="font-medium text-slate-200">{item.title}</h3>
                </div>
                <pre className="text-sm text-slate-400 font-mono leading-relaxed bg-slate-950 rounded-lg p-4 border border-slate-800 overflow-x-auto">
                  <code>{item.code}</code>
                </pre>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured Commands ─────────────────────────────── */}
      <section className="border-t border-slate-800 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="text-3xl font-bold text-slate-100">
                Essential commands
              </h2>
              <p className="mt-2 text-slate-500">
                The ones you will use every day.
              </p>
            </div>
            <Link
              href="/commands"
              className="hidden sm:inline-flex items-center gap-1.5 text-sm text-green-400 hover:text-green-300 transition-colors font-medium"
            >
              View all 18 →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {FEATURED_COMMANDS.map((cmd) => (
              <Link
                key={cmd.slug}
                href={`/commands/${cmd.slug}`}
                className="group rounded-xl border border-slate-800 bg-slate-900 p-5 hover:border-green-500/30 hover:bg-slate-800/70 transition-all"
              >
                <div className="flex items-start justify-between gap-3">
                  <code className="text-green-400 font-mono text-sm font-semibold">
                    {cmd.name}
                  </code>
                  <span className="shrink-0 text-xs text-slate-600 bg-slate-800 border border-slate-700 rounded px-2 py-0.5 capitalize">
                    {cmd.category}
                  </span>
                </div>
                <p className="mt-2.5 text-slate-500 text-sm leading-relaxed line-clamp-2">
                  {cmd.summary}
                </p>
                <div className="mt-4 flex items-center gap-1 text-xs text-slate-600 group-hover:text-green-400 transition-colors">
                  <span>View examples</span>
                  <ArrowRight size={12} />
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-8 text-center sm:hidden">
            <Link
              href="/commands"
              className="inline-flex items-center gap-2 text-sm text-green-400 hover:text-green-300 transition-colors font-medium"
            >
              View all 18 commands →
            </Link>
          </div>
        </div>
      </section>

      {/* ── Workflow banner ────────────────────────────────── */}
      <section className="border-t border-slate-800 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8 sm:p-12 text-center">
            <div className="flex items-center justify-center gap-3 mb-6 flex-wrap text-slate-500 text-sm font-mono">
              <span className="text-slate-400">edit files</span>
              <ArrowRight size={14} />
              <span className="text-green-400">git add</span>
              <ArrowRight size={14} />
              <span className="text-green-400">git commit</span>
              <ArrowRight size={14} />
              <span className="text-green-400">git pull</span>
              <ArrowRight size={14} />
              <span className="text-green-400">git push</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-100 mb-4">
              The core Git workflow — five steps
            </h2>
            <p className="text-slate-500 max-w-xl mx-auto mb-8 leading-relaxed">
              Every change you will ever ship follows this same cycle. Master it
              once, and Git becomes second nature.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/commands"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-green-500 text-slate-950 font-semibold text-sm hover:bg-green-400 transition-colors"
              >
                Explore Commands
                <ArrowRight size={16} />
              </Link>
              <Link
                href="/troubleshooting"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-slate-700 text-slate-300 font-semibold text-sm hover:border-slate-500 hover:bg-slate-800 transition-colors"
              >
                <AlertTriangle size={16} />
                Troubleshooting
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
