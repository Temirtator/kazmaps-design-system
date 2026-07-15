import { render, screen } from "@testing-library/react";

import { Divider } from "./divider";

describe("Divider", () => {
  it("renders a label when given", () => {
    render(<Divider label="или" />);
    expect(screen.getByText("или")).toBeInTheDocument();
  });
});
