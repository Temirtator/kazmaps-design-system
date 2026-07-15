import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Select } from "./select";

const OPTIONS = [
  { value: "a", label: "Алматы" },
  { value: "b", label: "Астана" },
  { value: "c", label: "Шымкент", disabled: true },
];

describe("Select", () => {
  it("opens on click and selects an option", async () => {
    const onChange = vi.fn();
    render(<Select label="Город" options={OPTIONS} placeholder="Выберите" onChange={onChange} />);
    await userEvent.click(screen.getByRole("button"));
    await userEvent.click(screen.getByText("Астана"));
    expect(onChange).toHaveBeenCalledWith("b");
  });

  it("does not select a disabled option", async () => {
    const onChange = vi.fn();
    render(<Select label="Город" options={OPTIONS} onChange={onChange} />);
    await userEvent.click(screen.getByRole("button"));
    await userEvent.click(screen.getByText("Шымкент"));
    expect(onChange).not.toHaveBeenCalled();
  });

  it("closes on outside click", async () => {
    render(
      <div>
        <Select label="Город" options={OPTIONS} />
        <button type="button">снаружи</button>
      </div>,
    );
    await userEvent.click(screen.getByRole("button", { name: /Город|Выберите/ }));
    expect(screen.getByText("Алматы")).toBeInTheDocument();
    await userEvent.click(screen.getByRole("button", { name: "снаружи" }));
    expect(screen.queryByText("Алматы")).not.toBeInTheDocument();
  });
});
