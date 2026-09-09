"use client";

import { createContext, type ReactNode, useCallback, useContext, useRef, useState } from "react";

export interface ToastAction {
  label: string;
  onClick: () => void;
}

export interface ToastOptions {
  action?: ToastAction;
  durationMs?: number;
}

export type ShowToast = (message: string, options?: ToastOptions) => void;

const DEFAULT_DURATION_MS = 8000;

const ToastContext = createContext<ShowToast | null>(null);

interface ToastState {
  message: string;
  action?: ToastAction;
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toast, setToast] = useState<ToastState | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const show = useCallback<ShowToast>((message, options) => {
    if (timerRef.current !== null) clearTimeout(timerRef.current);
    setToast({ message, action: options?.action });
    timerRef.current = setTimeout(() => {
      timerRef.current = null;
      setToast(null);
    }, options?.durationMs ?? DEFAULT_DURATION_MS);
  }, []);

  const dismiss = useCallback(() => {
    if (timerRef.current !== null) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    setToast(null);
  }, []);

  return (
    <ToastContext.Provider value={show}>
      {children}
      {toast === null ? null : (
        <div
          role="status"
          aria-live="polite"
          className="pointer-events-none fixed top-3 left-1/2 z-40 -translate-x-1/2"
        >
          <div className="pointer-events-auto flex animate-modal-in items-center gap-3 rounded-[12px] border border-(--border) bg-(--surface-panel) px-4 py-3 shadow-(--shadow-modal)">
            <p className="text-[13px] text-(color:--text-primary)">{toast.message}</p>
            {toast.action === undefined ? null : (
              <button
                type="button"
                onClick={() => {
                  toast.action?.onClick();
                  dismiss();
                }}
                className="shrink-0 text-[13px] font-semibold text-(color:--accent) transition-interactive focus-ring hover:opacity-80"
              >
                {toast.action.label}
              </button>
            )}
          </div>
        </div>
      )}
    </ToastContext.Provider>
  );
}

export function useToast(): ShowToast {
  const ctx = useContext(ToastContext);
  if (ctx === null) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}
