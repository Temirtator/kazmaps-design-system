import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";

import { SegmentedControl } from "./segmented-control";

const OPTIONS = [
  { value: "day", label: "День" },
  { value: "week", label: "Неделя" },
];

describe("SegmentedControl", () => {
  it("fires onChange with the clicked value", async () => {
    const onChange = vi.fn();
    render(<SegmentedControl options={OPTIONS} value="day" onChange={onChange} />);
    await userEvent.click(screen.getByText("Неделя"));
    expect(onChange).toHaveBeenCalledWith("week");
  });

  it("exposes radiogroup semantics", () => {
    render(<SegmentedControl options={OPTIONS} value="day" onChange={vi.fn()} />);
    expect(screen.getByRole("radiogroup", { name: "Переключатель" })).toBeInTheDocument();
    expect(screen.getByRole("radio", { name: "День" })).toHaveAttribute("aria-checked", "true");
    expect(screen.getByRole("radio", { name: "Неделя" })).toHaveAttribute("aria-checked", "false");
  });

  it("arrows move selection with wrap", async () => {
    function Harness() {
      const [v, setV] = useState("day");
      return <SegmentedControl options={OPTIONS} value={v} onChange={setV} />;
    }
    const user = userEvent.setup();
    render(<Harness />);
    await user.tab();
    expect(screen.getByRole("radio", { name: "День" })).toHaveFocus();
    await user.keyboard("{ArrowRight}");
    expect(screen.getByRole("radio", { name: "Неделя" })).toHaveAttribute("aria-checked", "true");
    expect(screen.getByRole("radio", { name: "Неделя" })).toHaveFocus();
    await user.keyboard("{ArrowRight}"); // wrap
    expect(screen.getByRole("radio", { name: "День" })).toHaveAttribute("aria-checked", "true");
  });
});
