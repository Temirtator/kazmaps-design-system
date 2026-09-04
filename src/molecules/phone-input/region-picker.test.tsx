import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { REGIONS } from "../../data/regions";
import { DEFAULT_LABELS, RegionPicker } from "./region-picker";

function setup(over: Partial<React.ComponentProps<typeof RegionPicker>> = {}) {
  const onSelect = vi.fn();
  const onClose = vi.fn();
  render(
    <RegionPicker
      id="p"
      regions={REGIONS}
      value="KZ"
      locale="ru"
      labels={DEFAULT_LABELS}
      onSelect={onSelect}
      onClose={onClose}
      {...over}
    />,
  );
  return { onSelect, onClose, user: userEvent.setup() };
}

describe("RegionPicker", () => {
  it("focuses the search box and lists groups", () => {
    setup();
    expect(screen.getByRole("searchbox", { name: "Страна или код" })).toHaveFocus();
    expect(screen.getByText("Казахстан и СНГ")).toBeInTheDocument();
    expect(screen.getByText("Другие страны")).toBeInTheDocument();
    expect(screen.getByRole("option", { name: /Казахстан/ })).toHaveAttribute(
      "aria-selected",
      "true",
    );
  });
  it("filters by name, ISO and dial code", async () => {
    const { user } = setup();
    await user.keyboard("узб");
    expect(screen.getAllByRole("option")).toHaveLength(1);
    await user.clear(screen.getByRole("searchbox"));
    await user.keyboard("+998");
    expect(screen.getByRole("option", { name: /Узбекистан/ })).toBeInTheDocument();
    await user.clear(screen.getByRole("searchbox"));
    await user.keyboard("zzz");
    expect(screen.getByText("Ничего не найдено")).toBeInTheDocument();
  });
  it("selects with keyboard and closes on Escape", async () => {
    const { user, onSelect, onClose } = setup();
    await user.keyboard("{ArrowDown}{ArrowDown}{Enter}");
    expect(onSelect).toHaveBeenCalledWith(expect.objectContaining({ iso: "KG" }));
    await user.keyboard("{Escape}");
    expect(onClose).toHaveBeenCalledWith("escape");
  });
  it("closes with reason blur when focus leaves the popover", async () => {
    const { user, onClose } = setup();
    await user.tab();
    expect(onClose).toHaveBeenCalledWith("blur");
  });
  it("selects with mouse and shows English names for locale=en", async () => {
    const { user, onSelect } = setup({ locale: "en" });
    await user.click(screen.getByRole("option", { name: /Uzbekistan/ }));
    expect(onSelect).toHaveBeenCalledWith(expect.objectContaining({ iso: "UZ" }));
  });
});
