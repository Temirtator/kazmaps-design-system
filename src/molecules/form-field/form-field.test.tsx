import { render, screen } from "@testing-library/react";

import { FormField } from "./form-field";

describe("FormField", () => {
  it("passes field object to render-prop child and links the label", () => {
    render(<FormField label="Имя">{(field) => <input id={field.id} />}</FormField>);
    expect(screen.getByLabelText("Имя")).toBeInTheDocument();
  });

  it("shows error message", () => {
    render(
      <FormField label="Имя" errorMessage="Обязательное поле">
        <input />
      </FormField>,
    );
    expect(screen.getByText("Обязательное поле")).toBeInTheDocument();
  });

  it("provides describedBy and invalid for aria wiring", () => {
    render(
      <FormField label="Имя" errorMessage="Обязательное поле" hint="Как в паспорте">
        {(field) => (
          <input
            id={field.id}
            aria-describedby={field.describedBy}
            aria-invalid={field.invalid || undefined}
          />
        )}
      </FormField>,
    );
    const input = screen.getByLabelText("Имя");
    expect(input).toHaveAccessibleDescription("Обязательное поле Как в паспорте");
    expect(input).toHaveAttribute("aria-invalid", "true");
  });

  it("describedBy is undefined without hint and error", () => {
    let captured: string | undefined = "sentinel";
    render(
      <FormField label="Имя">
        {(field) => {
          captured = field.describedBy;
          return <input id={field.id} />;
        }}
      </FormField>,
    );
    expect(captured).toBeUndefined();
  });
});
