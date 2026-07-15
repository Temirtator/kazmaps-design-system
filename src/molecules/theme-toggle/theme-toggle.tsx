"use client";

import { Moon, Sun } from "lucide-react";

import { cn } from "../../lib/cn";

export type Theme = "dark" | "light";

export type ThemeToggleProps = {
  theme: Theme;
  onToggle: (next: Theme) => void;
  className?: string;
  label?: string;
};

export function ThemeToggle({
  theme,
  onToggle,
  className,
  label = "Переключить тему",
}: ThemeToggleProps) {
  const next: Theme = theme === "dark" ? "light" : "dark";
  return (
    <button
      type="button"
      aria-label={label}
      onClick={() => onToggle(next)}
      className={cn(
        "inline-flex h-8 w-8 items-center justify-center rounded-[var(--radius-md)]",
        "text-[var(--muted)] transition-colors duration-[var(--dur-base)]",
        "ease-[var(--ease-standard)] hover:bg-[var(--bg-2)] hover:text-[var(--ink)]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)]",
        className,
      )}
    >
      {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  );
}
