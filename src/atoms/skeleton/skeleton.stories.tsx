import type { Meta, StoryObj } from "@storybook/react-vite";

import { Skeleton } from "./skeleton";

const meta: Meta<typeof Skeleton> = { title: "Atoms/Skeleton", component: Skeleton };
export default meta;
export const CardShape: StoryObj<typeof Skeleton> = {
  render: () => (
    <div className="flex w-64 flex-col gap-2">
      <Skeleton className="h-24 w-full" />
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
    </div>
  ),
};
