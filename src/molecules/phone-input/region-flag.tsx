import { cn } from "../../lib/cn";

type Paint = { fill: string; x?: number; y?: number; w?: number; h?: number };

const H = 24;
const W = 36;

const stripes = (colors: string[]): Paint[] =>
  colors.map((fill, i) => ({ fill, x: 0, y: (H / colors.length) * i, w: W, h: H / colors.length }));

const FLAGS: Record<string, Paint[]> = {
  KZ: [{ fill: "#00AFCA" }, { fill: "#FEC50C", x: 13, y: 7, w: 10, h: 10 }],
  RU: stripes(["#FFFFFF", "#0039A6", "#D52B1E"]),
  KG: [{ fill: "#E8112D" }, { fill: "#FFEF00", x: 13, y: 7, w: 10, h: 10 }],
  UZ: stripes(["#1EB53A", "#FFFFFF", "#0099B5"].reverse()),
  TJ: stripes(["#CC0000", "#FFFFFF", "#006600"]),
  TM: [{ fill: "#00843D" }, { fill: "#D22630", x: 4, y: 0, w: 6, h: H }],
  AZ: stripes(["#00B5E2", "#EF3340", "#509E2F"]),
  AM: stripes(["#D90012", "#0033A0", "#F2A800"]),
  BY: [
    { fill: "#C8313E" },
    { fill: "#4AA657", x: 0, y: 16, w: W, h: 8 },
    { fill: "#FFFFFF", x: 0, y: 0, w: 5, h: H },
  ],
  GE: [
    { fill: "#FFFFFF" },
    { fill: "#FF0000", x: 15, y: 0, w: 6, h: H },
    { fill: "#FF0000", x: 0, y: 9, w: W, h: 6 },
  ],
};

export function RegionFlag({
  iso,
  size = 18,
  className,
}: {
  iso: string;
  size?: number;
  className?: string;
}) {
  const paints = FLAGS[iso];
  if (!paints) {
    return (
      <span
        aria-hidden="true"
        className={cn(
          "inline-flex items-center justify-center rounded-[var(--radius-sm)] bg-[var(--bg-2)] px-1",
          "text-[length:var(--text-xs)] font-medium leading-none text-[var(--ink-2)]",
          className,
        )}
        style={{ height: size }}
      >
        {iso}
      </span>
    );
  }
  return (
    <svg
      aria-hidden="true"
      viewBox={`0 0 ${W} ${H}`}
      width={size * 1.5}
      height={size}
      className={cn("shrink-0 overflow-hidden rounded-[2px]", className)}
    >
      {paints.map((p, i) => (
        <rect key={i} x={p.x ?? 0} y={p.y ?? 0} width={p.w ?? W} height={p.h ?? H} fill={p.fill} />
      ))}
    </svg>
  );
}
