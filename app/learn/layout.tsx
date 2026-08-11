import type { ReactNode } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { MobileNav } from "@/components/layout/MobileNav";

/**
 * The persistent chrome. The sidebar lives here rather than in the page so it
 * survives navigation — its scroll position and which sections you have
 * expanded should not reset every time you turn a page.
 *
 * The on-this-page rail is rendered by the page itself, because only the page
 * knows its own outline. The home page uses none of this.
 */
export default function LearnLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-dvh">
      <MobileNav />
      <div className="mx-auto flex w-full max-w-[1680px]">
        <Sidebar />
        {children}
      </div>
    </div>
  );
}
