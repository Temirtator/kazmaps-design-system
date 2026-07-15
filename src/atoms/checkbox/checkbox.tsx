"use client";

import { Check } from "lucide-react";
import { forwardRef, type InputHTMLAttributes, type ReactNode } from "react";

import { cn } from "../../lib/cn";

export type CheckboxProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "size"> & {
  label?: ReactNode;
};

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
  { label, className, disabled, ...rest },
  ref,
) {
  return (
    <label
      className={cn(
        "inline-flex cursor-pointer items-center gap-2",
        disabled && "cursor-not-allowed opacity-50",
      )}
    >
      {/* group on the wrapper lets descendants react to :checked via group-has-[:checked] */}
      <span className="group relative flex h-4 w-4 shrink-0 items-center justify-center">
        <input
          ref={ref}
          type="checkbox"
          disabled={disabled}
          className={cn(
            "peer absolute inset-0 cursor-pointer appearance-none opacity-0",
            disabled && "cursor-not-allowed",
            className,
          )}
          {...rest}
        />

        {/* Custom box — sibling of peer, so peer-* classes work here */}
        <span
          className={cn(
            "pointer-events-none flex h-4 w-4 items-center justify-center",
            "rounded-[var(--radius-sm)] border border-[var(--line)] bg-[var(--card)]",
            "transition-[background-color,border-color] duration-[var(--dur-base)] ease-[var(--ease-standard)]",
            "peer-checked:border-[var(--ink)] peer-checked:bg-[var(--ink)]",
            "peer-focus-visible:ring-2 peer-focus-visible:ring-[var(--brand)] peer-focus-visible:ring-offset-2",
          )}
        >
          {/* group-has-[:checked] reaches the checked input as a descendant of .group */}
          <Check
            size={11}
            strokeWidth={3}
            className="hidden text-white group-has-[:checked]:block"
          />
        </span>
      </span>

      {label && <span className="text-[length:var(--text-sm)] text-[var(--ink)]">{label}</span>}
    </label>
  );
});

Checkbox.displayName = "Checkbox";
