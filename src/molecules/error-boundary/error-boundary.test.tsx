import { render, screen } from "@testing-library/react";

import { ErrorBoundary } from "./error-boundary";

function Boom(): never {
  throw new Error("Ошибка загрузки данных");
}

function BoomString(): never {
  // Бросаем строку намеренно: проверяем ветку, где брошено не `Error`.
  // eslint-disable-next-line @typescript-eslint/only-throw-error
  throw "не Error";
}

describe("ErrorBoundary", () => {
  it("renders the thrown message instead of crashing", () => {
    vi.spyOn(console, "error").mockImplementation(() => undefined);
    render(
      <ErrorBoundary>
        <Boom />
      </ErrorBoundary>,
    );
    expect(screen.getByText("Ошибка загрузки данных")).toBeInTheDocument();
    vi.restoreAllMocks();
  });

  it("renders custom fallback when provided", () => {
    vi.spyOn(console, "error").mockImplementation(() => undefined);
    render(
      <ErrorBoundary fallback={<p>Свой фолбэк</p>}>
        <Boom />
      </ErrorBoundary>,
    );
    expect(screen.getByText("Свой фолбэк")).toBeInTheDocument();
    vi.restoreAllMocks();
  });

  it("fallback uses contract tokens, not legacy aliases", () => {
    vi.spyOn(console, "error").mockImplementation(() => undefined);
    render(
      <ErrorBoundary>
        <Boom />
      </ErrorBoundary>,
    );
    const btn = screen.getByRole("button", { name: "Обновить страницу" });
    expect(btn.className).not.toContain("text-inverse");
    expect(btn).toHaveClass(
      "text-white",
      "rounded-[var(--radius-md)]",
      "text-[length:var(--text-sm)]",
    );
    vi.restoreAllMocks();
  });

  it("passes the captured message to a render-prop fallback", () => {
    vi.spyOn(console, "error").mockImplementation(() => undefined);
    render(
      <ErrorBoundary fallback={(message) => <p>Поймали: {message}</p>}>
        <Boom />
      </ErrorBoundary>,
    );
    expect(screen.getByText("Поймали: Ошибка загрузки данных")).toBeInTheDocument();
    vi.restoreAllMocks();
  });

  it("uses the title and reloadLabel props in the default fallback", () => {
    vi.spyOn(console, "error").mockImplementation(() => undefined);
    render(
      <ErrorBoundary title="Application error" reloadLabel="Refresh the page">
        <Boom />
      </ErrorBoundary>,
    );
    expect(screen.getByText("Application error")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Refresh the page" })).toBeInTheDocument();
    vi.restoreAllMocks();
  });

  it("falls back to genericMessage when a non-Error value is thrown", () => {
    vi.spyOn(console, "error").mockImplementation(() => undefined);
    render(
      <ErrorBoundary genericMessage="Something went wrong.">
        <BoomString />
      </ErrorBoundary>,
    );
    expect(screen.getByText("Something went wrong.")).toBeInTheDocument();
    vi.restoreAllMocks();
  });
});
