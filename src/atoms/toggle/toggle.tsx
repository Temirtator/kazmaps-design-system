"use client";

import { useId } from "react";

import { cn } from "../../lib/cn";

export type ToggleProps = {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  label?: string;
  testId?: string;
};

export function Toggle({ checked, onChange, disabled, label, testId }: ToggleProps) {
  const id = useId();
  return (
    <div className={cn("inline-flex items-center gap-2", disabled && "opacity-50")}>
      <button
        id={id}
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        data-testid={testId}
        onClick={() => onChange(!checked)}
        className={cn(
          "relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full",
          "border border-[var(--line)]",
          "transition-[background-color] duration-[var(--dur-base)] ease-[var(--ease-standard)]",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)]",
          "focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)]",
          checked ? "bg-[var(--ink)]" : "bg-[var(--line-2)]",
          disabled && "pointer-events-none",
        )}
      >
        <span
          className={cn(
            "inline-block h-4 w-4 rounded-full bg-[var(--bg)] shadow-[var(--shadow-sm)]",
            "transition-transform duration-[var(--dur-base)] ease-[var(--ease-spring)]",
            checked ? "translate-x-4" : "translate-x-0.5",
          )}
        />
      </button>

      {label && (
        <label
          htmlFor={id}
          className={cn(
            "text-[length:var(--text-sm)] text-[var(--ink)]",
            disabled ? "cursor-not-allowed" : "cursor-pointer",
          )}
        >
          {label}
        </label>
      )}
    </div>
  );
}
