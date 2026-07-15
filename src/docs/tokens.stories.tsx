import type { Meta, StoryObj } from "@storybook/react-vite";

const COLOR_TOKENS = [
  "--bg",
  "--bg-2",
  "--card",
  "--line",
  "--line-2",
  "--ink",
  "--ink-2",
  "--muted",
  "--muted-2",
  "--brand",
  "--brand-press",
  "--brand-soft",
  "--brand-50",
  "--brand-100",
  "--brand-200",
  "--brand-300",
  "--brand-400",
  "--brand-500",
  "--brand-600",
  "--brand-700",
  "--gold",
  "--gold-press",
  "--gold-soft",
  "--success",
  "--success-soft",
  "--danger",
  "--danger-soft",
  "--warn",
  "--warn-soft",
  "--info",
  "--info-soft",
];

function Palette() {
  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(160px,1fr))] gap-3">
      {COLOR_TOKENS.map((t) => (
        <div
          key={t}
          className="rounded-[var(--radius-md)] border border-[var(--line)] bg-[var(--card)] p-2"
        >
          <div
            className="h-10 rounded-[var(--radius-sm)] border border-[var(--line)]"
            style={{ background: `var(${t})` }}
          />
          <code className="mt-1 block text-[length:var(--text-xs)] text-[var(--muted)]">{t}</code>
        </div>
      ))}
    </div>
  );
}

const meta: Meta<typeof Palette> = { title: "Foundations/Tokens", component: Palette };
export default meta;
export const Colors: StoryObj<typeof Palette> = {};
