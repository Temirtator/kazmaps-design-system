import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";

import { PhoneInput, type PhoneValue } from "./phone-input";

const last = (fn: ReturnType<typeof vi.fn>) => fn.mock.calls.at(-1)?.[0] as PhoneValue;

describe("PhoneInput", () => {
  it("renders label, KZ trigger and helper", () => {
    render(<PhoneInput label="Номер телефона" hint="Код придёт в WhatsApp" />);
    expect(screen.getByLabelText("Номер телефона")).toHaveAttribute("type", "tel");
    expect(screen.getByRole("button", { name: /Регион/ })).toHaveTextContent("+7");
    expect(screen.getByText("Код придёт в WhatsApp")).toBeInTheDocument();
  });

  it("masks typed digits and reports E.164 once complete", async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(<PhoneInput label="Телефон" onChange={onChange} />);
    const input = screen.getByLabelText("Телефон");
    await user.type(input, "701234");
    expect(input).toHaveValue("(701) 234-__-__");
    expect(last(onChange)).toMatchObject({
      e164: "",
      national: "701234",
      complete: false,
      region: "KZ",
    });
    await user.type(input, "5678");
    expect(input).toHaveValue("(701) 234-56-78");
    expect(last(onChange)).toEqual({
      e164: "+77012345678",
      national: "7012345678",
      complete: true,
      region: "KZ",
    });
  });

  it("stays empty on focus and treats the bare template as empty", async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(<PhoneInput label="Телефон" onChange={onChange} />);
    const input = screen.getByLabelText("Телефон");
    await user.click(input);
    expect(input).toHaveValue("");
    await user.type(input, "0");
    expect(input).toHaveValue("(70_) ___-__-__");
    await user.keyboard("{Backspace}");
    expect(last(onChange).national).toBe("");
    await user.tab();
    expect(input).toHaveValue("");
  });

  it.each(["87012345678", "+7 701 234 56 78", "77012345678"])(
    "normalizes pasted %s to one KZ number",
    async (pasted) => {
      const onChange = vi.fn();
      const user = userEvent.setup();
      render(<PhoneInput label="Телефон" onChange={onChange} />);
      const input = screen.getByLabelText("Телефон");
      await user.click(input);
      await user.paste(pasted);
      expect(input).toHaveValue("(701) 234-56-78");
      expect(last(onChange).e164).toBe("+77012345678");
    },
  );

  it("switches region when a foreign +dial is pasted", async () => {
    const onChange = vi.fn();
    const onRegionChange = vi.fn();
    const user = userEvent.setup();
    render(<PhoneInput label="Телефон" onChange={onChange} onRegionChange={onRegionChange} />);
    const input = screen.getByLabelText("Телефон");
    await user.click(input);
    await user.paste("+998901234567");
    expect(onRegionChange).toHaveBeenCalledWith("UZ");
    expect(screen.getByRole("button", { name: /Регион/ })).toHaveTextContent("+998");
    expect(input).toHaveValue("90 123-45-67");
    expect(last(onChange)).toEqual({
      e164: "+998901234567",
      national: "901234567",
      complete: true,
      region: "UZ",
    });
  });

  it("generic region: grouped digits, completeness by E.164 length", async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(<PhoneInput label="Телефон" defaultRegion="US" onChange={onChange} />);
    const input = screen.getByLabelText("Телефон");
    await user.type(input, "2125551234");
    expect(input).toHaveValue("212 555 123 4");
    expect(last(onChange)).toEqual({
      e164: "+12125551234",
      national: "2125551234",
      complete: true,
      region: "US",
    });
  });

  it("controlled value seeds region and digits; parent may keep an empty string while typing", async () => {
    function Harness() {
      const [v, setV] = useState("+998901234567");
      return (
        <>
          <PhoneInput label="Телефон" value={v} onChange={(x) => setV(x.e164)} />
          <output data-testid="out">{v}</output>
        </>
      );
    }
    const user = userEvent.setup();
    render(<Harness />);
    const input = screen.getByLabelText("Телефон");
    expect(input).toHaveValue("90 123-45-67");
    expect(screen.getByRole("button", { name: /Регион/ })).toHaveTextContent("+998");
    await user.type(input, "{Backspace}");
    expect(screen.getByTestId("out")).toHaveTextContent("");
    expect(input).toHaveValue("90 123-45-6_");
    await user.type(input, "7");
    expect(screen.getByTestId("out")).toHaveTextContent("+998901234567");
  });

  it("works under react-hook-form Controller", async () => {
    const submitted = vi.fn();
    function Form() {
      const { control, handleSubmit } = useForm<{ phone: string }>({
        defaultValues: { phone: "" },
      });
      return (
        <form
          onSubmit={(e) =>
            void handleSubmit((d) => {
              submitted(d);
            })(e)
          }
        >
          <Controller
            name="phone"
            control={control}
            render={({ field }) => (
              <PhoneInput
                label="Телефон"
                value={field.value}
                onChange={(v) => field.onChange(v.e164)}
                onBlur={field.onBlur}
              />
            )}
          />
          <button type="submit">Отправить</button>
        </form>
      );
    }
    const user = userEvent.setup();
    render(<Form />);
    await user.type(screen.getByLabelText("Телефон"), "7012345678");
    await user.click(screen.getByRole("button", { name: "Отправить" }));
    expect(submitted).toHaveBeenCalledWith({ phone: "+77012345678" });
  });

  it("opens the picker, selects a region, resets digits and refocuses the input", async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(<PhoneInput label="Телефон" onChange={onChange} />);
    await user.type(screen.getByLabelText("Телефон"), "701");
    await user.click(screen.getByRole("button", { name: /Регион/ }));
    expect(screen.getByRole("listbox")).toBeInTheDocument();
    await user.click(screen.getByRole("option", { name: /Узбекистан/ }));
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
    expect(screen.getByLabelText("Телефон")).toHaveFocus();
    expect(screen.getByLabelText("Телефон")).toHaveValue("");
    expect(last(onChange)).toMatchObject({ region: "UZ", national: "", e164: "" });
  });

  it("shows error and disables", () => {
    render(<PhoneInput label="Телефон" error="Введите номер полностью" disabled />);
    expect(screen.getByLabelText("Телефон")).toBeDisabled();
    expect(screen.getByLabelText("Телефон")).toHaveAttribute("aria-invalid", "true");
    expect(screen.getByText("Введите номер полностью")).toBeInTheDocument();
  });

  it("restricts regions and overrides labels", async () => {
    const user = userEvent.setup();
    render(
      <PhoneInput label="Phone" regions={["KZ", "US"]} labels={{ region: "Region" }} locale="en" />,
    );
    await user.click(screen.getByRole("button", { name: /Region/ }));
    expect(screen.getAllByRole("option")).toHaveLength(2);
  });

  it("keeps the typed digits when the already selected region is picked again", async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(<PhoneInput label="Телефон" onChange={onChange} />);
    await user.type(screen.getByLabelText("Телефон"), "701");
    await user.click(screen.getByRole("button", { name: /Регион/ }));
    await user.click(screen.getByRole("option", { name: /Казахстан/ }));
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
    expect(screen.getByLabelText("Телефон")).toHaveFocus();
    expect(screen.getByLabelText("Телефон")).toHaveValue("(701) ___-__-__");
    expect(last(onChange).national).toBe("701");
  });

  it("puts the caret at the edit position when a mid-string edit is renormalized", async () => {
    const user = userEvent.setup();
    render(<PhoneInput label="Телефон" />);
    const input = screen.getByLabelText<HTMLInputElement>("Телефон");
    await user.type(input, "7012345678");
    input.setSelectionRange(2, 2);
    await user.keyboard("{Delete}");
    expect(input).toHaveValue("(712) 345-67-8_");
    await user.keyboard("0");
    expect(input).toHaveValue("(701) 234-56-78");
    expect(input.selectionStart).toBe(3);
  });

  it("closes an open picker when the trigger is clicked again", async () => {
    const user = userEvent.setup();
    render(<PhoneInput label="Телефон" />);
    const trigger = screen.getByRole("button", { name: /Регион/ });
    await user.click(trigger);
    expect(screen.getByRole("listbox")).toBeInTheDocument();
    await user.click(trigger);
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });
});
