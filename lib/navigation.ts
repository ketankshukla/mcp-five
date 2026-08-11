/**
 * ============================================================================
 *  lib/navigation.ts  —  THE registry
 * ============================================================================
 *
 *  Everything that needs to know what pages exist reads this file and only
 *  this file: the sidebar, the mobile drawer, the prev/next pager, the
 *  breadcrumb, and `generateStaticParams`.
 *
 *  Adding a page is two edits, and neither of them is in a component:
 *
 *      1. an entry in the `pages` array of the right section, below
 *      2. `content/<section>/<slug>.mdx`
 *
 *  If you ever find yourself editing a third file to make a page appear, the
 *  abstraction has sprung a leak — fix the leak, not the page.
 *
 *  Project #4 earned this the hard way: "if two code paths reach the same
 *  feature, they will drift." One registry, one MDX component map.
 */

export type SectionSlug =
  | "start"
  | "server"
  | "host"
  | "gate"
  | "crew"
  | "ledger"
  | "picture";

export type NavPage = {
  /** URL segment, and the basename of the MDX file under content/<section>/. */
  slug: string;
  title: string;
  emoji: string;
  /** One line, shown in the pager card and the page header. */
  summary: string;
  /**
   * Set only for pages that are NOT `/learn/<section>/<slug>` — currently just
   * the welcome page, which is the full-bleed home route. Pages with an `href`
   * are excluded from `generateStaticParams` and have no MDX file.
   */
  href?: string;
};

export type NavSection = {
  slug: SectionSlug;
  title: string;
  emoji: string;
  /** CSS custom property holding this section's vivid accent. */
  accentVar: string;
  /** The same colour as a literal, for Mermaid themeVariables and inline SVG. */
  accentHex: string;
  /** Shown under the section title in the sidebar and on the section's pages. */
  tagline: string;
  /** Which of the five projects this section teaches, if any. */
  project?: 1 | 2 | 3 | 4 | 5;
  /** The repo this section is drawn from. */
  repo?: string;
  /** That repo's deployed URL. */
  live?: string;
  pages: NavPage[];
};

export const SECTIONS: NavSection[] = [
  {
    slug: "start",
    title: "Start Here",
    emoji: "🚀",
    accentVar: "--accent-start",
    accentHex: "#E2E8F0",
    tagline: "What MCP is, and why this is a course rather than five tutorials",
    pages: [
      {
        slug: "welcome",
        href: "/",
        title: "Welcome",
        emoji: "👋",
        summary: "Five projects, one arc — and what you'll know at the end of it.",
      },
      {
        slug: "what-is-mcp",
        title: "What is MCP?",
        emoji: "🔌",
        summary:
          "A brain in a jar, a list taped to a toy box, and why 10 × 10 became 10 + 10.",
      },
      {
        slug: "five-capabilities",
        title: "The five capabilities",
        emoji: "🗂️",
        summary:
          "Tools, resources, prompts, sampling, elicitation — sorted by who pulls the trigger.",
      },
      {
        slug: "the-arc",
        title: "The arc",
        emoji: "🧬",
        summary:
          "Each project broke the previous one's assumption. That is the spine of the course.",
      },
      {
        slug: "how-to-use",
        title: "How to use this course",
        emoji: "🧭",
        summary:
          "Read in order. Every project is live. Every claim here has a number behind it.",
      },
    ],
  },
  {
    slug: "server",
    title: "The Server",
    emoji: "🍪",
    accentVar: "--accent-1",
    accentHex: "#F5A524",
    tagline: "offers tools, waits",
    project: 1,
    repo: "https://github.com/ketankshukla/learn-mcp-5-year-old",
    live: "https://learn-mcp-5-year-old.vercel.app",
    pages: [
      {
        slug: "vending-machine",
        title: "The vending machine",
        emoji: "🥤",
        summary:
          "A server advertises what it can do and then waits. Three messages are the whole protocol.",
      },
      {
        slug: "anatomy-of-a-tool",
        title: "Anatomy of a tool",
        emoji: "🔧",
        summary:
          "Name, description, schema, function — and why the description is the whole ballgame.",
      },
      {
        slug: "four-tools",
        title: "The four tools",
        emoji: "🎲",
        summary:
          "say_hello, roll_dice, secret_code, cookie_jar — and why a dice roller goes first.",
      },
      {
        slug: "the-sandcastle",
        title: "The sandcastle",
        emoji: "🏖️",
        summary:
          "`let cookiesInJar = 12` works on your laptop and lies on serverless. The bug is the curriculum.",
      },
      {
        slug: "build-it-1",
        title: "Build it",
        emoji: "🔨",
        summary: "Thirteen stages, a checkpoint for each, and two gotchas worth carrying.",
      },
    ],
  },
  {
    slug: "host",
    title: "The Host",
    emoji: "🔁",
    accentVar: "--accent-2",
    accentHex: "#22D3EE",
    tagline: "picks the tools, runs the loop",
    project: 2,
    repo: "https://github.com/ketankshukla/learn-mcp-agent-loop",
    live: "https://learn-mcp-agent-loop.vercel.app",
    pages: [
      {
        slug: "a-while-loop",
        title: "An agent is a while loop",
        emoji: "♾️",
        summary:
          "Send, reply, run, paste, repeat. There was never anything else in the box.",
      },
      {
        slug: "three-rules",
        title: "The three rules",
        emoji: "📏",
        summary:
          "Append the whole reply. All results in one message. Cap the loop, hard.",
      },
      {
        slug: "client-by-hand",
        title: "Writing the client by hand",
        emoji: "✍️",
        summary:
          "MCP is JSON over HTTP. Two things bite: the Accept header, and the reply that might be SSE.",
      },
      {
        slug: "the-toolbox",
        title: "One shelf, many servers",
        emoji: "🧺",
        summary:
          "Namespacing, Promise.allSettled, and the mildest version of the whole series' idea: a host curates.",
      },
      {
        slug: "the-meter",
        title: "The meter",
        emoji: "📊",
        summary:
          "`input_tokens` is only the uncached remainder, and prompt caching is a prefix match.",
      },
      {
        slug: "build-it-2",
        title: "Build it",
        emoji: "🔨",
        summary: "Twelve stages, their checkpoints, and the VERCEL_URL trap.",
      },
    ],
  },
  {
    slug: "gate",
    title: "The Gate",
    emoji: "✋",
    accentVar: "--accent-3",
    accentHex: "#FB7185",
    tagline: "asks first",
    project: 3,
    repo: "https://github.com/ketankshukla/learn-mcp-agent-guard",
    live: "https://learn-mcp-agent-guard.vercel.app",
    pages: [
      {
        slug: "hint-not-permission",
        title: "A hint is not a permission model",
        emoji: "🔑",
        summary:
          "The flag arrives over HTTP from a machine you don't control. Consult it and your gate is optional.",
      },
      {
        slug: "rules-read-arguments",
        title: "Rules read arguments, not names",
        emoji: "🧾",
        summary:
          "`cookie_jar` isn't dangerous. `cookie_jar { action: \"eat\" }` is. The verb lives in the arguments.",
      },
      {
        slug: "default-allow",
        title: "Default allow, and why",
        emoji: "⚖️",
        summary:
          "An approval gate that trains you to click Approve is worse than none, because it feels like one.",
      },
      {
        slug: "pausing-is-an-array",
        title: "Pausing is an array",
        emoji: "🧊",
        summary:
          "The agent's entire state is its messages array — so freezing it mid-run is one INSERT.",
      },
      {
        slug: "the-deny-branch",
        title: "The deny branch",
        emoji: "🚫",
        summary:
          "A denied tool still needs a tool_result. And the wording matters more than it looks.",
      },
      {
        slug: "evals",
        title: "Evals: the report card",
        emoji: "📋",
        summary:
          "Never assert on prose. Score a pass rate. Include a case where the right answer is nothing.",
      },
      {
        slug: "replay",
        title: "Replay",
        emoji: "⏪",
        summary:
          "Every loop event was already a row, so rewinding a run costs one `order by seq`.",
      },
      {
        slug: "build-it-3",
        title: "Build it",
        emoji: "🔨",
        summary: "Thirteen stages, their checkpoints, and two tools that lie to you.",
      },
    ],
  },
  {
    slug: "crew",
    title: "The Crew",
    emoji: "👥",
    accentVar: "--accent-4",
    accentHex: "#A78BFA",
    tagline: "hires help",
    project: 4,
    repo: "https://github.com/ketankshukla/learn-mcp-agent-crew",
    live: "https://learn-mcp-agent-crew.vercel.app",
    pages: [
      {
        slug: "the-ceiling",
        title: "The ceiling you can't prompt your way out of",
        emoji: "🧱",
        summary:
          "240 jars, 0 of 36 found, 439k tokens. A failing agent is expensive precisely because it fails slowly.",
      },
      {
        slug: "sub-agent",
        title: "A sub-agent is a tool that happens to think",
        emoji: "🧑‍🍳",
        summary:
          "The model gets one extra tool, and its implementation is the function that is calling it.",
      },
      {
        slug: "local-tools",
        title: "Local tools",
        emoji: "🏠",
        summary:
          "`spawn_agent` can't live on a server — and the reason why is a security boundary.",
      },
      {
        slug: "five-agents-one-human",
        title: "Five agents, one human",
        emoji: "🙋",
        summary:
          "The pause travels up, carrying origin, partial_results, and the frozen worker's whole mind.",
      },
      {
        slug: "seatbelts",
        title: "Seatbelts, and why five",
        emoji: "🔒",
        summary:
          "Recursion multiplies per-loop limits. The best of the five is an absence, not a counter.",
      },
      {
        slug: "measurement-trap",
        title: "The measurement trap",
        emoji: "🪤",
        summary:
          "Every individual number was right. The division was the lie — and it survived review.",
      },
      {
        slug: "build-it-4",
        title: "Build it",
        emoji: "🔨",
        summary:
          "Twelve stages, their checkpoints, and the queue you cannot yield from inside a callback.",
      },
    ],
  },
  {
    slug: "ledger",
    title: "The Ledger",
    emoji: "💸",
    accentVar: "--accent-5",
    accentHex: "#34D399",
    tagline: "owns the wallet",
    project: 5,
    repo: "https://github.com/ketankshukla/learn-mcp-agent-ledger",
    live: "https://learn-mcp-agent-ledger.vercel.app",
    pages: [
      {
        slug: "four-unused",
        title: "Four capabilities we never used",
        emoji: "🗝️",
        summary:
          "Four projects into a series named after the protocol, and we had touched one capability of five.",
      },
      {
        slug: "arrow-points-back",
        title: "The arrow that points back",
        emoji: "↩️",
        summary:
          "Sampling is the server asking your host to think. It has no API key and no model — it has yours.",
      },
      {
        slug: "the-finding",
        title: "The finding",
        emoji: "🔍",
        summary:
          "Every tutorial shows a server→client push. It cannot work on serverless, and the SDK says why.",
      },
      {
        slug: "protocol-by-hand",
        title: "Speaking the protocol by hand",
        emoji: "🧬",
        summary:
          "The _meta envelope, the Mcp-Method headers, and what −32020, −32021 and −32022 each mean.",
      },
      {
        slug: "budget-not-gate",
        title: "A budget is not a gate",
        emoji: "💰",
        summary:
          "The same tool costs 0.22¢ or 6.0¢ depending on its arguments. So the rule has to be a number.",
      },
      {
        slug: "gate-cannot-pause",
        title: "The gate that cannot pause",
        emoji: "⏱️",
        summary:
          "You cannot make somebody else's server wait for your human. Synchronous refusal, asynchronous approval.",
      },
      {
        slug: "refuses-to-trust",
        title: "What the host refuses to trust",
        emoji: "🛡️",
        summary:
          "The model, maxTokens and requestState — three things from across the boundary, all inputs to the bill.",
      },
      {
        slug: "one-wallet",
        title: "One wallet, many spenders",
        emoji: "🏦",
        summary:
          "Every draw labelled with who asked — and refusals get rows too, or the ledger looks switched off.",
      },
      {
        slug: "zero-dollar-evals",
        title: "The suite that costs nothing",
        emoji: "🆓",
        summary:
          "An eval is a prompt and a check. The traces are already on disk. 13/13 replayed for $0.00.",
      },
      {
        slug: "data-not-yours",
        title: "Data does not stay yours",
        emoji: "📮",
        summary:
          "You minted it, handed it across a boundary and got it back. It is input now. HMAC it.",
      },
      {
        slug: "build-it-5",
        title: "Build it",
        emoji: "🔨",
        summary: "The stages, their checkpoints, and the whole demo in three commands.",
      },
    ],
  },
  {
    slug: "picture",
    title: "The Whole Picture",
    emoji: "🧭",
    accentVar: "--accent-6",
    accentHex: "#FB923C",
    tagline: "what five projects add up to",
    pages: [
      {
        slug: "lessons",
        title: "The lessons that survived contact",
        emoji: "🎓",
        summary:
          "The transferable ones, each with the project that earned it and the failure that proved it.",
      },
      {
        slug: "gotchas",
        title: "The gotcha compendium",
        emoji: "⚠️",
        summary:
          "All forty things that actually broke, filterable by project and by category.",
      },
      {
        slug: "capabilities-in-practice",
        title: "The five capabilities, in practice",
        emoji: "🧰",
        summary:
          "Having built all five: which one is 90% of the value, and which one nobody demos.",
      },
      {
        slug: "run-it",
        title: "Run it all yourself",
        emoji: "▶️",
        summary:
          "Clone table, prerequisites, env vars — and which commands spend money and which don't.",
      },
      {
        slug: "glossary",
        title: "Glossary",
        emoji: "📖",
        summary: "Every term this course uses, defined in one line each.",
      },
    ],
  },
];

/** A page plus the section it belongs to, which is what callers actually want. */
export type ResolvedPage = NavPage & {
  section: NavSection;
  /** Where it lives. `/` for welcome, `/learn/<section>/<slug>` for the rest. */
  href: string;
  /** 1-based position in the linear course order, across section boundaries. */
  index: number;
};

function resolve(section: NavSection, page: NavPage, index: number): ResolvedPage {
  return {
    ...page,
    section,
    href: page.href ?? `/learn/${section.slug}/${page.slug}`,
    index,
  };
}

/**
 * Every page in linear course order, welcome first, glossary last. This is the
 * order the pager walks, and it crosses section boundaries.
 */
export const COURSE: ResolvedPage[] = SECTIONS.flatMap((section) =>
  section.pages.map((page) => ({ section, page })),
).map(({ section, page }, i) => resolve(section, page, i + 1));

/** The pages that are real MDX files under content/ — everything but welcome. */
export const LEARN_PAGES: ResolvedPage[] = COURSE.filter((p) =>
  p.href.startsWith("/learn/"),
);

export const TOTAL_PAGES = COURSE.length;

export function getSection(slug: string): NavSection | undefined {
  return SECTIONS.find((s) => s.slug === slug);
}

export function getPage(sectionSlug: string, pageSlug: string): ResolvedPage | undefined {
  return COURSE.find((p) => p.section.slug === sectionSlug && p.slug === pageSlug);
}

export function getPageByHref(href: string): ResolvedPage | undefined {
  return COURSE.find((p) => p.href === href);
}

/** Previous and next in course order. Either may be undefined at the ends. */
export function neighbours(page: ResolvedPage): {
  prev?: ResolvedPage;
  next?: ResolvedPage;
} {
  return {
    prev: COURSE[page.index - 2],
    next: COURSE[page.index],
  };
}

/** Feeds `generateStaticParams` for /learn/[section]/[page]. */
export function learnParams(): { section: string; page: string }[] {
  return LEARN_PAGES.map((p) => ({ section: p.section.slug, page: p.slug }));
}
