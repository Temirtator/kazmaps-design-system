import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Checkbox } from "./checkbox";

describe("Checkbox", () => {
  it("toggles via label click", async () => {
    render(<Checkbox label="Согласен" />);
    const box = screen.getByRole("checkbox", { name: "Согласен" });
    expect(box).not.toBeChecked();
    await userEvent.click(box);
    expect(box).toBeChecked();
  });

  it("check icon uses the bg token so it stays visible in dark theme", () => {
    const { container } = render(<Checkbox label="Согласен" defaultChecked />);
    const icon = container.querySelector("svg");
    expect(icon).toHaveClass("text-[var(--bg)]");
    expect(icon).not.toHaveClass("text-white");
  });
});
