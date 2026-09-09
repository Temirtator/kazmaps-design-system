function GhostStack() {
  return (
    <div className="relative mx-auto h-[112px] w-[172px]" aria-hidden="true">
      <div className="absolute inset-x-6 top-6 h-16 rounded-xl border border-(--border-hairline) bg-(--surface-raised)" />
      <div className="absolute inset-x-3 top-3 h-16 rounded-xl border border-(--border-hairline) bg-(--surface-panel) shadow-(--shadow-button-sm)" />
      <div className="absolute inset-x-0 top-0 flex h-16 items-center gap-2 rounded-xl border border-(--border) bg-(--surface-panel) px-3 shadow-(--shadow-button-md)">
        <span className="size-8 shrink-0 rounded-full bg-(--accent-soft-bg)" />
        <div className="flex-1 space-y-1.5">
          <div className="h-2 w-3/4 rounded-full bg-(--border-subtle)" />
          <div className="h-2 w-1/2 rounded-full bg-(--border-subtle)" />
        </div>
      </div>
    </div>
  );
}

export function EmptyState({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center gap-4 px-4 pt-10 pb-8 text-center">
      <GhostStack />
      <div>
        <p className="text-[15px] font-bold text-(color:--text-primary)">{title}</p>
        {description === undefined ? null : (
          <p className="mx-auto mt-1.5 max-w-[320px] text-[12.5px] text-(color:--text-muted)">
            {description}
          </p>
        )}
      </div>
      {children}
    </div>
  );
}
