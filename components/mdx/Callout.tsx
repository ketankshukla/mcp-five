import type { CSSProperties, ReactNode } from "react";

type CalloutType = "lesson" | "gotcha" | "warning" | "insight" | "quote";

const STYLES: Record<CalloutType, { emoji: string; colour: string; label: string }> = {
  // `lesson` inherits the section accent, so the takeaway box is the same
  // colour as the headings around it.
  lesson: { emoji: "💡", colour: "var(--accent)", label: "Lesson" },
  gotcha: { emoji: "⚠️", colour: "var(--danger)", label: "Gotcha" },
  warning: { emoji: "🚧", colour: "var(--warn)", label: "Careful" },
  insight: { emoji: "🔍", colour: "var(--info)", label: "Worth noticing" },
  quote: { emoji: "", colour: "var(--accent)", label: "" },
};

/**
 * The workhorse. Five flavours, one component, so a page never invents its own
 * box treatment.
 */
export function Callout({
  type = "lesson",
  title,
  children,
}: {
  type?: CalloutType;
  title?: string;
  children: ReactNode;
}) {
  const style = STYLES[type];
  const vars = { "--callout": style.colour } as CSSProperties;

  if (type === "quote") {
    return (
      <blockquote style={vars} className="not-prose my-9 border-l-3 border-[var(--callout)] py-1 pl-6">
        <div className="text-[1.375rem] leading-[1.55] font-450 text-balance text-[var(--text)] italic [&>p]:my-2">
          {children}
        </div>
      </blockquote>
    );
  }

  return (
    <aside
      style={vars}
      className="not-prose my-8 rounded-[var(--radius-card)] border border-[var(--border)] border-l-3 border-l-[var(--callout)] bg-[var(--surface-1)] p-5"
    >
      <p className="mb-2 flex items-center gap-2 font-[family-name:var(--font-display)] text-[0.8125rem] font-600 tracking-widest text-[var(--callout)] uppercase">
        <span aria-hidden>{style.emoji}</span>
        {title ?? style.label}
      </p>
      <div className="text-[1.0625rem] leading-[1.7] text-[var(--text)] [&>*:first-child]:mt-0 [&>*:last-child]:mb-0 [&>p]:my-3">
        {children}
      </div>
    </aside>
  );
}
