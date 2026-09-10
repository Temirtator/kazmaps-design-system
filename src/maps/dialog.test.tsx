import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { Dialog } from "./dialog";

function panel(name: string): HTMLElement {
  const node = screen
    .getByRole("dialog", { name })
    .querySelector<HTMLElement>("div[tabindex='-1']");
  if (node === null) throw new Error("панель диалога не найдена");
  return node;
}

describe("Dialog", () => {
  it("по умолчанию ограничен 440px", () => {
    render(
      <Dialog title="Тест" onClose={() => undefined}>
        <p>тело</p>
      </Dialog>,
    );
    expect(panel("Тест").className).toContain("max-w-[440px]");
    expect(panel("Тест").className).toContain("w-full");
  });

  it("size=sm даёт 400px, а className дописывается, не подменяя ширину", () => {
    render(
      <Dialog title="Тест" size="sm" className="p-0" onClose={() => undefined}>
        <p>тело</p>
      </Dialog>,
    );
    expect(panel("Тест").className).toContain("max-w-[400px]");
    expect(panel("Тест").className).toContain("p-0");
    expect(panel("Тест").className).not.toContain("max-w-[440px]");
  });

  it("Escape и клик по подложке зовут onClose", async () => {
    const onClose = vi.fn();
    render(
      <Dialog title="Тест" onClose={onClose}>
        <p>тело</p>
      </Dialog>,
    );
    await userEvent.keyboard("{Escape}");
    expect(onClose).toHaveBeenCalledTimes(1);
    const backdrop = screen
      .getByRole("dialog", { name: "Тест" })
      .querySelector<HTMLElement>("button[aria-hidden='true']");
    if (backdrop === null) throw new Error("подложка не найдена");
    await userEvent.click(backdrop);
    expect(onClose).toHaveBeenCalledTimes(2);
  });
});
