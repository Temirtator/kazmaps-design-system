import { Button } from "./button";

export function SectionError({ message, onRetry }: { message: string; onRetry: () => void }) {
  return (
    <div className="flex flex-col items-center gap-2.5 px-6 py-8 text-center">
      <p className="text-[13px] text-(color:--text-muted)">{message}</p>
      <Button variant="outline" onClick={onRetry}>
        Повторить
      </Button>
    </div>
  );
}
