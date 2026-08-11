# 🎨 MCP Five — Full Site Design

> The complete design and content specification for **MCP Five**, a training website that teaches the Model Context Protocol through five real, shipped projects.
>
> This document is the source of truth. The build prompt is **[MCP_FIVE_KICKOFF_PROMPT.md](MCP_FIVE_KICKOFF_PROMPT.md)** and it refers back to this file constantly.

---

## Table of contents

| § | What it covers |
|---|---|
| [1](#1--what-this-site-is) | What this site is |
| [2](#2--non-negotiables) | Non-negotiables |
| [3](#3--information-architecture) | Information architecture — every page, every heading |
| [4](#4--the-design-system) | The design system — colour, type, space |
| [5](#5--layout-and-navigation) | Layout and navigation |
| [6](#6--component-inventory) | Component inventory |
| [7](#7--mermaid-diagrams) | Mermaid diagrams |
| [8](#8--content-pipeline) | Content pipeline |
| [9](#9--source-material-and-verified-facts) | Source material and verified facts |
| [10](#10--accessibility-and-performance) | Accessibility and performance |
| [11](#11--verification-checklist) | Verification checklist |
| [12](#12--build-order) | Build order |

---

## 1 — What this site is

**MCP Five** is a course. Five projects were built in sequence, each one a sequel that reused the last one's code, and each one discovering that the previous project's *assumption* was the thing that needed work. The site teaches that arc.

| | Project | The one thing it teaches |
|---|---|---|
| **1** | `learn-mcp-5-year-old` | A server is a vending machine that advertises what it can do and waits. |
| **2** | `learn-mcp-agent-loop` | An "AI agent" is a `while` loop. There was never anything else in the box. |
| **3** | `learn-mcp-agent-guard` | A hint from the other side of a network boundary is not a permission model. |
| **4** | `learn-mcp-agent-crew` | A lone agent pays again for everything it has already read, on every iteration. |
| **5** | `learn-mcp-agent-ledger` | The dangerous request looks exactly like the safe one on the wire. |

**It is not a documentation site and not a blog.** It is a linear course with a persistent left menu, where a reader can start at "What is MCP?" and finish knowing why a spend gate has to price a request before it happens.

**Audience:** a competent developer who has never built an MCP server or an agent loop. Explain like they're five, write code like a senior engineer — the same voice the five READMEs use.

---

## 2 — Non-negotiables

These came directly from the person commissioning the site. Do not negotiate them away for taste reasons.

| # | Requirement |
|---|---|
| 1 | **Background is black** across the whole site. |
| 2 | **Body text is white.** Secondary/muted text may be grey, but the reading text is white. |
| 3 | **Heading colours are bright.** Each section gets its own vivid accent — this is the wayfinding system, not decoration. |
| 4 | **Large fonts.** Generous body size and line height. This is a reading site; it should feel roomy, not dense. |
| 5 | **Emojis throughout.** In the nav, in headings, in callouts, in diagrams. They are part of the visual language of the source READMEs. |
| 6 | **Beautiful Mermaid diagrams**, rendered live, styled to the site's palette. |
| 7 | **Side menu + right content pane.** Click a menu item, its content appears on the right. |
| 8 | **It must be genuinely beautiful.** Stated explicitly and repeatedly. Treat visual quality as a functional requirement, not a finishing touch. |
| 9 | The README voice is a fine model for the prose and for component style. |

---

## 3 — Information architecture

Six top-level sections, 34 pages. **The sidebar shows all six sections; the current one is expanded, the others collapsed.** Every page has a prev/next pager, so the whole site is walkable start to finish.

Route shape: `/learn/[section]/[page]`. Home is `/`.

### 🚀 Section 0 — Start Here `(slate → white accents)`

| Page | Slug | Contents |
|---|---|---|
| **Welcome** | `/` | What this course is. The five-project table above. A "who this is for" block. The arc diagram (see §7 D1). Two buttons: *Start the course* → `/learn/start/what-is-mcp`, and *I just want the code* → the five repos. |
| **What is MCP?** | `what-is-mcp` | The vending-machine analogy first, jargon second. What problem it solves: every AI app was re-inventing the same integration glue. Client / host / server, defined plainly. Why "protocol" is the load-bearing word. The five capabilities table (§9). Diagram D2. |
| **The five capabilities** | `five-capabilities` | One section each: **tools** (the server does something), **resources** (offers something to read), **prompts** (offers a recipe for asking), **sampling** (asks *your host* to think), **elicitation** (asks *your user* a question). For each: a plain-English line, a wire example, and which project introduces it. Callout: only `tools` is used in projects #1–#4; the other four all arrive in #5. |
| **The arc** | `the-arc` | The spine of the course. Each project broke the previous one's assumption. Diagram D1 large. Then five "the assumption that broke" cards. This page is what makes it a course and not five tutorials. |
| **How to use this course** | `how-to-use` | Read in order. Every project has a live URL and a public repo. Every claim on this site has a number behind it. The three-document convention (README / BUILD_FROM_SCRATCH / NEXT_STEP) that all five repos share. |

### 🍪 Section 1 — The Server `(amber #F5A524)`

> Project #1 · `learn-mcp-5-year-old` · *offers tools, waits*

| Page | Slug | Contents |
|---|---|---|
| **The vending machine** | `vending-machine` | A server advertises what it can do and then waits. It never initiates. Three messages are the whole protocol: `initialize`, `tools/list`, `tools/call`. Diagram D3 (the handshake). |
| **Anatomy of a tool** | `anatomy-of-a-tool` | Name, description, input schema. **The description is the only thing the model reads when deciding whether to use the tool** — this is the highest-leverage sentence in the project. Zod → JSON Schema. Annotations, and the warning that they are hints, which #3 will return to. |
| **The four tools** | `four-tools` | `say_hello`, `roll_dice`, `secret_code`, `cookie_jar`. Why a dice roller is the perfect first tool: the model *cannot* fake it, so you can tell whether the tool actually ran. |
| **The sandcastle** | `the-sandcastle` | `let cookiesInJar = 12` works on your laptop and lies on serverless. Many machines, many copies, all asleep. Left in deliberately as a lesson; project #3 fixes it with Postgres. Callout: **the bug is the curriculum.** |
| **Build it** | `build-it-1` | Condensed stage list, the checkpoint for each, and the two gotchas worth carrying: `create-next-app` refuses to scaffold into a non-empty folder; `mcp-handler` peer-depends on `@modelcontextprotocol/server`, not `…/sdk`. |

### 🔁 Section 2 — The Host `(cyan #22D3EE)`

> Project #2 · `learn-mcp-agent-loop` · *picks the tools, runs the loop*

| Page | Slug | Contents |
|---|---|---|
| **An agent is a while loop** | `a-while-loop` | The headline. Send conversation + tools → model replies with a request → run it → paste the result back → go again. Diagram D4. Callout: *there was never anything else in the box.* |
| **The three rules** | `three-rules` | (1) Append the **whole** assistant reply, not just the text — extract the text and you throw away the `tool_use` block. (2) All tool results go in **one** user message. (3) Cap the loop, hard — a loop with a bug is not a hang, it's a bill. |
| **Writing the client by hand** | `client-by-hand` | MCP is just JSON over HTTP. Two things that bite: `Accept` must list **both** `application/json` and `text/event-stream`, or you get a bare `406`; the reply may be plain JSON *or* SSE and you must handle both. |
| **One shelf, many servers** | `the-toolbox` | Namespacing `server__tool` so two servers can both offer `search`. `Promise.allSettled` so one sleeping server degrades the toolbox instead of killing the host. **A host curates** — it may refuse to expose a tool a server advertises. |
| **The meter** | `the-meter` | Token accounting, and why `input_tokens` is only the uncached remainder. Prompt caching is a prefix match. Introduce cost as a first-class concern here, because projects #4 and #5 are both about it. |
| **Build it** | `build-it-2` | Stages + checkpoints. Gotcha: `VERCEL_URL` is the per-deployment hostname and Deployment Protection answers it with a 401 — use `VERCEL_PROJECT_PRODUCTION_URL` when the host must call itself. |

### ✋ Section 3 — The Gate `(rose #FB7185)`

> Project #3 · `learn-mcp-agent-guard` · *asks first*

| Page | Slug | Contents |
|---|---|---|
| **A hint is not a permission model** | `hint-not-permission` | The thesis. Servers can advertise `destructiveHint: true`. This host never reads it — the flag arrives over HTTP from a machine you don't control, set by whoever wrote that server. Consult it and any server that wants to bypass your gate bypasses your gate. Kill every variant of the idea. |
| **Rules read arguments, not names** | `rules-read-arguments` | `cookie_jar` isn't dangerous; `cookie_jar { action: "eat" }` is. Real tools are the same shape — `sql` is fine for SELECT. |
| **Default allow, and why** | `default-allow` | Default-deny is safer *and* trains click-fatigue in ninety seconds. An approval gate that teaches you to click Approve reflexively is worse than none, because it also gives you the feeling of having one. Flipping it is one line — and here's when you should. |
| **Pausing is an array** | `pausing-is-an-array` | The agent's entire state is its `messages` array. So "freeze mid-run, resume in a different HTTP request on a different machine five minutes later" is: write the array to Postgres, read it back. No continuation, no coroutine. Diagram D5. |
| **The deny branch** | `the-deny-branch` | A denied tool still needs a `tool_result` with the matching `tool_use_id`, or the API rejects the whole request. And the wording matters: say only "denied" and the model retries forever. |
| **Evals: the report card** | `evals` | Three rules: never assert on prose; run each case several times and score a pass rate; include a case where the right answer is **call nothing**. The six cases by name. |
| **Replay** | `replay` | Every loop event written to Postgres buys replay almost free. Foreshadow: project #5 turns this into a $0 regression suite. |
| **Build it** | `build-it-3` | Stages + checkpoints. Gotchas: `create table if not exists` will not add new columns; `git check-ignore -v` lies about negations — use `git add -n`. |

### 👥 Section 4 — The Crew `(violet #A78BFA)`

> Project #4 · `learn-mcp-agent-crew` · *hires help*

| Page | Slug | Contents |
|---|---|---|
| **The ceiling you can't prompt your way out of** | `the-ceiling` | 240 jars. The single agent inspects 180, finds **0 of 36**, and spends **439k tokens** doing it. Not wrong, not crashed, not stuck — out of *room*, at full price. **A failing agent is expensive precisely because it fails slowly.** Diagram D6. |
| **A sub-agent is a tool that happens to think** | `sub-agent` | The entire mechanism: the model gets one extra tool whose implementation is the function that is calling it. A worker's forty-second investigation arrives in the orchestrator's conversation as one paragraph in an ordinary `tool_result`. It has no idea an agent produced it. |
| **Local tools** | `local-tools` | `spawn_agent` can't live on a server — it must reach back into *this* loop with *this* run's budget. So the loop learns about host-implemented tools. And that's a security boundary: an MCP tool runs on a machine you don't control; a local tool runs with your host's privileges. |
| **Five agents, one human** | `five-agents-one-human` | Project #3 assumed the agent that hit the gate is the one you're talking to. Delegation destroys that. The pause travels up, carrying `origin` (who asked and why), `partial_results` (finished siblings, not re-run) and `paused_children` (the frozen worker's whole mind). Diagram D7. |
| **Seatbelts, and why five** | `seatbelts` | Recursion *multiplies* per-loop limits instead of adding them. The five caps, each a different kind. The one worth stealing: **there is no depth counter** — sub-agents simply never receive `spawn_agent`. *Prefer a design where the bad thing is unreachable over a check that catches it.* |
| **The measurement trap** | `measurement-trap` | The headline said the crew cost **1.7×** and concluded "delegation is pure overhead." Every individual number was right; the division was the lie — the two modes had run different numbers of runs. **Any comparison must check that both sides did the same work.** Then the sting: the fix was documented and never wired up, and project #5 caught it still live. |
| **Build it** | `build-it-4` | Stages + checkpoints. Gotchas: the event queue (you cannot `yield` from inside a callback); a regex that assumed the data would never grow; killing the shell does not kill the process. |

### 💸 Section 5 — The Ledger `(emerald #34D399)`

> Project #5 · `learn-mcp-agent-ledger` · *owns the wallet*

| Page | Slug | Contents |
|---|---|---|
| **Four capabilities we never used** | `four-unused` | Four projects in, one of five capabilities. The other three read-only ones are the same shape as tools and took an afternoon. The fourth reverses an arrow. |
| **The arrow that points back** | `arrow-points-back` | Sampling: the server asks *your* host to run a model call. It has no API key and no model — it has yours. The contractor-with-your-account-number analogy. Diagram D8 (sequence). |
| **The finding** | `the-finding` | The best story on the site. Every tutorial shows `server.createMessage()` — a server→client push. It throws on serverless, and the SDK says why: *"per-request legacy serving cannot receive server-to-client requests."* A push needs a connection; a serverless function has a request and then it doesn't. Show the actual probe transcript. Then the replacement: `input_required` + retry. Diagram D9. Callout: **a deprecation notice on the thing you were about to build on is worth more than a working example of it.** |
| **Speaking the protocol by hand** | `protocol-by-hand` | The `_meta` envelope keys; the `Mcp-Method` / `Mcp-Name` headers; `inputResponses` and `requestState` as **top-level** members of `params`; `-32020` / `-32021` / `-32022` and what each one means. The one-line security note: the host declares `sampling: {}` — **delete it and the danger is gone entirely.** |
| **A budget is not a gate** | `budget-not-gate` | A budget that runs out silently truncates. And cost is not a property of the verb the way destruction is: the *same tool* costs **0.22¢** or **6.0¢** depending on its arguments. So the rule is a number. |
| **The gate that cannot pause** | `gate-cannot-pause` | Project #3 freezes the agent and waits — fine, that agent is *yours*. Somebody else's server holding a tool call open will time out; freezing it deadlocks it. Hence **synchronous refusal, asynchronous approval**. Diagram D10. And the nice consequence: a refusal costs **$0.00**, because the host refuses before contacting the model. |
| **What the host refuses to trust** | `refuses-to-trust` | Three things arrive from across the boundary and all three are the biggest inputs to the bill: the requested **model** (allowlist, default to cheapest), `maxTokens` (clamped), `requestState` (echoed, never read). |
| **One wallet, many spenders** | `one-wallet` | Three ways to bill a server's call; only one keeps `MAX_TREE_TOKENS` honest. Every draw labelled with who asked. The ledger table, and why **refusals get rows too** — a ledger with no refusals looks exactly like a gate that's switched off. |
| **The suite that costs nothing** | `zero-dollar-evals` | An eval is a prompt (costs money) and a check (a pure function). The traces are already on disk. **13/13 live, 13/13 replayed for $0.00.** The two things that make it trustworthy: one shared extraction used by both suites, and `no-data` never rounding to `fail`. |
| **Data does not stay yours** | `data-not-yours` | `requestState` — you minted it, handed it across a boundary, got it back. It is input now. The mirror of project #3's thesis. HMAC it. |
| **Build it** | `build-it-5` | Stages + checkpoints, including the demo in three commands. |

### 🧭 Section 6 — The Whole Picture `(orange #FB923C)`

| Page | Slug | Contents |
|---|---|---|
| **The lessons that survived contact** | `lessons` | The transferable ones, each with the project that earned it and the failure that proved it. Read the types on disk. Prefer unreachable over caught. A failure message that doesn't say what failed will be mistaken for data. Compare the same amount of work. Re-scope every counter when you split an operation across requests. Data does not stay yours. |
| **The gotcha compendium** | `gotchas` | Every gotcha from all five `BUILD_FROM_SCRATCH.md` appendices — roughly 45 of them — as filterable cards. Filter by project and by category (protocol / cost / measurement / persistence / tooling / deployment). This page is the site's reference-value payload. |
| **The five capabilities, in practice** | `capabilities-in-practice` | Having built all five: `tools` is 90% of the value and 100% of the tutorials; `resources` is what you'll actually reach for and nobody demos it; `prompts` is the least glamorous and most sensible; `sampling` changes the relationship; `elicitation` costs nothing and needs no gate because the scarce resource is attention. |
| **Run it all yourself** | `run-it` | Clone table for all five repos, prerequisites, the env vars, and the free-vs-paid command split. Be explicit about which commands spend money. |
| **Glossary** | `glossary` | Two-column term list: host, client, server, tool, resource, prompt, sampling, elicitation, agent loop, iteration, tool_use / tool_result, approval gate, eval, replay, sub-agent, orchestrator, TreeBudget, ledger, spend gate, multi-round-trip, `input_required`, `requestState`, prompt caching, cache read/write, protocol era. |

---

## 4 — The design system

### 4.1 Colour

Black background, white body, and **one vivid accent per section** — the accent is how a reader knows where they are without reading the breadcrumb.

```
/* surfaces */
--bg            #000000   /* the page. true black, as specified */
--surface-1     #0B0B0F   /* cards, code blocks, sidebar */
--surface-2     #14141B   /* raised: hover, active nav, table headers */
--border        #26262F   /* hairlines */
--border-strong #3A3A47

/* text */
--text          #FFFFFF   /* BODY TEXT. non-negotiable. */
--text-muted    #A7A7B4   /* captions, metadata, table sub-labels */
--text-faint    #6E6E7E   /* timestamps, footnotes */

/* section accents — headings, nav active state, rules, diagram strokes */
--accent-start  #E2E8F0   /* Start Here — near-white */
--accent-1      #F5A524   /* 🍪 The Server   — amber   */
--accent-2      #22D3EE   /* 🔁 The Host     — cyan    */
--accent-3      #FB7185   /* ✋ The Gate     — rose    */
--accent-4      #A78BFA   /* 👥 The Crew     — violet  */
--accent-5      #34D399   /* 💸 The Ledger   — emerald */
--accent-6      #FB923C   /* 🧭 Whole Picture— orange  */

/* semantic */
--ok            #34D399
--warn          #FBBF24
--danger        #FB7185
--info          #22D3EE
```

Every accent clears **7:1** against `#000000`, so they are safe for body-size text as well as headings.

**How accents are used:**
- `h1`, `h2` in the current section's accent. `h3` in white with an accent left-rule.
- The active sidebar item: accent text, `--surface-2` background, 3px accent left border.
- A 1px accent-tinted top border on the content pane, so the page carries its section colour even when scrolled past the h1.
- Inline `<code>` uses the accent at 90% on `--surface-1`.
- Links: accent, underline offset `0.2em`, thickness `1.5px`.

**Gradients** — used sparingly, only for hero display text and the home page glow: `linear-gradient(100deg, var(--accent-N), color-mix(in oklab, var(--accent-N) 55%, #ffffff))`.

### 4.2 Type

Large, per the brief. Base body is **19px**, not 16px.

| Role | Font | Size | Weight | Line height | Tracking |
|---|---|---|---|---|---|
| Display (home h1) | Space Grotesk | `clamp(3rem, 7vw, 5.5rem)` | 700 | 1.02 | `-0.03em` |
| Page `h1` | Space Grotesk | `clamp(2.25rem, 4.5vw, 3.5rem)` | 700 | 1.1 | `-0.02em` |
| `h2` | Space Grotesk | `clamp(1.75rem, 3vw, 2.25rem)` | 600 | 1.2 | `-0.015em` |
| `h3` | Space Grotesk | `1.375rem` | 600 | 1.3 | `-0.01em` |
| Body | Inter | `1.1875rem` (19px) | 400 | **1.75** | `0` |
| Lead paragraph | Inter | `1.375rem` | 400 | 1.6 | `-0.005em` |
| Small / caption | Inter | `0.9375rem` | 400 | 1.6 | `0` |
| Code | JetBrains Mono | `0.9375rem` | 400 | 1.7 | `0` |

Load all three with `next/font/google` so they are self-hosted at build time — **no runtime request to any external host.**

Substitutions are allowed if they are *more* characterful, never less. Do **not** fall back to system-ui/Arial/Roboto; a generic type stack will make the site look like every other AI-generated page, which fails non-negotiable #8.

### 4.3 Space & shape

- Spacing scale: `4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96 · 128`.
- Content column: `max-width: 74ch`. Wide elements (diagrams, tables, terminals) may break out to `92ch`.
- Vertical rhythm: `h2` gets `margin-top: 4rem`, `h3` `2.5rem`, paragraphs `1.25rem`.
- Radii: `12px` cards, `10px` code blocks, `999px` pills. Nothing sharp-cornered except table cells.
- Borders over shadows. On black, a 1px `--border` hairline reads better than any drop shadow. The only shadow permitted is a soft accent glow on the home hero.

### 4.4 Motion

Restrained. Content should never move while being read.

- Nav hover/active: `120ms ease-out` on background and colour.
- Page transition: 180ms fade + 6px rise on the content pane only.
- Mermaid diagrams fade in on first paint (they render client-side; do not let them pop).
- Home hero: one slow accent glow drift, 20s, `prefers-reduced-motion` disables it.
- **Every animation must be wrapped in `@media (prefers-reduced-motion: no-preference)`.**

---

## 5 — Layout and navigation

```
┌──────────────────────────────────────────────────────────────────────┐
│ ░ topbar (mobile only) — ☰  MCP Five                                 │
├────────────────┬─────────────────────────────────┬───────────────────┤
│                │                                 │                   │
│   SIDEBAR      │        CONTENT PANE             │   ON THIS PAGE    │
│   300px        │        max 74ch, centred        │   220px           │
│   sticky       │                                 │   sticky, ≥1280px │
│   own scroll   │        h1 in section accent     │   h2/h3 links     │
│                │        …                        │   active = accent │
│   ▸ 🚀 Start   │        prose, callouts,         │                   │
│   ▾ 🍪 Server  │        diagrams, terminals      │                   │
│      • page    │                                 │                   │
│      • page ◀ active                             │                   │
│   ▸ 🔁 Host    │                                 │                   │
│   ▸ ✋ Gate    │        ── prev / next pager ──   │                   │
│   ▸ 👥 Crew    │                                 │                   │
│   ▸ 💸 Ledger  │                                 │                   │
│   ▸ 🧭 Picture │                                 │                   │
└────────────────┴─────────────────────────────────┴───────────────────┘
```

**Sidebar behaviour**
- All six sections always listed. The current section is expanded; others collapsed but clickable to expand.
- Each section header: emoji + title + a `1/5`-style progress hint, coloured with its accent.
- Active page: accent text, `--surface-2` fill, 3px accent left border.
- Visited pages get a small ✓ (localStorage). Nice-to-have, not required.
- Sticky, independently scrollable, thin custom scrollbar.

**Breakpoints**
| Width | Layout |
|---|---|
| `≥1280px` | three columns (sidebar + content + on-this-page) |
| `1024–1279px` | two columns (sidebar + content) |
| `<1024px` | content only; sidebar becomes a slide-over drawer from a ☰ topbar, with backdrop and focus trap |

**Pager:** every page ends with previous/next cards showing the section emoji, page title, and the destination's accent colour. The order is the linear course order, crossing section boundaries.

**Home page** is a full-bleed landing: display hero, the five-project cards in their accent colours, the arc diagram, and a prominent *Start the course* CTA. It does not use the three-column layout.

---

## 6 — Component inventory

All content components live in `components/mdx/` and are auto-available inside MDX.

| Component | Props | Purpose |
|---|---|---|
| `<Callout>` | `type: "lesson" \| "gotcha" \| "warning" \| "insight" \| "quote"`, `title?` | The workhorse. `lesson` = accent border + 💡; `gotcha` = rose + ⚠️; `warning` = amber; `insight` = cyan + 🔍; `quote` = large italic, left accent rule, no icon. |
| `<Diagram>` | `title?`, `caption?`, `children` (mermaid source) | Renders Mermaid. See §7. |
| `<Code>` | `filename?`, `lang`, `highlight?: number[]` | Syntax-highlighted block with filename chip and copy button. |
| `<Terminal>` | `title?` | Monospaced console output. Muted chrome, no syntax colouring, preserves the ✓/🛑/💸 glyphs from the real transcripts. |
| `<Stat>` / `<StatGrid>` | `value`, `label`, `tone?` | Big number tiles — `439k tokens`, `0 of 36`, `$0.00`, `13/13`. Value in section accent at `2.5rem`. |
| `<Compare>` | `left`, `right`, `leftLabel`, `rightLabel` | Two-column before/after. Used for one-agent-vs-crew and vending-machine-vs-contractor. |
| `<ProjectCard>` | `n`, `emoji`, `name`, `tagline`, `href`, `repo` | The five-project grid on the home page. |
| `<GotchaCard>` | `n`, `project`, `title`, `symptom`, `cause`, `fix`, `lesson`, `tags` | The compendium's unit. Collapsed to symptom; expands to the rest. |
| `<Pager>` | auto from the nav registry | Prev/next. |
| `<Steps>` / `<Step>` | `n`, `title` | Numbered build stages with a connecting accent rule. |
| `<Checkpoint>` | `children` | A "you should now see this" block — accent left border, ✅ header. Pairs with `<Terminal>`. |
| `<Glossary>` / `<Term>` | `word`, `children` | Definition list on the glossary page. |
| `<Capability>` | `name`, `emoji`, `oneLiner`, `introducedIn` | The five-capability rows. |

**Typographic defaults for MDX** are set once in an `mdx-components.tsx` map — `h2` renders with the section accent, `table` gets the site table style, `blockquote` becomes a quote callout, `a` gets accent underline, `pre` routes to `<Code>`.

---

## 7 — Mermaid diagrams

Diagrams are a headline feature, not an afterthought. **Render them live with `mermaid`, client-side.**

### Implementation

- `<Diagram>` is a client component; import `mermaid` dynamically with `ssr: false` to avoid hydration issues.
- Initialise once with `startOnLoad: false`, then `mermaid.render()` per block.
- Wrap the output in a container with `overflow-x: auto` — a wide diagram must scroll inside its own box and never make the page scroll sideways.
- Fade in on first paint.
- Each diagram gets an accessible text alternative: pass a `caption` and set `role="img"` with an `aria-label`.

### Theme

Use `theme: "base"` with explicit `themeVariables` so diagrams match the site rather than shipping Mermaid's defaults:

```js
{
  theme: "base",
  themeVariables: {
    background:        "#000000",
    primaryColor:      "#14141B",
    primaryTextColor:  "#FFFFFF",
    primaryBorderColor: SECTION_ACCENT,
    lineColor:         "#6E6E7E",
    secondaryColor:    "#0B0B0F",
    tertiaryColor:     "#0B0B0F",
    fontFamily:        "Inter, sans-serif",
    fontSize:          "16px",
  },
  flowchart: { curve: "basis", padding: 16 },
  sequence:  { actorMargin: 60, mirrorActors: false },
}
```

Per-node colour overrides come from the source diagrams in the READMEs (`style N fill:#78350f,...`) and should be kept — they carry meaning (red = failure, green = success, amber = the interesting bit).

**Sequence diagram `rect` bands must use translucent `rgba()`**, e.g. `rgba(56,189,248,0.12)`, so they read correctly against black.

### The diagram set

| ID | Page | What it shows |
|---|---|---|
| **D1** | `/`, `the-arc` | The five-project arc, with the question each transition answers ("who decides which tool?" → "who decides what's allowed?" → "who is the human talking to?" → "whose money is it?"). |
| **D2** | `what-is-mcp` | Host / client / server, and where the model sits. |
| **D3** | `vending-machine` | `initialize` → `tools/list` → `tools/call` sequence. |
| **D4** | `a-while-loop` | The agent loop as a flowchart, with the "go back to step 1" edge emphasised. |
| **D5** | `pausing-is-an-array` | Sequence: gate fires → request ends → row in Postgres → new request → thaw → continue. Emphasise *nothing is running* in the middle. |
| **D6** | `the-ceiling` | One agent at 240 jars hitting MAX_ITERATIONS with 0 of 36 found, beside a crew finishing. |
| **D7** | `five-agents-one-human` | The approval bubbling sequence — two workers, one stops, whole tree freezes, one card, resume. |
| **D8** | `arrow-points-back` | Vending machine vs. contractor-on-your-account, side by side. |
| **D9** | `the-finding` | The multi-round-trip: round 1 `input_required`, host runs the model, round 2 with `inputResponses`. |
| **D10** | `gate-cannot-pause` | The spend-gate decision flow: under ceiling → run → ledger; over ceiling → refuse at $0.00 → card → one-shot grant → next attempt. |
| **D11** | `zero-dollar-evals` | Live suite writes traces; replay suite reads them; one shared extractor feeds both. |
| **D12** | `one-wallet` | One `TreeBudget`, many spenders (orchestrator, workers, and a *server*), every draw labelled. |

---

## 8 — Content pipeline

**Stack:** Next.js 16 (App Router, Turbopack) · React 19 · Tailwind v4 · TypeScript · MDX.

```
app/
  layout.tsx                 fonts, <html class="dark">, global chrome
  page.tsx                   home (full-bleed, no sidebar)
  learn/[section]/[page]/page.tsx    resolves MDX by slug
components/
  layout/    Sidebar, MobileNav, OnThisPage, Pager, TopBar
  mdx/       Callout, Diagram, Code, Terminal, Stat, ...
content/
  start/*.mdx  server/*.mdx  host/*.mdx  gate/*.mdx  crew/*.mdx
  ledger/*.mdx  picture/*.mdx
lib/
  navigation.ts   THE registry — sections, pages, order, emoji, accent
  mdx.ts          loader + frontmatter
  gotchas.ts      the compendium as structured data
```

**`lib/navigation.ts` is the single source of truth.** Sidebar, pager, on-this-page, breadcrumbs, and `generateStaticParams` all derive from it. Adding a page = one entry + one MDX file, and it appears everywhere.

Frontmatter per page: `title`, `emoji`, `summary`, `project?` (1–5), `readingTime?`.

Prefer **static generation** for every page. There is no dynamic data on this site.

---

## 9 — Source material and verified facts

### The repos

Clone all five for source material — the prose, the diagrams and the code excerpts should come from them, not be invented:

| | Repo | Live |
|---|---|---|
| 1 | `github.com/ketankshukla/learn-mcp-5-year-old` | `learn-mcp-5-year-old.vercel.app` |
| 2 | `github.com/ketankshukla/learn-mcp-agent-loop` | `learn-mcp-agent-loop.vercel.app` |
| 3 | `github.com/ketankshukla/learn-mcp-agent-guard` | `learn-mcp-agent-guard.vercel.app` |
| 4 | `github.com/ketankshukla/learn-mcp-agent-crew` | `learn-mcp-agent-crew.vercel.app` |
| 5 | `github.com/ketankshukla/learn-mcp-agent-ledger` | `learn-mcp-agent-ledger.vercel.app` |

Each has `README.md` (the teaching), `BUILD_FROM_SCRATCH.md` (the stages + gotcha appendix), and `NEXT_STEP.md` (the reasoning). The gotcha appendices are the raw material for the compendium page.

### Verified numbers — quote these, do not invent others

| Fact | Value |
|---|---|
| Project #4 @ 240 jars, one agent | 0 of 36 found · 439k tokens · stopped at MAX_ITERATIONS with 180/240 inspected |
| Project #4 @ 240 jars, a crew | 36 of 36 found · 248k tokens · one approval |
| Project #4 @ 60 jars | a wash — both 100%, comparable cost |
| Project #4's retracted claim | "the crew costs 1.7×" — wrong; different numbers of runs on each side |
| Project #5 re-measured it | **2.01× → 1.08×** after fixing the ratio to use only shared run types |
| Seatbelts | 10 iterations/agent · 3 concurrent · 8 spawns/run · 600k tree tokens · no `spawn_agent` for workers |
| Spend gate | default ceiling **2¢/request/server** · output clamped to **1024 tokens** · **12** sampling requests/run |
| The demo | brief digest **0.22¢** estimated / **0.11¢** actual · deep digest **6.0¢** estimated → **REFUSED, $0.00 spent** |
| Project #5's eval suite | **13/13** live (six from #3, four from #4, three from #5) · **13/13** replayed for **$0.00** |
| Whole of project #5 | ≈ **$3.00** of API credit, ~730k tokens |
| Protocol | modern era `2026-07-28`; envelope keys `io.modelcontextprotocol/{protocolVersion,clientInfo,clientCapabilities}`; headers `Mcp-Method`, `Mcp-Name`; errors `-32020` headers/body disagree, `-32021` capability not declared, `-32022` unsupported version |

Eval case names: `look-only`, `chain-dice-to-cookies`, `no-tools`, `gate-fires`, `picks-right-cipher`, `reads-history` (#3) · `pantry-sweep`, `pantry-no-overkill`, `crew-delegates`, `crew-one-approval` (#4) · `sampling-happens`, `sampling-attributed`, `gate-refuses-expensive` (#5).

**If a number is not in this table or in a repo, do not put it on the site.** Every claim here survived a real run; inventing a plausible-looking figure would break the one property that makes this course worth reading.

---

## 10 — Accessibility and performance

- **Contrast:** body white on black is 21:1. Every accent clears 7:1. Muted text `#A7A7B4` clears 9:1. Never use `--text-faint` below 14px.
- Visible focus rings — 2px accent outline, 2px offset — on every interactive element. Never `outline: none` without a replacement.
- Skip-to-content link as the first tabbable element.
- The mobile drawer traps focus, closes on `Esc`, and returns focus to the ☰ button.
- Sidebar is a `<nav>` with `aria-label`; the active link carries `aria-current="page"`.
- Diagrams carry `role="img"` + `aria-label` from their caption.
- Honour `prefers-reduced-motion` for every animation.
- All pages statically generated. Mermaid is the only heavy client dependency — import it dynamically so it is not in the initial bundle.
- Target Lighthouse ≥ 95 on Performance, Accessibility and Best Practices.

---

## 11 — Verification checklist

Before calling it done:

- [ ] `npx tsc --noEmit` clean
- [ ] `npx eslint .` clean
- [ ] `npm run build` succeeds and every page is statically generated
- [ ] Every one of the 34 pages renders with no console errors
- [ ] Every Mermaid diagram renders — check each visually, not just "no error thrown"
- [ ] No horizontal page scroll at 375px, 768px, 1280px, 1920px
- [ ] Sidebar drawer opens, traps focus, closes on `Esc` at <1024px
- [ ] Prev/next chains correctly through all 34 pages, first to last
- [ ] Every internal link resolves; every external repo link is correct
- [ ] Keyboard-only walkthrough of one full section
- [ ] `prefers-reduced-motion: reduce` disables all motion
- [ ] Body text is white; every heading carries its section accent
- [ ] Lighthouse ≥ 95 Performance / Accessibility / Best Practices
- [ ] Spot-check five quoted numbers against §9

---

## 12 — Build order

Ship a walkable skeleton early; write prose last. Do not build 34 pages of content against an unproven layout.

| Milestone | What lands |
|---|---|
| **M1 — Chrome** | Scaffold, fonts, tokens, `lib/navigation.ts` with all 34 entries, sidebar, content pane, pager, on-this-page, mobile drawer. Every page a stub. **Checkpoint: you can walk all 34 pages start to finish.** |
| **M2 — Components** | The full MDX component set, each demonstrated on a scratch page. `<Diagram>` working with one real diagram in both a flowchart and a sequence. **Checkpoint: a kitchen-sink page renders every component.** |
| **M3 — The spine** | Section 0 and Section 5 fully written. Those two prove the range: the gentlest content and the most technical. **Checkpoint: a reader can go from "what is MCP" to "why a refusal costs nothing".** |
| **M4 — Sections 1–4** | The remaining project sections, with their diagrams. |
| **M5 — Section 6** | Lessons, the gotcha compendium (structured data), capabilities-in-practice, run-it, glossary. |
| **M6 — Polish** | Home page hero, motion, the full verification checklist, deploy. |

---

<div align="center">

**MCP Five** — five projects, one arc.

*Black background. White body. Bright headings. Large type. Emojis everywhere. Real numbers only.*

</div>
