"use client";

import { type HTMLAttributes } from "react";

import { cn } from "../../lib/cn";

type BadgeVariant =
  | "default"
  | "neutral"
  | "primary"
  | "secondary"
  | "brand"
  | "success"
  | "warning"
  | "error"
  | "info";

type BadgeSize = "sm" | "md" | "lg";

type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  variant?: BadgeVariant;
  size?: BadgeSize;
  dot?: boolean;
};

const VARIANT_CLASSES: Record<BadgeVariant, string> = {
  default: "bg-[var(--bg-2)] text-[var(--muted)]",
  neutral: "bg-[var(--bg-2)] text-[var(--muted)]",
  primary: "bg-[var(--bg-2)] text-[var(--ink)]",
  secondary: "border border-[var(--line)] bg-[var(--card)] text-[var(--ink-2)]",
  brand: "bg-[var(--brand-50)] text-[var(--brand-700)]",
  success: "bg-[var(--success-soft)] text-[var(--success)]",
  warning: "bg-[var(--warn-soft)] text-[var(--warn)]",
  error: "bg-[var(--danger-soft)] text-[var(--danger)]",
  info: "bg-[var(--info-soft)] text-[var(--info)]",
};

const SIZE_CLASSES: Record<BadgeSize, string> = {
  sm: "px-1.5 py-0.5 text-[10px]",
  md: "px-2 py-0.5 text-[length:var(--text-xs)]",
  lg: "px-2.5 py-1 text-[length:var(--text-sm)]",
};

function Badge({
  variant = "default",
  size = "md",
  dot,
  children,
  className,
  ...rest
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full font-medium",
        VARIANT_CLASSES[variant],
        SIZE_CLASSES[size],
        className,
      )}
      {...rest}
    >
      {dot && <span className="h-1.5 w-1.5 rounded-full bg-current" />}
      {children}
    </span>
  );
}

export { Badge, type BadgeProps, type BadgeSize, type BadgeVariant };
