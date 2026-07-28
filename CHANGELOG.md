# Changelog

All notable changes to `@temirtator/kazmaps-design-system` are documented here.
Format: [Keep a Changelog](https://keepachangelog.com/en/1.1.0/); versioning: semver.

## [Unreleased]

## [0.2.2] — 2026-07-28

### Added

- Select: проп `ariaLabel` — доступное имя триггера, когда видимого `label` нет. Нужен
  фильтрам без подписей (booking-client `/organizations`): `SelectProps` не расширяет
  нативные атрибуты, поэтому переданный `aria-label` уходил в никуда. Когда `label` задан,
  имя по-прежнему берётся из него — accname признаёт нативный `<label>` источником имени
  для labelable-элементов, включая `<button>`.
- ErrorBoundary: пропы `title` / `reloadLabel` / `genericMessage` и функциональная форма
  `fallback((message) => …)` — она отдаёт наружу текст пойманной ошибки, чтобы потребитель
  мог отрисовать свой локализованный фолбэк без потери сообщения. Дефолты прежние
  (русские), поэтому потребителям на 0.2.1 правки не нужны. Нужны трёхъязычным клиентам:
  фолбэк был захардкожен по-русски и пропами не открывался.
- ErrorBoundary: экспортируется тип `ErrorBoundaryProps`.

## [0.2.1] — 2026-07-28

### Added

- StarRating: проп `formatRating(value, max)` — задаёт числовую часть подписи и для каждой
  звезды в интерактивном режиме, и для рейтинга в display-режиме. Дефолт прежний
  («N из 5»), поэтому потребителям на 0.2.0 правки не нужны. Нужен трёхъязычным клиентам:
  подпись каждой звезды раньше была захардкожена по-русски и пропом не открывалась.
- Input: пропы `revealLabel` / `hideLabel` — подписи reveal-кнопки пароля. Дефолты прежние
  («Показать пароль» / «Скрыть пароль»).
- Avatar: проп `ariaLabel` — доступное имя, когда `name` не задан. Дефолт прежний
  («Аватар пользователя»).

### Fixed

- StarRating: при дробном `value` (например, средний рейтинг 3.4) интерактивная группа
  оставалась без единого фокусируемого элемента — точное сравнение `index === value` не
  совпадало ни с одной звездой, roving tabindex ломался и группа выпадала из tab-обхода.
  Активная звезда теперь округляется.

## [0.2.0] — 2026-07-23

### Added

- Клавиатура в Select: Enter/Space/ArrowDown/ArrowUp открывают, стрелки/Home/End ходят по
  опциям (disabled пропускаются), Escape закрывает с возвратом фокуса на триггер; listbox
  связан с label через aria-labelledby.
- StarRating: интерактивный режим — radiogroup из 5 звёзд (стрелки, roving tabindex,
  «N из 5»); display-режим — role="img" с подписью рейтинга; новый проп `ariaLabel`.
- Tabs: паттерн tablist/tab (aria-selected, стрелки, Home/End, roving tabindex).
- SegmentedControl: radiogroup-семантика со стрелками; новый проп `ariaLabel`.
- SearchInput: дефолтный aria-label («Поиск»); новый проп `ariaLabel`.
- FormField: render-prop получает `{ id, describedBy, invalid }` для aria-проводки; новый
  экспорт типа `FormFieldRenderProps`.
- Сводный axe-сьют по всем компонентам; a11y-аддон в Storybook.
- Скриншот-тесты (Playwright поверх собранного Storybook, `npm run test:vrt`): 28 базлайнов —
  все затронутые релизом компоненты × dark/light, плюс состояния open-Select и включённый
  Toggle. Базлайны платформозависимы (chromium-darwin); обновление — `npm run test:vrt:update`.
- Фокус-кольца у Toggle, reveal-кнопки Input, опций Select, звёзд StarRating.

### Fixed

- Select не открывался с клавиатуры (Enter/Space двойным переключением закрывали его обратно).
- Checkbox: галочка была невидима в тёмной теме (white на --ink); теперь var(--bg).
- Toggle: бегунок был невидим в тёмной теме; теперь var(--bg); подпись ассоциирована с
  переключателем (клик по ней работает, switch получил имя).
- ErrorBoundary: несуществующий класс text-inverse и сырые классы заменены токенами контракта.
- Input: reveal-кнопка пароля недостижима с клавиатуры (tabIndex=-1 убран).

### Breaking

- FormField render-prop: сигнатура `(id: string)` → `(field: { id, describedBy, invalid })`.
- Tabs/SegmentedControl: роли кнопок изменились (button → tab/radio) — селекторы в тестах
  потребителей обновить.
- StarRating: интерактивный режим теперь рендерит 5 кнопок role="radio" вместо голых SVG
  (селекторы по svg/кнопкам в тестах потребителей обновить); display-режим обёрнут в
  role="img", звёзды aria-hidden.
- Tabs: элемент-обёртка сменился с <nav> на <div role="tablist"> — лендмарк navigation
  исчез (селекторы getByRole("navigation") в тестах потребителей обновить).

## [0.1.0] — 2026-07-16

### Added

- Token contract: core defaults + brand presets `business` and `booking`, each dark + light
  (`data-brand`/`data-theme` on `<html>`).
- Atoms: Button, Input, Textarea, Select, Checkbox, Toggle, Badge, Chip, ChipPill, Avatar,
  Spinner, Skeleton, Divider, Heading, Text, Caption.
- Molecules: FormField, SearchInput, SegmentedControl, StarRating, ThemeToggle, Tabs,
  ErrorBoundary.
- `cn()` and `colorFor()` helpers; full TypeScript prop types.
- Storybook showcase with brand × theme toolbar and a Tokens page.
