import type { Meta, StoryObj } from "@storybook/react-vite";

import { Caption } from "./caption";

const meta: Meta<typeof Caption> = { title: "Atoms/Caption", component: Caption };
export default meta;
export const Default: StoryObj<typeof Caption> = { render: () => <Caption>Раздел</Caption> };
