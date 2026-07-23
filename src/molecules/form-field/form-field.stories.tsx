import type { Meta, StoryObj } from "@storybook/react-vite";

import { Input } from "../../atoms/input";
import { FormField } from "./form-field";

const meta: Meta<typeof FormField> = { title: "Molecules/FormField", component: FormField };
export default meta;
export const WithError: StoryObj<typeof FormField> = {
  render: () => (
    <div className="w-80">
      <FormField
        label="Название компании"
        required
        errorMessage="Обязательное поле"
        hint="Как в реестре"
      >
        {(field) => <Input id={field.id} placeholder="ТОО Ромашка" />}
      </FormField>
    </div>
  ),
};
