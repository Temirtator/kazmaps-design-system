"use client";

import { X } from "lucide-react";
import { type ReactNode, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";

import { IconButton } from "./icon-button";
import { useFocusTrap } from "./use-focus-trap";

export type DialogSize = "sm" | "md";

const SIZE_CLASSES: Record<DialogSize, string> = {
  sm: "max-w-[400px]",
  md: "max-w-[440px]",
};

const subscribeNoop = () => () => undefined;
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

export function Dialog({
  title,
  subtitle,
  children,
  onClose,
  size = "md",
  className = "",
  showHeader = true,
}: {
  title: string;
  subtitle?: ReactNode;
  children: ReactNode;
  onClose: () => void;
  size?: DialogSize;
  className?: string;
  showHeader?: boolean;
}) {
  const panelRef = useFocusTrap(onClose);
  const onClient = useSyncExternalStore(subscribeNoop, getClientSnapshot, getServerSnapshot);
  if (!onClient) return null;

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={title}
      className="pointer-events-auto fixed inset-0 z-30 flex items-center justify-center p-4"
    >
      <button
        type="button"
        tabIndex={-1}
        aria-hidden="true"
        onClick={onClose}
        className="absolute inset-0 bg-black/40"
      />
      <div
        ref={panelRef}
        tabIndex={-1}
        className={`relative w-full rounded-[14px] border border-(--border) bg-(--surface-panel) shadow-(--shadow-modal) outline-none ${SIZE_CLASSES[size]} ${className}`}
      >
        {showHeader ? (
          <header className="flex items-start gap-2 p-4">
            <div className="flex-1">
              <p className="text-[15px] font-semibold text-(color:--text-primary)">{title}</p>
              {subtitle == null ? null : (
                <div className="mt-1 text-[13px] text-(color:--text-secondary)">{subtitle}</div>
              )}
            </div>
            <IconButton label="Закрыть" size="sm" onClick={onClose}>
              <X size={18} />
            </IconButton>
          </header>
        ) : null}
        <div className={showHeader ? "px-4 pb-4" : "p-4"}>{children}</div>
      </div>
    </div>,
    document.body,
  );
}
