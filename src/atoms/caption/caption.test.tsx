import { render, screen } from "@testing-library/react";

import { Caption } from "./caption";

describe("Caption", () => {
  it("renders uppercase caption", () => {
    render(<Caption>метка</Caption>);
    expect(screen.getByText("метка").className).toContain("uppercase");
  });
});
