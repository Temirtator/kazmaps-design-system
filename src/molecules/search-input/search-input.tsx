"use client";

import { Search } from "lucide-react";
import { type InputHTMLAttributes } from "react";

import { cn } from "../../lib/cn";

export type SearchInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "onChange" | "value"> & {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  shortcut?: string;
};

export function SearchInput({
  value,
  onChange,
  placeholder = "Поиск…",
  shortcut,
  className,
  ...rest
}: SearchInputProps) {
  return (
    <div
      className={cn(
        "flex h-8 items-center gap-2 rounded-[var(--radius-md)] border border-[var(--line)]",
        "bg-[var(--card)] px-2.5",
        "transition-[border-color,box-shadow] duration-[var(--dur-base)] ease-[var(--ease-standard)]",
        "focus-within:border-transparent focus-within:ring-2 focus-within:ring-[var(--brand)]",
        className,
      )}
    >
      <Search size={14} className="shrink-0 text-[var(--muted)]" aria-hidden="true" />

      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={cn(
          "flex-1 bg-transparent text-[length:var(--text-sm)] text-[var(--ink)]",
          "outline-none placeholder:text-[var(--muted)]",
          "disabled:cursor-not-allowed disabled:opacity-50",
        )}
        {...rest}
      />

      {shortcut && (
        <kbd
          className={cn(
            "pointer-events-none shrink-0 rounded border border-[var(--line)]",
            "bg-[var(--bg-2)] px-1 py-0.5 text-[10px] font-medium text-[var(--muted)]",
          )}
        >
          {shortcut}
        </kbd>
      )}
    </div>
  );
}
