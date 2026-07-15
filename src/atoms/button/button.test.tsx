import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Button } from "./button";

describe("Button", () => {
  it("renders children and fires onClick", async () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Сохранить</Button>);
    await userEvent.click(screen.getByRole("button", { name: "Сохранить" }));
    expect(onClick).toHaveBeenCalledOnce();
  });

  it("applies brand variant token class", () => {
    render(<Button variant="brand">Кнопка</Button>);
    expect(screen.getByRole("button").className).toContain("bg-[var(--brand)]");
  });

  it("is disabled and shows spinner while loading", () => {
    render(<Button loading>Кнопка</Button>);
    const btn = screen.getByRole("button");
    expect(btn).toBeDisabled();
    expect(btn.textContent).not.toContain("Кнопка");
  });

  it("merges custom className last", () => {
    render(<Button className="px-9">Кнопка</Button>);
    expect(screen.getByRole("button").className).toContain("px-9");
  });
});
