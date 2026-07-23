import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";

import { Tabs } from "./tabs";

const ITEMS = [
  { key: "services", label: "Услуги" },
  { key: "reviews", label: "Отзывы" },
  { key: "closed", label: "Закрыто", disabled: true },
];

describe("Tabs", () => {
  it("marks the active tab and switches on click", async () => {
    const onChange = vi.fn();
    render(<Tabs items={ITEMS} value="services" onChange={onChange} />);
    expect(screen.getByRole("tab", { name: "Услуги" })).toHaveAttribute("aria-selected", "true");
    await userEvent.click(screen.getByRole("tab", { name: "Отзывы" }));
    expect(onChange).toHaveBeenCalledWith("reviews");
  });

  it("does not switch to a disabled tab", () => {
    render(<Tabs items={ITEMS} value="services" onChange={vi.fn()} />);
    expect(screen.getByRole("tab", { name: "Закрыто" })).toBeDisabled();
  });

  it("exposes tablist with accessible name", () => {
    render(<Tabs items={ITEMS} value="services" onChange={vi.fn()} />);
    expect(screen.getByRole("tablist", { name: "Вкладки" })).toBeInTheDocument();
  });

  it("only the selected tab is in the tab order", () => {
    render(<Tabs items={ITEMS} value="reviews" onChange={vi.fn()} />);
    expect(screen.getByRole("tab", { name: "Отзывы" })).toHaveAttribute("tabindex", "0");
    expect(screen.getByRole("tab", { name: "Услуги" })).toHaveAttribute("tabindex", "-1");
  });

  it("moves selection with arrows, skipping disabled and wrapping", async () => {
    function Harness() {
      const [value, setValue] = useState("services");
      return <Tabs items={ITEMS} value={value} onChange={setValue} />;
    }
    const user = userEvent.setup();
    render(<Harness />);
    await user.tab();
    expect(screen.getByRole("tab", { name: "Услуги" })).toHaveFocus();
    await user.keyboard("{ArrowRight}");
    expect(screen.getByRole("tab", { name: "Отзывы" })).toHaveFocus();
    expect(screen.getByRole("tab", { name: "Отзывы" })).toHaveAttribute("aria-selected", "true");
    await user.keyboard("{ArrowRight}"); // «Закрыто» disabled → wrap на «Услуги»
    expect(screen.getByRole("tab", { name: "Услуги" })).toHaveFocus();
  });
});
