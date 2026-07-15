import type { Meta, StoryObj } from "@storybook/react-vite";

import { Text } from "./text";

const meta: Meta<typeof Text> = { title: "Atoms/Text", component: Text };
export default meta;
export const Colors: StoryObj<typeof Text> = {
  render: () => (
    <div className="flex flex-col gap-1">
      <Text color="default">Обычный текст</Text>
      <Text color="muted">Приглушённый</Text>
      <Text color="error">Ошибка</Text>
      <Text color="success">Успех</Text>
    </div>
  ),
};
