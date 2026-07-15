import { render, screen } from "@testing-library/react";

import { Textarea } from "./textarea";

describe("Textarea", () => {
  it("wires label and accepts typing", () => {
    render(<Textarea label="Комментарий" />);
    expect(screen.getByLabelText("Комментарий")).toBeInTheDocument();
  });
});
