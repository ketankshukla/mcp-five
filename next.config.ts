import createMDX from "@next/mdx";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  pageExtensions: ["ts", "tsx", "mdx"],
};

/**
 * Plugins are named as STRINGS, not imported.
 *
 * Turbopack serialises loader options to hand them to its Rust side, so an
 * imported function fails the build with "does not have serializable options".
 * The string form makes Turbopack resolve the plugin itself. The webpack
 * examples in most MDX guides pass functions and will not work here.
 */
const withMDX = createMDX({
  options: {
    remarkPlugins: [
      "remark-gfm",
      "remark-frontmatter",
      // Turns the YAML block at the top of each .mdx file into a named
      // `frontmatter` export.
      ["remark-mdx-frontmatter", { name: "frontmatter" }],
    ],
    rehypePlugins: [
      // Stable ids on every heading — the on-this-page rail reads them.
      "rehype-slug",
      // Syntax highlighting at BUILD time, so no highlighter ships to the
      // browser. Also gives us ```ts title="lib/approval.ts" filename chips
      // and {1,4-6} line highlighting, straight from the fence's meta string.
      [
        "rehype-pretty-code",
        {
          theme: "github-dark-default",
          keepBackground: false,
          defaultLang: "text",
        },
      ],
    ],
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } as any,
});

export default withMDX(nextConfig);
