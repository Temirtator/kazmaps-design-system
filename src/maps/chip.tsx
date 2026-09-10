export interface ChipProps {
  label: string;
  active?: boolean;
  onClick?: () => void;
  className?: string;
}

export function Chip({ label, active = false, onClick, className = "" }: ChipProps) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={`inline-flex items-center rounded-[7px] px-[11px] py-[6px] text-[12.5px] transition-interactive focus-ring active:scale-[0.97] ${
        active
          ? "border border-(--accent) bg-(--accent-soft-bg) font-semibold text-(color:--accent)"
          : "border border-(--border) bg-(--surface-panel) font-medium text-(color:--text-secondary) hover:bg-(--surface-raised)"
      } ${className}`}
    >
      {label}
    </button>
  );
}
