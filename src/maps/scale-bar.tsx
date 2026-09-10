export interface ScaleBarProps {
  label: string;
  widthPx: number;
  className?: string;
}

export function ScaleBar({ label, widthPx, className = "" }: ScaleBarProps) {
  const width = Math.max(Math.round(widthPx), 12);

  return (
    <div
      className={`flex items-center gap-[3px] text-[11.5px] font-semibold text-(color:--text-on-map) ${className}`}
    >
      <svg
        width={width}
        height="8"
        viewBox={`0 0 ${String(width)} 8`}
        aria-hidden="true"
        className="shrink-0"
      >
        <path
          d={`M0.5 0.5V7.5H${String(width - 0.5)}V0.5`}
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
        />
      </svg>
      <span>{label}</span>
    </div>
  );
}
