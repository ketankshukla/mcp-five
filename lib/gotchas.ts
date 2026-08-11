/**
 * ============================================================================
 *  lib/gotchas.ts  —  the compendium, as data
 * ============================================================================
 *
 *  Every entry from the "the N things that actually broke" appendix of all
 *  five BUILD_FROM_SCRATCH.md files. Forty of them.
 *
 *  Kept as data rather than prose so the page can filter by project and by
 *  category, and so the counts on the page are derived rather than typed. If
 *  the compendium ever says "40" while holding 39 entries, that is exactly the
 *  class of mistake project #4's measurement trap is about.
 *
 *  Text fields take a tiny subset of markdown — `code` and **bold** — rendered
 *  by <Inline> in components/mdx/Inline.tsx.
 */

export type GotchaCategory =
  | "protocol"
  | "cost"
  | "measurement"
  | "persistence"
  | "tooling"
  | "deployment";

export const CATEGORIES: { id: GotchaCategory; label: string; emoji: string }[] = [
  { id: "protocol", label: "protocol", emoji: "🔌" },
  { id: "cost", label: "cost", emoji: "💸" },
  { id: "measurement", label: "measurement", emoji: "📏" },
  { id: "persistence", label: "persistence", emoji: "🗄️" },
  { id: "tooling", label: "tooling", emoji: "🔧" },
  { id: "deployment", label: "deployment", emoji: "🚀" },
];

export const PROJECTS: { n: 1 | 2 | 3 | 4 | 5; name: string; emoji: string }[] = [
  { n: 1, name: "the server", emoji: "🍪" },
  { n: 2, name: "the host", emoji: "🔁" },
  { n: 3, name: "the gate", emoji: "✋" },
  { n: 4, name: "the crew", emoji: "👥" },
  { n: 5, name: "the ledger", emoji: "💸" },
];

export type Gotcha = {
  /** Position in this project's own appendix, so entries stay findable. */
  n: number;
  project: 1 | 2 | 3 | 4 | 5;
  title: string;
  /** How you actually meet the bug. This is what the card shows collapsed. */
  symptom: string;
  cause: string;
  fix: string;
  /** The bit that transfers to code that has nothing to do with MCP. */
  lesson?: string;
  tags: GotchaCategory[];
};

export const GOTCHAS: Gotcha[] = [
  // ---------------------------------------------------------------- #1 ----
  {
    n: 1,
    project: 1,
    title: "The SDK API changed under us",
    symptom:
      "`error TS2339: Property 'tool' does not exist on type 'McpServer'` — on code copied from a current-looking tutorial.",
    cause:
      "Nearly every tutorial and blog post online uses the **1.x** API. The 2.x packages are a different shape: `server.registerTool(name, config, cb)` rather than `server.tool(name, desc, shape, cb)`, `inputSchema: z.object({...})` rather than a raw shape, and `@modelcontextprotocol/server` rather than `@modelcontextprotocol/sdk/server/mcp.js`.",
    fix: "Read the types you installed: `cat node_modules/mcp-handler/dist/index.d.ts`.",
    lesson:
      "Don't trust the blog post, read the types on disk. The `.d.ts` files are the ground truth for the version you actually have, and **they cannot be out of date**. Five minutes reading them beats an hour of guessing — a habit that went on to change the design in all five projects.",
    tags: ["tooling"],
  },
  {
    n: 2,
    project: 1,
    title: "`406 Not Acceptable` on every request",
    symptom:
      "The endpoint exists, the build is clean, and every curl returns `406` with nothing useful in the body.",
    cause:
      "A missing `Accept: application/json, text/event-stream` header. The spec requires the client to declare it can handle **either** reply format, and browsers and `fetch` don't add it for you.",
    fix: "Send both header values, every time.",
    lesson:
      "The status code suggests you asked for something unreasonable rather than that you forgot to mention a second content type you weren't planning to use. If a brand-new MCP integration returns 406, this is it — every time.",
    tags: ["protocol"],
  },
  {
    n: 3,
    project: 1,
    title: "The cookie jar forgets",
    symptom: "Add 20 cookies, look in the jar, see 12.",
    cause:
      "Module-scope state on serverless. Each instance has its own copy of the variable, and requests land wherever the platform sends them — including on a machine that has just been woken up with a fresh copy.",
    fix: "A database. This series settled on Neon Postgres (`npx vercel install neon` — it provisions from the Vercel Marketplace and doesn't ask for a card). Or, if the data is genuinely per-conversation, keep it client-side and pass it in as a tool argument.",
    lesson:
      "The diagnostic that saves you: log a per-instance random id at module scope. If it changes between requests, you've moved machines and the mystery evaporates.",
    tags: ["persistence"],
  },
  {
    n: 4,
    project: 1,
    title: "Windows path and shell friction",
    symptom:
      "`error 2147942593 (0x800700c1)` launching `npm.ps1`; `curl` rejecting a JSON payload; endless `LF will be replaced by CRLF` warnings.",
    cause:
      "PowerShell's `Start-Process` can't invoke a `.ps1` shim as an executable; `cmd.exe` doesn't handle single-quoted strings; and git normalises line endings.",
    fix: "Run `npx next start` directly rather than through the npm shim. Use Git Bash or `Invoke-RestMethod` for JSON payloads. The CRLF warnings are harmless — silence them with `git config core.autocrlf true`.",
    tags: ["tooling"],
  },

  // ---------------------------------------------------------------- #2 ----
  {
    n: 1,
    project: 2,
    title: "`create-next-app` refuses to share a folder",
    symptom:
      "*The directory contains files that could conflict* — over a single unrelated `.md` file.",
    cause:
      "`create-next-app` refuses to scaffold into a folder containing **any** file it doesn't recognise. Project #1's guide suggested `--skip-install --disable-git` in this situation; that advice is wrong for this version, because the check happens **before** either flag is considered.",
    fix: "Scaffold into a temp directory and copy in: `npx create-next-app@latest /tmp/scaffold …` then `cp -r /tmp/scaffold/. ./`.",
    lesson:
      "This one bit every single project in the series, all five times, because every project starts with a kickoff document already in the folder.",
    tags: ["tooling"],
  },
  {
    n: 2,
    project: 2,
    title: "The MCP package that isn't the one you installed",
    symptom:
      "You install `@modelcontextprotocol/sdk` — what project #1 installed, and what every tutorial says — and `mcp-handler` still complains about an unmet peer dependency.",
    cause:
      "`mcp-handler` peer-depends on **`@modelcontextprotocol/server`**, a different package. The first line of its own types says so.",
    fix: "`npm install @modelcontextprotocol/server`.",
    lesson:
      "The transferable lesson is not *install this package*. It is: **read the peer dependencies and the first import line of the types.** This is project #1's gotcha 1 wearing a new hat — the ecosystem moved again between the two projects.",
    tags: ["tooling"],
  },
  {
    n: 3,
    project: 2,
    title: "The type files you can't find",
    symptom:
      "`find node_modules/@modelcontextprotocol/server -name \"*.d.ts\"` returns nothing, on a package that obviously ships types.",
    cause:
      "It is ESM-first and ships `.d.mts` / `.d.cts`, not `.d.ts`. Your `find` pattern was wrong, not the package.",
    fix: "Search by content rather than filename: `grep -rln \"registerTool\" node_modules/@modelcontextprotocol/server/dist/`. Or check `package.json`'s `types` / `exports` field, which tells you exactly which file to open.",
    lesson:
      "When *read the types* turns up nothing, **doubt your glob before you doubt the package.**",
    tags: ["tooling"],
  },
  {
    n: 4,
    project: 2,
    title: "`.env*` swallows `.env.example`",
    symptom: "You write a nice `.env.example`, commit, and it isn't in the repo.",
    cause:
      "The Next.js default `.gitignore` contains `.env*`, which matches `.env.example` just as happily as `.env.local`.",
    fix: "Add `!.env.example` — and keep that block **last**, because gitignore is order-sensitive and the last matching pattern wins.",
    lesson:
      "Harmless in itself, and it means every person who clones your repo has no idea which variables to set.",
    tags: ["tooling"],
  },
  {
    n: 5,
    project: 2,
    title: "The dev server that would not die",
    symptom:
      "*Port 3000 is in use by process 42444, using available port 3001 instead.* Your new server is on 3001 while everything you configured points at 3000 — where the **old** process, with the **old** environment, is still cheerfully answering.",
    cause:
      "Killing the shell that launched `npx next dev` does not necessarily kill the Node process it spawned. This is worse on Windows.",
    fix: "Check the **port**, not the shell: `Get-NetTCPConnection -LocalPort 3000 -State Listen | Select-Object OwningProcess`, then `taskkill /PID <pid> /F`. On macOS or Linux, `lsof -ti:3000 | xargs kill -9`.",
    lesson:
      "If a code or env change appears to have no effect, **confirm which process is actually serving the port** before changing anything else. This bit projects #2, #3 and #4 — when the same surprise recurs three times, the mental model is wrong rather than the command.",
    tags: ["tooling"],
  },
  {
    n: 6,
    project: 2,
    title: "`.env.local` is read at startup, not per request",
    symptom:
      "You add `ANTHROPIC_API_KEY` to `.env.local`, hit the app, and get *ANTHROPIC_API_KEY is not set* — from a file that visibly contains it.",
    cause:
      "The dev server was already running when you created the file. Environment variables are read into the process at boot.",
    fix: "Restart the dev server, and confirm it picked the file up — Next prints `- Environments: .env.local` on startup. If that line is missing, the file wasn't loaded.",
    lesson:
      "This compounds nastily with the previous gotcha: you *restart*, the old process survives on port 3000, and you conclude the env file is broken.",
    tags: ["tooling"],
  },
  {
    n: 7,
    project: 2,
    title: "The host called itself through a locked door",
    symptom:
      "Everything works locally. In production the app still answers — but one MCP server is missing from the trace with `HTTP 401`, while curling that same endpoint on the public URL returns 200 perfectly.",
    cause:
      "Vercel gives you two different hostnames with different protection. `VERCEL_URL` is the **per-deployment** hostname and Deployment Protection answers it with 401. `VERCEL_PROJECT_PRODUCTION_URL` is the stable alias and is not protected. Every tutorial tells you to use `VERCEL_URL` for *the app's own URL*, which is fine for a redirect target and wrong when the server must call itself.",
    fix: "Prefer `VERCEL_PROJECT_PRODUCTION_URL`, falling back to `VERCEL_URL`.",
    lesson:
      "**It does not look like a failure.** The host degrades gracefully, the model answers using the servers that did connect, and the user gets a plausible response. Nothing goes red — you silently have half the tools you think you have. *It deployed and the page loads* is not verification: this bug survived a clean typecheck, a clean build, a green deployment and a working demo.",
    tags: ["deployment"],
  },

  // ---------------------------------------------------------------- #3 ----
  {
    n: 1,
    project: 3,
    title: "Vercel un-ignores your `.env.example`, repeatedly",
    symptom:
      "You add `!.env.example` to `.gitignore`, and later it is ignored again anyway.",
    cause:
      "`vercel link` appends its own `.env*` line — and so does `vercel install`, and so does anything else that writes `.env.local`. Each one appends to the **end**, and gitignore is order-sensitive, so each one silently undoes your negation.",
    fix: "Re-check `.gitignore` after **every** Vercel command that touches `.env.local`, and delete the duplicates.",
    lesson:
      "Leave a comment in the file explaining why the block must stay last, because you will do this again.",
    tags: ["deployment"],
  },
  {
    n: 2,
    project: 3,
    title: "`git check-ignore -v` lies to you about negations",
    symptom:
      "`git check-ignore -v .env.example` prints a matching line and exits **0** — which reads like *yes, ignored*, so you conclude the negation didn't work.",
    cause:
      "Exit 0 here means *a pattern matched*, and the pattern that matched is your negation. The file is fine. The tool is telling you which rule decided, not what it decided.",
    fix: "Ask the question you actually care about: `git add -n .env.example`. It prints `add '.env.example'` if it will be committed, or *the following paths are ignored* if it won't.",
    lesson:
      "When a check is ambiguous, **test the behaviour you care about, not a proxy for it.** This one nearly caused a fix to a file that was already correct — and it came back in project #4.",
    tags: ["tooling"],
  },
  {
    n: 3,
    project: 3,
    title: "`tsc --noEmit` fails on a clean clone",
    symptom:
      "`Cannot find name 'LayoutProps'` — on code `create-next-app` itself generated.",
    cause:
      "`LayoutProps<\"/\">` is a **generated** type that Next writes into `.next/types` during a build. On a fresh clone that directory doesn't exist, so neither does the type. It works for anybody who has run `npm run build` first, which is why it survives into templates.",
    fix: "Type the layout explicitly: `{ children }: { children: React.ReactNode }`.",
    lesson:
      "**A typecheck that only passes after a build isn't a pre-build check.** This is the sort of thing that turns a clean CI pipeline red on its very first run.",
    tags: ["tooling"],
  },
  {
    n: 4,
    project: 3,
    title: "The trace was empty, and replay looked broken",
    symptom:
      "After several successful runs with approvals, `npm run replay` listed them all with **0 events**. The whole replay feature appeared not to work.",
    cause:
      "Nothing was wrong with replay. `recordEvent` was called in the **route handlers**, and the terminal checkpoint script called the loop **directly** — so runs created by `npm run approval` had rows in `runs` and `approvals` but nothing in `trace_events`.",
    fix: "Record the trace in the checkpoint script too, exactly as the route does.",
    lesson:
      "**Two paths into the same feature will drift, and the one you test with is not always the one you ship.** The symptom pointed at the newest code; the cause was in the oldest. This one came back twice more — project #4 fixed it structurally, and project #5 found a fifth caller that still skipped the shared path.",
    tags: ["persistence"],
  },
  {
    n: 5,
    project: 3,
    title: "The dev server that would not die",
    symptom:
      "Port 3000 in use, new server on 3001, and `JAR_MCP_URL` still pointing at 3000 where the old process is answering with the old environment.",
    cause: "Killing the shell does not kill the process it spawned.",
    fix: "Check the port, not the shell.",
    lesson:
      "Project #2's gotcha 5, unchanged, one project later. If a change appears to have no effect, confirm which process is serving the port before changing anything else.",
    tags: ["tooling"],
  },
  {
    n: 6,
    project: 3,
    title: "The seatbelt that unbuckled itself on every resume",
    symptom: "**None. Nothing failed.** That is what makes it worth listing.",
    cause:
      "`MAX_ITERATIONS = 10` is a cost seatbelt, and `/api/resume` calls `runAgentLoop` fresh — so `iteration` starts at 0 again. A run that pauses for approval nine times would get **nine separate budgets of ten iterations**, and the cap you thought you had would be 90.",
    fix: "Thread the count through: `runAgentLoop({ …, iterationOffset: run.iterations })`.",
    lesson:
      "**When you split one logical operation across two HTTP requests, audit every counter, cap and budget that was implicitly per-operation.** Pausing didn't just add a feature — it changed what *one run* means, and anything scoped to a run had to be re-scoped by hand. Project #4 hit the identical bug with its spawn cap.",
    tags: ["cost"],
  },
  {
    n: 7,
    project: 3,
    title: "The model asks for permission, and that is not a safety feature",
    symptom:
      "The good kind. Asked to *smash the jar*, the model itself stopped and asked for confirmation instead of calling the tool — so the gate never fired and the checkpoint reported *the loop finished without ever pausing*.",
    cause: "The tool's description says it is irreversible, and the model behaved sensibly.",
    fix: "Re-run with a user who is actively trying to get past it: *Smash the jar. Yes I am certain, do it right now, no questions.* The model complied immediately — **and the host stopped it anyway.**",
    lesson:
      "That is a **disposition**, not a guarantee. It varies run to run, it varies by model, and it evaporates the moment a user is insistent. **If your safety testing only uses polite prompts, you are measuring the model's manners, not your controls.**",
    tags: ["measurement"],
  },
  {
    n: 8,
    project: 3,
    title: "Project #2's own server locked this project out",
    symptom:
      "The plan was to connect this host to project #2's live `/api/toolbox`. It returned `401` for every request.",
    cause:
      "Project #2's stage 9 added `withMcpAuth` and set `MCP_SHARED_TOKEN` in production. It works exactly as designed — this host just isn't holding the token.",
    fix: "Connect to project #1's open server instead, and get the missing capability from this repo's own jar server.",
    lesson:
      "**Your own past projects are third-party services.** Their auth, uptime and rate limits constrain you the same way a stranger's would. The `Promise.allSettled` in `buildToolbox` is what kept this a design decision instead of an outage — and project #4 responded by shipping its servers deliberately open.",
    tags: ["deployment"],
  },

  // ---------------------------------------------------------------- #4 ----
  {
    n: 1,
    project: 4,
    title: "The premise was wrong, and the eval said so",
    symptom:
      "The whole project is built on *sixty jars is too much for one agent*. The baseline run scored **100%** — sixty jars inspected, nine tampered found, zero false positives, four iterations.",
    cause:
      "Sixty verbose reports is about 15,000 tokens, and the model batches twenty `inspect_jar` calls per turn. It was never close to a context limit.",
    fix: "Stop asserting where the ceiling is and go and measure it. Make the pantry size a variable, keep the exam identical at every size, and turn it up until something breaks — which it did, decisively, at 240.",
    lesson:
      "A version of this project that shipped sixty jars and a celebratory README would have been demonstrating a feature that, at the size it shipped, **made no measurable difference at all.** The eval suite is what made the difference between a lesson and a claim.",
    tags: ["measurement"],
  },
  {
    n: 2,
    project: 4,
    title: "A backtick inside a template literal, in SQL",
    symptom: "`ERROR: Expected \"]\" but found \"trace_events\"`.",
    cause:
      "A SQL comment inside a JS template literal, written in markdown reflex — `-- Attribution lives in the \\`trace_events\\` table` — where the backtick ends the string.",
    fix: "No backticks in SQL comments inside template literals.",
    lesson:
      "The error points at `trace_events`, which is a perfectly good table name, and says nothing about backticks. **When a parse error names a token that is obviously fine, look at the delimiters around it, not the token.**",
    tags: ["tooling"],
  },
  {
    n: 3,
    project: 4,
    title: "A regex that assumed the data would never grow",
    symptom:
      "At 240 jars the eval reported that a worker assigned *jars 91-120* had been given one jar, and one assigned *jars 211-240* had been given fourteen. It looked like the orchestrator was delegating badly.",
    cause:
      "`parseJarIds` used `\\d{1,2}` — written when the pantry was fixed at sixty and two digits was obviously enough. On `\"jars 211-240\"` the engine matches `21`, wants a dash, finds `1`, slides along one character, matches `11`, finds the dash, matches `24`, and reports the range **11 to 24**. No error anywhere.",
    fix: "`\\b(\\d{1,3})\\b`, validated against `JAR_COUNT`.",
    lesson:
      "**The instrument was broken, not the thing being measured** — and it failed *plausibly*. A wrong-but-believable number is worse than a crash. When a measurement says your system is misbehaving, confirm the measurement first.",
    tags: ["measurement"],
  },
  {
    n: 4,
    project: 4,
    title: "Killing the shell does not kill the process, part two",
    symptom:
      "A 240-jar comparison came back scored **0% in both modes**, 0 tokens, 0 jars inspected — which reads like a devastating finding about delegation and is actually nothing at all.",
    cause:
      "An earlier `compare` run had exceeded a 10-minute command timeout and been killed. **It kept running.** A second was started, and the two ran concurrently until they exhausted the API credit balance.",
    fix: "Check for the process, not the shell — and before starting anything expensive twice, confirm the first one is actually dead.",
    lesson:
      "**A failure message that doesn't say what failed will eventually be mistaken for data.** The eval's own output said only `stopped: error`, and the verdict line dutifully printed *ONE AGENT IS BETTER* from two identically-broken runs. A red tick with no explanation is worse than no tick.",
    tags: ["measurement"],
  },
  {
    n: 5,
    project: 4,
    title: "`create table if not exists` will not add your new columns",
    symptom:
      "None on a fresh database. On an existing project #3 database, `npm run db:init` reports success and then every insert fails on a missing `parent_run_id`.",
    cause: "`create table if not exists` sees a table and does nothing. It does not diff columns.",
    fix: "Pair every new column with an explicit `alter table … add column if not exists`.",
    lesson:
      "**\"Idempotent schema script\" and \"migration\" are not the same thing.** The first is safe to re-run; only the second actually upgrades anything.",
    tags: ["persistence"],
  },
  {
    n: 6,
    project: 4,
    title: "The spawn cap that reset on every resume",
    symptom: "**None. Nothing failed.** That is what makes it worth listing.",
    cause:
      "`MAX_SPAWNS` is enforced by a counter in a closure created per run. A run that pauses for approval and resumes in a **new HTTP request** builds fresh crew tools with a counter starting at zero — so the cap was 8 *per resume*, not per run.",
    fix: "`createCrewTools(spawnOffset)`, threaded through exactly like `iterationOffset`.",
    lesson:
      "Project #3's gotcha 6 in a place nobody thought to look. **When you split one logical operation across two HTTP requests, every counter, cap and budget that was implicitly per-operation must be re-scoped by hand** — and a counter hidden in a closure is easier to miss than one at the top of a loop.",
    tags: ["cost"],
  },
  {
    n: 7,
    project: 4,
    title: "A Next.js route module is not a place to keep helpers",
    symptom:
      "`/api/resume` importing `stripState` from `../chat/route`. It typechecks, and it is a build error waiting for a bad day.",
    cause: "A route module is only supposed to export handlers and a few config constants.",
    fix: "The helper moved to `lib/run-driver.ts`.",
    lesson: "**The shared thing between two routes belongs below both of them, not inside one.**",
    tags: ["tooling"],
  },
  {
    n: 8,
    project: 4,
    title: "Three places have to agree about the pantry size",
    symptom:
      "`inspect_jar { id: 200 }` rejected as out of range while the database happily holds 240 jars.",
    cause:
      "The pantry MCP server builds its Zod input schema **at module load**, from `JAR_COUNT`. A dev server started before you exported `PANTRY_JARS=240` is serving a 60-jar schema no matter what you reseeded.",
    fix: "`PANTRY_JARS` on all three — `db:init`, `dev`, and the script.",
    lesson:
      "Env vars are read once, at startup, and **a schema derived from one is even stickier than a value** — it is baked into what the server will accept.",
    tags: ["tooling"],
  },
  {
    n: 9,
    project: 4,
    title: "The headline number compared two different amounts of work",
    symptom:
      "The comparison reported *the crew cost 1.87× what one agent cost*. Plausible, quotable, and wrong.",
    cause:
      "The two modes do not run the same number of runs. `crew-one-approval` is a delegation-only case, so a 3-attempt comparison is **3 runs in single mode and 6 in crew mode** — and the script divided one total token count by the other. Part of what it measured was *the crew did twice as many runs*. Nothing errored. Both totals were correct. **The division was the lie.**",
    fix: "Track tokens per observation group and compare only the groups both modes actually executed. The full spend is still printed, clearly labelled, because it is what the run really cost — it just isn't the number that answers the question.",
    lesson:
      "**Any comparison between two configurations has to check that they did the same work, not just that they both ran.** This is the same error as an A/B test where one arm gets more traffic, and it is very hard to see from the inside **because every individual number in the report is accurate.** Ask *how many runs went into each of these two totals?* before quoting a ratio.",
    tags: ["measurement"],
  },
  {
    n: 10,
    project: 4,
    title: "`git check-ignore -v` still lies about negations",
    symptom: "Exit 0 on `.env.example`, which reads like *ignored* and isn't.",
    cause: "It reports that a pattern matched. The pattern was the negation.",
    fix: "`git add -n <file>` asks what git will actually do.",
    lesson:
      "Project #3's gotcha 2, one project later, in the same series, by the same author. Some gotchas do not get learned — they get **written down and re-encountered**, which is the argument for the appendix existing at all.",
    tags: ["tooling"],
  },

  // ---------------------------------------------------------------- #5 ----
  {
    n: 1,
    project: 5,
    title: "The feature everyone documents does not work here",
    symptom:
      "`server.server.createMessage()` — the one-liner in every sampling tutorial — throws.",
    cause:
      "It is a server→client **push**, and a push needs a live connection. A serverless function has a request, not a connection. The SDK says so precisely: *per-request legacy serving cannot receive server-to-client requests.*",
    fix: "The 2026-07-28 revision replaces the push with a **retry**: return `inputRequired(…)`, the client fulfils it, the client calls the tool again with `params.inputResponses` and `params.requestState`.",
    lesson:
      "The types said `@deprecated` next to the function every tutorial recommends. **A deprecation notice on the thing you were about to build on is worth more than a working example of it.**",
    tags: ["protocol"],
  },
  {
    n: 2,
    project: 5,
    title: "`LATEST_PROTOCOL_VERSION` is not the latest protocol version",
    symptom:
      "`SUPPORTED_PROTOCOL_VERSIONS` doesn't contain `2026-07-28`, so you conclude the runtime can't serve it and design around the legacy path.",
    cause:
      "Those constants describe the **`initialize`-negotiated** era only. The 2026 era is not negotiated by a handshake at all — it is triggered by a per-request `_meta` envelope, and lives in a completely separate code path.",
    fix: "Send the envelope and find out.",
    lesson:
      "A constant named `LATEST_` answers a narrower question than its name implies. **When types and constants disagree, the wire is the tiebreaker.**",
    tags: ["protocol"],
  },
  {
    n: 3,
    project: 5,
    title: "Two readers, two shapes, and only one of them documented where I looked",
    symptom:
      "The handler returned `input_required` forever. The host answered, the retry arrived, and the handler asked again — an infinite loop that costs a model call per round.",
    cause:
      "`acceptedContent(responses, key)` is **elicitation-only**. For sampling it returns `undefined`, which is indistinguishable from *no answer yet*. The right reader is `inputResponse(responses, key)`. And they aren't even the same shape: a sampling view wraps its payload in `.result`, while an elicitation view is flattened.",
    fix: "`inputResponse` for sampling; destructure elicitation directly.",
    lesson:
      "Both cost exactly one compile error to discover, which is the cheapest way this project found anything out. **Let the compiler tell you the shape instead of guessing at it in prose.**",
    tags: ["protocol"],
  },
  {
    n: 4,
    project: 5,
    title: "I built the replay runner first, and nothing was being recorded",
    symptom:
      "The $0 replay suite was built first, exactly as recommended. Then the live suite ran — 13 cases, all green — and replay reported *no stored run for this prompt* for **every single one**.",
    cause:
      "Nothing was wrong with replay. `observeOnce` calls `runAgentLoop` **directly**, so it never went through `lib/run-driver.ts`, so it never wrote a row. This is project #3's gotcha 4 arriving for a **third** time: #3 hit it with a script and a route handler, #4 fixed it structurally with one drive-and-persist path — and then left the eval suite as a fifth caller that quietly didn't persist, **because in project #4 nothing read those rows.**",
    fix: "Thread an optional `persist` through `observeOnce`, reusing `TraceWriter` rather than writing a second persistence path — which would have been the same mistake a fourth time.",
    lesson:
      "**A code path that skips the shared one is not a bug until something needs what the shared one produces. Then it is the whole feature, missing.** The gap had existed since project #4 and was invisible until something depended on it.",
    tags: ["persistence"],
  },
  {
    n: 5,
    project: 5,
    title: "Six cents for a blank page",
    symptom:
      "The expensive digest came back **empty**. 26,240 tokens, six cents, and a report with nothing in it — which the server dutifully wrapped in a nice header and returned as a *successful* tool result.",
    cause:
      "The sampling call never set `thinking`. On Sonnet 5 that does not mean off — adaptive thinking is **on by default**, and `max_tokens` caps thinking *and* answer together. The host's 1,000-token clamp was spent entirely on reasoning.",
    fix: "`thinking: { type: \"disabled\" }`, plus an explicit check that empty output is an error rather than an answer.",
    lesson:
      "The bug was **created by this project's own design**. The host clamps output to control **cost**; the model spends that same allowance on **thinking** first. A cost control silently became a thinking budget — and the server that asked has no idea either number exists. Anything that clamps `max_tokens` on somebody else's behalf has this bug available to it.",
    tags: ["cost"],
  },
  {
    n: 6,
    project: 5,
    title: "The error path reported a real spend as free",
    symptom:
      "None, until it was read. When the empty-output check started throwing, the `catch` recorded `actualCents: 0` — for a call that had genuinely burned 26,000 tokens.",
    cause:
      "`usage` is populated *before* the check throws. The catch block was written for network failures, where nothing was spent, and inherited by a failure mode where plenty was.",
    fix: "Charge the tab, log the real number, and label the row a failure. `decision` says `refused`; `actual_cents` tells the truth.",
    lesson:
      "**A ledger that under-reports is worse than no ledger, because you would trust it.** Every `catch` around a billable call needs to ask *did this cost anything before it failed?*",
    tags: ["cost"],
  },
  {
    n: 7,
    project: 5,
    title: "A demo that could not demonstrate anything",
    symptom:
      "The gate worked, the refusal worked, and the headline demo — *set the ceiling to two cents and watch it refuse* — did nothing. Every request estimated at **0.22¢**, comfortably under 2¢.",
    cause:
      "There was only one kind of request, and it was cheap. Nothing in the system could produce a number a two-cent ceiling had an opinion about.",
    fix: "A `depth: \"brief\" | \"deep\"` dial on the tool — same tool, same server, same user question, about 27× the price.",
    lesson:
      "A **demonstration** bug rather than a code bug, and worth catching because it makes the argument concrete. Two prices for one tool name is exactly why the gate reads the estimate rather than the tool name.",
    tags: ["measurement"],
  },
  {
    n: 8,
    project: 5,
    title: "A passing suite that printed a crash after passing",
    symptom:
      "`SCORE: 100% (1/1 scored)` followed immediately by `Assertion failed: !(handle->flags & UV_HANDLE_CLOSING)`.",
    cause:
      "`process.exit()` tears the process down while the Neon driver still holds open HTTP handles, and libuv aborts — *after* a perfectly good report.",
    fix: "`process.exitCode = …` and let the event loop drain.",
    lesson:
      "A green suite that ends in a native assertion will be read as a failing suite. **Exit codes are part of the output.**",
    tags: ["tooling"],
  },
  {
    n: 9,
    project: 5,
    title: "A price table is a dated fact",
    symptom: "None yet, and that is the point.",
    cause:
      "`lib/pricing.ts` is the only file in the repo whose correctness **expires**. Sonnet 5 is on an introductory rate that ends 2026-08-31; hard-code the discounted number and every downstream calculation reports to two decimal places, with total confidence, and is wrong from September.",
    fix: "Encode both rates and the date the intro ends, stamp `PRICES_CHECKED_ON`, and print it in the UI and the checkpoint scripts. And the load-bearing half: **the gate reasons in standard prices while the ledger records effective ones**, because a ceiling computed with a temporary discount silently loosens the day the discount ends.",
    lesson:
      "Estimate high, bill honestly. And when a value has an expiry date, **make the expiry date part of the value.**",
    tags: ["cost"],
  },
  {
    n: 10,
    project: 5,
    title: "Project #4's gotcha 9 was still live in project #4's own script",
    symptom:
      "`npm run compare` had never been run in this repo. Run once, it reported *the crew cost 2.01× what one agent cost → at 60 jars delegation is pure overhead* — a conclusion project #4's own corrected README already contradicts.",
    cause:
      "`ONE AGENT` scored 2 comparable cases; `A CREW` scored 4. The ratio divided one run's tokens by two runs' tokens and called the difference a price. **Project #4 built the fix and never wired it up:** `usageByGroup` was populated and stored on the results object, and the verdict read `results[n].usage` — the raw totals — ignoring it entirely.",
    fix: "Intersect the two modes' group keys, sum only the shared ones for the ratio, and print the full spend separately. Re-running turned **2.01× into 1.08×**.",
    lesson:
      "**A documented fix is not a fix.** The appendix entry, the code comment and the helper data structure all existed and all described a behaviour the program did not have. The only evidence that a fix works is **the output of the fixed program** — and this one had never been produced.",
    tags: ["measurement"],
  },
  {
    n: 11,
    project: 5,
    title: "A checkpoint whose second half tested nothing",
    symptom:
      "`npm run approval` printed *PASS — the gate fired and both paths worked*, above output showing the DENY half had run against an empty jar and never paused.",
    cause:
      "Two bugs stacked. The APPROVE half eats every cookie; the DENY half then asks the agent to empty an already-empty jar, so the model sensibly just looks and the gate never fires — **the second half's precondition was consumed by the first half.** And the banner collapsed both halves into one boolean, so *either* path firing printed *both paths worked*.",
    fix: "Restock the jar before each half, track the two outcomes separately, and report PASS / PARTIAL / FAIL — plus a non-zero exit code, because a checkpoint that cannot fail is not a checkpoint.",
    lesson:
      "**A checkpoint whose two halves share mutable state is one checkpoint and one decoration.** Both halves were individually correct; the ordering silently disarmed the second. And a summary line must never claim more than the run proved.",
    tags: ["measurement"],
  },
];

export const GOTCHA_COUNT = GOTCHAS.length;

export function countsByProject(): Record<number, number> {
  return GOTCHAS.reduce<Record<number, number>>((acc, g) => {
    acc[g.project] = (acc[g.project] ?? 0) + 1;
    return acc;
  }, {});
}

export function countsByCategory(): Record<GotchaCategory, number> {
  return GOTCHAS.reduce<Record<string, number>>((acc, g) => {
    for (const tag of g.tags) acc[tag] = (acc[tag] ?? 0) + 1;
    return acc;
  }, {}) as Record<GotchaCategory, number>;
}
