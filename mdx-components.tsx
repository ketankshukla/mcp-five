import type { MDXComponents } from "mdx/types";
import type { ComponentPropsWithoutRef } from "react";

import { Callout } from "@/components/mdx/Callout";
import { Diagram } from "@/components/mdx/Diagram";
import { Terminal } from "@/components/mdx/Terminal";
import { Stat, StatGrid } from "@/components/mdx/Stat";
import { Compare } from "@/components/mdx/Compare";
import { Steps, Step, Checkpoint } from "@/components/mdx/Steps";
import { GotchaCard } from "@/components/mdx/GotchaCard";
import { CodeBlock } from "@/components/mdx/CodeBlock";
import {
  ProjectCard,
  ProjectGrid,
  Capability,
  Glossary,
  Term,
} from "@/components/mdx/Reference";

/**
 * THE MDX component map. One of them, for the whole site.
 *
 * Two jobs:
 *  1. restyle the HTML that markdown compiles to (tables, code, blockquotes)
 *  2. make every content component available inside .mdx without an import
 *
 * Everything registered here is in scope in every content file, which is what
 * keeps the MDX itself readable — a page is prose plus a handful of tags, with
 * no import block at the top competing with the first sentence.
 */
const components: MDXComponents = {
  // A wide table must scroll inside its own box. The page body never scrolls
  // sideways, at any width — that is a hard requirement, not a nicety.
  table: (props: ComponentPropsWithoutRef<"table">) => (
    <div className="table-wrap scroll-box thin-scroll breakout">
      <table {...props} />
    </div>
  ),

  // rehype-pretty-code has already highlighted this at build time; CodeBlock
  // adds the language chip and the copy button.
  pre: CodeBlock,

  // A markdown blockquote becomes the quote callout, so `> the one line worth
  // remembering` in a source README keeps its weight when it lands here.
  blockquote: ({ children }: ComponentPropsWithoutRef<"blockquote">) => (
    <Callout type="quote">{children}</Callout>
  ),

  Callout,
  Diagram,
  Terminal,
  Stat,
  StatGrid,
  Compare,
  Steps,
  Step,
  Checkpoint,
  GotchaCard,
  ProjectCard,
  ProjectGrid,
  Capability,
  Glossary,
  Term,
};

export function useMDXComponents(): MDXComponents {
  return components;
}
