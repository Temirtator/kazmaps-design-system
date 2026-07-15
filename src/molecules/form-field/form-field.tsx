"use client";

import { type HTMLAttributes, type ReactNode, useId } from "react";

import { cn } from "../../lib/cn";

type FormFieldProps = Omit<HTMLAttributes<HTMLDivElement>, "children"> & {
  label?: string;
  hint?: string;
  errorMessage?: string;
  required?: boolean;
  htmlFor?: string;
  children: ReactNode | ((fieldId: string) => ReactNode);
};

function FormField({
  label,
  hint,
  errorMessage,
  required,
  htmlFor,
  children,
  className,
  ...rest
}: FormFieldProps) {
  const generatedId = useId();
  const isRenderProp = typeof children === "function";
  const fieldId = htmlFor ?? (isRenderProp ? generatedId : undefined);

  return (
    <div className={cn("flex flex-col gap-1", className)} {...rest}>
      {label && (
        <label
          htmlFor={fieldId}
          className="text-[length:var(--text-sm)] font-medium text-[var(--ink)]"
        >
          {label}
          {required && <span className="ml-0.5 text-[var(--danger)]">*</span>}
        </label>
      )}
      {isRenderProp ? (children as (id: string) => ReactNode)(generatedId) : children}
      {(hint ?? errorMessage) && (
        <div className="flex flex-col gap-0.5">
          {errorMessage && (
            <span className="text-[length:var(--text-xs)] text-[var(--danger)]">
              {errorMessage}
            </span>
          )}
          {hint && <span className="text-[length:var(--text-xs)] text-[var(--muted)]">{hint}</span>}
        </div>
      )}
    </div>
  );
}

export { FormField, type FormFieldProps };
