import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { PhoneInput } from "./phone-input";

describe("maps PhoneInput", () => {
  it("masks KZ input and reports E.164", async () => {
    const onChange = vi.fn();
    render(<PhoneInput label="Телефон" onChange={onChange} />);
    const input = screen.getByLabelText("Телефон");
    await userEvent.type(input, "7012345678");
    expect(input).toHaveValue("(701) 234-56-78");
    expect(onChange).toHaveBeenLastCalledWith(
      expect.objectContaining({ e164: "+77012345678", complete: true }),
    );
  });

  it("opens the region picker and switches region", async () => {
    render(<PhoneInput label="Телефон" />);
    await userEvent.click(screen.getByRole("button", { name: /Регион/ }));
    expect(screen.getByRole("listbox")).toBeVisible();
    await userEvent.type(screen.getByRole("searchbox"), "Росс");
    await userEvent.keyboard("{Enter}");
    expect(screen.getByRole("button", { name: /Регион: Россия/ })).toBeInTheDocument();
  });
});
