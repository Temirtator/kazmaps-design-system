import type { Meta, StoryObj } from "@storybook/react-vite";

import { Textarea } from "./textarea";

const meta: Meta<typeof Textarea> = { title: "Atoms/Textarea", component: Textarea };
export default meta;
export const Default: StoryObj<typeof Textarea> = {
  render: () => <Textarea label="Описание" placeholder="Расскажите о компании" className="w-80" />,
};
