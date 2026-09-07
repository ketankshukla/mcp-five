# SPEC - mcp-five

> What this repo is for, what it deliberately does not do, and what must stay
> true for a change to be correct.

**The written course for the five-project MCP series** - **Live:** https://mcp-five-sandy.vercel.app

## 1. Purpose

Teach the Model Context Protocol through five projects that were actually
shipped, and that were honest about their own bugs.

The arc is the argument: each project is a sequel that reused the last one's
code, and each discovered that the previous project's *assumption* was the thing
needing work.

| | project | the one thing it teaches |
|---|---|---|
| 1 | `learn-mcp-5-year-old` | a server advertises what it can do and waits |
| 2 | `learn-mcp-agent-loop` | an agent is a `while` loop |
| 3 | `learn-mcp-agent-guard` | a hint from across a network boundary is not a permission model |
| 4 | `learn-mcp-agent-crew` | a lone agent pays again for everything it has read |
| 5 | `learn-mcp-agent-ledger` | the dangerous request looks like the safe one on the wire |

## 2. Scope

**In scope** - 47 pages across 6 sections; 28 Mermaid diagrams; a filterable
compendium of all 40 defects encountered across the five builds; the reasoning,
not just the API surface.

**Explicitly out of scope**

- **Runnable code.** The five repos are the code. This site explains them.
- **Being a protocol reference.** The specification is upstream and authoritative.
- **Neutrality about frameworks.** The series builds against provider SDKs
  directly, and says so.

## 3. Invariants

1. **Every number came from a real run**, and where a figure is soft the site
   says so.
2. **The defect compendium stays complete.** All 40, filterable by project and
   category. A course that only shows the happy path teaches the wrong thing, and
   the bugs are the most-read section.
3. **Diagrams load deferred and syntax highlighting is build-time**, keeping
   ~1.6 MB of renderer out of the initial payload.
4. **Each section links the repository and the live deployment** it describes.

## 4. Architecture

Next.js App Router over MDX content. Content lives in `content/`, one file per
page; navigation, section ordering and the defect index are derived from it
rather than hand-maintained.

## 5. Known limitations

- **It documents a series that is finished.** New MCP capabilities are not
  covered and the site does not claim currency with the evolving spec.
- **Single perspective.** One author, one set of builds; conclusions are drawn
  from these five projects and not from a survey.

## 6. Related

- The five repos, in order: [1](https://github.com/ketankshukla/learn-mcp-5-year-old) - [2](https://github.com/ketankshukla/learn-mcp-agent-loop) - [3](https://github.com/ketankshukla/learn-mcp-agent-guard) - [4](https://github.com/ketankshukla/learn-mcp-agent-crew) - [5](https://github.com/ketankshukla/learn-mcp-agent-ledger)
- Blog: <https://ketanshukla.dev/blog/topics/mcp>
