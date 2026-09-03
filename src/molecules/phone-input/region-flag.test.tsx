import { render } from "@testing-library/react";

import { RegionFlag } from "./region-flag";

describe("RegionFlag", () => {
  it("renders an svg for CIS regions", () => {
    const { container } = render(<RegionFlag iso="KZ" />);
    expect(container.querySelector("svg")).not.toBeNull();
    expect(container.firstElementChild).toHaveAttribute("aria-hidden", "true");
  });
  it("falls back to an ISO chip for other regions", () => {
    const { container, getByText } = render(<RegionFlag iso="US" />);
    expect(container.querySelector("svg")).toBeNull();
    expect(getByText("US")).toBeInTheDocument();
  });
});
