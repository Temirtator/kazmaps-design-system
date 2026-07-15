import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";

import { Select } from "./select";

const meta: Meta<typeof Select> = { title: "Atoms/Select", component: Select };
export default meta;
export const Interactive: StoryObj<typeof Select> = {
  render: function Render() {
    const [value, setValue] = useState<string>();
    return (
      <div className="w-72">
        <Select
          label="Город"
          placeholder="Выберите город"
          value={value}
          onChange={setValue}
          options={[
            { value: "almaty", label: "Алматы" },
            { value: "astana", label: "Астана" },
            { value: "shymkent", label: "Шымкент" },
          ]}
        />
      </div>
    );
  },
};
export const WithError: StoryObj<typeof Select> = {
  render: () => (
    <div className="w-72">
      <Select label="Категория" error="Обязательное поле" options={[{ value: "x", label: "X" }]} />
    </div>
  ),
};
