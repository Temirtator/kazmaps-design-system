import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";

import { StarRating } from "./star-rating";

describe("StarRating", () => {
  it("emits the clicked star index (1-based)", async () => {
    const onChange = vi.fn();
    render(<StarRating value={2} onChange={onChange} />);
    const stars = screen.getAllByRole("button");
    expect(stars).toHaveLength(5);
    await userEvent.click(stars[3]);
    expect(onChange).toHaveBeenCalledWith(4);
  });

  it("renders non-interactively without onChange", () => {
    render(<StarRating value={3} />);
    expect(screen.queryAllByRole("button")).toHaveLength(0);
  });
});
