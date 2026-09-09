import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";

import { PhoneInput, type PhoneValue } from "./phone-input";

const meta: Meta<typeof PhoneInput> = { title: "Maps kit/PhoneInput", component: PhoneInput };
export default meta;

export const States: StoryObj<typeof PhoneInput> = {
  render: () => (
    <div className="flex w-[340px] flex-col gap-4">
      <PhoneInput label="Пусто" hint="Код придёт в WhatsApp" />
      <PhoneInput label="Заполнено" defaultValue="+77012345678" />
      <PhoneInput label="Ошибка" defaultValue="+7701234" error="Введите номер полностью" />
    </div>
  ),
};

function LiveDemo() {
  const [value, setValue] = useState<PhoneValue | null>(null);
  return (
    <div className="flex w-[340px] flex-col gap-3">
      <PhoneInput label="Номер телефона" onChange={setValue} />
      <pre data-testid="readout" className="text-[12px] text-(color:--text-tertiary)">
        {JSON.stringify(value)}
      </pre>
    </div>
  );
}

export const Live: StoryObj<typeof PhoneInput> = { render: () => <LiveDemo /> };
