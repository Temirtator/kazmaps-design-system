"use client";

import { type ReactNode, useRef } from "react";

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
  const refs = useRef<Map<string, HTMLButtonElement>>(new Map());
  const enabled = items.filter((i) => !i.disabled);
  const tabbableKey = enabled.some((i) => i.key === value) ? value : enabled[0]?.key;

  function activate(item: TabItem | undefined) {
    if (!item) return;
    onChange(item.key);
    refs.current.get(item.key)?.focus();
  }

  function move(fromKey: string, dir: 1 | -1) {
    const idx = enabled.findIndex((i) => i.key === fromKey);
    if (idx === -1) return;
    activate(enabled[(idx + dir + enabled.length) % enabled.length]);
  }

  return (
    <div
      role="tablist"
      aria-label={ariaLabel}
      className={cn("flex border-b border-[var(--line)]", className)}
    >
      {items.map((item) => {
        const active = item.key === value;
        return (
          <button
            key={item.key}
            ref={(el) => {
              if (el) refs.current.set(item.key, el);
              else refs.current.delete(item.key);
            }}
            type="button"
            role="tab"
            aria-selected={active}
            tabIndex={item.key === tabbableKey ? 0 : -1}
            disabled={item.disabled}
            onClick={() => onChange(item.key)}
            onKeyDown={(e) => {
              if (e.key === "ArrowRight") {
                e.preventDefault();
                move(item.key, 1);
              } else if (e.key === "ArrowLeft") {
                e.preventDefault();
                move(item.key, -1);
              } else if (e.key === "Home") {
                e.preventDefault();
                activate(enabled[0]);
              } else if (e.key === "End") {
                e.preventDefault();
                activate(enabled[enabled.length - 1]);
              }
            }}
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
    </div>
  );
}
