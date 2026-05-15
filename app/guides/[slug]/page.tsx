import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Info,
  Lightbulb,
} from "lucide-react";
import { guides, getGuideBySlug, getAllGuideSlugs } from "@/lib/guides";
import CodeBlock from "@/components/CodeBlock";
import type { Block } from "@/lib/guides";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllGuideSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) return {};
  return {
    title: guide.title,
    description: guide.description,
  };
}

function BlockRenderer({ block }: { block: Block }) {
  switch (block.type) {
    case "description":
      return (
        <p className="text-slate-400 leading-relaxed text-sm">
          {block.content}
        </p>
      );

    case "code":
      return <CodeBlock code={block.content} language="bash" />;

    case "note":
      return (
        <div className="flex gap-3 rounded-lg border border-blue-500/20 bg-blue-500/5 px-4 py-3.5">
          <Info size={15} className="text-blue-400 shrink-0 mt-0.5" />
          <p className="text-sm text-blue-300/80 leading-relaxed">
            {block.content}
          </p>
        </div>
      );

    case "warning":
      return (
        <div className="flex gap-3 rounded-lg border border-yellow-500/20 bg-yellow-500/5 px-4 py-3.5">
          <AlertTriangle size={15} className="text-yellow-400 shrink-0 mt-0.5" />
          <p className="text-sm text-yellow-300/80 leading-relaxed">
            {block.content}
          </p>
        </div>
      );

    case "tip":
      return (
        <div className="flex gap-3 rounded-lg border border-green-500/20 bg-green-500/5 px-4 py-3.5">
          <Lightbulb size={15} className="text-green-400 shrink-0 mt-0.5" />
          <p className="text-sm text-green-300/80 leading-relaxed">
            {block.content}
          </p>
        </div>
      );

    default:
      return null;
  }
}

const DIFFICULTY_COLORS = {
  beginner: "text-green-400 bg-green-400/10 border-green-400/20",
  intermediate: "text-yellow-400 bg-yellow-400/10 border-yellow-400/20",
};

export default async function GuideDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);

  if (!guide) notFound();

  const currentIndex = guides.findIndex((g) => g.slug === slug);
  const prevGuide = currentIndex > 0 ? guides[currentIndex - 1] : null;
  const nextGuide =
    currentIndex < guides.length - 1 ? guides[currentIndex + 1] : null;

  return (
    <div className="bg-slate-950 min-h-screen">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-10">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-slate-500 mb-8">
          <Link
            href="/guides"
            className="hover:text-slate-300 transition-colors flex items-center gap-1.5"
          >
            <ArrowLeft size={14} />
            Guides
          </Link>
          <span>/</span>
          <span className="text-slate-400 line-clamp-1">{guide.title}</span>
        </nav>

        {/* Guide header */}
        <header className="mb-10">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span
              className={`text-xs font-medium border rounded px-2.5 py-1 capitalize ${
                DIFFICULTY_COLORS[guide.difficulty]
              }`}
            >
              {guide.difficulty}
            </span>
            <span className="flex items-center gap-1.5 text-xs text-slate-500">
              <Clock size={12} />
              {guide.estimatedTime}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold text-slate-100 leading-tight mb-3">
            {guide.title}
          </h1>
          <p className="text-lg text-slate-400 leading-relaxed">
            {guide.subtitle}
          </p>
        </header>

        {/* Prerequisites */}
        <div className="rounded-xl border border-slate-800 bg-slate-900 p-6 mb-10">
          <h2 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-4">
            Prerequisites
          </h2>
          <ul className="space-y-2.5">
            {guide.prerequisites.map((p, i) => (
              <li key={i} className="flex items-start gap-3">
                <CheckCircle2 size={15} className="text-green-400 shrink-0 mt-0.5" />
                <span className="text-sm text-slate-400 leading-relaxed">{p}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Sections */}
        <div className="space-y-12">
          {guide.sections.map((section) => (
            <section key={section.id} id={section.id}>
              {/* Section header */}
              <div className="flex items-center gap-3 mb-1">
                <h2 className="text-xl font-bold text-slate-100">
                  {section.label}
                </h2>
                {section.badge && (
                  <span className="text-xs font-medium text-blue-400 bg-blue-400/10 border border-blue-400/20 rounded-full px-3 py-0.5">
                    {section.badge}
                  </span>
                )}
              </div>

              {section.description && (
                <p className="text-slate-500 text-sm leading-relaxed mb-6">
                  {section.description}
                </p>
              )}

              {/* Steps */}
              <div className="space-y-6 mt-5">
                {section.steps.map((step, stepIndex) => (
                  <div
                    key={stepIndex}
                    className="relative pl-10"
                  >
                    {/* Step connector line */}
                    {stepIndex < section.steps.length - 1 && (
                      <div className="absolute left-[18px] top-8 bottom-0 w-px bg-slate-800" />
                    )}

                    {/* Step number bubble */}
                    <div className="absolute left-0 top-0 w-9 h-9 rounded-full border border-slate-700 bg-slate-900 flex items-center justify-center shrink-0">
                      <span className="text-xs font-bold text-slate-400 font-mono">
                        {stepIndex + 1}
                      </span>
                    </div>

                    {/* Step content */}
                    <div className="pt-1.5 pb-6">
                      <h3 className="font-semibold text-slate-200 mb-4">
                        {step.title}
                      </h3>
                      <div className="space-y-3">
                        {step.blocks.map((block, blockIndex) => (
                          <BlockRenderer key={blockIndex} block={block} />
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* Completion banner */}
        <div className="mt-12 rounded-xl border border-green-500/20 bg-green-500/5 p-6 text-center">
          <CheckCircle2 size={28} className="text-green-400 mx-auto mb-3" />
          <h3 className="font-semibold text-slate-100 mb-1">
            Guide complete
          </h3>
          <p className="text-slate-500 text-sm">
            You have reached the end of this guide. Check the Command Reference
            for deeper detail on any command used here.
          </p>
          <div className="mt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/commands"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-green-500 text-slate-950 font-semibold text-sm hover:bg-green-400 transition-colors"
            >
              Browse Commands
            </Link>
            <Link
              href="/guides"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-slate-700 text-slate-300 font-semibold text-sm hover:border-slate-500 hover:bg-slate-800 transition-colors"
            >
              All Guides
            </Link>
          </div>
        </div>

        {/* Prev / Next navigation */}
        {(prevGuide || nextGuide) && (
          <div className="border-t border-slate-800 mt-10 pt-8 grid grid-cols-2 gap-4">
            {prevGuide ? (
              <Link
                href={`/guides/${prevGuide.slug}`}
                className="rounded-xl border border-slate-800 bg-slate-900 p-4 hover:border-slate-700 transition-colors"
              >
                <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-1.5">
                  <ArrowLeft size={12} />
                  Previous
                </div>
                <span className="text-sm font-semibold text-slate-300 line-clamp-2">
                  {prevGuide.title}
                </span>
              </Link>
            ) : (
              <div />
            )}
            {nextGuide ? (
              <Link
                href={`/guides/${nextGuide.slug}`}
                className="rounded-xl border border-slate-800 bg-slate-900 p-4 hover:border-slate-700 transition-colors text-right"
              >
                <div className="flex items-center justify-end gap-1.5 text-xs text-slate-500 mb-1.5">
                  Next
                  <ArrowLeft size={12} className="rotate-180" />
                </div>
                <span className="text-sm font-semibold text-slate-300 line-clamp-2">
                  {nextGuide.title}
                </span>
              </Link>
            ) : (
              <div />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
