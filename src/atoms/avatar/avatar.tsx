"use client";

import { type CSSProperties, forwardRef, type ImgHTMLAttributes, useState } from "react";

import { cn } from "../../lib/cn";
import { colorFor } from "../../lib/color-for";

export type AvatarSize = "sm" | "md" | "lg";
export type AvatarShape = "circle" | "square";

export type AvatarProps = Omit<ImgHTMLAttributes<HTMLImageElement>, "src"> & {
  name?: string;
  photoUrl?: string;
  size?: AvatarSize | number;
  shape?: AvatarShape;
  color?: CSSProperties["backgroundColor"];
};

const SIZE_PX: Record<AvatarSize, number> = {
  sm: 28,
  md: 36,
  lg: 44,
};

const TEXT_CLASS: Record<AvatarSize, string> = {
  sm: "text-[10px]",
  md: "text-[13px]",
  lg: "text-[16px]",
};

function getInitials(name: string): string {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word.at(0) ?? "")
    .join("")
    .toUpperCase();
}

export const Avatar = forwardRef<HTMLSpanElement, AvatarProps>(function Avatar(
  { name = "", photoUrl, size = "md", shape = "circle", color, className, style, ...rest },
  ref,
) {
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);

  const px = typeof size === "number" ? size : SIZE_PX[size];
  const textClass = typeof size === "number" ? undefined : TEXT_CLASS[size];
  const bg = color ?? colorFor(name);
  const initials = getInitials(name);

  const containerStyle = {
    width: px,
    height: px,
    minWidth: px,
    ...style,
  };

  const shapeClass = shape === "circle" ? "rounded-full" : "rounded-[var(--radius-md)]";

  const showPhoto = !!photoUrl && imgLoaded && !imgError;

  return (
    <span
      ref={ref}
      className={cn(
        "relative inline-flex shrink-0 overflow-hidden select-none",
        "transition-opacity duration-[var(--dur-base)] ease-[var(--ease-standard)]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)]",
        shapeClass,
        className,
      )}
      style={{ ...containerStyle, backgroundColor: bg }}
      role="img"
      aria-label={name || "Аватар пользователя"}
    >
      <span
        className={cn(
          "absolute inset-0 flex items-center justify-center font-semibold leading-none text-white",
          textClass,
          showPhoto ? "opacity-0" : "opacity-100",
        )}
        aria-hidden="true"
      >
        {initials || null}
      </span>

      {!!photoUrl && (
        <img
          src={photoUrl}
          alt={name || "avatar"}
          onLoad={() => setImgLoaded(true)}
          onError={() => setImgError(true)}
          className={cn(
            "absolute inset-0 h-full w-full object-cover",
            "transition-opacity duration-[var(--dur-base)] ease-[var(--ease-standard)]",
            showPhoto ? "opacity-100" : "opacity-0",
          )}
          {...rest}
        />
      )}
    </span>
  );
});
