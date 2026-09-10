import type { ReactNode } from "react";

export interface SegmentedRowItem {
  id: string;
  label: string;
  icon: ReactNode;
}

export interface SegmentedRowProps {
  items: SegmentedRowItem[];
  activeId: string | null;
  onSelect: (id: string) => void;
  label: string;
  className?: string;
}

export function SegmentedRow({
  items,
  activeId,
  onSelect,
  label,
  className = "",
}: SegmentedRowProps) {
  return (
    <div
      role="group"
      aria-label={label}
      className={`flex gap-1 rounded-[11px] bg-(--surface-raised) p-1 ${className}`}
    >
      {items.map((item) => {
        const active = item.id === activeId;
        return (
          <button
            key={item.id}
            type="button"
            aria-pressed={active}
            onClick={() => {
              onSelect(item.id);
            }}
            className={`flex min-h-11 flex-1 flex-col items-center justify-center gap-0.5 rounded-lg text-[11.5px] transition-interactive focus-ring active:scale-[0.97] ${
              active
                ? "bg-(--accent) font-semibold text-(color:--text-on-accent)"
                : "font-medium text-(color:--text-secondary) hover:bg-(--surface-panel) hover:text-(color:--text-primary)"
            }`}
          >
            {item.icon}
            {item.label}
          </button>
        );
      })}
    </div>
  );
}
