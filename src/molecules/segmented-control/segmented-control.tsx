"use client";

import { useRef } from "react";

import { cn } from "../../lib/cn";

export type SegmentedControlProps = {
  options: { value: string; label: string }[];
  value: string;
  onChange: (value: string) => void;
  ariaLabel?: string;
  testId?: string;
};

export function SegmentedControl({
  options,
  value,
  onChange,
  ariaLabel = "Переключатель",
  testId,
}: SegmentedControlProps) {
  const refs = useRef<Map<string, HTMLButtonElement>>(new Map());
  const tabbableValue = options.some((o) => o.value === value) ? value : options[0]?.value;

  function move(fromValue: string, dir: 1 | -1) {
    const idx = options.findIndex((o) => o.value === fromValue);
    if (idx === -1) return;
    const next = options[(idx + dir + options.length) % options.length];
    if (!next) return;
    onChange(next.value);
    refs.current.get(next.value)?.focus();
  }

  return (
    <div
      role="radiogroup"
      aria-label={ariaLabel}
      data-testid={testId}
      className="inline-flex items-center gap-0.5 rounded-full bg-[var(--bg-2)] p-0.5"
    >
      {options.map((option) => {
        const isActive = option.value === value;
        return (
          <button
            key={option.value}
            ref={(el) => {
              if (el) refs.current.set(option.value, el);
              else refs.current.delete(option.value);
            }}
            type="button"
            role="radio"
            aria-checked={isActive}
            tabIndex={option.value === tabbableValue ? 0 : -1}
            onClick={() => onChange(option.value)}
            onKeyDown={(e) => {
              if (e.key === "ArrowRight" || e.key === "ArrowDown") {
                e.preventDefault();
                move(option.value, 1);
              } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
                e.preventDefault();
                move(option.value, -1);
              }
            }}
            className={cn(
              "rounded-full px-3 py-1 text-[length:var(--text-sm)]",
              "transition-[background-color,color,box-shadow] duration-[var(--dur-base)] ease-[var(--ease-standard)]",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)]",
              isActive
                ? "bg-[var(--card)] font-medium text-[var(--ink)] shadow-[var(--shadow-sm)]"
                : "font-normal text-[var(--muted)] hover:text-[var(--ink)]",
            )}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
