"use client";

import { useEffect, useState } from "react";
import type { CSSProperties } from "react";
import type { Heading } from "@/lib/headings";

/**
 * The right-hand rail, ≥1280px.
 *
 * The outline arrives as props, extracted from the MDX source at build time,
 * so it is in the HTML on first paint. The only thing this component does at
 * runtime is highlight whichever heading you have scrolled to — and that
 * setState lives inside an observer callback, which is what effects are
 * actually for: subscribing to something outside React.
 */
export function OnThisPage({
  headings,
  accentVar,
}: {
  headings: Heading[];
  /** The rail is a sibling of <main>, so it carries its own copy of the accent. */
  accentVar: string;
}) {
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    const nodes = headings
      .map((heading) => document.getElementById(heading.id))
      .filter((node): node is HTMLElement => node !== null);

    if (nodes.length === 0) return;

    // An IntersectionObserver alone picks the wrong heading when several are
    // on screen at once, so the callback re-derives the answer from positions:
    // the last heading above the fold is the one you are reading.
    const observer = new IntersectionObserver(
      () => {
        const above = nodes.filter((node) => node.getBoundingClientRect().top < 160);
        setActiveId(above.length > 0 ? above[above.length - 1].id : nodes[0].id);
      },
      { rootMargin: "-80px 0px -70% 0px", threshold: [0, 1] },
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [headings]);

  if (headings.length < 2) return null;

  return (
    <aside
      style={{ "--accent": `var(${accentVar})` } as CSSProperties}
      className="sticky top-0 hidden h-dvh w-[var(--onthispage-w)] shrink-0 xl:block"
    >
      <div className="thin-scroll h-full overflow-y-auto py-14 pr-6 pl-2">
        <p className="mb-3 font-[family-name:var(--font-display)] text-[0.75rem] font-600 tracking-widest text-[var(--text-faint)] uppercase">
          On this page
        </p>
        <ul className="space-y-0.5 border-l border-[var(--border)]">
          {headings.map((heading) => (
            <li key={heading.id}>
              <a
                href={`#${heading.id}`}
                aria-current={activeId === heading.id ? "true" : undefined}
                className={`-ml-px block border-l-2 py-1 text-[0.8125rem] leading-snug no-underline transition-colors duration-120 ${
                  heading.level === 3 ? "pl-6" : "pl-3"
                } ${
                  activeId === heading.id
                    ? "border-[var(--accent)] text-[var(--accent)]"
                    : "border-transparent text-[var(--text-muted)] hover:text-[var(--text)]"
                }`}
              >
                {heading.text}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
