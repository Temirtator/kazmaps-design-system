import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { SearchInput } from "./search-input";

describe("SearchInput", () => {
  it("emits string value on typing", async () => {
    const onChange = vi.fn();
    render(<SearchInput value="" onChange={onChange} placeholder="Поиск" />);
    await userEvent.type(screen.getByPlaceholderText("Поиск"), "а");
    expect(onChange).toHaveBeenCalledWith("а");
  });
});
