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
});
