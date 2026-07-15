"use client";

import { cn } from "../../lib/cn";

type ChipProps = {
  label: string;
  active?: boolean;
  onToggle?: (active: boolean) => void;
  disabled?: boolean;
  testId?: string;
};

function Chip({ label, active = false, onToggle, disabled = false, testId }: ChipProps) {
  return (
    <button
      type="button"
      data-testid={testId}
      disabled={disabled}
      onClick={() => onToggle?.(!active)}
      className={cn(
        "rounded-full px-3 py-1 text-[length:var(--text-sm)]",
        "transition-[background-color,color,border-color] duration-[var(--dur-base)] ease-[var(--ease-standard)]",
        "active:scale-[0.97]",
        active
          ? "border border-[var(--line-2)] bg-[var(--bg-2)] text-[var(--ink)]"
          : "border border-[var(--line)] bg-transparent text-[var(--muted)] hover:border-[var(--line-2)] hover:text-[var(--ink)]",
        disabled && "pointer-events-none opacity-50",
      )}
    >
      {label}
    </button>
  );
}

export { Chip, type ChipProps };
