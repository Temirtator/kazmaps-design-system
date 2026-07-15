import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { ThemeToggle } from "./theme-toggle";

describe("ThemeToggle", () => {
  it("requests the opposite theme on click", async () => {
    const onToggle = vi.fn();
    render(<ThemeToggle theme="dark" onToggle={onToggle} />);
    await userEvent.click(screen.getByRole("button", { name: "Переключить тему" }));
    expect(onToggle).toHaveBeenCalledWith("light");
  });
});
