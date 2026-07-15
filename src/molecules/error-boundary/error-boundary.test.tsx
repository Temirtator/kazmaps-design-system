import { render, screen } from "@testing-library/react";

import { ErrorBoundary } from "./error-boundary";

function Boom(): never {
  throw new Error("Ошибка загрузки данных");
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
});
