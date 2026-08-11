"use client";

import { useRef, useState } from "react";
import type { ComponentPropsWithoutRef } from "react";

/**
 * The chrome around a code block: a language chip and a copy button.
 *
 * The highlighting itself happened at build time — `rehype-pretty-code` runs
 * in the MDX pipeline, so no highlighter ships to the browser. This component
 * only exists for the copy button, and it reads the text off the DOM rather
 * than being handed a second copy of the source to drift from.
 */
export function CodeBlock({
  children,
  ...props
}: ComponentPropsWithoutRef<"pre"> & { "data-language"?: string }) {
  const ref = useRef<HTMLPreElement>(null);
  const [copied, setCopied] = useState(false);
  const language = props["data-language"];

  async function copy() {
    const text = ref.current?.textContent ?? "";
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      // Clipboard access can be refused (insecure origin, permissions policy).
      // Failing silently is right here: the code is still selectable by hand,
      // and an error toast over a docs page helps nobody.
    }
  }

  return (
    <div className="group not-prose breakout relative my-6">
      <div className="pointer-events-none absolute top-2.5 right-2.5 z-10 flex items-center gap-2">
        {language && language !== "text" ? (
          <span className="rounded-[var(--radius-pill)] border border-[var(--border)] bg-[var(--bg)]/80 px-2 py-0.5 font-[family-name:var(--font-mono)] text-[0.6875rem] text-[var(--text-faint)]">
            {language}
          </span>
        ) : null}
        <button
          type="button"
          onClick={copy}
          className="pointer-events-auto rounded-md border border-[var(--border)] bg-[var(--surface-2)] px-2 py-1 font-[family-name:var(--font-mono)] text-[0.6875rem] text-[var(--text-muted)] opacity-0 transition-opacity duration-120 group-focus-within:opacity-100 group-hover:opacity-100 focus-visible:opacity-100 hover:text-[var(--text)]"
        >
          {copied ? "copied ✓" : "copy"}
        </button>
      </div>

      <pre
        ref={ref}
        {...props}
        className="scroll-box thin-scroll m-0 rounded-[var(--radius-code)] border border-[var(--border)] bg-[var(--surface-1)] px-5 py-4 font-[family-name:var(--font-mono)] text-[0.9375rem] leading-[1.7]"
      >
        {children}
      </pre>
    </div>
  );
}
