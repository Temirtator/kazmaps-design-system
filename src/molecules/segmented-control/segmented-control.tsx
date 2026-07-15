"use client";

import { cn } from "../../lib/cn";

export type SegmentedControlProps = {
  options: { value: string; label: string }[];
  value: string;
  onChange: (value: string) => void;
  testId?: string;
};

export function SegmentedControl({ options, value, onChange, testId }: SegmentedControlProps) {
  return (
    <div
      data-testid={testId}
      className="inline-flex items-center gap-0.5 rounded-full bg-[var(--bg-2)] p-0.5"
    >
      {options.map((option) => {
        const isActive = option.value === value;
        return (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            className={cn(
              "rounded-full px-3 py-1 text-[length:var(--text-sm)]",
              "transition-[background-color,color,box-shadow] duration-[var(--dur-base)] ease-[var(--ease-standard)]",
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
