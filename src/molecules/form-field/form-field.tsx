"use client";

import { type HTMLAttributes, type ReactNode, useId } from "react";

import { cn } from "../../lib/cn";

type FormFieldRenderProps = {
  id: string;
  describedBy: string | undefined;
  invalid: boolean;
};

type FormFieldProps = Omit<HTMLAttributes<HTMLDivElement>, "children"> & {
  label?: string;
  hint?: string;
  errorMessage?: string;
  required?: boolean;
  htmlFor?: string;
  children: ReactNode | ((field: FormFieldRenderProps) => ReactNode);
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
  const fieldId = htmlFor ?? generatedId;
  const errorId = errorMessage ? `${fieldId}-error` : undefined;
  const hintId = hint ? `${fieldId}-hint` : undefined;
  const describedBy = [errorId, hintId].filter(Boolean).join(" ") || undefined;

  return (
    <div className={cn("flex flex-col gap-1", className)} {...rest}>
      {label && (
        <label
          htmlFor={isRenderProp || htmlFor ? fieldId : undefined}
          className="text-[length:var(--text-sm)] font-medium text-[var(--ink)]"
        >
          {label}
          {required && <span className="ml-0.5 text-[var(--danger)]">*</span>}
        </label>
      )}
      {isRenderProp
        ? (children as (field: FormFieldRenderProps) => ReactNode)({
            id: fieldId,
            describedBy,
            invalid: Boolean(errorMessage),
          })
        : children}
      {(hint ?? errorMessage) && (
        <div className="flex flex-col gap-0.5">
          {errorMessage && (
            <span id={errorId} className="text-[length:var(--text-xs)] text-[var(--danger)]">
              {errorMessage}
            </span>
          )}
          {hint && (
            <span id={hintId} className="text-[length:var(--text-xs)] text-[var(--muted)]">
              {hint}
            </span>
          )}
        </div>
      )}
    </div>
  );
}

export { FormField, type FormFieldProps, type FormFieldRenderProps };
