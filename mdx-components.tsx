import type { MDXComponents } from "mdx/types";
import type { ComponentPropsWithoutRef } from "react";

/**
 * The one MDX component map. Every `.mdx` file on the site is rendered through
 * it, so an element only ever needs styling once.
 *
 * M2 adds the content components (Callout, Diagram, Terminal, Stat, …) here so
 * they are available inside MDX without an import in every file.
 */
const components: MDXComponents = {
  // A wide table must scroll inside its own box. The page body never scrolls
  // sideways, at any width — that is a hard requirement, not a nicety.
  table: (props: ComponentPropsWithoutRef<"table">) => (
    <div className="table-wrap scroll-box breakout">
      <table {...props} />
    </div>
  ),
};

export function useMDXComponents(): MDXComponents {
  return components;
}
