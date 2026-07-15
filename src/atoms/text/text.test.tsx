import { render, screen } from "@testing-library/react";

import { Text } from "./text";

describe("Text", () => {
  it("renders muted color token", () => {
    render(<Text color="muted">текст</Text>);
    expect(screen.getByText("текст").className).toContain("var(--muted)");
  });
});
