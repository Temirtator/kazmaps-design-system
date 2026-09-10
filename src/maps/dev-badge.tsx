import type { ReactNode } from "react";

export interface InDevelopmentProps {
  children: ReactNode;
  label?: string;
  as?: "span" | "div";
  className?: string;
}

const DEFAULT_LABEL = "В разработке";

export function InDevelopment({
  children,
  label = DEFAULT_LABEL,
  as = "span",
  className = "",
}: InDevelopmentProps) {
  const Tag = as;

  return (
    <Tag className={className} title={label}>
      <Tag inert className="pointer-events-none opacity-50">
        {children}
      </Tag>
      <span className="sr-only">{label}</span>
    </Tag>
  );
}
