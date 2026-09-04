import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";

import { Input } from "./input";

describe("Input", () => {
  it("wires label to input", () => {
    render(<Input label="Телефон" />);
    expect(screen.getByLabelText("Телефон")).toBeInTheDocument();
  });
  it("shows error text", () => {
    render(<Input label="Email" error="Неверный формат" />);
    expect(screen.getByText("Неверный формат")).toBeInTheDocument();
  });
  it("reveals password when revealable", async () => {
    render(<Input label="Пароль" type="password" revealable />);
    const input = screen.getByLabelText("Пароль");
    expect(input).toHaveAttribute("type", "password");
    await userEvent.click(screen.getByRole("button"));
    expect(input).toHaveAttribute("type", "text");
  });
  it("reveal button is keyboard reachable and toggles visibility", async () => {
    const user = userEvent.setup();
    render(<Input label="Пароль" type="password" revealable />);
    const input = screen.getByLabelText("Пароль");
    await user.tab();
    expect(input).toHaveFocus();
    await user.tab();
    expect(screen.getByRole("button", { name: "Показать пароль" })).toHaveFocus();
    await user.keyboard("{Enter}");
    expect(input).toHaveAttribute("type", "text");
    expect(screen.getByRole("button", { name: "Скрыть пароль" })).toBeInTheDocument();
  });
  it("reveal button labels are overridable", async () => {
    const user = userEvent.setup();
    render(
      <Input
        label="Password"
        type="password"
        revealable
        revealLabel="Show password"
        hideLabel="Hide password"
      />,
    );
    const button = screen.getByRole("button", { name: "Show password" });
    await user.click(button);
    expect(screen.getByRole("button", { name: "Hide password" })).toBeInTheDocument();
  });

  describe('mask="phone"', () => {
    it("formats typed digits with hyphens and a fixed 7", async () => {
      const onChange = vi.fn();
      const user = userEvent.setup();
      render(<Input label="Телефон" mask="phone" onChange={onChange} />);
      const input = screen.getByLabelText("Телефон");
      await user.type(input, "7012345678");
      expect(input).toHaveValue("+7 (701) 234-56-78");
      expect(
        (onChange.mock.calls.at(-1)?.[0] as React.ChangeEvent<HTMLInputElement>).target.value,
      ).toBe("+7 (701) 234-56-78");
    });
    it("stays empty on focus and normalizes a pasted 8-prefixed number", async () => {
      const user = userEvent.setup();
      render(<Input label="Телефон" mask="phone" />);
      const input = screen.getByLabelText("Телефон");
      await user.click(input);
      expect(input).toHaveValue("");
      await user.paste("87012345678");
      expect(input).toHaveValue("+7 (701) 234-56-78");
    });
    it("works controlled (Controller-style value/onChange)", async () => {
      function Harness() {
        const [v, setV] = useState("");
        return (
          <Input label="Телефон" mask="phone" value={v} onChange={(e) => setV(e.target.value)} />
        );
      }
      const user = userEvent.setup();
      render(<Harness />);
      await user.type(screen.getByLabelText("Телефон"), "701");
      expect(screen.getByLabelText("Телефон")).toHaveValue("+7 (701) ___-__-__");
    });
  });
});
