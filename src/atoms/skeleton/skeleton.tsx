import { cn } from "../../lib/cn";

export type SkeletonProps = {
  className?: string;
};

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        "animate-shimmer rounded-[var(--radius-md)]",
        "bg-gradient-to-r from-[var(--bg-2)] via-[var(--line-2)] to-[var(--bg-2)]",
        "bg-[length:200%_100%]",
        className,
      )}
    />
  );
}
