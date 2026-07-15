import type { Meta, StoryObj } from "@storybook/react-vite";

import { Avatar } from "./avatar";

const meta: Meta<typeof Avatar> = { title: "Atoms/Avatar", component: Avatar };
export default meta;
export const Grid: StoryObj<typeof Avatar> = {
  render: () => (
    <div className="flex items-center gap-3">
      <Avatar name="Иван Петров" size="sm" />
      <Avatar name="Асель Нурланова" size="md" />
      <Avatar name="KazMaps" size="lg" shape="square" />
    </div>
  ),
};
