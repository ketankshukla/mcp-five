import Link from "next/link";
import type { CSSProperties } from "react";
import { SECTIONS, TOTAL_PAGES } from "@/lib/navigation";

const PROJECT_SECTIONS = SECTIONS.filter((s) => s.project);

/**
 * The home page is full-bleed and does not use the three-column learn shell.
 * M6 replaces this with the real hero, the arc diagram and the motion.
 */
export default function Home() {
  return (
    <div className="mx-auto w-full max-w-[80rem] px-5 py-20 sm:px-10 lg:py-28">
      <p className="mb-6 inline-flex items-center gap-2 rounded-[var(--radius-pill)] border border-[var(--border)] bg-[var(--surface-1)] px-4 py-1.5 text-[0.8125rem] text-[var(--text-muted)]">
        <span aria-hidden>🍪</span> A course in {TOTAL_PAGES} pages
      </p>

      <h1 className="font-[family-name:var(--font-display)] text-[clamp(3rem,7vw,5.5rem)] leading-[1.02] font-700 tracking-[-0.03em] text-balance">
        MCP Five
      </h1>

      <p className="mt-6 max-w-[42ch] text-[1.375rem] leading-[1.6] text-[var(--text-muted)] text-pretty">
        The Model Context Protocol, taught through five projects that were
        actually shipped — and that were honest about their own bugs.
      </p>

      <div className="mt-10 flex flex-wrap gap-4">
        <Link
          href="/learn/start/what-is-mcp"
          className="rounded-[var(--radius-pill)] bg-white px-7 py-3.5 font-[family-name:var(--font-display)] font-600 text-black no-underline"
        >
          Start the course →
        </Link>
        <a
          href="https://github.com/ketankshukla/learn-mcp-5-year-old"
          className="rounded-[var(--radius-pill)] border border-[var(--border-strong)] px-7 py-3.5 font-[family-name:var(--font-display)] font-600 text-[var(--text)] no-underline"
        >
          I just want the code
        </a>
      </div>

      <ol className="mt-20 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {PROJECT_SECTIONS.map((section) => {
          const accent = { "--accent": `var(${section.accentVar})` } as CSSProperties;
          return (
            <li key={section.slug} style={accent}>
              <Link
                href={`/learn/${section.slug}/${section.pages[0].slug}`}
                className="flex h-full flex-col gap-2 rounded-[var(--radius-card)] border border-[var(--border)] bg-[var(--surface-1)] p-6 no-underline transition-colors duration-120 hover:border-[var(--accent)] hover:bg-[var(--surface-2)]"
              >
                <span className="font-[family-name:var(--font-mono)] text-[0.75rem] text-[var(--text-faint)]">
                  #{section.project}
                </span>
                <span className="flex items-center gap-2.5 font-[family-name:var(--font-display)] text-2xl font-700 tracking-tight text-[var(--accent)]">
                  <span aria-hidden>{section.emoji}</span>
                  {section.title}
                </span>
                <span className="text-[1.0625rem] leading-snug text-[var(--text-muted)]">
                  {section.tagline}
                </span>
              </Link>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
