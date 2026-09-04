import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";

import { PhoneInput, type PhoneValue } from "./phone-input";

const meta: Meta<typeof PhoneInput> = { title: "Molecules/PhoneInput", component: PhoneInput };
export default meta;

export const States: StoryObj<typeof PhoneInput> = {
  render: () => (
    <div className="flex w-80 flex-col gap-4">
      <PhoneInput label="Пусто" hint="Код придёт в WhatsApp или по SMS" />
      <PhoneInput label="Заполнено" defaultValue="+77012345678" />
      <PhoneInput
        label="Ошибка"
        defaultValue="+7701234"
        error="Введите номер полностью — 10 цифр после +7"
      />
      <PhoneInput label="Другой регион" defaultValue="+998901234567" hint="Код придёт в WhatsApp" />
      <PhoneInput label="Недоступно" defaultValue="+77012345678" disabled />
    </div>
  ),
};

export const Sizes: StoryObj<typeof PhoneInput> = {
  render: () => (
    <div className="flex w-80 flex-col gap-4">
      <PhoneInput label="md · формы кабинета" size="md" />
      <PhoneInput label="lg · auth" size="lg" />
    </div>
  ),
};

export const Regions: StoryObj<typeof PhoneInput> = {
  render: () => (
    <div className="flex w-80 flex-col gap-4">
      <PhoneInput label="Только KZ и RU" regions={["KZ", "RU"]} />
      <PhoneInput
        label="English"
        locale="en"
        labels={{
          region: "Region",
          search: "Country or code",
          groupCis: "Kazakhstan & CIS",
          groupOther: "Other countries",
          noResults: "No results",
        }}
      />
    </div>
  ),
};

function LiveDemo() {
  const [value, setValue] = useState<PhoneValue | null>(null);
  return (
    <div className="flex w-80 flex-col gap-3">
      <PhoneInput label="Номер телефона" size="lg" onChange={setValue} />
      <pre data-testid="readout" className="text-[length:var(--text-xs)] text-[var(--muted)]">
        {JSON.stringify(value)}
      </pre>
    </div>
  );
}
export const Live: StoryObj<typeof PhoneInput> = { render: () => <LiveDemo /> };
