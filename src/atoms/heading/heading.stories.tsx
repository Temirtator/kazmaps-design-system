import type { Meta, StoryObj } from "@storybook/react-vite";

import { Heading } from "./heading";

const meta: Meta<typeof Heading> = { title: "Atoms/Heading", component: Heading };
export default meta;
export const Sizes: StoryObj<typeof Heading> = {
  render: () => (
    <div className="flex flex-col gap-2">
      <Heading as="h1" size="xl">
        Размер xl
      </Heading>
      <Heading as="h2" size="lg">
        Размер lg
      </Heading>
      <Heading as="h3" size="md">
        Размер md
      </Heading>
      <Heading as="h4" size="sm">
        Размер sm
      </Heading>
    </div>
  ),
};
