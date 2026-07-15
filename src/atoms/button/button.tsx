"use client";

import { type ButtonHTMLAttributes, forwardRef, type ReactNode } from "react";

import { cn } from "../../lib/cn";
import { Spinner } from "../spinner";

export type ButtonVariant =
  | "primary"
  | "brand"
  | "secondary"
  | "outline"
  | "ghost"
  | "danger"
  | "warning"
  | "dark"
  | "cta"
  | "gold"
  | "link";
export type ButtonSize = "xs" | "sm" | "md" | "lg";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  fullWidth?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  iconOnly?: boolean;
};

const VARIANTS: Record<ButtonVariant, string> = {
  primary: "bg-[var(--ink)] text-[var(--bg)] hover:opacity-90 active:opacity-80",
  brand:
    "bg-[var(--brand)] text-white hover:bg-[var(--brand-press)] active:bg-[var(--brand-press)]",
  secondary:
    "bg-[var(--card)] text-[var(--ink)] border border-[var(--line)] hover:bg-[var(--bg-2)]",
  outline: "bg-transparent text-[var(--ink)] border border-[var(--line)] hover:bg-[var(--bg-2)]",
  ghost: "bg-transparent text-[var(--ink-2)] hover:bg-[var(--bg-2)] hover:text-[var(--ink)]",
  danger: "bg-[var(--danger-soft)] text-[var(--danger)] hover:opacity-90",
  warning: "bg-[var(--warn-soft)] text-[var(--warn)] hover:opacity-90",
  dark: "bg-[#23252a] text-[#f7f8f8] border border-[var(--line-2)] hover:bg-[#2c2f36]",
  cta: "bg-[var(--ink)] text-[var(--bg)] shadow-[var(--shadow-md)] hover:opacity-90",
  gold: "bg-[var(--gold-soft)] text-[var(--gold)] hover:opacity-90",
  link: "bg-transparent text-[var(--brand)] hover:underline px-0",
};

const SIZES: Record<ButtonSize, string> = {
  xs: "h-7 px-2.5 text-[length:var(--text-xs)] gap-1 rounded-[var(--radius-sm)]",
  sm: "h-8 px-3 text-[length:var(--text-sm)] gap-1.5 rounded-[var(--radius-md)]",
  md: "h-9 px-4 text-[length:var(--text-sm)] gap-2 rounded-[var(--radius-md)]",
  lg: "h-11 px-5 text-[length:var(--text-base)] gap-2 rounded-[var(--radius-lg)]",
};

const ICON_ONLY: Record<ButtonSize, string> = {
  xs: "w-7 px-0",
  sm: "w-8 px-0",
  md: "w-9 px-0",
  lg: "w-11 px-0",
};

const SPINNER_SIZE: Record<ButtonSize, "sm" | "md" | "lg"> = {
  xs: "sm",
  sm: "sm",
  md: "sm",
  lg: "md",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    variant = "primary",
    size = "md",
    loading = false,
    fullWidth = false,
    leftIcon,
    rightIcon,
    iconOnly = false,
    className,
    children,
    disabled,
    ...rest
  },
  ref,
) {
  return (
    <button
      ref={ref}
      // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing -- `disabled={false}` with `loading` must still disable; `??` would change behavior
      disabled={disabled || loading}
      className={cn(
        "inline-flex items-center justify-center font-medium whitespace-nowrap select-none",
        "transition-[background-color,color,box-shadow,transform] duration-[var(--dur-base)]",
        "ease-[var(--ease-standard)] motion-safe:active:scale-[0.97]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)]",
        "focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)]",
        "disabled:pointer-events-none disabled:opacity-50",
        SIZES[size],
        iconOnly && ICON_ONLY[size],
        VARIANTS[variant],
        fullWidth && "w-full",
        className,
      )}
      {...rest}
    >
      {loading ? (
        <Spinner size={SPINNER_SIZE[size]} />
      ) : (
        <>
          {leftIcon}
          {children}
          {rightIcon}
        </>
      )}
    </button>
  );
});
