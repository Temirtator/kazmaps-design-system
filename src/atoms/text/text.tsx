"use client";

import type { HTMLAttributes, ReactNode } from "react";

import { cn } from "../../lib/cn";

export type TextSize = "sm" | "base" | "lg";
export type TextColor = "default" | "muted" | "error" | "success";
export type TextWeight = "normal" | "medium" | "semibold";

export type TextProps = HTMLAttributes<HTMLParagraphElement> & {
  as?: "p" | "span" | "div";
  size?: TextSize;
  color?: TextColor;
  weight?: TextWeight;
  children: ReactNode;
};

const SIZE: Record<TextSize, string> = {
  sm: "text-[length:var(--text-sm)]",
  base: "text-[length:var(--text-base)]",
  lg: "text-[length:var(--text-lg)]",
};
const COLOR: Record<TextColor, string> = {
  default: "text-[var(--ink)]",
  muted: "text-[var(--muted)]",
  error: "text-[var(--danger)]",
  success: "text-[var(--success)]",
};
const WEIGHT: Record<TextWeight, string> = {
  normal: "font-normal",
  medium: "font-medium",
  semibold: "font-semibold",
};

export function Text({
  as: Tag = "p",
  size = "base",
  color = "default",
  weight = "normal",
  className,
  children,
  ...rest
}: TextProps) {
  return (
    <Tag className={cn(SIZE[size], COLOR[color], WEIGHT[weight], className)} {...rest}>
      {children}
    </Tag>
  );
}
