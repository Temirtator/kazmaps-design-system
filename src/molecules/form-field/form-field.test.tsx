import { render, screen } from "@testing-library/react";

import { FormField } from "./form-field";

describe("FormField", () => {
  it("passes generated id to render-prop child and links the label", () => {
    render(<FormField label="Имя">{(id) => <input id={id} />}</FormField>);
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
});
