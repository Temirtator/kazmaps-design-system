"use client";

import { forwardRef, type TextareaHTMLAttributes, useId, useState } from "react";

import { cn } from "../../lib/cn";

export type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string;
  hint?: string;
  error?: string;
  required?: boolean;
  invalid?: boolean;
  maxLength?: number;
};

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  {
    label,
    hint,
    error,
    required,
    invalid = false,
    maxLength,
    className,
    onChange,
    id: idProp,
    ...rest
  },
  ref,
) {
  const generatedId = useId();
  const id = idProp ?? generatedId;
  const descId = `${id}-desc`;

  const initialLength =
    typeof rest.defaultValue === "string"
      ? rest.defaultValue.length
      : typeof rest.defaultValue === "number"
        ? String(rest.defaultValue).length
        : 0;

  const [length, setLength] = useState(initialLength);

  const hasError = Boolean(error) || invalid;
  const hasDesc = Boolean(error ?? hint);
  const nearLimit = maxLength !== undefined && length >= Math.floor(maxLength * 0.9);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setLength(e.target.value.length);
    onChange?.(e);
  };

  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label htmlFor={id} className="text-[length:var(--text-sm)] font-medium text-[var(--ink)]">
          {label}
          {required && (
            <span className="ml-0.5 text-[var(--danger)]" aria-hidden="true">
              *
            </span>
          )}
        </label>
      )}

      <div
        className={cn(
          "relative rounded-[var(--radius-md)] border bg-[var(--card)]",
          "transition-[border-color,box-shadow] duration-[var(--dur-base)] ease-[var(--ease-standard)]",
          hasError
            ? [
                "border-[var(--danger)]",
                "focus-within:ring-2 focus-within:ring-[var(--danger)] focus-within:border-transparent",
              ]
            : [
                "border-[var(--line)]",
                "focus-within:ring-2 focus-within:ring-[var(--brand)] focus-within:border-transparent",
              ],
        )}
      >
        <textarea
          ref={ref}
          id={id}
          required={required}
          maxLength={maxLength}
          aria-describedby={hasDesc ? descId : undefined}
          aria-invalid={hasError || undefined}
          onChange={handleChange}
          className={cn(
            "w-full min-h-[80px] resize-y bg-transparent p-3",
            "text-[length:var(--text-sm)] text-[var(--ink)] placeholder:text-[var(--muted)]",
            "outline-none disabled:cursor-not-allowed disabled:opacity-50",
            maxLength !== undefined && "pb-6",
            className,
          )}
          {...rest}
        />

        {maxLength !== undefined && (
          <span
            className={cn(
              "pointer-events-none absolute bottom-2 right-3 text-[length:var(--text-xs)]",
              nearLimit ? "text-[var(--danger)]" : "text-[var(--muted)]",
            )}
          >
            {length}/{maxLength}
          </span>
        )}
      </div>

      {hasDesc && (
        <p
          id={descId}
          className={cn(
            "text-[length:var(--text-xs)]",
            Boolean(error) ? "text-[var(--danger)]" : "text-[var(--muted)]",
          )}
        >
          {error ?? hint}
        </p>
      )}
    </div>
  );
});

Textarea.displayName = "Textarea";
