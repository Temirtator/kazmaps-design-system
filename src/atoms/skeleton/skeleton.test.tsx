import { render } from "@testing-library/react";

import { Skeleton } from "./skeleton";

describe("Skeleton", () => {
  it("merges className", () => {
    const { container } = render(<Skeleton className="h-4 w-24" />);
    expect((container.firstChild as HTMLElement).className).toContain("w-24");
  });
});
