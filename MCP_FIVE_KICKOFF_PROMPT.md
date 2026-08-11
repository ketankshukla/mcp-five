# 🎓 MCP Five — kickoff prompt

You are an expert at teaching AI engineering to beginners **and** a genuinely good designer. You are about to build me a training website called **MCP Five**. Teach like I'm five — plain language, analogies before jargon — but write code like a senior engineer and design like someone who cares.

## Read this first, before anything else

**Read [`MCP_FIVE_DESIGN.md`](MCP_FIVE_DESIGN.md) in this folder, start to finish, before you write a single line.** It is the full specification: information architecture, all 34 pages with their content outlines, the design system, the component inventory, the diagram set, and the verified facts you are allowed to quote. This prompt tells you *how to work*; that document tells you *what to build*. When the two disagree, the design document wins.

Then clone all five source projects into a temp folder and read them:

| Repo | Read for |
|---|---|
| `github.com/ketankshukla/learn-mcp-5-year-old` | #1 — the server. `README.md` |
| `github.com/ketankshukla/learn-mcp-agent-loop` | #2 — the loop. `README.md` |
| `github.com/ketankshukla/learn-mcp-agent-guard` | #3 — the gate. `README.md`, `lib/approval.ts` |
| `github.com/ketankshukla/learn-mcp-agent-crew` | #4 — the crew. `README.md`, `lib/crew.ts` |
| `github.com/ketankshukla/learn-mcp-agent-ledger` | #5 — the ledger. `README.md`, `lib/spend-gate.ts`, `lib/mcp-client.ts` |

Each repo also has a **`BUILD_FROM_SCRATCH.md`** whose appendix lists the things that actually broke. **Those appendices are the raw material for the gotcha compendium page** — roughly 45 entries across the five projects. Read all five appendices; they are the highest-value content on the site.

**The five READMEs are also your style guide.** Their voice — analogy first, then the real term; a blockquote for the one line worth remembering; tables that compare two things; diagrams that show a mechanism rather than decorating a page — is what the site should feel like. Mimic it.

## Set up permissions FIRST, before you write any code

Do not ask me to approve things one at a time. Before your first build command, write a broad allowlist to **`.claude/settings.json`** (the project file — **not** `settings.local.json`, which the harness overwrites after every approval). Include `PowerShell(npm:*)`, `PowerShell(npx:*)`, `PowerShell(git:*)`, `PowerShell(gh:*)`, the `Bash(...)` equivalents, and Read/Write/Edit/Glob/Grep for `E:\mcp-five\**` and the temp folder you clone into.

## My environment — already set up, don't re-verify interactively

- **Windows 11**, PowerShell primary, Git Bash available.
- **GitHub CLI** authenticated as `ketankshukla`. Use `gh` to create the remote repo.
- **Vercel CLI** authenticated. Team slug: `ketan-shuklas-projects-8feda58f`
- Node 24, npm 11.
- Never echo a secret into the transcript.

**This site needs no database, no API keys and no environment variables.** It is entirely static. If you find yourself reaching for one, stop and reconsider — that is a signal you are building the wrong thing.

## What to build

**Working name: `mcp-five` — a training course for the Model Context Protocol, taught through five projects that were actually shipped.**

A Next.js site with a **persistent left menu** and a **content pane on the right**. Click a menu item, its page appears. Six sections, 34 pages, walkable start to finish with prev/next.

### The look — this is a functional requirement, not decoration

| | |
|---|---|
| **Background** | black, everywhere |
| **Body text** | white |
| **Headings** | bright colours — a different vivid accent per section, used as wayfinding |
| **Type** | large. 19px body, generous line height. It should feel roomy. |
| **Emojis** | throughout — nav, headings, callouts, diagrams |
| **Diagrams** | beautiful Mermaid, rendered live, themed to match |

Exact tokens, fonts and sizes are in §4 of the design doc. **Do not substitute a generic system font stack** — that is what makes a page look machine-generated, and it fails the brief.

### Committed scope — all six milestones

Build in the order given in §12 of the design doc. It is deliberate: **a walkable skeleton first, prose last.** Do not write 34 pages of content against a layout you haven't proven.

| Milestone | Ships |
|---|---|
| **M1** | Chrome: scaffold, fonts, tokens, navigation registry, sidebar, pager, mobile drawer, all 34 pages as stubs |
| **M2** | Every MDX component, demonstrated on a kitchen-sink page, with Mermaid working |
| **M3** | Sections 0 and 5 fully written — the gentlest content and the most technical |
| **M4** | Sections 1–4 |
| **M5** | Section 6, including the gotcha compendium as structured data |
| **M6** | Home page hero, motion, full verification, deploy |

**Show me M1 and M2 before writing prose.** If the chrome is wrong, I want to say so before you've written twenty thousand words on top of it.

### Settled decisions — don't re-litigate these

| | Decision |
|---|---|
| **Stack** | Next.js 16 App Router + React 19 + Tailwind v4 + TypeScript + MDX |
| **Content** | MDX files under `content/`, one per page |
| **Navigation** | `lib/navigation.ts` is the single source of truth — sidebar, pager, on-this-page and `generateStaticParams` all derive from it |
| **Diagrams** | Mermaid, rendered client-side, dynamic import, themed with explicit `themeVariables` |
| **Fonts** | `next/font/google`, self-hosted at build. Space Grotesk / Inter / JetBrains Mono unless you have something better *and more characterful* |
| **Rendering** | fully static. No database, no API routes, no runtime data |
| **Scope** | six sections, 34 pages, as specified |

## Engineering requirements — these are not optional

**Every number on this site must be real.** §9 of the design doc lists the verified facts with their values. Those came from actual runs. **If a figure is not in that table or in one of the five repos, it does not go on the site.** A plausible-looking invented number would destroy the one property that makes this course worth reading — and I will check.

**The navigation registry drives everything.** If adding a page means editing five files, the abstraction is wrong. One entry in `lib/navigation.ts` plus one MDX file should make a page appear in the sidebar, the pager, and the static params.

**Wide content scrolls inside its own box.** Diagrams, tables and terminal blocks get `overflow-x: auto`. The page body must never scroll horizontally, at any width.

**Mermaid is a client component, dynamically imported.** It must not land in the initial bundle, and it must not break SSR. Render diagrams with a fade so they don't pop in.

**Verify diagrams visually, not by absence of error.** "No exception was thrown" is not "the diagram renders correctly." Look at each one.

**Accessibility is part of beautiful.** Visible focus rings, a skip link, a focus-trapped mobile drawer, `aria-current` on the active page, `prefers-reduced-motion` honoured everywhere.

**Carry forward what the five projects already learned. Don't rediscover these:**

- `create-next-app` refuses to scaffold into a folder containing *any* unrecognised file — and this one already has two markdown files in it. **Scaffold to a temp dir and copy in.**
- The Next.js `.gitignore` has `.env*`, which swallows `.env.example`. If you add one, add `!.env.example` and keep that block **last**.
- `git check-ignore -v` reports a matching *negation* with exit 0, which reads like failure. Use `git add -n <file>` to test what git will actually do.
- `LayoutProps<"/">` doesn't exist before a build. Type the layout explicitly.
- A Vercel build **succeeds with no environment variables set**. That's fine here — this site needs none.
- Killing the shell that started a dev server does not kill the server. Check the **port** (`Get-NetTCPConnection -LocalPort 3000 -State Listen`), not the shell.
- If two code paths reach the same feature, they **will** drift. One navigation registry, one MDX component map.

## Verification discipline — I care about this

- **`npx tsc --noEmit`, `npx eslint .`, and `npm run build`** before the first push.
- **Walk all 34 pages** and confirm prev/next chains correctly from the first to the last.
- **Check every Mermaid diagram renders**, by looking at it.
- **Test at 375px, 768px, 1280px and 1920px.** No horizontal page scroll at any of them.
- **Keyboard-only walkthrough** of at least one full section.
- **Lighthouse ≥ 95** on Performance, Accessibility and Best Practices.
- The full checklist is §11 of the design doc. Work through it and tell me the result of each item — including any that fail.

## Deliverables

1. **The working site**, deployed to Vercel via GitHub
2. **A GitHub repo** named `mcp-five` — `gh repo create mcp-five --public --source=. --push`
3. **All 34 pages** written, with their diagrams
4. **The gotcha compendium** as structured data, filterable by project and category
5. **`README.md`** for the repo itself — what the site is, how to run it, how to add a page
6. **A one-line note per milestone** telling me what landed and what you verified

## How to work with me

- **Explain each concept before the code that implements it.** Analogies first, then the real terms.
- **Show me M1 and M2 before you write prose.** Layout first, words second.
- Tell me plainly when something doesn't work. Show me the error.
- Don't pad summaries with things you didn't verify. If you didn't look at it, say so.
- Make routine calls yourself; only ask me when a decision genuinely changes the outcome.
- When you hit a wall, **show me how you figured it out** — that's the part I can't get from a tutorial.
- **This site is about five projects that were honest about their own bugs.** If you find a mistake in my source material, say so and fix it on the site rather than repeating it.

Start by reading `MCP_FIVE_DESIGN.md`, then the five repos, then set up permissions, then show me your plan for M1 before you build it.
