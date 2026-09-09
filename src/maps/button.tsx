import type { ComponentProps, ReactNode } from "react";

export type ButtonVariant = "outline" | "outline-accent" | "filled-accent";
export type ButtonSize = "sm" | "md" | "lg";

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  outline:
    "border border-(--border) bg-(--surface-panel) text-(color:--text-secondary) shadow-(--shadow-button-md) hover:bg-(--surface-raised) hover:text-(color:--text-primary)",
  "outline-accent":
    "border border-(--border) bg-(--surface-panel) text-(color:--accent) shadow-(--shadow-button-md) hover:bg-(--accent-soft-bg)",
  "filled-accent":
    "bg-(--accent) text-(color:--text-on-accent) hover:opacity-90 disabled:hover:opacity-50",
};

const SIZE_CLASSES: Record<ButtonSize, string> = {
  sm: "h-[34px] gap-1.5 px-3.5 text-[12.5px]",
  md: "h-10 gap-2 px-4 text-[13.5px]",
  lg: "h-11 gap-2 px-4 text-[13.5px]",
};

export function Button({
  children,
  variant = "outline",
  size = "md",
  fullWidth = false,
  className = "",
  ...rest
}: ComponentProps<"button"> & {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
}) {
  return (
    <button
      type="button"
      {...rest}
      className={`inline-flex items-center justify-center rounded-lg font-semibold whitespace-nowrap transition-interactive focus-ring active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-50 disabled:active:scale-100 ${SIZE_CLASSES[size]} ${VARIANT_CLASSES[variant]} ${fullWidth ? "w-full" : ""} ${className}`}
    >
      {children}
    </button>
  );
}
