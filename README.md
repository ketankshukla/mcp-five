# 🍪 MCP Five

**The Model Context Protocol, taught through five projects that were actually shipped** — and that were honest about their own bugs.

🔴 **Live:** https://mcp-five-sandy.vercel.app

47 pages, 6 sections, 28 live Mermaid diagrams, and every one of the 40 things that actually broke across the five builds, filterable by project and category.

---

## What this is

Five projects were built in sequence, each a sequel that reused the last one's code — and each one discovering that the previous project's *assumption* was the thing that needed work. This site teaches that arc.

| | Project | The one thing it teaches |
|---|---|---|
| 🍪 **1** | [`learn-mcp-5-year-old`](https://github.com/ketankshukla/learn-mcp-5-year-old) | A server is a vending machine that advertises what it can do and waits. |
| 🔁 **2** | [`learn-mcp-agent-loop`](https://github.com/ketankshukla/learn-mcp-agent-loop) | An "AI agent" is a `while` loop. There was never anything else in the box. |
| ✋ **3** | [`learn-mcp-agent-guard`](https://github.com/ketankshukla/learn-mcp-agent-guard) | A hint from the other side of a network boundary is not a permission model. |
| 👥 **4** | [`learn-mcp-agent-crew`](https://github.com/ketankshukla/learn-mcp-agent-crew) | A lone agent pays again for everything it has already read, on every iteration. |
| 💸 **5** | [`learn-mcp-agent-ledger`](https://github.com/ketankshukla/learn-mcp-agent-ledger) | The dangerous request looks exactly like the safe one on the wire. |

**Every number on the site came from a real run.** Where a figure is soft, the site says so.

---

## Run it

No database, no API keys, no environment variables. It is entirely static.

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

```bash
npx tsc --noEmit      # types
npx eslint .          # lint
npm run build         # 51 static routes
```

---

## How to add a page

**Two edits, and neither is in a component.**

1. An entry in the right section's `pages` array in [`lib/navigation.ts`](lib/navigation.ts):

   ```ts
   {
     slug: "my-new-page",
     title: "My new page",
     emoji: "✨",
     summary: "One line, shown in the pager card and under the h1.",
   }
   ```

2. `content/<section>/my-new-page.mdx`:

   ```mdx
   ---
   title: "My new page"
   emoji: "✨"
   summary: "One line, shown in the pager card and under the h1."
   ---

   ## A heading

   Prose.
   ```

That's it. The page appears in the sidebar, the mobile drawer, the prev/next pager, the on-this-page rail and `generateStaticParams`, because all five derive from the registry.

> If you ever find yourself editing a third file to make a page appear, the abstraction has sprung a leak. Fix the leak, not the page.

---

## Architecture

```
app/
  layout.tsx                          fonts, skip link, metadata
  page.tsx                            home — full-bleed, no sidebar
  kitchen-sink/page.tsx               every component on one page, noindex
  learn/layout.tsx                    persistent sidebar + mobile drawer
  learn/[section]/[page]/page.tsx     resolves MDX by slug
components/
  layout/    Sidebar, NavTree, MobileNav, OnThisPage, Pager
  mdx/       Callout, Diagram, Code, Terminal, Stat, Compare, Steps,
             GotchaCard, GotchaCompendium, Inline, Reference
content/
  start/ server/ host/ gate/ crew/ ledger/ picture/     one .mdx per page
lib/
  navigation.ts   THE registry — sections, pages, order, emoji, accent
  headings.ts     h2/h3 outline, extracted from MDX source at build time
  gotchas.ts      the compendium as structured data — 40 entries
mdx-components.tsx    the one MDX component map
```

**Stack:** Next.js 16 (App Router, Turbopack) · React 19 · Tailwind v4 · TypeScript · MDX · Mermaid.

### Four decisions worth knowing before you edit

**MDX resolves by dynamic import over a template literal.** `await import(\`@/content/${section}/${page}.mdx\`)` makes the bundler build a module context over `content/`, which is what keeps "add a page" down to two edits. The cost: a single MDX syntax error fails the whole context, so **one bad file breaks every page**, not just its own.

**remark/rehype plugins are named as strings, not imported.** Turbopack serialises loader options, so an imported plugin function fails the build with *"does not have serializable options"*. Most MDX guides show the webpack form, which does not work here.

**Code is highlighted at build time** by `rehype-pretty-code`, so no highlighter ships to the browser. ` ```ts title="lib/x.ts" {2,5-7} ` gives a filename chip and highlighted lines. Note it also wraps *inline* code in a `data-rehype-pretty-code-figure` **span**, so any CSS for that attribute must be scoped to `figure[…]`.

**Mermaid is imported inside the effect**, not at module scope, so ~1.6 MB across 29 chunks stays out of every page's initial HTML — a page with a diagram adds only a 27 KB wrapper. `useMaxWidth` is deliberately **off**: with it on, a wide flowchart is scaled down to container width and renders unreadably short. Diagrams render at natural size and scroll inside their own box.

---

## Design

Black background, white body, and **one vivid accent per section** used as wayfinding rather than decoration. 19px body at 1.75 line height. Space Grotesk / Inter / JetBrains Mono, self-hosted at build by `next/font`.

| Section | Accent |
|---|---|
| 🚀 Start Here | `#E2E8F0` |
| 🍪 The Server | `#F5A524` |
| 🔁 The Host | `#22D3EE` |
| ✋ The Gate | `#FB7185` |
| 👥 The Crew | `#A78BFA` |
| 💸 The Ledger | `#34D399` |
| 🧭 The Whole Picture | `#FB923C` |

The accent travels as a single `--accent` custom property set on the content pane, so headings, links, rules, inline code and diagram strokes all inherit it without any component knowing which section it is rendering inside.

**Wide content scrolls inside its own box.** Diagrams, tables and terminal blocks get `overflow-x: auto`; the page body never scrolls horizontally at any width.

Every animation is wrapped in `@media (prefers-reduced-motion: no-preference)`, so reduced-motion gets a completely still site.

`content/_kitchen-sink.mdx` renders every component on one page and is kept deliberately — it is the only place a design-system change can break loudly instead of quietly, on page thirty of a section nobody re-reads.

---

## Deploying

Connected to Vercel; pushes to `main` deploy automatically.

```bash
vercel --prod
```

A Vercel build **succeeds with no environment variables set**, which is correct here — this site needs none.

---

<div align="center">

*Black background. White body. Bright headings. Large type. Emojis everywhere. Real numbers only.*

</div>
