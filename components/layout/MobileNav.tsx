"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { NavTree } from "./NavTree";

const FOCUSABLE =
  'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])';

/**
 * The topbar and its slide-over drawer, below 1024px.
 *
 * The drawer traps focus, closes on Escape, and returns focus to the ☰ button
 * that opened it — otherwise a keyboard user who closes it is dropped at the
 * top of the document with no idea where they are.
 */
export function MobileNav() {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const close = useCallback(() => setOpen(false), []);

  // Lock the page behind the drawer, and hand focus to the panel.
  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panelRef.current?.focus();

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        setOpen(false);
        return;
      }

      if (event.key !== "Tab") return;

      const panel = panelRef.current;
      if (!panel) return;

      const items = Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
        (el) => el.offsetParent !== null,
      );
      if (items.length === 0) return;

      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement;

      // Wrap in both directions, so Tab can never escape into the page behind.
      if (event.shiftKey && (active === first || active === panel)) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  // Returning focus is a separate effect so it runs on close, not on open.
  const wasOpen = useRef(false);
  useEffect(() => {
    if (wasOpen.current && !open) buttonRef.current?.focus();
    wasOpen.current = open;
  }, [open]);

  return (
    <>
      <header className="sticky top-0 z-40 flex items-center gap-3 border-b border-[var(--border)] bg-[var(--bg)]/92 px-4 py-3 backdrop-blur-md lg:hidden">
        <button
          ref={buttonRef}
          type="button"
          onClick={() => setOpen(true)}
          aria-expanded={open}
          aria-haspopup="dialog"
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--surface-1)] text-[var(--text)]"
        >
          <span aria-hidden className="text-lg leading-none">
            ☰
          </span>
          <span className="sr-only">Open the course menu</span>
        </button>

        <Link href="/" className="flex items-baseline gap-2 no-underline">
          <span aria-hidden>🍪</span>
          <span className="font-[family-name:var(--font-display)] text-lg font-700 tracking-tight text-[var(--text)]">
            MCP Five
          </span>
        </Link>
      </header>

      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            tabIndex={-1}
            aria-hidden
            onClick={close}
            className="absolute inset-0 h-full w-full cursor-default bg-black/70 backdrop-blur-sm"
          />
          <div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Course menu"
            tabIndex={-1}
            className="anim-fade absolute inset-y-0 left-0 flex w-[min(21rem,88vw)] flex-col border-r border-[var(--border)] bg-[var(--surface-1)] shadow-2xl outline-none"
          >
            <div className="flex items-center justify-between border-b border-[var(--border)] px-5 py-4">
              <span className="font-[family-name:var(--font-display)] text-lg font-700 tracking-tight">
                🍪 MCP Five
              </span>
              <button
                type="button"
                onClick={close}
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--border)] text-[var(--text-muted)]"
              >
                <span aria-hidden className="leading-none">
                  ✕
                </span>
                <span className="sr-only">Close the course menu</span>
              </button>
            </div>

            <div className="thin-scroll flex-1 overflow-y-auto px-3 py-4">
              <NavTree onNavigate={close} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
