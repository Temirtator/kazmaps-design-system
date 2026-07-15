"use client";

import { type HTMLAttributes, type ReactNode } from "react";

import { cn } from "../../lib/cn";

export type CaptionProps = HTMLAttributes<HTMLSpanElement> & { children: ReactNode };

export function Caption({ children, className, ...rest }: CaptionProps) {
  return (
    <span
      className={cn(
        "text-[length:var(--text-xs)] font-medium uppercase tracking-wider text-[var(--muted-2)]",
        className,
      )}
      {...rest}
    >
      {children}
    </span>
  );
}
