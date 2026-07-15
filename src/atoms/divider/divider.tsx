"use client";

import type { HTMLAttributes } from "react";

import { cn } from "../../lib/cn";

export type DividerProps = HTMLAttributes<HTMLHRElement> & {
  label?: string;
};

export function Divider({ label, className, ...rest }: DividerProps) {
  if (label) {
    return (
      <div {...rest} className={cn("flex items-center gap-3", className)} role="separator">
        <span className="h-px flex-1 bg-[var(--line)]" />
        <span className="text-[length:var(--text-xs)] whitespace-nowrap text-[var(--muted)]">
          {label}
        </span>
        <span className="h-px flex-1 bg-[var(--line)]" />
      </div>
    );
  }
  return <hr className={cn("border-0 border-t border-[var(--line)]", className)} {...rest} />;
}
