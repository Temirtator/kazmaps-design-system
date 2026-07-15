"use client";

import { Star } from "lucide-react";
import { useState } from "react";

import { cn } from "../../lib/cn";

export type StarRatingProps = {
  value: number;
  onChange?: (v: number) => void;
  size?: "sm" | "md" | "lg";
};

const SIZE_MAP: Record<NonNullable<StarRatingProps["size"]>, number> = {
  sm: 14,
  md: 18,
  lg: 22,
};

function StarRating({ value, onChange, size = "md" }: StarRatingProps) {
  const [hovered, setHovered] = useState<number | null>(null);
  const isInteractive = Boolean(onChange);
  const px = SIZE_MAP[size];

  return (
    <div
      className={cn(
        "flex items-center gap-0.5",
        isInteractive ? "cursor-pointer" : "cursor-default",
      )}
      onMouseLeave={() => setHovered(null)}
    >
      {Array.from({ length: 5 }, (_, i) => {
        const index = i + 1;
        const filled = index <= (hovered ?? value);
        return isInteractive ? (
          <button
            key={index}
            type="button"
            className="flex items-center justify-center p-0 bg-transparent border-0"
            onMouseEnter={() => setHovered(index)}
            onClick={() => onChange?.(index)}
          >
            <Star
              size={px}
              className={cn(
                "transition-colors duration-[var(--dur-fast)] ease-[var(--ease-standard)]",
                filled
                  ? "fill-[var(--gold)] text-[var(--gold)]"
                  : "fill-transparent text-[var(--line-2)]",
              )}
            />
          </button>
        ) : (
          <Star
            key={index}
            size={px}
            className={cn(
              "transition-colors duration-[var(--dur-fast)] ease-[var(--ease-standard)]",
              filled
                ? "fill-[var(--gold)] text-[var(--gold)]"
                : "fill-transparent text-[var(--line-2)]",
            )}
          />
        );
      })}
    </div>
  );
}

export { StarRating };
