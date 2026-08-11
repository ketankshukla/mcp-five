import type { ReactNode } from "react";

/**
 * Two columns, before and after — one-agent versus a crew, vending machine
 * versus contractor-on-your-account.
 *
 * The left side is styled as the losing option and the right as the winning
 * one, because every use of this on the site is making that argument.
 */
export function Compare({
  leftLabel,
  rightLabel,
  left,
  right,
}: {
  leftLabel: ReactNode;
  rightLabel: ReactNode;
  left: ReactNode;
  right: ReactNode;
}) {
  return (
    <div className="not-prose breakout my-8 grid gap-4 md:grid-cols-2">
      <Side label={leftLabel} tone="danger">
        {left}
      </Side>
      <Side label={rightLabel} tone="ok">
        {right}
      </Side>
    </div>
  );
}

function Side({
  label,
  tone,
  children,
}: {
  label: ReactNode;
  tone: "danger" | "ok";
  children: ReactNode;
}) {
  const colour = tone === "ok" ? "var(--ok)" : "var(--danger)";

  return (
    <section
      className="rounded-[var(--radius-card)] border border-[var(--border)] bg-[var(--surface-1)] p-5"
      style={{ borderTopColor: colour, borderTopWidth: 2 }}
    >
      <h4
        className="mb-3 flex items-center gap-2 font-[family-name:var(--font-display)] text-[0.9375rem] font-600 tracking-wide"
        style={{ color: colour }}
      >
        <span aria-hidden>{tone === "ok" ? "✅" : "❌"}</span>
        {label}
      </h4>
      <div className="text-[1.0625rem] leading-[1.65] text-[var(--text-muted)] [&>*:first-child]:mt-0 [&>*:last-child]:mb-0 [&>p]:my-2.5 [&_strong]:text-[var(--text)]">
        {children}
      </div>
    </section>
  );
}
