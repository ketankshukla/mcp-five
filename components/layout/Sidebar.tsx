import Link from "next/link";
import { NavTree } from "./NavTree";
import { TOTAL_PAGES } from "@/lib/navigation";

/**
 * The persistent left menu, ≥1024px. Sticky, independently scrollable, and it
 * never moves when the content pane does.
 */
export function Sidebar() {
  return (
    <aside className="sticky top-0 hidden h-dvh w-[var(--sidebar-w)] shrink-0 flex-col border-r border-[var(--border)] bg-[var(--surface-1)] lg:flex">
      <Link
        href="/"
        className="flex items-baseline gap-2 border-b border-[var(--border)] px-5 py-5 no-underline"
      >
        <span aria-hidden className="text-lg">
          🍪
        </span>
        <span className="font-[family-name:var(--font-display)] text-xl font-700 tracking-tight text-[var(--text)]">
          MCP Five
        </span>
      </Link>

      <div className="thin-scroll flex-1 overflow-y-auto px-3 py-4">
        <NavTree />
      </div>

      <div className="border-t border-[var(--border)] px-5 py-3 text-[0.8125rem] text-[var(--text-faint)]">
        {TOTAL_PAGES} pages · 5 projects
      </div>
    </aside>
  );
}
