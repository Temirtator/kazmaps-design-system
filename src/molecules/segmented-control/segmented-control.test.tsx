import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

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
});
