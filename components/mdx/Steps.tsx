import type { ReactNode } from "react";

/** Numbered build stages, joined by an accent rule down the left. */
export function Steps({ children }: { children: ReactNode }) {
  return <ol className="not-prose my-8 list-none space-y-0 p-0">{children}</ol>;
}

export function Step({
  n,
  title,
  children,
}: {
  n: number | string;
  title: ReactNode;
  children: ReactNode;
}) {
  return (
    <li className="relative border-l border-[var(--border)] pb-8 pl-8 last:border-transparent last:pb-0">
      <span
        aria-hidden
        className="absolute top-0 -left-[1.0625rem] flex h-[2.125rem] w-[2.125rem] items-center justify-center rounded-full border border-[var(--accent)] bg-[var(--bg)] font-[family-name:var(--font-mono)] text-[0.8125rem] font-500 text-[var(--accent)] tabular-nums"
      >
        {n}
      </span>
      <h4 className="mt-1 mb-2 font-[family-name:var(--font-display)] text-[1.1875rem] leading-snug font-600 text-[var(--text)]">
        {title}
      </h4>
      <div className="text-[1.0625rem] leading-[1.7] text-[var(--text-muted)] [&>*:first-child]:mt-0 [&>*:last-child]:mb-0 [&>p]:my-3 [&_strong]:text-[var(--text)]">
        {children}
      </div>
    </li>
  );
}

/**
 * "You should now see this." Pairs with <Terminal> underneath it.
 *
 * Every stage in all five BUILD_FROM_SCRATCH docs ends with one of these, and
 * that is the single best idea in those documents: you are never more than one
 * layer away from the bug.
 */
export function Checkpoint({ children }: { children: ReactNode }) {
  return (
    <div className="not-prose my-6 rounded-[var(--radius-card)] border border-[var(--border)] border-l-3 border-l-[var(--ok)] bg-[var(--surface-1)] p-5">
      <p className="mb-2 flex items-center gap-2 font-[family-name:var(--font-display)] text-[0.8125rem] font-600 tracking-widest text-[var(--ok)] uppercase">
        <span aria-hidden>✅</span> Checkpoint
      </p>
      <div className="text-[1.0625rem] leading-[1.7] text-[var(--text)] [&>*:first-child]:mt-0 [&>*:last-child]:mb-0 [&>p]:my-2.5">
        {children}
      </div>
    </div>
  );
}
