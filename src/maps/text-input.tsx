"use client";

import type { InputHTMLAttributes, ReactNode } from "react";
import { useId } from "react";

export type TextInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "onChange" | "value"> & {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  error?: string | null;
  prefix?: ReactNode;
  trailing?: ReactNode;
  className?: string;
};

export function TextInput({
  value,
  onChange,
  label,
  error = null,
  prefix,
  trailing,
  className = "",
  ...rest
}: TextInputProps) {
  const id = useId();
  const errorId = `${id}-error`;

  return (
    <div className={className}>
      {label == null ? null : (
        <label
          htmlFor={id}
          className="mb-1.5 block text-[11.5px] font-semibold text-(color:--text-primary)"
        >
          {label}
        </label>
      )}
      <div
        className={`flex h-[47px] items-center overflow-hidden rounded-[8px] border bg-(--surface-panel) transition-surface focus-ring-within ${
          error === null ? "border-(--border-input)" : "border-(--danger)"
        }`}
      >
        {prefix == null ? null : (
          <span className="flex h-full shrink-0 items-center border-r border-(--border-input) px-2.5 text-[13.5px] text-(color:--text-tertiary)">
            {prefix}
          </span>
        )}
        <input
          id={id}
          value={value}
          onChange={(event) => {
            onChange(event.target.value);
          }}
          aria-invalid={error !== null}
          aria-describedby={error === null ? undefined : errorId}
          className="min-w-0 flex-1 bg-transparent px-3 text-[13.5px] text-(color:--text-primary) outline-none placeholder:text-(color:--text-tertiary)"
          {...rest}
        />
        {trailing == null ? null : <span className="shrink-0 pr-1.5">{trailing}</span>}
      </div>
      {error === null ? null : (
        <p id={errorId} className="mt-1.5 text-[12px] text-(color:--danger)">
          {error}
        </p>
      )}
    </div>
  );
}
