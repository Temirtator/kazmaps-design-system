import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axe from "axe-core";
import type { ReactElement } from "react";

import {
  Avatar,
  Badge,
  Button,
  Caption,
  Checkbox,
  Chip,
  ChipPill,
  Divider,
  ErrorBoundary,
  FormField,
  Heading,
  Input,
  SearchInput,
  SegmentedControl,
  Select,
  Skeleton,
  Spinner,
  StarRating,
  Tabs,
  Text,
  Textarea,
  ThemeToggle,
  Toggle,
} from "./index";

const noop = () => undefined;

const CASES: [string, ReactElement][] = [
  ["Button", <Button key="k">Сохранить</Button>],
  [
    "Button loading",
    <Button key="k" loading>
      Сохранить
    </Button>,
  ],
  ["Spinner", <Spinner key="k" />],
  ["Heading", <Heading key="k">Заголовок</Heading>],
  ["Text", <Text key="k">Текст</Text>],
  ["Caption", <Caption key="k">Подпись</Caption>],
  ["Badge", <Badge key="k">Новый</Badge>],
  ["Chip", <Chip key="k" label="Тег" />],
  ["ChipPill", <ChipPill key="k" label="Фильтр" />],
  ["Divider", <Divider key="k" />],
  ["Skeleton", <Skeleton key="k" />],
  ["Avatar", <Avatar key="k" name="Айгерим" />],
  ["Input", <Input key="k" label="Имя" hint="Как в паспорте" />],
  ["Input error", <Input key="k" label="Имя" error="Обязательное поле" />],
  ["Input password", <Input key="k" label="Пароль" type="password" revealable />],
  ["Textarea", <Textarea key="k" label="Описание" />],
  ["Checkbox", <Checkbox key="k" label="Согласен" />],
  ["Toggle", <Toggle key="k" checked onChange={noop} label="Уведомления" />],
  ["Select", <Select key="k" label="Город" options={[{ value: "a", label: "Алматы" }]} />],
  [
    "FormField",
    <FormField key="k" label="Поле" errorMessage="Ошибка">
      {(field) => <input id={field.id} aria-describedby={field.describedBy} />}
    </FormField>,
  ],
  ["SearchInput", <SearchInput key="k" value="" onChange={noop} />],
  [
    "SegmentedControl",
    <SegmentedControl
      key="k"
      options={[
        { value: "d", label: "День" },
        { value: "w", label: "Неделя" },
      ]}
      value="d"
      onChange={noop}
    />,
  ],
  ["StarRating display", <StarRating key="k" value={4} />],
  ["StarRating interactive", <StarRating key="k" value={4} onChange={noop} />],
  ["ThemeToggle", <ThemeToggle key="k" theme="dark" onToggle={noop} />],
  [
    "Tabs",
    <Tabs
      key="k"
      items={[
        { key: "a", label: "Услуги" },
        { key: "b", label: "Отзывы" },
      ]}
      value="a"
      onChange={noop}
    />,
  ],
];

async function expectNoViolations(el: HTMLElement) {
  const { violations } = await axe.run(el, {
    // color-contrast не считается в jsdom; region-лендмарки — забота приложений
    rules: { "color-contrast": { enabled: false }, region: { enabled: false } },
  });
  expect(violations.map((v) => `${v.id}: ${v.nodes.map((n) => n.html).join("; ")}`)).toEqual([]);
}

describe("axe: no violations", () => {
  it.each(CASES)("%s", async (_name, element) => {
    const { container } = render(element);
    await expectNoViolations(container);
  });

  it("Select with open listbox", async () => {
    const user = userEvent.setup();
    const { container } = render(
      <Select
        label="Город"
        options={[
          { value: "a", label: "Алматы" },
          { value: "b", label: "Астана" },
        ]}
      />,
    );
    await user.click(screen.getByRole("button", { name: /Город|Выберите/ }));
    await expectNoViolations(container);
  });

  it("ErrorBoundary fallback", async () => {
    vi.spyOn(console, "error").mockImplementation(() => undefined);
    function Boom(): never {
      throw new Error("Ошибка");
    }
    const { container } = render(
      <ErrorBoundary>
        <Boom />
      </ErrorBoundary>,
    );
    await expectNoViolations(container);
    vi.restoreAllMocks();
  });
});
