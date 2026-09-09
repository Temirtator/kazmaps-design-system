import { act, renderHook } from "@testing-library/react";

import { REGIONS } from "../../data/regions";
import { useRegionPicker } from "./use-region-picker";

function setup(onSelect = vi.fn(), onClose = vi.fn()) {
  return renderHook(() =>
    useRegionPicker({ id: "p", regions: REGIONS, value: "KZ", onSelect, onClose }),
  );
}

describe("useRegionPicker", () => {
  it("starts on the selected region and filters by name or dial code", () => {
    const { result } = setup();
    expect(result.current.ordered[result.current.active]?.iso).toBe("KZ");
    act(() => result.current.setQuery("+99"));
    expect(result.current.ordered.every((r) => r.dial.startsWith("99"))).toBe(true);
    expect(result.current.active).toBe(0);
  });

  it("moves with arrows, selects with Enter, closes with Escape", () => {
    const onSelect = vi.fn();
    const onClose = vi.fn();
    const { result } = setup(onSelect, onClose);
    const key = (k: string) =>
      act(() =>
        result.current.onKeyDown({
          key: k,
          preventDefault: vi.fn(),
          stopPropagation: vi.fn(),
        } as never),
      );
    const start = result.current.active;
    key("ArrowDown");
    expect(result.current.active).toBe(start + 1);
    key("Enter");
    expect(onSelect).toHaveBeenCalledWith(result.current.ordered[start + 1]);
    key("Escape");
    expect(onClose).toHaveBeenCalledWith("escape");
  });

  it("closes on blur outside the root", () => {
    const onClose = vi.fn();
    const { result } = setup(vi.fn(), onClose);
    const root = document.createElement("div");
    act(() => result.current.onSearchBlur({ relatedTarget: document.body } as never, root));
    expect(onClose).toHaveBeenCalledWith("blur");
  });
});
