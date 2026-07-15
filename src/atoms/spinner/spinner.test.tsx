import { render } from "@testing-library/react";

import { Spinner } from "./spinner";

describe("Spinner", () => {
  it("renders and merges className", () => {
    const { container } = render(<Spinner className="mt-2" />);
    expect((container.firstChild as HTMLElement).className).toContain("mt-2");
  });
});
