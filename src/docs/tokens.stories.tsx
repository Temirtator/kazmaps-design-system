import type { Meta, StoryObj } from "@storybook/react-vite";

import schema from "../../tokens/schema.json";
import booking from "../../tokens/brands/booking.json";
import business from "../../tokens/brands/business.json";
import maps from "../../tokens/brands/maps.json";

type Token = { $type: string; $value: string; $description?: string };
type Brand = {
  brand: string;
  themes: Record<string, Record<string, Token>>;
  static: Record<string, Token>;
  extras?: Record<string, Record<string, Token>>;
};

const BRANDS: Brand[] = [business, booking, maps];
const GROUPS = Object.entries(schema.themed).filter(([group]) => group !== "shadow");

function Swatch({ role }: { role: string }) {
  return (
    <div className="rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface-panel)] p-2">
      <div
        className="h-10 rounded-[var(--radius-sm)] border border-[var(--border)]"
        style={{ background: `var(--${role})` }}
      />
      <code className="mt-1 block text-[length:var(--text-xs)] text-[var(--text-muted)]">
        --{role}
      </code>
    </div>
  );
}

function Palette() {
  return (
    <div className="flex flex-col gap-6">
      {GROUPS.map(([group, roles]) => (
        <section key={group}>
          <h3 className="mb-2 text-[length:var(--text-sm)] text-[var(--text-secondary)]">
            {group}
          </h3>
          <div className="grid grid-cols-[repeat(auto-fill,minmax(160px,1fr))] gap-3">
            {roles.map((role) => (
              <Swatch key={role} role={role} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

function Aliases() {
  return (
    <ul className="text-[length:var(--text-sm)] text-[var(--text-primary)]">
      {Object.entries(schema.aliases).map(([old, canon]) => (
        <li key={old}>
          <code>--{old}</code> → <code>--{canon}</code>
        </li>
      ))}
    </ul>
  );
}

function Pending() {
  const rows = BRANDS.flatMap((b) =>
    Object.entries(b.themes).flatMap(([theme, tokens]) =>
      Object.entries(tokens)
        .filter(([, t]) => t.$description)
        .map(([role, t]) => ({
          key: `${b.brand}-${theme}-${role}`,
          brand: b.brand,
          theme,
          role,
          ...t,
        })),
    ),
  );
  return (
    <table className="text-[length:var(--text-sm)] text-[var(--text-primary)]">
      <thead>
        <tr>
          <th>Бренд</th>
          <th>Тема</th>
          <th>Роль</th>
          <th>Значение</th>
          <th>Заметка</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((r) => (
          <tr key={r.key}>
            <td>{r.brand}</td>
            <td>{r.theme}</td>
            <td>
              <code>--{r.role}</code>
            </td>
            <td>
              <code>{r.$value}</code>
            </td>
            <td>{r.$description}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

const meta: Meta<typeof Palette> = { title: "Foundations/Tokens", component: Palette };
export default meta;
export const Colors: StoryObj<typeof Palette> = {};
export const DeprecatedAliases: StoryObj<typeof Aliases> = { render: () => <Aliases /> };
export const PendingFromDesigner: StoryObj<typeof Pending> = { render: () => <Pending /> };
