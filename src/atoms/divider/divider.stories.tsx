import type { Meta, StoryObj } from "@storybook/react-vite";

import { Divider } from "./divider";

const meta: Meta<typeof Divider> = { title: "Atoms/Divider", component: Divider };
export default meta;
export const Plain: StoryObj<typeof Divider> = { render: () => <Divider /> };
export const Labeled: StoryObj<typeof Divider> = { render: () => <Divider label="или" /> };
