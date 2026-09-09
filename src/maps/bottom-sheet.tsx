"use client";

import { X } from "lucide-react";
import { type ReactNode, type Ref, useEffect, useRef } from "react";

import { IconButton } from "./icon-button";

const HANDLE_TAP_THRESHOLD_PX = 8;

export interface BottomSheetSnap {
  id: string;
  heightClassName: string;
}

export interface BottomSheetProps {
  snaps: BottomSheetSnap[];
  snap: string;
  onSnapChange: (id: string) => void;
  onDismiss?: () => void;
  label: string;
  title?: string;
  onClose?: () => void;
  className?: string;
  ariaModal?: boolean;
  testId?: string;
  header?: ReactNode;
  ref?: Ref<HTMLDivElement>;
  children: React.ReactNode;
}

export function BottomSheet({
  snaps,
  snap,
  onSnapChange,
  onDismiss,
  label,
  title,
  onClose,
  className = "",
  ariaModal,
  testId,
  header,
  ref,
  children,
}: BottomSheetProps) {
  const index = Math.max(
    0,
    snaps.findIndex((s) => s.id === snap),
  );
  const active = snaps[index];

  const activeGesture = useRef<(() => void) | null>(null);

  useEffect(() => {
    const gesture = activeGesture;
    return () => {
      gesture.current?.();
    };
  }, []);

  function cycle(): void {
    onSnapChange(snaps[(index + 1) % snaps.length].id);
  }

  function step(direction: 1 | -1): void {
    const nextIndex = index + direction;
    if (nextIndex >= 0 && nextIndex < snaps.length) {
      onSnapChange(snaps[nextIndex].id);
    } else if (direction === -1) {
      onDismiss?.();
    }
  }

  function onPointerDown(e: React.PointerEvent<HTMLButtonElement>): void {
    if (activeGesture.current !== null) return;
    const pointerId = e.pointerId;
    const startY = e.clientY;

    function detach(): void {
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onCancel);
      activeGesture.current = null;
    }
    function onUp(upEvent: PointerEvent): void {
      if (upEvent.pointerId !== pointerId) return;
      detach();
      const deltaY = startY - upEvent.clientY;
      if (Math.abs(deltaY) <= HANDLE_TAP_THRESHOLD_PX) {
        cycle();
      } else {
        step(deltaY > 0 ? 1 : -1);
      }
    }
    function onCancel(cancelEvent: PointerEvent): void {
      if (cancelEvent.pointerId !== pointerId) return;
      detach();
    }
    activeGesture.current = detach;
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onCancel);
  }

  function onHandleClick(e: React.MouseEvent<HTMLButtonElement>): void {
    if (e.detail !== 0) return;
    cycle();
  }

  return (
    <div
      ref={ref}
      role="dialog"
      aria-label={label}
      aria-modal={ariaModal ? "true" : undefined}
      tabIndex={ariaModal ? -1 : undefined}
      data-testid={testId}
      className={`pointer-events-auto fixed inset-x-0 flex flex-col rounded-t-2xl border-t border-(--border-hairline) bg-(--surface-panel) shadow-(--shadow-sheet-top) outline-none transition-[height,max-height,bottom] duration-[var(--motion-panel)] ease-[var(--ease-standard)] md:hidden ${active.heightClassName} ${className}`}
    >
      <button
        type="button"
        aria-label={`Потянуть шторку: ${label}`}
        onPointerDown={onPointerDown}
        onClick={onHandleClick}
        className="flex h-[22px] w-full shrink-0 touch-none items-center justify-center"
      >
        <span className="h-[4px] w-9 rounded-full bg-(--border)" aria-hidden="true" />
      </button>
      {title !== undefined || onClose !== undefined ? (
        <div className="flex shrink-0 items-center gap-2 px-4 pb-1">
          {title !== undefined ? (
            <h2 className="flex-1 text-[15px] font-bold text-(color:--text-primary)">{title}</h2>
          ) : null}
          {onClose !== undefined ? (
            <IconButton label="Закрыть" size="sm" className="ml-auto" onClick={onClose}>
              <X size={14} aria-hidden="true" />
            </IconButton>
          ) : null}
        </div>
      ) : null}
      {header}
      <div className="min-h-0 flex-1 overflow-y-auto">{children}</div>
    </div>
  );
}
