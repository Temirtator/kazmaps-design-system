import type { ComponentProps, ReactNode } from "react";

export type IconButtonSize = "sm" | "md" | "lg";

const SIZE_CLASSES: Record<IconButtonSize, string> = {
  sm: "size-[34px] rounded-[7px] hover:shadow-(--shadow-button-sm)",
  md: "size-[38px] rounded-lg shadow-(--shadow-button-sm) hover:shadow-(--shadow-button-md)",
  lg: "size-10 rounded-lg shadow-(--shadow-button-md)",
};

export function IconButton({
  children,
  label,
  size = "lg",
  active = false,
  className = "",
  ...rest
}: ComponentProps<"button"> & {
  children: ReactNode;
  label: string;
  size?: IconButtonSize;
  active?: boolean;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      {...rest}
      className={`flex items-center justify-center border transition-interactive focus-ring active:scale-[0.97] ${
        active
          ? "border-(--accent) bg-(--accent) text-(color:--text-on-accent) hover:bg-(--accent) hover:text-(color:--text-on-accent)"
          : "border-(--border) bg-(--surface-panel) text-(color:--text-secondary) hover:bg-(--surface-raised) hover:text-(color:--text-primary)"
      } ${SIZE_CLASSES[size]} ${className}`}
    >
      {children}
    </button>
  );
}
