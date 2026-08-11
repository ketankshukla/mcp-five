import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { SECTIONS } from "@/lib/navigation";

/* ---------------------------------------------------------------------------
   ProjectCard — the five-project grid.
   --------------------------------------------------------------------------- */

export function ProjectGrid({ children }: { children: ReactNode }) {
  return (
    <div className="not-prose breakout my-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {children}
    </div>
  );
}

export function ProjectCard({
  n,
  emoji,
  name,
  tagline,
  href,
  repo,
}: {
  n: number;
  emoji: string;
  name: string;
  tagline: string;
  href: string;
  repo: string;
}) {
  const section = SECTIONS.find((s) => s.project === n);
  const vars = {
    "--accent": section ? `var(${section.accentVar})` : "var(--accent)",
  } as CSSProperties;

  return (
    <article
      style={vars}
      className="flex flex-col gap-2 rounded-[var(--radius-card)] border border-[var(--border)] bg-[var(--surface-1)] p-5 transition-colors duration-120 hover:border-[var(--accent)]"
    >
      <span className="font-[family-name:var(--font-mono)] text-[0.75rem] text-[var(--text-faint)]">
        #{n}
      </span>
      <Link
        href={href}
        className="flex items-center gap-2.5 font-[family-name:var(--font-display)] text-[1.375rem] leading-tight font-700 tracking-tight text-[var(--accent)] no-underline"
      >
        <span aria-hidden>{emoji}</span>
        {name}
      </Link>
      <p className="flex-1 text-[1rem] leading-snug text-[var(--text-muted)]">{tagline}</p>
      <a
        href={repo}
        className="mt-1 text-[0.8125rem] text-[var(--text-faint)] underline underline-offset-2"
      >
        the repo →
      </a>
    </article>
  );
}

/* ---------------------------------------------------------------------------
   Capability — the five-capability rows.
   --------------------------------------------------------------------------- */

export function Capability({
  name,
  emoji,
  oneLiner,
  introducedIn,
  children,
}: {
  name: string;
  emoji: string;
  oneLiner: string;
  /** Which project first uses it, as plain text — "project #5", "never". */
  introducedIn: string;
  children?: ReactNode;
}) {
  return (
    <section className="not-prose my-5 rounded-[var(--radius-card)] border border-[var(--border)] bg-[var(--surface-1)] p-5">
      <header className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <h4 className="flex items-center gap-2 font-[family-name:var(--font-display)] text-[1.25rem] font-700 tracking-tight text-[var(--accent)]">
          <span aria-hidden>{emoji}</span>
          <code className="font-[family-name:var(--font-mono)] text-[1.0625rem]">{name}</code>
        </h4>
        <span className="rounded-[var(--radius-pill)] border border-[var(--border)] px-2.5 py-0.5 text-[0.75rem] text-[var(--text-faint)]">
          {introducedIn}
        </span>
      </header>
      <p className="mt-2 text-[1.0625rem] leading-relaxed text-[var(--text)]">{oneLiner}</p>
      {children ? (
        <div className="mt-3 text-[1rem] leading-relaxed text-[var(--text-muted)] [&>*:first-child]:mt-0 [&>*:last-child]:mb-0 [&>p]:my-2.5">
          {children}
        </div>
      ) : null}
    </section>
  );
}

/* ---------------------------------------------------------------------------
   Glossary
   --------------------------------------------------------------------------- */

export function Glossary({ children }: { children: ReactNode }) {
  return (
    <dl className="not-prose breakout my-8 grid gap-x-8 gap-y-0 sm:grid-cols-[minmax(9rem,14rem)_1fr]">
      {children}
    </dl>
  );
}

export function Term({ word, children }: { word: string; children: ReactNode }) {
  return (
    <>
      <dt className="border-t border-[var(--border)] pt-4 font-[family-name:var(--font-display)] text-[1.0625rem] font-600 text-[var(--accent)]">
        {word}
      </dt>
      <dd className="border-[var(--border)] pb-4 text-[1.0625rem] leading-relaxed text-[var(--text-muted)] sm:border-t sm:pt-4">
        {children}
      </dd>
    </>
  );
}
