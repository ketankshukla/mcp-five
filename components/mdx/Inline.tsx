import { Fragment, type ReactNode } from "react";

/**
 * Renders the tiny subset of markdown used inside `lib/gotchas.ts`: `code`
 * spans, **bold**, and *italic*.
 *
 * The compendium is structured data rather than prose so it can be filtered
 * and counted, but forty entries with no emphasis at all would be unreadable.
 * A whole markdown pipeline for three constructs would be the wrong trade, so
 * this is deliberately a small, total function rather than a parser.
 */
export function Inline({ text }: { text: string }) {
  return <>{parse(text)}</>;
}

const TOKEN = /(`[^`]+`|\*\*[^*]+\*\*|\*[^*]+\*)/g;

function parse(text: string): ReactNode[] {
  return text.split(TOKEN).map((part, i) => {
    if (!part) return null;

    if (part.startsWith("`") && part.endsWith("`") && part.length > 2) {
      return (
        <code
          key={i}
          className="rounded border border-[var(--border)] bg-[var(--surface-2)] px-1 py-0.5 font-[family-name:var(--font-mono)] text-[0.875em] text-[color-mix(in_oklab,var(--accent)_90%,#fff)]"
        >
          {part.slice(1, -1)}
        </code>
      );
    }

    if (part.startsWith("**") && part.endsWith("**") && part.length > 4) {
      return (
        <strong key={i} className="font-650 text-[var(--text)]">
          {part.slice(2, -2)}
        </strong>
      );
    }

    if (part.startsWith("*") && part.endsWith("*") && part.length > 2) {
      return (
        <em key={i} className="italic">
          {part.slice(1, -1)}
        </em>
      );
    }

    return <Fragment key={i}>{part}</Fragment>;
  });
}
