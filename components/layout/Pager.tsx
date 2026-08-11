import Link from "next/link";
import type { CSSProperties } from "react";
import { neighbours, type ResolvedPage } from "@/lib/navigation";

/**
 * Previous/next, derived from the registry, crossing section boundaries. Each
 * card wears its *destination's* accent, so the colour tells you where you are
 * about to go before you read the label.
 */
export function Pager({ page }: { page: ResolvedPage }) {
  const { prev, next } = neighbours(page);

  return (
    <nav
      aria-label="Course pagination"
      className="mt-20 grid gap-4 border-t border-[var(--border)] pt-8 sm:grid-cols-2"
    >
      {prev ? <PagerCard page={prev} direction="prev" /> : <span className="hidden sm:block" />}
      {next ? <PagerCard page={next} direction="next" /> : null}
    </nav>
  );
}

function PagerCard({
  page,
  direction,
}: {
  page: ResolvedPage;
  direction: "prev" | "next";
}) {
  const accent = { "--accent": `var(${page.section.accentVar})` } as CSSProperties;
  const isNext = direction === "next";

  return (
    <Link
      href={page.href}
      style={accent}
      rel={isNext ? "next" : "prev"}
      className={`group flex flex-col gap-1.5 rounded-[var(--radius-card)] border border-[var(--border)] bg-[var(--surface-1)] p-4 no-underline transition-colors duration-120 hover:border-[var(--accent)] hover:bg-[var(--surface-2)] ${
        isNext ? "sm:items-end sm:text-right" : ""
      }`}
    >
      <span className="flex items-center gap-1.5 text-[0.75rem] font-600 tracking-widest text-[var(--text-faint)] uppercase">
        {isNext ? null : <span aria-hidden>←</span>}
        {isNext ? "Next" : "Previous"}
        {isNext ? <span aria-hidden>→</span> : null}
      </span>
      <span className="flex items-baseline gap-2">
        <span aria-hidden>{page.emoji}</span>
        <span className="font-[family-name:var(--font-display)] text-lg leading-snug font-600 text-[var(--accent)]">
          {page.title}
        </span>
      </span>
      <span className="text-[0.8125rem] leading-snug text-[var(--text-muted)]">
        {page.section.emoji} {page.section.title}
      </span>
    </Link>
  );
}
