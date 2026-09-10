"use client";

import { useState } from "react";

export type AvatarInitialSize = "sm" | "md" | "lg";

const SIZE_CLASSES: Record<AvatarInitialSize, string> = {
  sm: "size-[30px] text-[12px]",
  md: "size-[38px] text-[15.2px]",
  lg: "size-10 text-base",
};

const TEXT_ON_DARK = "#0a0e18";
const PALETTE: { bg: string; text: string }[] = [
  { bg: "var(--accent)", text: "var(--text-on-accent)" },
  { bg: "#0e9488", text: TEXT_ON_DARK },
  { bg: "var(--success)", text: TEXT_ON_DARK },
  { bg: "var(--rating-star)", text: TEXT_ON_DARK },
  { bg: "var(--marker-primary)", text: TEXT_ON_DARK },
];

function hashString(value: string): number {
  let acc = 0;
  for (let i = 0; i < value.length; i += 1) {
    acc += value.charCodeAt(i);
  }
  return acc;
}

function paletteForSeed(seed: number | string): { bg: string; text: string } {
  const n = typeof seed === "number" ? seed : hashString(seed);
  return PALETTE[Math.abs(n) % PALETTE.length];
}

export function AvatarInitial({
  name,
  seed,
  size = "md",
  src,
  className = "",
}: {
  name: string;
  seed: number | string;
  size?: AvatarInitialSize;
  src?: string | null;
  className?: string;
}) {
  const [imgFailed, setImgFailed] = useState(false);
  const initial = name.trim().charAt(0).toUpperCase() || "?";

  if (src && !imgFailed) {
    return (
      <img
        src={src}
        alt=""
        className={`shrink-0 rounded-full object-cover ${SIZE_CLASSES[size]} ${className}`}
        onError={() => {
          setImgFailed(true);
        }}
      />
    );
  }

  const { bg, text } = paletteForSeed(seed);
  return (
    <span
      className={`flex shrink-0 items-center justify-center rounded-full font-semibold ${SIZE_CLASSES[size]} ${className}`}
      style={{ background: bg, color: text }}
      aria-hidden="true"
    >
      {initial}
    </span>
  );
}
