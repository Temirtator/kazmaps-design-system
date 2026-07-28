"use client";

import { Star } from "lucide-react";
import { useRef, useState } from "react";

import { cn } from "../../lib/cn";

type StarRatingProps = {
  value: number;
  onChange?: (v: number) => void;
  size?: "sm" | "md" | "lg";
  /** Имя группы (интерактив) / подпись рейтинга (display). */
  ariaLabel?: string;
  /** Числовая часть подписи: и каждая звезда в интерактиве, и рейтинг в display. */
  formatRating?: (value: number, max: number) => string;
};

const SIZE_MAP: Record<NonNullable<StarRatingProps["size"]>, number> = {
  sm: 14,
  md: 18,
  lg: 22,
};

const STAR_COUNT = 5;

function starClass(filled: boolean): string {
  return cn(
    "transition-colors duration-[var(--dur-fast)] ease-[var(--ease-standard)]",
    filled ? "fill-[var(--gold)] text-[var(--gold)]" : "fill-transparent text-[var(--line-2)]",
  );
}

function StarRating({
  value,
  onChange,
  size = "md",
  ariaLabel = "Оценка",
  formatRating = (v, max) => `${v} из ${max}`,
}: StarRatingProps) {
  const [hovered, setHovered] = useState<number | null>(null);
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const px = SIZE_MAP[size];

  if (!onChange) {
    return (
      <div
        role="img"
        aria-label={`${ariaLabel}: ${formatRating(value, STAR_COUNT)}`}
        className="flex cursor-default items-center gap-0.5"
      >
        {Array.from({ length: STAR_COUNT }, (_, i) => (
          <Star key={i + 1} size={px} aria-hidden="true" className={starClass(i + 1 <= value)} />
        ))}
      </div>
    );
  }

  function moveTo(next: number) {
    onChange?.(next);
    refs.current[next - 1]?.focus();
  }

  // Округляем: при дробном value (например, средний рейтинг 3.4) точное сравнение
  // не совпадало ни с одной звездой и группа оставалась без фокусируемого элемента.
  const activeStar = Math.min(Math.max(Math.round(value), 1), STAR_COUNT);

  return (
    <div
      role="radiogroup"
      aria-label={ariaLabel}
      className="flex items-center gap-0.5"
      onMouseLeave={() => setHovered(null)}
    >
      {Array.from({ length: STAR_COUNT }, (_, i) => {
        const index = i + 1;
        return (
          <button
            key={index}
            ref={(el) => {
              refs.current[i] = el;
            }}
            type="button"
            role="radio"
            aria-checked={value === index}
            aria-label={formatRating(index, STAR_COUNT)}
            tabIndex={index === activeStar ? 0 : -1}
            onMouseEnter={() => setHovered(index)}
            onClick={() => onChange?.(index)}
            onKeyDown={(e) => {
              if (e.key === "ArrowRight" || e.key === "ArrowUp") {
                e.preventDefault();
                moveTo(Math.min(index + 1, STAR_COUNT));
              } else if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
                e.preventDefault();
                moveTo(Math.max(index - 1, 1));
              }
            }}
            className={cn(
              "cursor-pointer rounded-[var(--radius-sm)]",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)]",
            )}
          >
            <Star size={px} aria-hidden="true" className={starClass(index <= (hovered ?? value))} />
          </button>
        );
      })}
    </div>
  );
}

export { StarRating, type StarRatingProps };
