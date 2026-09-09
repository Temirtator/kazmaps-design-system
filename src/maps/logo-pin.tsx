export interface LogoPinProps {
  size?: number;
  className?: string;
}

export function LogoPin({ size = 26, className = "" }: LogoPinProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={`text-(color:--accent) ${className}`}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        fill="currentColor"
        d="M12 2C7.03 2 3 6.03 3 11c0 6.75 9 13 9 13s9-6.25 9-13c0-4.97-4.03-9-9-9zm0 12a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"
      />
    </svg>
  );
}
