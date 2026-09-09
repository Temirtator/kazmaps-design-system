import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { Button, type ButtonSize } from "./button";

describe("Button", () => {
  it("рендерит подпись и зовёт onClick", async () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Нажми</Button>);
    await userEvent.click(screen.getByRole("button", { name: "Нажми" }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("по умолчанию type=button и размер md", () => {
    render(<Button>x</Button>);
    const button = screen.getByRole("button", { name: "x" });
    expect(button).toHaveAttribute("type", "button");
    expect(button.className).toContain("h-10");
  });

  it.each<[ButtonSize, string]>([
    ["sm", "h-[34px]"],
    ["md", "h-10"],
    ["lg", "h-11"],
  ])("size=%s даёт класс %s независимо от варианта", (size, heightClass) => {
    render(
      <>
        <Button size={size} variant="outline">
          a
        </Button>
        <Button size={size} variant="filled-accent">
          b
        </Button>
      </>,
    );
    expect(screen.getByRole("button", { name: "a" }).className).toContain(heightClass);
    expect(screen.getByRole("button", { name: "b" }).className).toContain(heightClass);
  });

  it("fullWidth растягивает кнопку, type=submit пробрасывается", () => {
    render(
      <Button type="submit" fullWidth>
        Отправить
      </Button>,
    );
    const button = screen.getByRole("button", { name: "Отправить" });
    expect(button).toHaveAttribute("type", "submit");
    expect(button.className).toContain("w-full");
  });

  it("disabled-стили есть у всех вариантов", () => {
    render(
      <Button variant="outline" disabled>
        x
      </Button>,
    );
    expect(screen.getByRole("button", { name: "x" }).className).toContain("disabled:opacity-50");
  });
});
