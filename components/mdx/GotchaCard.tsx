import type { ReactNode } from "react";

export type GotchaCategory =
  | "protocol"
  | "cost"
  | "measurement"
  | "persistence"
  | "tooling"
  | "deployment";

/**
 * One entry in the compendium.
 *
 * Collapsed it shows only the symptom — which is how you actually meet a bug,
 * and therefore how you would search for one. Everything else is behind a
 * <details>, so expanding needs no JavaScript and is keyboard-operable for
 * free.
 */
export function GotchaCard({
  n,
  project,
  projectName,
  title,
  symptom,
  cause,
  fix,
  lesson,
  tags = [],
}: {
  n: number;
  project: 1 | 2 | 3 | 4 | 5;
  projectName: string;
  title: string;
  symptom: ReactNode;
  cause: ReactNode;
  fix: ReactNode;
  lesson?: ReactNode;
  tags?: GotchaCategory[];
}) {
  return (
    <details className="not-prose group rounded-[var(--radius-card)] border border-[var(--border)] bg-[var(--surface-1)] open:border-[var(--accent)]">
      <summary className="flex cursor-pointer list-none items-start gap-3 p-5 [&::-webkit-details-marker]:hidden">
        <span
          aria-hidden
          className="mt-0.5 font-[family-name:var(--font-mono)] text-[0.75rem] text-[var(--text-faint)] tabular-nums"
        >
          {String(n).padStart(2, "0")}
        </span>

        <span className="min-w-0 flex-1">
          <span className="block font-[family-name:var(--font-display)] text-[1.125rem] leading-snug font-600 text-[var(--text)]">
            {title}
          </span>
          <span className="mt-1.5 block text-[0.9375rem] leading-snug text-[var(--text-muted)]">
            {symptom}
          </span>
          <span className="mt-2.5 flex flex-wrap items-center gap-1.5">
            <Chip tone="accent">
              #{project} {projectName}
            </Chip>
            {tags.map((tag) => (
              <Chip key={tag}>{tag}</Chip>
            ))}
          </span>
        </span>

        <span
          aria-hidden
          className="mt-1 text-[0.75rem] text-[var(--text-faint)] transition-transform duration-120 group-open:rotate-90"
        >
          ▶
        </span>
      </summary>

      <div className="space-y-4 border-t border-[var(--border)] px-5 py-5 pl-[3.25rem]">
        <Field label="What was actually wrong">{cause}</Field>
        <Field label="The fix">{fix}</Field>
        {lesson ? (
          <div className="rounded-[10px] border-l-3 border-[var(--accent)] bg-[var(--surface-2)] px-4 py-3">
            <p className="mb-1 font-[family-name:var(--font-display)] text-[0.75rem] font-600 tracking-widest text-[var(--accent)] uppercase">
              💡 The transferable bit
            </p>
            <div className="text-[1rem] leading-relaxed text-[var(--text)]">{lesson}</div>
          </div>
        ) : null}
      </div>
    </details>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <p className="mb-1 font-[family-name:var(--font-display)] text-[0.75rem] font-600 tracking-widest text-[var(--text-faint)] uppercase">
        {label}
      </p>
      {/* Inline code inside here is styled by the one global rule in
          prose.css, not by a second set of overrides that could drift. */}
      <div className="text-[1rem] leading-relaxed text-[var(--text-muted)]">{children}</div>
    </div>
  );
}

function Chip({
  children,
  tone,
}: {
  children: ReactNode;
  tone?: "accent";
}) {
  return (
    <span
      className={`rounded-[var(--radius-pill)] border px-2 py-0.5 text-[0.6875rem] tracking-wide ${
        tone === "accent"
          ? "border-[var(--accent)] text-[var(--accent)]"
          : "border-[var(--border-strong)] text-[var(--text-faint)]"
      }`}
    >
      {children}
    </span>
  );
}
