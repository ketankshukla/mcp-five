"use client";

import { useMemo, useState } from "react";
import {
  GOTCHAS,
  CATEGORIES,
  PROJECTS,
  type GotchaCategory,
} from "@/lib/gotchas";
import { GotchaCard } from "./GotchaCard";
import { Inline } from "./Inline";

/**
 * The compendium: all forty entries, filterable by project and by category.
 *
 * Every count on this page is derived from the data rather than typed, which
 * is the smallest possible tribute to project #4's measurement trap — a number
 * a human maintains beside a list a human edits will eventually disagree with
 * it.
 */
export function GotchaCompendium() {
  const [projects, setProjects] = useState<Set<number>>(new Set());
  const [categories, setCategories] = useState<Set<GotchaCategory>>(new Set());

  const visible = useMemo(
    () =>
      GOTCHAS.filter(
        (g) =>
          (projects.size === 0 || projects.has(g.project)) &&
          (categories.size === 0 || g.tags.some((t) => categories.has(t))),
      ),
    [projects, categories],
  );

  const projectCounts = useMemo(() => tally(GOTCHAS.map((g) => g.project)), []);
  const categoryCounts = useMemo(() => tally(GOTCHAS.flatMap((g) => g.tags)), []);

  const filtered = projects.size > 0 || categories.size > 0;

  return (
    <div className="not-prose breakout my-8">
      <div className="rounded-[var(--radius-card)] border border-[var(--border)] bg-[var(--surface-1)] p-5">
        <Row label="Project">
          {PROJECTS.map((p) => (
            <Chip
              key={p.n}
              active={projects.has(p.n)}
              count={projectCounts[p.n] ?? 0}
              onClick={() => setProjects(toggle(projects, p.n))}
            >
              <span aria-hidden>{p.emoji}</span> #{p.n} {p.name}
            </Chip>
          ))}
        </Row>

        <Row label="Category">
          {CATEGORIES.map((c) => (
            <Chip
              key={c.id}
              active={categories.has(c.id)}
              count={categoryCounts[c.id] ?? 0}
              onClick={() => setCategories(toggle(categories, c.id))}
            >
              <span aria-hidden>{c.emoji}</span> {c.label}
            </Chip>
          ))}
        </Row>

        <div
          aria-live="polite"
          className="mt-4 flex flex-wrap items-center gap-3 border-t border-[var(--border)] pt-3 text-[0.875rem] text-[var(--text-muted)]"
        >
          <span>
            Showing <strong className="text-[var(--accent)]">{visible.length}</strong> of{" "}
            {GOTCHAS.length}
          </span>
          {filtered && (
            <button
              type="button"
              onClick={() => {
                setProjects(new Set());
                setCategories(new Set());
              }}
              className="rounded-[var(--radius-pill)] border border-[var(--border-strong)] px-3 py-1 text-[0.8125rem] text-[var(--text)] hover:border-[var(--accent)] hover:text-[var(--accent)]"
            >
              clear filters
            </button>
          )}
        </div>
      </div>

      <div className="mt-4 space-y-3">
        {visible.map((g) => (
          <GotchaCard
            key={`${g.project}-${g.n}`}
            n={g.n}
            project={g.project}
            projectName={PROJECTS.find((p) => p.n === g.project)?.name ?? ""}
            title={g.title}
            symptom={<Inline text={g.symptom} />}
            cause={<Inline text={g.cause} />}
            fix={<Inline text={g.fix} />}
            lesson={g.lesson ? <Inline text={g.lesson} /> : undefined}
            tags={g.tags}
          />
        ))}

        {visible.length === 0 && (
          <p className="rounded-[var(--radius-card)] border border-dashed border-[var(--border-strong)] p-8 text-center text-[var(--text-muted)]">
            No gotcha matches both filters. Try clearing one.
          </p>
        )}
      </div>
    </div>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="mb-3 flex flex-wrap items-center gap-2 last:mb-0">
      <span className="mr-1 w-16 shrink-0 font-[family-name:var(--font-display)] text-[0.75rem] font-600 tracking-widest text-[var(--text-faint)] uppercase">
        {label}
      </span>
      {children}
    </div>
  );
}

function Chip({
  active,
  count,
  onClick,
  children,
}: {
  active: boolean;
  count: number;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`flex items-center gap-1.5 rounded-[var(--radius-pill)] border px-3 py-1 text-[0.8125rem] transition-colors duration-120 ${
        active
          ? "border-[var(--accent)] bg-[var(--surface-2)] text-[var(--accent)]"
          : "border-[var(--border)] text-[var(--text-muted)] hover:border-[var(--border-strong)] hover:text-[var(--text)]"
      }`}
    >
      {children}
      <span className="font-[family-name:var(--font-mono)] text-[0.6875rem] tabular-nums opacity-60">
        {count}
      </span>
    </button>
  );
}

function toggle<T>(set: Set<T>, value: T): Set<T> {
  const next = new Set(set);
  if (!next.delete(value)) next.add(value);
  return next;
}

function tally<T extends string | number>(values: T[]): Record<string, number> {
  return values.reduce<Record<string, number>>((acc, v) => {
    acc[String(v)] = (acc[String(v)] ?? 0) + 1;
    return acc;
  }, {});
}
