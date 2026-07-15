import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

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
    expect(screen.getByRole("button", { name: "Услуги" })).toHaveAttribute("aria-current", "page");
    await userEvent.click(screen.getByRole("button", { name: "Отзывы" }));
    expect(onChange).toHaveBeenCalledWith("reviews");
  });

  it("does not switch to a disabled tab", () => {
    const onChange = vi.fn();
    render(<Tabs items={ITEMS} value="services" onChange={onChange} />);
    expect(screen.getByRole("button", { name: "Закрыто" })).toBeDisabled();
  });
});
