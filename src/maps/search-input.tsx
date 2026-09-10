import { Search } from "lucide-react";
import type { InputHTMLAttributes, ReactNode } from "react";

export type SearchInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "onChange" | "value"> & {
  value: string;
  onChange: (value: string) => void;
  onSubmit?: () => void;
  submitLabel?: string;
  compact?: boolean;
  suffix?: ReactNode;
  className?: string;
};

export function SearchInput({
  value,
  onChange,
  onSubmit,
  submitLabel = "Искать",
  compact = false,
  suffix,
  placeholder,
  className = "",
  ...rest
}: SearchInputProps) {
  return (
    <div
      className={`flex items-center overflow-hidden border border-(--border-input) bg-(--surface-panel) transition-surface focus-ring-within ${
        compact ? "h-[42px] rounded-lg" : "h-11 rounded-[9px]"
      } ${className}`}
    >
      <Search size={16} className="ml-3 shrink-0 text-(color:--text-tertiary)" aria-hidden="true" />
      <input
        type="search"
        value={value}
        onChange={(event) => {
          onChange(event.target.value);
        }}
        placeholder={placeholder}
        className="min-w-0 flex-1 bg-transparent px-2.5 text-[13.5px] text-(color:--text-primary) outline-none placeholder:text-(color:--text-tertiary)"
        {...rest}
      />
      {suffix}
      {onSubmit === undefined ? null : (
        <button
          type="button"
          aria-label={submitLabel}
          title={submitLabel}
          onClick={onSubmit}
          className="flex h-full w-[46px] shrink-0 items-center justify-center bg-(--accent) text-(color:--text-on-accent) transition-interactive focus-ring hover:opacity-90 active:scale-[0.97]"
        >
          <Search size={16} aria-hidden="true" />
        </button>
      )}
    </div>
  );
}
