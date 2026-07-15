import type { Meta, StoryObj } from "@storybook/react-vite";

import { ChipPill } from "./chip-pill";

const meta: Meta<typeof ChipPill> = { title: "Atoms/ChipPill", component: ChipPill };
export default meta;
export const Row: StoryObj<typeof ChipPill> = {
  render: () => (
    <div className="flex gap-2">
      <ChipPill label="Все" selected />
      <ChipPill label="Салоны" />
      <ChipPill label="Клиники" disabled />
    </div>
  ),
};
