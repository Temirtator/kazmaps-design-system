"use client";

import { useEffect, useState } from "react";

interface Built {
  value: string;
  url: string | null;
}

export function QrCode({
  value,
  label = "QR-код",
  className = "",
}: {
  value: string;
  label?: string;
  className?: string;
}) {
  const [built, setBuilt] = useState<Built | null>(null);

  useEffect(() => {
    if (value === "") return;
    let alive = true;
    void import("qrcode")
      .then((qr) =>
        qr.toDataURL(value, {
          width: 512,
          margin: 2,
          errorCorrectionLevel: "M",
          color: { dark: "#000000", light: "#ffffff" },
        }),
      )
      .then(
        (url) => {
          if (alive) setBuilt({ value, url });
        },
        () => {
          if (alive) setBuilt({ value, url: null });
        },
      );
    return () => {
      alive = false;
    };
  }, [value]);

  const current = built !== null && built.value === value ? built : null;

  if (current !== null && current.url === null) {
    return (
      <span className={`block text-[11.5px] text-(color:--text-tertiary) ${className}`}>
        Не удалось построить QR-код
      </span>
    );
  }

  return (
    <span
      role="img"
      aria-label={label}
      style={
        current === null
          ? { background: "#ffffff" }
          : { backgroundImage: `url(${current.url ?? ""})` }
      }
      className={`block aspect-square w-full rounded-lg bg-contain bg-center bg-no-repeat ${className}`}
    />
  );
}
