import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";

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

  it("display mode exposes role img with a rating label", () => {
    render(<StarRating value={3} />);
    expect(screen.getByRole("img", { name: "Оценка: 3 из 5" })).toBeInTheDocument();
  });

  it("interactive mode is a radiogroup of five stars", () => {
    render(<StarRating value={2} onChange={vi.fn()} />);
    expect(screen.getByRole("radiogroup", { name: "Оценка" })).toBeInTheDocument();
    expect(screen.getAllByRole("radio")).toHaveLength(5);
    expect(screen.getByRole("radio", { name: "2 из 5" })).toHaveAttribute("aria-checked", "true");
  });

  it("arrows change the rating and move focus", async () => {
    function Harness() {
      const [v, setV] = useState(2);
      return <StarRating value={v} onChange={setV} />;
    }
    const user = userEvent.setup();
    render(<Harness />);
    await user.tab();
    expect(screen.getByRole("radio", { name: "2 из 5" })).toHaveFocus();
    await user.keyboard("{ArrowRight}");
    expect(screen.getByRole("radio", { name: "3 из 5" })).toHaveFocus();
    expect(screen.getByRole("radio", { name: "3 из 5" })).toHaveAttribute("aria-checked", "true");
    await user.keyboard("{ArrowLeft}");
    expect(screen.getByRole("radio", { name: "2 из 5" })).toHaveAttribute("aria-checked", "true");
  });

  it("formatRating overrides the display-mode rating label", () => {
    render(<StarRating value={3} formatRating={(v, max) => `${v} of ${max}`} />);
    expect(screen.getByRole("img", { name: "Оценка: 3 of 5" })).toBeInTheDocument();
  });

  it("formatRating overrides the per-star label in interactive mode", () => {
    render(<StarRating value={2} onChange={vi.fn()} formatRating={(v, max) => `${v} of ${max}`} />);
    expect(screen.getByRole("radio", { name: "2 of 5" })).toHaveAttribute("aria-checked", "true");
    expect(screen.getByRole("radio", { name: "5 of 5" })).toBeInTheDocument();
  });

  it("keeps exactly one roving tab stop when value is fractional", () => {
    render(<StarRating value={3.4} onChange={vi.fn()} />);
    const stops = screen.getAllByRole("radio").filter((el) => el.tabIndex === 0);
    expect(stops).toHaveLength(1);
    expect(stops[0]).toHaveAttribute("aria-label", "3 из 5");
  });
});
