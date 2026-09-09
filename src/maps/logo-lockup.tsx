import { LogoPin } from "./logo-pin";

export interface LogoLockupProps {
  className?: string;
}

export function LogoLockup({ className = "" }: LogoLockupProps) {
  return (
    <span className={`flex items-center gap-2 ${className}`}>
      <LogoPin />
      <span className="text-[17px] font-bold tracking-[-0.2px] text-(color:--text-primary)">
        KazMaps
      </span>
    </span>
  );
}
