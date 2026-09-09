import { Star } from "lucide-react";

export interface StarRatingProps {
  value: number;
  className?: string;
}

export function StarRating({ value, className = "" }: StarRatingProps) {
  return (
    <span
      className={`inline-flex items-center gap-1 text-[12px] font-semibold text-(color:--text-primary) ${className}`}
    >
      <Star
        size={12}
        fill="currentColor"
        strokeWidth={0}
        className="text-(color:--rating-star)"
        aria-hidden="true"
      />
      {value.toLocaleString("ru-RU", { minimumFractionDigits: 1, maximumFractionDigits: 1 })}
    </span>
  );
}
