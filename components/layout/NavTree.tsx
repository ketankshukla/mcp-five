"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import type { CSSProperties } from "react";
import { SECTIONS, type SectionSlug } from "@/lib/navigation";

/**
 * The section list, shared by the desktop sidebar and the mobile drawer so
 * there is exactly one of them. Two code paths to the same nav would drift,
 * and the drift would be invisible until a page appeared in one and not the
 * other.
 *
 * All seven sections are always listed. The one you are in is expanded; the
 * rest are collapsed but can be opened without navigating anywhere.
 */
export function NavTree({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  const currentSection = sectionOf(pathname);

  // Which sections are expanded is DERIVED from where you are, not synced to
  // it. State holds only the sections you have explicitly toggled, so
  // navigating opens the section you land in without an effect — and without
  // slamming shut a section you deliberately opened to browse.
  const [overrides, setOverrides] = useState<Partial<Record<SectionSlug, boolean>>>({});

  return (
    <nav aria-label="Course" className="pb-16">
      <ul className="space-y-1">
        {SECTIONS.map((section) => {
          const isCurrent = section.slug === currentSection;
          const isOpen = overrides[section.slug] ?? isCurrent;
          const accent = { "--accent": `var(${section.accentVar})` } as CSSProperties;

          return (
            <li key={section.slug} style={accent}>
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={`nav-${section.slug}`}
                onClick={() =>
                  setOverrides((prev) => ({ ...prev, [section.slug]: !isOpen }))
                }
                className="group flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left transition-colors duration-120 hover:bg-[var(--surface-2)]"
              >
                <span
                  aria-hidden
                  className={`text-[0.7rem] text-[var(--text-faint)] transition-transform duration-120 ${
                    isOpen ? "rotate-90" : ""
                  }`}
                >
                  ▶
                </span>
                <span aria-hidden className="text-base leading-none">
                  {section.emoji}
                </span>
                <span
                  className={`flex-1 font-[family-name:var(--font-display)] text-[0.9375rem] font-600 tracking-tight ${
                    isCurrent ? "text-[var(--accent)]" : "text-[var(--text)]"
                  }`}
                >
                  {section.title}
                </span>
                <span className="font-[family-name:var(--font-mono)] text-[0.6875rem] tabular-nums text-[var(--text-faint)]">
                  {section.pages.length}
                </span>
              </button>

              {isOpen && (
                <ul id={`nav-${section.slug}`} className="mt-0.5 mb-2 space-y-0.5">
                  {section.pages.map((page) => {
                    const href = page.href ?? `/learn/${section.slug}/${page.slug}`;
                    const active = pathname === href;
                    return (
                      <li key={page.slug}>
                        <Link
                          href={href}
                          onClick={onNavigate}
                          aria-current={active ? "page" : undefined}
                          className={`ml-[1.05rem] flex items-start gap-2 border-l-3 py-1.5 pr-2 pl-3 text-[0.9375rem] leading-snug transition-colors duration-120 ${
                            active
                              ? "border-[var(--accent)] bg-[var(--surface-2)] text-[var(--accent)]"
                              : "border-transparent text-[var(--text-muted)] hover:border-[var(--border-strong)] hover:bg-[var(--surface-1)] hover:text-[var(--text)]"
                          }`}
                        >
                          <span aria-hidden className="mt-px text-[0.8125rem] leading-relaxed">
                            {page.emoji}
                          </span>
                          <span className="flex-1">{page.title}</span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

function sectionOf(pathname: string): SectionSlug | undefined {
  if (pathname === "/") return "start";
  const match = /^\/learn\/([^/]+)/.exec(pathname);
  return SECTIONS.find((s) => s.slug === match?.[1])?.slug;
}
