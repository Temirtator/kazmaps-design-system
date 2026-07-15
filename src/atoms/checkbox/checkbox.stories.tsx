import type { Meta, StoryObj } from "@storybook/react-vite";

import { Checkbox } from "./checkbox";

const meta: Meta<typeof Checkbox> = { title: "Atoms/Checkbox", component: Checkbox };
export default meta;
export const States: StoryObj<typeof Checkbox> = {
  render: () => (
    <div className="flex flex-col gap-2">
      <Checkbox label="По умолчанию" />
      <Checkbox label="Отмечен" defaultChecked />
      <Checkbox label="Недоступен" disabled />
    </div>
  ),
};
