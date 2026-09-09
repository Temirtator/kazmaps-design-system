import type { ComponentProps, ReactNode } from "react";

export interface ListRowProps {
  icon?: ReactNode;
  title: string;
  subtitle?: ReactNode;
  trailing?: ReactNode;
  href?: string;
  target?: ComponentProps<"a">["target"];
  rel?: string;
  onClick?: () => void;
  className?: string;
  "aria-label"?: string;
}

export function ListRow({
  icon,
  title,
  subtitle,
  trailing,
  href,
  target,
  rel,
  onClick,
  className = "",
  "aria-label": ariaLabel,
}: ListRowProps) {
  const content = (
    <>
      {icon ? (
        <span className="flex size-6 shrink-0 items-center justify-center text-(color:--text-secondary)">
          {icon}
        </span>
      ) : null}
      <span className="min-w-0 flex-1">
        <span className="block truncate text-[14px] font-medium text-(color:--text-primary)">
          {title}
        </span>
        {subtitle ? (
          <span className="block truncate text-[11.5px] font-medium text-(color:--text-tertiary)">
            {subtitle}
          </span>
        ) : null}
      </span>
      {trailing}
    </>
  );

  const sharedClassName = `flex w-full items-center gap-3 rounded-lg px-2.5 py-[11px] text-left transition-interactive focus-ring hover:bg-(--surface-raised) active:scale-[0.97] ${className}`;

  if (href) {
    return (
      <a href={href} target={target} rel={rel} aria-label={ariaLabel} className={sharedClassName}>
        {content}
      </a>
    );
  }

  return (
    <button type="button" onClick={onClick} aria-label={ariaLabel} className={sharedClassName}>
      {content}
    </button>
  );
}
