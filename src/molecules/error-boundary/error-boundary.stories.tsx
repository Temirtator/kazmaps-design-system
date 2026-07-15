import type { Meta, StoryObj } from "@storybook/react-vite";

import { ErrorBoundary } from "./error-boundary";

function Boom(): never {
  throw new Error("Не удалось загрузить блок");
}

const meta: Meta<typeof ErrorBoundary> = {
  title: "Molecules/ErrorBoundary",
  component: ErrorBoundary,
};
export default meta;
export const Caught: StoryObj<typeof ErrorBoundary> = {
  render: () => (
    <ErrorBoundary>
      <Boom />
    </ErrorBoundary>
  ),
};
