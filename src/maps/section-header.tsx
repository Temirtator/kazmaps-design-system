import type { ReactNode } from "react";

export function SectionHeader({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p
      className={`text-[11px] font-semibold tracking-[0.6px] text-(color:--text-tertiary) uppercase ${className}`}
    >
      {children}
    </p>
  );
}
