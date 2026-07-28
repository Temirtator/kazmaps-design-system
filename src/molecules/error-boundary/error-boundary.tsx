"use client";

import { Component, type ReactNode } from "react";

export interface ErrorBoundaryProps {
  children: ReactNode;
  /** Узел либо рендер-функция, получающая текст пойманной ошибки. */
  fallback?: ReactNode | ((message: string) => ReactNode);
  /** Заголовок дефолтного фолбэка. */
  title?: string;
  /** Подпись кнопки перезагрузки в дефолтном фолбэке. */
  reloadLabel?: string;
  /** Текст, подставляемый вместо сообщения, когда брошено не `Error`. */
  genericMessage?: string;
}

interface State {
  hasError: boolean;
  message: string;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, State> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, message: "" };
  }

  static getDerivedStateFromError(error: unknown): State {
    return { hasError: true, message: error instanceof Error ? error.message : "" };
  }

  override render() {
    if (!this.state.hasError) return this.props.children;

    const {
      fallback,
      title = "Ошибка приложения",
      reloadLabel = "Обновить страницу",
      genericMessage = "Что-то пошло не так. Попробуйте обновить страницу.",
    } = this.props;
    const message = this.state.message || genericMessage;

    if (typeof fallback === "function") return fallback(message);
    if (fallback !== undefined) return fallback;

    return (
      <div className="flex min-h-dvh flex-col items-center justify-center gap-3 px-4 text-center">
        <p className="text-[length:var(--text-lg)] font-semibold text-[var(--ink)]">{title}</p>
        <p className="text-[length:var(--text-sm)] text-[var(--muted)]">{message}</p>
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="rounded-[var(--radius-md)] bg-[var(--brand)] px-4 py-2 text-[length:var(--text-sm)] font-medium text-white"
        >
          {reloadLabel}
        </button>
      </div>
    );
  }
}
