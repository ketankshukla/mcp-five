import { notFound } from "next/navigation";
import type { CSSProperties } from "react";
import type { Metadata } from "next";
import { Pager } from "@/components/layout/Pager";
import { getPage, learnParams, TOTAL_PAGES } from "@/lib/navigation";

type Params = { section: string; page: string };

/**
 * Every page on the site is generated at build time from the registry. There
 * is no dynamic data anywhere, so `dynamicParams: false` means a URL that
 * isn't in `lib/navigation.ts` is a 404 rather than a runtime surprise.
 */
export function generateStaticParams() {
  return learnParams();
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { section, page } = await params;
  const entry = getPage(section, page);
  if (!entry) return {};

  return {
    title: entry.title,
    description: entry.summary,
    openGraph: { title: `${entry.title} · MCP Five`, description: entry.summary },
  };
}

export default async function LearnPage({ params }: { params: Promise<Params> }) {
  const { section, page } = await params;
  const entry = getPage(section, page);
  if (!entry) notFound();

  // A template literal here makes the bundler build a module context over
  // content/, which is what keeps "add a page" down to one registry entry plus
  // one .mdx file. A hand-maintained slug → import map would be a third place
  // to edit, and a third place to forget.
  const { default: Content } = await import(`@/content/${section}/${page}.mdx`);

  const accent = { "--accent": `var(${entry.section.accentVar})` } as CSSProperties;

  return (
    <main
      id="content"
      style={accent}
      className="anim-rise min-w-0 flex-1 px-5 py-12 sm:px-10 lg:px-14"
    >
        {/* The 1px accent rule, so the page still carries its section colour
            once you have scrolled past the h1. */}
        <div
          aria-hidden
          className="mb-10 h-px w-full max-w-[var(--measure-wide)] bg-gradient-to-r from-[var(--accent)] to-transparent opacity-60"
        />

        <header className="mb-10 max-w-[var(--measure)]">
          <p className="mb-3 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[0.8125rem] tracking-wide text-[var(--text-muted)]">
            <span aria-hidden>{entry.section.emoji}</span>
            <span className="font-600 text-[var(--accent)]">{entry.section.title}</span>
            {entry.section.project ? (
              <>
                <span aria-hidden className="text-[var(--text-faint)]">
                  ·
                </span>
                <span>Project #{entry.section.project}</span>
              </>
            ) : null}
            <span aria-hidden className="text-[var(--text-faint)]">
              ·
            </span>
            <span className="font-[family-name:var(--font-mono)] text-[0.75rem] tabular-nums text-[var(--text-faint)]">
              {entry.index} / {TOTAL_PAGES}
            </span>
          </p>

          <h1 className="flex flex-wrap items-baseline gap-x-4 font-[family-name:var(--font-display)] text-[clamp(2.25rem,4.5vw,3.5rem)] leading-[1.1] font-700 tracking-[-0.02em] text-balance text-[var(--accent)]">
            <span aria-hidden className="text-[0.7em]">
              {entry.emoji}
            </span>
            <span>{entry.title}</span>
          </h1>

          <p className="mt-4 text-[1.375rem] leading-[1.6] tracking-[-0.005em] text-[var(--text-muted)] text-pretty">
            {entry.summary}
          </p>
        </header>

        <article className="prose">
          <Content />
        </article>

        <div className="max-w-[var(--measure-wide)]">
          <Pager page={entry} />
        </div>
    </main>
  );
}
