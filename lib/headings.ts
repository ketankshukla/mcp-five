import { readFile } from "node:fs/promises";
import { join } from "node:path";
import GithubSlugger from "github-slugger";

export type Heading = { id: string; text: string; level: 2 | 3 };

/**
 * The h2/h3 outline of one MDX page, read from source at build time.
 *
 * Why not read the DOM after mount, which is the usual trick? Because then the
 * rail is empty on first paint, it needs an effect to fill itself, and the
 * outline is invisible to anything that isn't a browser. Reading the file is
 * static, runs once at build, and the ids come out identical to the ones
 * `rehype-slug` writes because both use `github-slugger`.
 */
export async function headingsFor(section: string, page: string): Promise<Heading[]> {
  const file = join(process.cwd(), "content", section, `${page}.mdx`);

  let source: string;
  try {
    source = await readFile(file, "utf8");
  } catch {
    return [];
  }

  const slugger = new GithubSlugger();
  const headings: Heading[] = [];
  let inFence = false;

  for (const line of source.split(/\r?\n/)) {
    // A ``` or ~~~ line flips us in and out of a code block. Without this, a
    // "## " inside a shell transcript becomes a phantom entry in the rail.
    if (/^\s*(```|~~~)/.test(line)) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;

    const match = /^(#{2,3})\s+(.+?)\s*$/.exec(line);
    if (!match) continue;

    const text = stripInlineMarkdown(match[2]);
    if (!text) continue;

    headings.push({
      id: slugger.slug(text),
      text,
      level: match[1].length === 2 ? 2 : 3,
    });
  }

  return headings;
}

/** Heading text as a reader sees it: no backticks, asterisks or link syntax. */
function stripInlineMarkdown(input: string): string {
  return input
    .replace(/`([^`]*)`/g, "$1")
    .replace(/\*\*([^*]*)\*\*/g, "$1")
    .replace(/\*([^*]*)\*/g, "$1")
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .trim();
}
