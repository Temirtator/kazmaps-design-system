import { act, renderHook } from "@testing-library/react";

import { findRegion } from "../../data/regions";
import { usePhoneMask } from "./use-phone-mask";

describe("usePhoneMask", () => {
  it("seeds from a controlled E.164 value", () => {
    const { result } = renderHook(() => usePhoneMask({ value: "+77012345678" }));
    expect(result.current.region.iso).toBe("KZ");
    expect(result.current.formatted).toBe("(701) 234-56-78");
  });

  it("emits E.164 on change and resets national on region switch", () => {
    const onChange = vi.fn();
    const { result } = renderHook(() => usePhoneMask({ onChange }));
    act(() => result.current.handleChange({ target: { value: "(701) 234-56-78" } } as never));
    expect(onChange).toHaveBeenLastCalledWith(
      expect.objectContaining({ e164: "+77012345678", complete: true }),
    );
    act(() => result.current.selectRegion(findRegion("RU")!));
    expect(onChange).toHaveBeenLastCalledWith(
      expect.objectContaining({ region: "RU", national: "" }),
    );
    expect(result.current.open).toBe(false);
  });
});
