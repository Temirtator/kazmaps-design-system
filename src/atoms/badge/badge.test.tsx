import { render, screen } from "@testing-library/react";

import { Badge } from "./badge";

describe("Badge", () => {
  it("renders success variant with token class", () => {
    render(<Badge variant="success">Готово</Badge>);
    expect(screen.getByText("Готово").className).toContain("var(--success");
  });
});
