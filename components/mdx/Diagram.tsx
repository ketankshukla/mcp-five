"use client";

import { useEffect, useId, useRef, useState } from "react";

type Props = {
  title?: string;
  /** Doubles as the diagram's accessible name. Write it as a sentence. */
  caption?: string;
  /** Mermaid source. Pass it as a template literal child. */
  children: string;
};

/**
 * A live Mermaid diagram, themed to the site.
 *
 * Three things this deliberately does:
 *
 *  1. `mermaid` is imported INSIDE the effect, not at module scope, so ~500kB
 *     of parser and layout engine lands in its own chunk and never in the
 *     initial bundle. Nothing Mermaid touches runs during SSR.
 *  2. The stroke colour is read from `--accent` at render time, so a diagram
 *     picks up its section's colour without any page passing it down.
 *  3. It fades in. Client-rendered diagrams otherwise pop into place after the
 *     text has settled, which is the single jankiest thing a docs page can do.
 */
export function Diagram({ title, caption, children }: Props) {
  const reactId = useId();
  const hostRef = useRef<HTMLDivElement>(null);
  const [svg, setSvg] = useState<string>("");
  const [error, setError] = useState<string>("");

  const source = typeof children === "string" ? children.trim() : String(children ?? "");

  useEffect(() => {
    let cancelled = false;

    async function draw() {
      const accent =
        getComputedStyle(hostRef.current ?? document.body)
          .getPropertyValue("--accent")
          .trim() || "#E2E8F0";

      const mermaid = (await import("mermaid")).default;

      mermaid.initialize({
        startOnLoad: false,
        securityLevel: "strict",
        theme: "base",
        darkMode: true,
        themeVariables: {
          background: "#000000",
          primaryColor: "#14141B",
          primaryTextColor: "#FFFFFF",
          primaryBorderColor: accent,
          secondaryColor: "#0B0B0F",
          tertiaryColor: "#0B0B0F",
          lineColor: "#6E6E7E",
          textColor: "#FFFFFF",
          mainBkg: "#14141B",
          nodeBorder: accent,
          clusterBkg: "#0B0B0F",
          clusterBorder: "#26262F",
          titleColor: accent,
          edgeLabelBackground: "#0B0B0F",
          actorBkg: "#14141B",
          actorBorder: accent,
          actorTextColor: "#FFFFFF",
          actorLineColor: "#3A3A47",
          signalColor: "#FFFFFF",
          signalTextColor: "#FFFFFF",
          labelBoxBkgColor: "#14141B",
          labelBoxBorderColor: accent,
          labelTextColor: "#FFFFFF",
          loopTextColor: "#FFFFFF",
          noteBkgColor: "#0B0B0F",
          noteBorderColor: "#3A3A47",
          noteTextColor: "#A7A7B4",
          sequenceNumberColor: "#000000",
          fontFamily: "Inter, sans-serif",
          fontSize: "16px",
        },
        // useMaxWidth: false is deliberate and load-bearing.
        //
        // With it on, Mermaid scales a diagram down to its container's width.
        // A five-node left-to-right flowchart with real labels is ~2000px
        // wide, so in a 583px column it renders 43px tall — present, correct,
        // and completely unreadable. The container below has overflow-x, so
        // the right answer is to let the diagram be its natural size and
        // scroll inside its own box.
        flowchart: { curve: "basis", padding: 16, useMaxWidth: false },
        sequence: { actorMargin: 60, mirrorActors: false, useMaxWidth: false },
      });

      try {
        // The id must be unique per diagram and a valid CSS selector; React's
        // useId contains colons, which Mermaid's own querySelector chokes on.
        const id = `mmd-${reactId.replace(/[^a-zA-Z0-9]/g, "")}`;
        const { svg: rendered } = await mermaid.render(id, source);
        if (!cancelled) setSvg(rendered);
      } catch (cause) {
        if (!cancelled) setError(cause instanceof Error ? cause.message : String(cause));
      }
    }

    void draw();
    return () => {
      cancelled = true;
    };
  }, [source, reactId]);

  return (
    <figure className="breakout my-10">
      {title ? (
        <figcaption className="mb-2.5 font-[family-name:var(--font-display)] text-[0.8125rem] font-600 tracking-widest text-[var(--accent)] uppercase">
          {title}
        </figcaption>
      ) : null}

      <div
        ref={hostRef}
        role="img"
        aria-label={caption ?? title ?? "Diagram"}
        className={`scroll-box thin-scroll rounded-[var(--radius-card)] border border-[var(--border)] bg-[var(--surface-1)] px-4 py-6 ${
          svg ? "anim-fade" : ""
        }`}
      >
        {error ? (
          <pre className="m-0 border-0 bg-transparent p-0 text-[0.8125rem] whitespace-pre-wrap text-[var(--danger)]">
            Diagram failed to render: {error}
          </pre>
        ) : svg ? (
          // Mermaid output, rendered with securityLevel "strict" — it sanitises
          // the SVG it produces, and the source is ours, not a reader's.
          <div className="mermaid-svg" dangerouslySetInnerHTML={{ __html: svg }} />
        ) : (
          // A reserved box, so the page does not jump when the SVG arrives.
          <div
            aria-hidden
            className="flex h-40 items-center justify-center text-[0.8125rem] text-[var(--text-faint)]"
          >
            drawing…
          </div>
        )}
      </div>

      {caption ? (
        <figcaption className="mt-3 text-[0.9375rem] leading-relaxed text-[var(--text-muted)]">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
