import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { ChipPill } from "./chip-pill";

describe("ChipPill", () => {
  it("fires onClick", async () => {
    const onClick = vi.fn();
    render(<ChipPill label="Все" onClick={onClick} />);
    await userEvent.click(screen.getByRole("button", { name: "Все" }));
    expect(onClick).toHaveBeenCalledOnce();
  });
});
