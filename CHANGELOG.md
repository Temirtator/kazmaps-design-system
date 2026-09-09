# Changelog

All notable changes to `@temirtator/kazmaps-design-system` are documented here.
Format: [Keep a Changelog](https://keepachangelog.com/en/1.1.0/); versioning: semver.

## [0.5.0] — 2026-09-10

### Added

- Второй вход `@temirtator/kazmaps-design-system/maps` — примитивы main-web с родными
  именами (Button, IconButton, Chip, Toggle, TextInput, PasswordInput, SearchInput,
  StarRating, SegmentedRow, AvatarInitial, Dialog, BottomSheet, ToastProvider/useToast,
  Panel, ListRow, EmptyState, SectionHeader, SectionError, ShimmerBlock, DayPicker,
  ScaleBar, LogoPin, LogoLockup, PlaceRow, QrCode, InDevelopment, useFocusTrap,
  isTopmostTrap, PhoneInput, formatE164, parseE164, PHONE_INPUT_DEFAULT_LABELS,
  Region, RegionCode, findRegion, REGIONS, isKazakhstanMobile, toE164).
- `styles/kits/maps.css` — утилиты и keyframes кита; кит-статики бренда maps
  (`--motion-*`, `--shadow-button-*`, `--shadow-modal` …) в `tokens/brands/maps.json`.
- Роли контракта `--highlight` / `--highlight-soft` (все бренды); `--gold`/`--gold-soft`
  стали алиасами.
- Безголовое ядро телефона `useRegionPicker` / `usePhoneMask`; `maps/PhoneInput`.
- Бренд booking в VRT; интеракции PhoneInput под business и maps.

### Changed

- Шкала текста `--text-xs…3xl` переехала из `core.css` в бренды. business/booking — прежние px;
  maps — rem-значения Tailwind (`radius-sm|md|lg` maps = 0.25/0.375/0.5rem).
- Под `data-brand="maps"` любой корневой компонент, использующий `var(--ease-standard)`,
  теперь анимируется с кривой кита `cubic-bezier(0.4, 0, 0.2, 1)`, а не с `core.css`
  (`cubic-bezier(0.25, 0.46, 0.45, 0.94)`) — кит побеждает по порядку импорта, см. README §4.

### Deprecated

- `Input mask="phone"` остаётся с пометкой `@deprecated`: удаление перенесено на следующую
  минорную версию после миграции business-client на `PhoneInput` (три места: настройки,
  два шага онбординга).

## [0.4.0] — 2026-09-08

### Added

- Бренд `maps` (`styles/brands/maps.css`): светлая тема по умолчанию, тёмная по `data-theme="dark"`
  или системной `prefers-color-scheme`. Значения — палитра main-web.
- Источник истины токенов — `tokens/schema.json`, `tokens/core.json`, `tokens/brands/*.json`
  (W3C DTCG, литералы). CSS генерируется `npm run tokens:build`, дрейф ловит `npm run tokens:check`.
- `styles/theme.css` — Tailwind `@theme` с `--color-<роль>` для всех цветовых ролей контракта.
- `docs/tokens.md` — таблица значений по брендам и темам, список ролей и расширений брендов,
  ожидающих значения от дизайнера.
- Storybook: бренд `maps` в тулбаре, страница Foundations → Tokens читает JSON.
- Бренд `maps` также объявляет расширения `--gold` и `--gold-soft`: их читают Button и StarRating;
  в C2 пара становится ролью контракта.

### Changed

- Канон имён контракта v2: `--surface-base|panel|raised|subtle`, `--backdrop-scrim`,
  `--text-primary|secondary|muted|tertiary|faint|on-accent`, `--border|-subtle|-hairline|-input`,
  `--accent|-press|-soft-bg|-soft-border`, `--success|warning|danger|info` + `*-soft-bg`.
  Значения business и booking не изменились.
- Новые роли business/booking получили перенесённые значения (`text-faint` = прежний `muted-2`,
  `surface-subtle` = `bg-2`, `border-hairline` = `line-2`, `border-input` = `line`,
  `accent-soft-border` = `brand-200`, `text-on-accent` = `#ffffff`); `backdrop-scrim` временно
  `#00000080` до значения от дизайнера.
- Шкала `--brand-50…700` и `--gold*` — расширения брендов business/booking, не часть контракта.
- Удаление `Input mask="phone"` перенесено с 0.4.0 на 0.5.0.

### Deprecated

- Старые имена `--bg`, `--bg-2`, `--card`, `--ink`, `--ink-2`, `--muted`, `--muted-2`, `--line`,
  `--line-2`, `--brand`, `--brand-press`, `--brand-soft`, `--warn`, `--success-soft`, `--warn-soft`,
  `--danger-soft`, `--info-soft` — алиасы на канон, удаление в 1.0.0.

## [0.3.0] — 2026-09-04

### Added

- PhoneInput: телефон с выбором региона (флаг + код страны внутри поля), маской под регион и
  E.164 наружу (`{ e164, region, national, complete }`). Все страны в пикере с поиском; точные
  маски для KZ, RU, KG, UZ, TJ, TM, AZ, AM, BY, GE; остальным — цифры группами и проверка длины.
  Пустое поле остаётся пустым на фокусе ради автозаполнения; ведущие `8`/`7`/`+7` нормализуются;
  вставленный `+код` переключает регион. Размеры `md`/`lg`, `labels`/`locale` для i18n.
- Данные `REGIONS`/`findRegion` и хелперы `toE164`, `parseE164`, `formatE164`, `isKazakhstanMobile`.
- Playwright-контур интеракций в реальном Chromium поверх Storybook (`npm run test:e2e`).

### Changed

- Input `mask="phone"` переведён на `react-input-mask-format`: формат теперь
  `+7 (7__) ___-__-__` (дефисы, постоянная `7`), вставка `8 701…` нормализуется. Контракт
  `onChange(event)` прежний.

### Deprecated

- Input `mask="phone"` и тип `InputMask` — используйте `PhoneInput`; удаление в 0.4.0.

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
