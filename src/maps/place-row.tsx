import { StarRating } from "./star-rating";

export interface PlaceRowStatus {
  label: string;
  tone?: "success" | "muted";
}

export interface PlaceRowProps {
  photoUrl?: string;
  photoAlt?: string;
  name: string;
  rating?: number;
  category?: string;
  status?: PlaceRowStatus;
  metaText?: string;
  onClick?: () => void;
  className?: string;
}

export function PlaceRow({
  photoUrl,
  photoAlt = "",
  name,
  rating,
  category,
  status,
  metaText,
  onClick,
  className = "",
}: PlaceRowProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex w-full items-center gap-2.5 rounded-lg px-2 py-[9px] text-left transition-interactive focus-ring hover:bg-(--surface-raised) active:scale-[0.97] ${className}`}
    >
      <span className="size-[54px] shrink-0 overflow-hidden rounded-[7px] bg-(--surface-raised)">
        {photoUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={photoUrl} alt={photoAlt} className="size-full object-cover" />
        ) : null}
      </span>
      <span className="min-w-0 flex-1">
        <span className="flex items-center gap-1.5">
          <span className="truncate text-[13.5px] font-semibold text-(color:--text-primary)">
            {name}
          </span>
          {rating !== undefined ? <StarRating value={rating} /> : null}
        </span>
        {category ? (
          <span className="block truncate text-[12px] text-(color:--text-muted)">{category}</span>
        ) : null}
        {status ? (
          <span className="flex items-center gap-1 text-[11.5px]">
            <span
              className={`font-semibold ${
                status.tone === "muted" ? "text-(color:--text-tertiary)" : "text-(color:--success)"
              }`}
            >
              {status.label}
            </span>
            {metaText ? <span className="text-(color:--text-tertiary)">· {metaText}</span> : null}
          </span>
        ) : null}
      </span>
    </button>
  );
}
