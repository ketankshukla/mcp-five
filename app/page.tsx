import Link from "next/link";
import type { CSSProperties } from "react";
import { Diagram } from "@/components/mdx/Diagram";
import { Inline } from "@/components/mdx/Inline";
import { SECTIONS, TOTAL_PAGES, COURSE } from "@/lib/navigation";
import { GOTCHA_COUNT } from "@/lib/gotchas";

const PROJECTS = SECTIONS.filter((s) => s.project);

const TEACHES: Record<number, string> = {
  1: "A server is a vending machine that advertises what it can do and waits.",
  2: 'An "AI agent" is a `while` loop. There was never anything else in the box.',
  3: "A hint from the other side of a network boundary is not a permission model.",
  4: "A lone agent pays again for everything it has already read, on every iteration.",
  5: "The dangerous request looks exactly like the safe one on the wire.",
};

/**
 * The home page. Full-bleed, and deliberately not using the three-column learn
 * shell — the first thing a reader sees should not be a table of contents.
 */
export default function Home() {
  return (
    <div className="relative overflow-hidden">
      {/* One slow accent glow behind the hero. Disabled entirely under
          prefers-reduced-motion, which is why the animation lives in a
          no-preference query rather than being switched off by one. */}
      <div
        aria-hidden
        className="hero-glow pointer-events-none absolute -top-40 left-1/2 h-[38rem] w-[70rem] -translate-x-1/2 rounded-full opacity-[0.16] blur-[120px]"
      />

      <main id="content" className="relative mx-auto w-full max-w-[78rem] px-5 py-20 sm:px-10 lg:py-28">
        {/* ---------------------------------------------------------- hero */}
        <p className="mb-7 inline-flex items-center gap-2 rounded-[var(--radius-pill)] border border-[var(--border)] bg-[var(--surface-1)] px-4 py-1.5 text-[0.8125rem] text-[var(--text-muted)]">
          <span aria-hidden>🍪</span> {TOTAL_PAGES} pages · 5 projects · {GOTCHA_COUNT} things
          that actually broke
        </p>

        <h1 className="max-w-[16ch] font-[family-name:var(--font-display)] text-[clamp(3rem,7vw,5.5rem)] leading-[1.02] font-700 tracking-[-0.03em] text-balance">
          <span className="bg-gradient-to-r from-white to-[#9db4d0] bg-clip-text text-transparent">
            Five projects,
          </span>
          <br />
          <span className="bg-gradient-to-r from-[var(--accent-1)] via-[var(--accent-3)] to-[var(--accent-5)] bg-clip-text text-transparent">
            one arc.
          </span>
        </h1>

        <p className="mt-7 max-w-[52ch] text-[1.375rem] leading-[1.6] text-[var(--text-muted)] text-pretty">
          The Model Context Protocol, taught through five projects that were
          actually shipped — and that were honest about their own bugs. Every
          number on this site came from a real run.
        </p>

        <div className="mt-10 flex flex-wrap gap-4">
          <Link
            href="/learn/start/what-is-mcp"
            className="rounded-[var(--radius-pill)] bg-white px-7 py-3.5 font-[family-name:var(--font-display)] text-[1.0625rem] font-600 text-black no-underline transition-transform duration-120 hover:-translate-y-0.5"
          >
            Start the course →
          </Link>
          <a
            href="#the-code"
            className="rounded-[var(--radius-pill)] border border-[var(--border-strong)] px-7 py-3.5 font-[family-name:var(--font-display)] text-[1.0625rem] font-600 text-[var(--text)] no-underline transition-colors duration-120 hover:border-white"
          >
            I just want the code
          </a>
        </div>

        {/* ------------------------------------------------------- the five */}
        <h2 className="mt-28 font-[family-name:var(--font-display)] text-[clamp(1.75rem,3vw,2.25rem)] leading-tight font-600 tracking-[-0.015em]">
          Each one broke the previous one&apos;s assumption
        </h2>
        <p className="mt-3 max-w-[60ch] text-[1.0625rem] text-[var(--text-muted)]">
          Five projects built in sequence, each a sequel that reuses the last
          one&apos;s code. That is what makes this a course rather than five
          tutorials.
        </p>

        <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.map((section) => {
            const accent = { "--accent": `var(${section.accentVar})` } as CSSProperties;
            return (
              <li key={section.slug} style={accent}>
                <Link
                  href={`/learn/${section.slug}/${section.pages[0].slug}`}
                  className="flex h-full flex-col gap-2.5 rounded-[var(--radius-card)] border border-[var(--border)] bg-[var(--surface-1)] p-6 no-underline transition-colors duration-120 hover:border-[var(--accent)] hover:bg-[var(--surface-2)]"
                >
                  <span className="font-[family-name:var(--font-mono)] text-[0.75rem] text-[var(--text-faint)]">
                    #{section.project} · {section.pages.length} pages
                  </span>
                  <span className="flex items-center gap-2.5 font-[family-name:var(--font-display)] text-[1.625rem] leading-tight font-700 tracking-tight text-[var(--accent)]">
                    <span aria-hidden>{section.emoji}</span>
                    {section.title}
                  </span>
                  <span className="text-[0.9375rem] text-[var(--text-faint)] italic">
                    {section.tagline}
                  </span>
                  <span className="mt-1 text-[1.0625rem] leading-snug text-[var(--text-muted)]">
                    <Inline text={TEACHES[section.project!]} />
                  </span>
                </Link>
              </li>
            );
          })}

          <li>
            <Link
              href="/learn/picture/gotchas"
              className="flex h-full flex-col justify-center gap-2 rounded-[var(--radius-card)] border border-dashed border-[var(--border-strong)] p-6 no-underline transition-colors duration-120 hover:border-[var(--accent-6)]"
            >
              <span className="font-[family-name:var(--font-display)] text-[1.625rem] leading-tight font-700 tracking-tight text-[var(--accent-6)]">
                🧭 …and what they add up to
              </span>
              <span className="text-[1.0625rem] leading-snug text-[var(--text-muted)]">
                Six transferable lessons, and all {GOTCHA_COUNT} gotchas in one filterable
                list.
              </span>
            </Link>
          </li>
        </ol>

        {/* ------------------------------------------------------- the arc */}
        <h2 className="mt-28 font-[family-name:var(--font-display)] text-[clamp(1.75rem,3vw,2.25rem)] leading-tight font-600 tracking-[-0.015em]">
          The arc
        </h2>
        <p className="mt-3 mb-2 max-w-[60ch] text-[1.0625rem] text-[var(--text-muted)]">
          Read the labels on the arrows. Every one is a question the previous
          project did not know it had assumed an answer to.
        </p>

        <div className="[&_figure]:!w-full [&_figure]:!max-w-full">
          <Diagram caption="The five projects, and the question each transition answers: who decides which tool, who decides what's allowed, who the human is talking to, and whose money it is.">
{`flowchart TB
    P1["🍪 <b>#1 — the server</b><br/>learn-mcp-5-year-old<br/><i>offers tools, waits</i>"]
    P2["🔁 <b>#2 — the host</b><br/>learn-mcp-agent-loop<br/><i>picks the tools,<br/>runs the loop</i>"]
    P3["✋ <b>#3 — the gate</b><br/>learn-mcp-agent-guard<br/><i>asks first</i>"]
    P4["👥 <b>#4 — the crew</b><br/>learn-mcp-agent-crew<br/><i>hires help</i>"]
    P5["💸 <b>#5 — the ledger</b><br/>learn-mcp-agent-ledger<br/><i>owns the wallet</i>"]

    P1 -->|"who decides<br/>WHICH TOOL?"| P2
    P2 -->|"who decides<br/>WHAT'S ALLOWED?"| P3
    P3 -->|"who is the HUMAN<br/>TALKING TO?"| P4
    P4 -->|"WHOSE MONEY<br/>is it?"| P5

    style P1 fill:#78350f,stroke:#F5A524,stroke-width:2px,color:#fef3c7
    style P2 fill:#0c4a6e,stroke:#22D3EE,stroke-width:2px,color:#e0f2fe
    style P3 fill:#7f1d1d,stroke:#FB7185,stroke-width:2px,color:#fecaca
    style P4 fill:#2e1065,stroke:#A78BFA,stroke-width:2px,color:#ede9fe
    style P5 fill:#052e16,stroke:#34D399,stroke-width:2px,color:#dcfce7`}
          </Diagram>
        </div>

        {/* --------------------------------------------------- who this is for */}
        <div className="mt-24 grid gap-4 md:grid-cols-2">
          <section className="rounded-[var(--radius-card)] border border-[var(--border)] border-l-3 border-l-[var(--ok)] bg-[var(--surface-1)] p-6">
            <h3 className="mb-3 font-[family-name:var(--font-display)] text-[0.8125rem] font-600 tracking-widest text-[var(--ok)] uppercase">
              ✅ This is for you if
            </h3>
            <ul className="space-y-2 text-[1.0625rem] leading-relaxed text-[var(--text-muted)]">
              <li>You can write TypeScript, and have never built an MCP server.</li>
              <li>You want to know what Claude Desktop is actually doing.</li>
              <li>You are about to give an agent a tool that can delete something.</li>
              <li>Your agent keeps running out of room on big jobs.</li>
              <li>Something you connected can spend your money.</li>
            </ul>
          </section>

          <section className="rounded-[var(--radius-card)] border border-[var(--border)] border-l-3 border-l-[var(--warn)] bg-[var(--surface-1)] p-6">
            <h3 className="mb-3 font-[family-name:var(--font-display)] text-[0.8125rem] font-600 tracking-widest text-[var(--warn)] uppercase">
              🚧 It is not
            </h3>
            <ul className="space-y-2 text-[1.0625rem] leading-relaxed text-[var(--text-muted)]">
              <li>A reference for the MCP specification — read the spec for that.</li>
              <li>A framework tour. There is no framework; the protocol is JSON.</li>
              <li>
                A set of best practices invented on a whiteboard. Everything here
                either shipped or broke, and usually both.
              </li>
            </ul>
          </section>
        </div>

        {/* ------------------------------------------------------- the code */}
        <h2
          id="the-code"
          className="mt-28 scroll-mt-24 font-[family-name:var(--font-display)] text-[clamp(1.75rem,3vw,2.25rem)] leading-tight font-600 tracking-[-0.015em]"
        >
          I just want the code
        </h2>
        <p className="mt-3 max-w-[60ch] text-[1.0625rem] text-[var(--text-muted)]">
          All five are public and deployed. Project #1 needs no API key and no
          database.
        </p>

        <div className="mt-6 overflow-x-auto rounded-[var(--radius-card)] border border-[var(--border)]">
          <table className="w-full border-collapse text-[1rem]">
            <thead className="bg-[var(--surface-2)]">
              <tr>
                <th className="px-4 py-3 text-left font-[family-name:var(--font-display)] text-[0.8125rem] font-600 tracking-wide text-[var(--text-muted)] uppercase">
                  Project
                </th>
                <th className="px-4 py-3 text-left font-[family-name:var(--font-display)] text-[0.8125rem] font-600 tracking-wide text-[var(--text-muted)] uppercase">
                  Repo
                </th>
                <th className="px-4 py-3 text-left font-[family-name:var(--font-display)] text-[0.8125rem] font-600 tracking-wide text-[var(--text-muted)] uppercase">
                  Live
                </th>
              </tr>
            </thead>
            <tbody>
              {PROJECTS.map((s) => (
                <tr key={s.slug} className="border-t border-[var(--border)]">
                  <td
                    className="px-4 py-3 font-600 whitespace-nowrap"
                    style={{ color: `var(${s.accentVar})` }}
                  >
                    <span aria-hidden>{s.emoji}</span> #{s.project} {s.title}
                  </td>
                  <td className="px-4 py-3">
                    <a
                      href={s.repo}
                      className="font-[family-name:var(--font-mono)] text-[0.875rem] text-[var(--text-muted)] underline underline-offset-2 hover:text-white"
                    >
                      {s.repo?.replace("https://github.com/", "")}
                    </a>
                  </td>
                  <td className="px-4 py-3">
                    <a
                      href={s.live}
                      className="font-[family-name:var(--font-mono)] text-[0.875rem] text-[var(--text-muted)] underline underline-offset-2 hover:text-white"
                    >
                      {s.live?.replace("https://", "")}
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ------------------------------------------------------------ CTA */}
        <div className="mt-24 rounded-[var(--radius-card)] border border-[var(--border)] bg-[var(--surface-1)] p-8 text-center sm:p-12">
          <p className="font-[family-name:var(--font-display)] text-[clamp(1.5rem,3vw,2rem)] leading-tight font-600 tracking-tight text-balance">
            Start at <span className="text-[var(--accent-2)]">&ldquo;what is MCP?&rdquo;</span>,
            finish knowing why a refusal costs{" "}
            <span className="text-[var(--accent-5)]">$0.00</span>.
          </p>
          <Link
            href={COURSE[1].href}
            className="mt-7 inline-block rounded-[var(--radius-pill)] bg-white px-8 py-4 font-[family-name:var(--font-display)] text-[1.0625rem] font-600 text-black no-underline transition-transform duration-120 hover:-translate-y-0.5"
          >
            Start the course →
          </Link>
        </div>

        <footer className="mt-20 border-t border-[var(--border)] pt-8 text-center text-[0.9375rem] text-[var(--text-faint)]">
          <p>
            Black background. White body. Bright headings. Real numbers only.
          </p>
        </footer>
      </main>
    </div>
  );
}
