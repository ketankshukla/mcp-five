import type { CSSProperties, ReactNode } from "react";

type Tone = "accent" | "ok" | "danger" | "warn" | "muted";

const TONES: Record<Tone, string> = {
  accent: "var(--accent)",
  ok: "var(--ok)",
  danger: "var(--danger)",
  warn: "var(--warn)",
  muted: "var(--text-muted)",
};

/**
 * A big number tile — `439k tokens`, `0 of 36`, `$0.00`, `13/13`.
 *
 * Every value on this site came from a real run. If a figure is not in one of
 * the five repos, it does not get a tile.
 */
export function Stat({
  value,
  label,
  tone = "accent",
  note,
}: {
  value: ReactNode;
  label: ReactNode;
  tone?: Tone;
  /** Optional smaller line under the label — where the number came from. */
  note?: ReactNode;
}) {
  const vars = { "--tone": TONES[tone] } as CSSProperties;

  return (
    <div
      style={vars}
      className="flex flex-col gap-1 rounded-[var(--radius-card)] border border-[var(--border)] bg-[var(--surface-1)] p-5"
    >
      <span className="font-[family-name:var(--font-display)] text-[2.5rem] leading-none font-700 tracking-[-0.02em] text-[var(--tone)] tabular-nums">
        {value}
      </span>
      <span className="mt-1 text-[0.9375rem] leading-snug text-[var(--text)]">{label}</span>
      {note ? (
        <span className="text-[0.8125rem] leading-snug text-[var(--text-faint)]">{note}</span>
      ) : null}
    </div>
  );
}

export function StatGrid({ children }: { children: ReactNode }) {
  return (
    <div className="not-prose breakout my-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {children}
    </div>
  );
}
