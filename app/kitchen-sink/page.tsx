import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Content from "@/content/_kitchen-sink.mdx";
import { Sidebar } from "@/components/layout/Sidebar";
import { MobileNav } from "@/components/layout/MobileNav";

/**
 * Every MDX component on one page, in the real layout.
 *
 * Kept in the repo rather than deleted after M2: it is the only place a
 * design-system change can break loudly instead of quietly, on page thirty of
 * a section nobody re-reads. Not in the nav, and not indexed.
 */
export const metadata: Metadata = {
  title: "Kitchen sink",
  robots: { index: false, follow: false },
};

export default function KitchenSink() {
  // Rendered in the Crew's violet, chosen so the accent is obviously *not* the
  // default — if a component hardcodes a colour, it shows up here.
  const accent = { "--accent": "var(--accent-4)" } as CSSProperties;

  return (
    <div className="min-h-dvh">
      <MobileNav />
      <div className="mx-auto flex w-full max-w-[1680px]">
        <Sidebar />
        <main
          id="content"
          style={accent}
          className="min-w-0 flex-1 px-5 py-12 sm:px-10 lg:px-14 xl:px-16"
        >
          <header className="mb-10 max-w-[var(--measure)]">
            <p className="mb-3 text-[0.8125rem] tracking-wide text-[var(--text-muted)]">
              🧪 <span className="font-600 text-[var(--accent)]">Component reference</span> ·
              not part of the course
            </p>
            <h1 className="flex flex-wrap items-baseline gap-x-4 font-[family-name:var(--font-display)] text-[clamp(2.25rem,4.5vw,3.5rem)] leading-[1.1] font-700 tracking-[-0.02em] text-[var(--accent)]">
              <span aria-hidden className="text-[0.7em]">
                🧪
              </span>
              Kitchen sink
            </h1>
          </header>

          <article className="prose">
            <Content />
          </article>
        </main>
      </div>
    </div>
  );
}
