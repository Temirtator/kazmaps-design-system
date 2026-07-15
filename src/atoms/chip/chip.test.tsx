import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Chip } from "./chip";

describe("Chip", () => {
  it("toggles to the opposite state on click", async () => {
    const onToggle = vi.fn();
    render(<Chip label="Фильтр" active={false} onToggle={onToggle} />);
    await userEvent.click(screen.getByRole("button", { name: "Фильтр" }));
    expect(onToggle).toHaveBeenCalledWith(true);
  });
});
