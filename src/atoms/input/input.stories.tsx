import type { Meta, StoryObj } from "@storybook/react-vite";

import { Input } from "./input";

const meta: Meta<typeof Input> = { title: "Atoms/Input", component: Input };
export default meta;
export const States: StoryObj<typeof Input> = {
  render: () => (
    <div className="flex w-80 flex-col gap-4">
      <Input label="Название" placeholder="ТОО Ромашка" />
      <Input label="Телефон" mask="phone" hint="Формат +7" />
      <Input label="Email" error="Неверный формат" defaultValue="not-an-email" />
      <Input label="Пароль" type="password" revealable />
      <Input label="Недоступно" disabled placeholder="disabled" />
    </div>
  ),
};
