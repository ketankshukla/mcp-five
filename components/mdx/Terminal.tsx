import type { ReactNode } from "react";

/**
 * Real console output, reproduced verbatim.
 *
 * Deliberately NOT syntax highlighted — this is a transcript, not source, and
 * colouring it would imply a structure the terminal never had. What it does
 * preserve is the ✓ / 🛑 / ⏸ / 💸 glyphs from the actual runs, because those
 * are how the five projects report themselves.
 */
export function Terminal({
  title,
  children,
}: {
  title?: string;
  children: ReactNode;
}) {
  return (
    <div className="not-prose breakout my-8 overflow-hidden rounded-[var(--radius-code)] border border-[var(--border)] bg-[var(--surface-1)]">
      <div className="flex items-center gap-2 border-b border-[var(--border)] bg-[var(--surface-2)] px-4 py-2">
        <span aria-hidden className="flex gap-1.5">
          <span className="block h-2.5 w-2.5 rounded-full bg-[var(--border-strong)]" />
          <span className="block h-2.5 w-2.5 rounded-full bg-[var(--border-strong)]" />
          <span className="block h-2.5 w-2.5 rounded-full bg-[var(--border-strong)]" />
        </span>
        <span className="ml-1 font-[family-name:var(--font-mono)] text-[0.75rem] text-[var(--text-faint)]">
          {title ?? "terminal"}
        </span>
      </div>
      <pre className="scroll-box thin-scroll m-0 rounded-none border-0 bg-transparent px-4 py-4 font-[family-name:var(--font-mono)] text-[0.875rem] leading-[1.65] text-[var(--text-muted)]">
        {children}
      </pre>
    </div>
  );
}
