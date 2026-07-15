"use client";

import { Component, type ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  message: string;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, message: "" };
  }

  static getDerivedStateFromError(error: unknown): State {
    const message =
      error instanceof Error ? error.message : "Что-то пошло не так. Попробуйте обновить страницу.";
    return { hasError: true, message };
  }

  override render() {
    if (this.state.hasError) {
      return (
        this.props.fallback ?? (
          <div className="flex min-h-dvh flex-col items-center justify-center gap-3 px-4 text-center">
            <p className="text-lg font-semibold text-[var(--ink)]">Ошибка приложения</p>
            <p className="text-sm text-[var(--muted)]">{this.state.message}</p>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="rounded-xl bg-[var(--brand)] px-4 py-2 text-sm font-medium text-inverse"
            >
              Обновить страницу
            </button>
          </div>
        )
      );
    }

    return this.props.children;
  }
}
