"use client";

import type { HTMLAttributes } from "react";

import { cn } from "../../lib/cn";

export type SpinnerSize = "sm" | "md" | "lg";
export type SpinnerVariant = "ring" | "dots";

export type SpinnerProps = HTMLAttributes<HTMLSpanElement> & {
  size?: SpinnerSize;
  variant?: SpinnerVariant;
  label?: string;
};

const RING: Record<SpinnerSize, string> = {
  sm: "h-4 w-4 border-2",
  md: "h-5 w-5 border-2",
  lg: "h-7 w-7 border-[3px]",
};

const DOT: Record<SpinnerSize, string> = {
  sm: "h-1 w-1",
  md: "h-1.5 w-1.5",
  lg: "h-2 w-2",
};

export function Spinner({
  size = "md",
  variant = "ring",
  label,
  className,
  ...rest
}: SpinnerProps) {
  if (variant === "dots") {
    return (
      <span
        role="status"
        aria-label={label ?? "Загрузка"}
        className={cn("inline-flex items-center gap-1", className)}
        {...rest}
      >
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className={cn("animate-pulse rounded-full bg-current", DOT[size])}
            style={{ animationDelay: `${i * 0.15}s` }}
          />
        ))}
      </span>
    );
  }
  return (
    <span
      role="status"
      aria-label={label ?? "Загрузка"}
      className={cn(
        "inline-block animate-spin rounded-full border-current border-t-transparent",
        RING[size],
        className,
      )}
      {...rest}
    />
  );
}
