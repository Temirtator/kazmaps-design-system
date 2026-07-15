"use client";

import type { HTMLAttributes, ReactNode } from "react";

import { cn } from "../../lib/cn";

export type HeadingLevel = "h1" | "h2" | "h3" | "h4";
export type HeadingSize = "sm" | "md" | "lg" | "xl";

export type HeadingProps = HTMLAttributes<HTMLHeadingElement> & {
  as?: HeadingLevel;
  size?: HeadingSize;
  children: ReactNode;
};

const SIZE: Record<HeadingSize, string> = {
  sm: "text-[length:var(--text-base)] tracking-[-0.014em]",
  md: "text-[length:var(--text-lg)] tracking-[-0.018em]",
  lg: "text-[length:var(--text-2xl)] tracking-[-0.02em]",
  xl: "text-[length:var(--text-3xl)] tracking-[-0.022em]",
};

export function Heading({
  as: Tag = "h2",
  size = "lg",
  className,
  children,
  ...rest
}: HeadingProps) {
  return (
    <Tag className={cn("font-semibold text-[var(--ink)]", SIZE[size], className)} {...rest}>
      {children}
    </Tag>
  );
}
