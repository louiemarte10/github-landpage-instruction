import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Tag } from "lucide-react";
import { commands, getCommandBySlug, getAllSlugs, CATEGORIES } from "@/lib/commands";
import CodeBlock from "@/components/CodeBlock";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const cmd = getCommandBySlug(slug);
  if (!cmd) return {};
  return {
    title: cmd.name,
    description: cmd.summary,
  };
}

export default async function CommandDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const cmd = getCommandBySlug(slug);

  if (!cmd) notFound();

  const currentIndex = commands.findIndex((c) => c.slug === slug);
  const prevCmd = currentIndex > 0 ? commands[currentIndex - 1] : null;
  const nextCmd = currentIndex < commands.length - 1 ? commands[currentIndex + 1] : null;

  const relatedCommands = cmd.related
    .map((r) => commands.find((c) => c.slug === r))
    .filter(Boolean);

  return (
    <div className="bg-slate-950 min-h-screen">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-10">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-slate-500 mb-8">
          <Link href="/commands" className="hover:text-slate-300 transition-colors flex items-center gap-1.5">
            <ArrowLeft size={14} />
            Commands
          </Link>
          <span>/</span>
          <span className="text-slate-400 font-mono">{cmd.name}</span>
        </nav>

        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <span className="text-xs font-medium text-green-400 bg-green-400/10 border border-green-400/20 px-2.5 py-1 rounded-md">
              {CATEGORIES[cmd.category]}
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-100 font-mono">
            {cmd.name}
          </h1>
          <p className="mt-3 text-lg text-slate-400 leading-relaxed">
            {cmd.summary}
          </p>
        </div>

        {/* Description */}
        <section className="mb-10">
          <h2 className="text-lg font-semibold text-slate-200 mb-3">Overview</h2>
          <p className="text-slate-400 leading-relaxed">{cmd.description}</p>
        </section>

        {/* Syntax */}
        <section className="mb-10">
          <h2 className="text-lg font-semibold text-slate-200 mb-3">Syntax</h2>
          <CodeBlock code={cmd.syntax} language="bash" />
        </section>

        {/* Flags */}
        {cmd.flags.length > 0 && (
          <section className="mb-10">
            <h2 className="text-lg font-semibold text-slate-200 mb-4">
              Common flags
            </h2>
            <div className="rounded-xl border border-slate-800 overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-800 bg-slate-900">
                    <th className="text-left px-5 py-3 text-slate-400 font-medium w-2/5">
                      Flag
                    </th>
                    <th className="text-left px-5 py-3 text-slate-400 font-medium">
                      Description
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {cmd.flags.map((f, i) => (
                    <tr
                      key={i}
                      className="border-b border-slate-800 last:border-0 hover:bg-slate-900/50 transition-colors"
                    >
                      <td className="px-5 py-3.5 align-top">
                        <code className="text-green-400 font-mono text-xs bg-green-400/5 border border-green-400/10 rounded px-2 py-0.5">
                          {f.flag}
                        </code>
                      </td>
                      <td className="px-5 py-3.5 text-slate-400 leading-relaxed">
                        {f.description}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* Examples */}
        <section className="mb-10">
          <h2 className="text-lg font-semibold text-slate-200 mb-4">Examples</h2>
          <div className="space-y-5">
            {cmd.examples.map((ex, i) => (
              <div key={i}>
                <p className="text-sm text-slate-500 mb-2 flex items-center gap-2">
                  <span className="text-slate-600 font-mono text-xs">#{i + 1}</span>
                  {ex.comment}
                </p>
                <CodeBlock code={ex.code} language="bash" />
              </div>
            ))}
          </div>
        </section>

        {/* Related commands */}
        {relatedCommands.length > 0 && (
          <section className="mb-12">
            <h2 className="text-lg font-semibold text-slate-200 mb-4 flex items-center gap-2">
              <Tag size={16} className="text-slate-500" />
              Related commands
            </h2>
            <div className="flex flex-wrap gap-3">
              {relatedCommands.map(
                (rel) =>
                  rel && (
                    <Link
                      key={rel.slug}
                      href={`/commands/${rel.slug}`}
                      className="group rounded-lg border border-slate-800 bg-slate-900 px-4 py-3 hover:border-green-500/30 hover:bg-slate-800 transition-all"
                    >
                      <code className="text-green-400 font-mono text-sm">{rel.name}</code>
                      <p className="text-xs text-slate-500 mt-1 line-clamp-1">
                        {rel.summary}
                      </p>
                    </Link>
                  )
              )}
            </div>
          </section>
        )}

        {/* Prev / Next navigation */}
        <div className="border-t border-slate-800 pt-8 grid grid-cols-2 gap-4">
          {prevCmd ? (
            <Link
              href={`/commands/${prevCmd.slug}`}
              className="group rounded-xl border border-slate-800 bg-slate-900 p-4 hover:border-slate-700 transition-colors"
            >
              <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-1.5">
                <ArrowLeft size={12} />
                Previous
              </div>
              <code className="text-green-400 font-mono text-sm font-semibold">
                {prevCmd.name}
              </code>
            </Link>
          ) : (
            <div />
          )}
          {nextCmd ? (
            <Link
              href={`/commands/${nextCmd.slug}`}
              className="group rounded-xl border border-slate-800 bg-slate-900 p-4 hover:border-slate-700 transition-colors text-right"
            >
              <div className="flex items-center justify-end gap-1.5 text-xs text-slate-500 mb-1.5">
                Next
                <ArrowRight size={12} />
              </div>
              <code className="text-green-400 font-mono text-sm font-semibold">
                {nextCmd.name}
              </code>
            </Link>
          ) : (
            <div />
          )}
        </div>
      </div>
    </div>
  );
}
