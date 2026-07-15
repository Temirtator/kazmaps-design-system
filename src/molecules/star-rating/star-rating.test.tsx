import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { StarRating } from "./star-rating";

describe("StarRating", () => {
  it("emits the clicked star index (1-based)", async () => {
    const onChange = vi.fn();
    const { container } = render(<StarRating value={2} onChange={onChange} />);
    const stars = container.querySelectorAll("svg");
    expect(stars).toHaveLength(5);
    await userEvent.click(stars[3]);
    expect(onChange).toHaveBeenCalledWith(4);
  });

  it("renders non-interactively without onChange", () => {
    const { container } = render(<StarRating value={3} />);
    expect(container.querySelectorAll("svg")).toHaveLength(5);
    expect(container.querySelectorAll("button")).toHaveLength(0);
    expect((container.firstChild as HTMLElement).className).toContain("cursor-default");
  });
});
