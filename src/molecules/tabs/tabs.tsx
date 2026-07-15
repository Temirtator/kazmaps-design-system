"use client";

import type { ReactNode } from "react";

import { cn } from "../../lib/cn";

export type TabItem = {
  key: string;
  label: string;
  icon?: ReactNode;
  disabled?: boolean;
};

export type TabsProps = {
  items: TabItem[];
  value: string;
  onChange: (key: string) => void;
  ariaLabel?: string;
  className?: string;
};

export function Tabs({ items, value, onChange, ariaLabel = "Вкладки", className }: TabsProps) {
  return (
    <nav className={cn("flex border-b border-[var(--line)]", className)} aria-label={ariaLabel}>
      {items.map((item) => {
        const active = item.key === value;
        return (
          <button
            key={item.key}
            type="button"
            disabled={item.disabled}
            onClick={() => onChange(item.key)}
            aria-current={active ? "page" : undefined}
            className={cn(
              "-mb-px inline-flex items-center gap-1.5 border-b-2 px-3 py-2",
              "text-[length:var(--text-sm)] font-medium",
              "transition-colors duration-[var(--dur-base)] ease-[var(--ease-standard)]",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)]",
              active
                ? "border-[var(--brand)] text-[var(--ink)]"
                : "border-transparent text-[var(--muted)] hover:text-[var(--ink)]",
              item.disabled && "pointer-events-none opacity-50",
            )}
          >
            {item.icon}
            {item.label}
          </button>
        );
      })}
    </nav>
  );
}
