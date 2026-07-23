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

describe("keyboard open/close", () => {
  it("opens on Enter and focuses the first enabled option", async () => {
    const user = userEvent.setup();
    render(<Select label="Город" options={OPTIONS} />);
    await user.tab();
    await user.keyboard("{Enter}");
    expect(screen.getByRole("listbox")).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Алматы" })).toHaveFocus();
  });

  it("opens on Space", async () => {
    const user = userEvent.setup();
    render(<Select label="Город" options={OPTIONS} />);
    await user.tab();
    await user.keyboard(" ");
    expect(screen.getByRole("listbox")).toBeInTheDocument();
  });

  it("ArrowDown on closed trigger opens and focuses the first option", async () => {
    const user = userEvent.setup();
    render(<Select label="Город" options={OPTIONS} />);
    await user.tab();
    await user.keyboard("{ArrowDown}");
    expect(screen.getByRole("option", { name: "Алматы" })).toHaveFocus();
  });

  it("ArrowUp on closed trigger opens and focuses the last enabled option", async () => {
    const user = userEvent.setup();
    render(<Select label="Город" options={OPTIONS} />);
    await user.tab();
    await user.keyboard("{ArrowUp}");
    expect(screen.getByRole("option", { name: "Астана" })).toHaveFocus();
  });

  it("opens focusing the selected option when a value is set", async () => {
    const user = userEvent.setup();
    render(<Select label="Город" options={OPTIONS} value="b" />);
    // Trigger's accessible name comes from the associated <label>, not its
    // visible text (HTML accname algorithm), so match by label, not value.
    await user.click(screen.getByRole("button", { name: /Город/ }));
    expect(screen.getByRole("option", { name: "Астана" })).toHaveFocus();
  });

  it("selecting an option with Enter closes and returns focus to the trigger", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Select label="Город" options={OPTIONS} onChange={onChange} />);
    await user.tab();
    await user.keyboard("{Enter}");
    await user.keyboard("{Enter}"); // Enter по сфокусированной первой опции
    expect(onChange).toHaveBeenCalledWith("a");
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
    // Same accname caveat as above: trigger is named by its <label>.
    expect(screen.getByRole("button", { name: /Город/ })).toHaveFocus();
  });

  it("closes when focus leaves the component", async () => {
    const user = userEvent.setup();
    render(
      <div>
        <Select label="Город" options={OPTIONS} />
        <button type="button">после</button>
      </div>,
    );
    await user.click(screen.getByRole("button", { name: /Город|Выберите/ }));
    expect(screen.getByRole("listbox")).toBeInTheDocument();
    await user.tab(); // option 1 -> option 2 (обе — кнопки в tab-порядке)
    await user.tab(); // option 2 -> "после" (фокус ушёл из компонента)
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });
});

describe("list navigation", () => {
  async function openSelect(user: ReturnType<typeof userEvent.setup>) {
    render(<Select label="Город" options={OPTIONS} />);
    await user.tab();
    await user.keyboard("{Enter}");
  }

  it("ArrowDown/ArrowUp move focus between enabled options, skipping disabled", async () => {
    const user = userEvent.setup();
    await openSelect(user);
    expect(screen.getByRole("option", { name: "Алматы" })).toHaveFocus();
    await user.keyboard("{ArrowDown}");
    expect(screen.getByRole("option", { name: "Астана" })).toHaveFocus();
    await user.keyboard("{ArrowDown}"); // Шымкент disabled — остаёмся на последней доступной
    expect(screen.getByRole("option", { name: "Астана" })).toHaveFocus();
    await user.keyboard("{ArrowUp}");
    expect(screen.getByRole("option", { name: "Алматы" })).toHaveFocus();
  });

  it("Home/End jump to first/last enabled option", async () => {
    const user = userEvent.setup();
    await openSelect(user);
    await user.keyboard("{End}");
    expect(screen.getByRole("option", { name: "Астана" })).toHaveFocus();
    await user.keyboard("{Home}");
    expect(screen.getByRole("option", { name: "Алматы" })).toHaveFocus();
  });

  it("Escape inside the list closes and refocuses the trigger", async () => {
    const user = userEvent.setup();
    await openSelect(user);
    await user.keyboard("{Escape}");
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Город|Выберите/ })).toHaveFocus();
  });

  it("listbox is labelled by the field label", async () => {
    const user = userEvent.setup();
    await openSelect(user);
    expect(screen.getByRole("listbox", { name: "Город" })).toBeInTheDocument();
  });
});
