"use client";

import { cn } from "../../lib/cn";

export type ChipPillProps = {
  label: string;
  selected?: boolean;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
};

export function ChipPill({
  label,
  selected = false,
  onClick,
  disabled = false,
  className,
}: ChipPillProps) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5",
        "text-[length:var(--text-xs)] font-medium",
        "transition-colors duration-[var(--dur-base)] ease-[var(--ease-standard)]",
        selected
          ? "border-[var(--ink)] bg-[var(--ink)] text-[var(--bg)]"
          : "border-[var(--line)] bg-transparent text-[var(--muted)] hover:border-[var(--line-2)] hover:text-[var(--ink)]",
        disabled && "cursor-not-allowed opacity-40",
        className,
      )}
    >
      {label}
    </button>
  );
}
