# @temirtator/kazmaps-design-system

Мульти-брендовая дизайн-система KazMaps: токены, атомы и молекулы для любого приложения на React 19 и Tailwind CSS v4.

Тёмная и светлая темы из коробки, полная типизация TypeScript, компоненты с автоматическим переключением бренда.

## Установка

```bash
npm i @temirtator/kazmaps-design-system lucide-react
```

Требования по peer-зависимостям:

- `react` ^19.0.0
- `react-dom` ^19.0.0
- `lucide-react` ^1.0.0

## Подключение в Next.js или Tailwind v4 приложение

### 1. Подключение стилей в `globals.css`

Если ваш файл находится в `app/globals.css`:

```css
@import "tailwindcss";
@import "@temirtator/kazmaps-design-system/styles/core.css";
@import "@temirtator/kazmaps-design-system/styles/theme.css";
@import "@temirtator/kazmaps-design-system/styles/brands/business.css";

@source "../node_modules/@temirtator/kazmaps-design-system/dist";
```

Если ваш файл находится в `src/app/globals.css`:

```css
@import "tailwindcss";
@import "@temirtator/kazmaps-design-system/styles/core.css";
@import "@temirtator/kazmaps-design-system/styles/theme.css";
@import "@temirtator/kazmaps-design-system/styles/brands/business.css";

@source "../../node_modules/@temirtator/kazmaps-design-system/dist";
```

**Примечание:** выберите один файл бренда: `business.css`, `booking.css` или `maps.css`. `theme.css` даёт утилиты Tailwind `bg-surface-panel`, `text-text-muted`, `border-border-input` для всех цветовых ролей контракта; подключение необязательно, если вы пишете `bg-(--surface-panel)`.

### 2. Установка атрибутов на корневой элемент

В `app/layout.tsx`:

```tsx
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html data-brand="business" data-theme="light" lang="ru">
      <body>{children}</body>
    </html>
  );
}
```

**Атрибуты:**

- `data-brand`: `business` | `booking` | `maps`.
- `data-theme`: `light` | `dark`. Без атрибута business и booking показывают тёмную тему; maps — светлую и следует `prefers-color-scheme`.

### 3. Импорт компонентов

```tsx
import { Button, Input, Select } from "@temirtator/kazmaps-design-system";

export default function MyComponent() {
  return (
    <div>
      <Button variant="primary">Нажми меня</Button>
      <Input placeholder="Введите текст..." />
      <Select options={[{ value: "1", label: "Вариант 1" }]} />
    </div>
  );
}
```

## Компоненты

### Атомы (16 компонентов)

Базовые, переиспользуемые элементы управления и отображения:

- **Button** — кнопка с вариантами (primary, secondary, ghost) и размерами.
- **Input** — текстовое поле ввода.
- **Textarea** — многострочное поле для текста.
- **Select** — выпадающий список.
- **Checkbox** — флажок.
- **Toggle** — переключатель вкл/выкл.
- **Badge** — этикетка для статусов и тегов.
- **Chip** — компактная кнопка-тег.
- **ChipPill** — закругленный chip.
- **Avatar** — аватар пользователя.
- **Spinner** — индикатор загрузки.
- **Skeleton** — плейсхолдер для загружаемого контента.
- **Divider** — горизонтальный разделитель.
- **Heading** — заголовок (уровни h1–h4).
- **Text** — основной текст.
- **Caption** — подписи и вспомогательный текст.

### Молекулы (8 компонентов)

Комбинации атомов для решения типичных задач:

- **FormField** — поле формы с label и error message.
- **SearchInput** — поле поиска с иконкой.
- **SegmentedControl** — сегментированный выбор (радио в виде кнопок).
- **StarRating** — рейтинг звёздами.
- **ThemeToggle** — переключатель светлой/тёмной темы.
- **Tabs** — вкладки.
- **ErrorBoundary** — граница для перехвата React ошибок.
- **PhoneInput** — телефон с выбором региона, маской и E.164 наружу.

### PhoneInput

```tsx
import { PhoneInput } from "@temirtator/kazmaps-design-system";

<PhoneInput
  label="Номер телефона"
  size="lg"
  onChange={({ e164, complete }) => complete && send(e164)}
/>;
```

| Проп             | Тип                                         | Описание                                                                                                                                |
| ---------------- | ------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| `value`          | `string`                                    | Значение E.164 (`"+77012345678"`) или `""` — включает контролируемый режим.                                                             |
| `defaultValue`   | `string`                                    | Начальное значение E.164 для неконтролируемого режима.                                                                                  |
| `defaultRegion`  | `RegionCode`                                | Регион по умолчанию, когда `value`/`defaultValue` не заданы или пусты; по умолчанию `"KZ"`.                                             |
| `onChange`       | `(value: PhoneValue) => void`               | Вызывается на каждое изменение; `value.e164` пуст, пока номер не введён полностью.                                                      |
| `onRegionChange` | `(region: RegionCode) => void`              | Вызывается только когда меняется сам регион — выбор в пикере или вставка номера с другим кодом страны.                                  |
| `onFocus`        | `React.FocusEventHandler<HTMLInputElement>` | Проксируется на внутренний `<input>`; вызывается по фокусу.                                                                             |
| `onBlur`         | `React.FocusEventHandler<HTMLInputElement>` | Проксируется на внутренний `<input>`; вызывается по потере фокуса — на нём строится `touched`-логика `Controller` (см. пример ниже).    |
| `regions`        | `RegionCode[]`                              | Ограничивает список регионов в пикере; по умолчанию доступны все поддерживаемые страны.                                                 |
| `locale`         | `"ru" \| "en"`                              | Язык названий стран в пикере; по умолчанию `"ru"`.                                                                                      |
| `size`           | `"md" \| "lg"`                              | Высота поля; по умолчанию `"md"`.                                                                                                       |
| `label`          | `string`                                    | Текст `<label>` над полем.                                                                                                              |
| `hint`           | `string`                                    | Подсказка под полем, показывается, пока нет `error`.                                                                                    |
| `error`          | `string`                                    | Текст ошибки под полем; заменяет `hint` и включает `aria-invalid`.                                                                      |
| `required`       | `boolean`                                   | Помечает поле обязательным — звёздочка у `label` и атрибут `required` на инпуте.                                                        |
| `disabled`       | `boolean`                                   | Отключает поле и кнопку выбора региона.                                                                                                 |
| `readOnly`       | `boolean`                                   | Поле только для чтения; кнопка выбора региона тоже блокируется.                                                                         |
| `id`             | `string`                                    | `id` внутреннего `<input>`; по умолчанию генерируется через `useId()`. Также используется для связи `label`/`aria-describedby`.         |
| `name`           | `string`                                    | Имя поля для обычных (не React Hook Form) форм.                                                                                         |
| `autoFocus`      | `boolean`                                   | Автофокус внутреннего `<input>` при монтировании.                                                                                       |
| `autoComplete`   | `string`                                    | Атрибут `autoComplete` на инпуте; по умолчанию `"tel-national"`.                                                                        |
| `labels`         | `Partial<PhoneInputLabels>`                 | Частичное переопределение текстов пикера (доступное имя кнопки региона, плейсхолдер поиска, заголовки групп, текст пустого результата). |
| `className`      | `string`                                    | Класс на корневой обёртке компонента (`<div>` с label, полем и hint/error).                                                             |

- `value` — E.164 (`"+77012345678"`) или `""`; `onChange` отдаёт `{ e164, region, national, complete }`, где `e164` пуст, пока номер не полный.
- Регион по умолчанию `KZ`; пикер — все страны с поиском, точные маски для СНГ, остальным цифры группами и проверка длины E.164. Вставка `+998…` переключает регион сама.
- Код `+1` (NANP) общий для нескольких стран — США, Канада, Пуэрто-Рико, Доминиканская Республика, Ямайка, Тринидад и Тобаго, Гренада. `parseE164` и вставленный `+1…` по умолчанию определяют регион как `US`; пользователь может поправить страну в пикере вручную.
- React Hook Form — только через `Controller` (`onChange={(v) => field.onChange(v.e164)}`); `register()` не поддерживается:

  ```tsx
  import { Controller, useForm } from "react-hook-form";
  import { PhoneInput } from "@temirtator/kazmaps-design-system";

  function Form() {
    const { control, handleSubmit } = useForm({ defaultValues: { phone: "" } });

    return (
      <Controller
        name="phone"
        control={control}
        rules={{ validate: (v) => Boolean(v) || "Введите номер полностью" }}
        render={({ field, fieldState }) => (
          <PhoneInput
            label="Номер телефона"
            value={field.value}
            onChange={(v) => field.onChange(v.e164)}
            onBlur={field.onBlur}
            error={fieldState.error?.message}
          />
        )}
      />
    );
  }
  ```

- Контролируемый `value=""` не очищает частично введённое поле: компонент пересинхронизируется со внешним `value` только тогда, когда тот отличается от последнего E.164, который сам же отправил через `onChange`, — поэтому `reset()` формы очистит поле только если до этого был отправлен полный номер; это осознанное решение, оно же не даёт полю дёргаться во время набора.
- `locale="ru" | "en"` переключает только названия стран в списке пикера. Остальной интерфейс пикера — доступное имя кнопки региона, плейсхолдер поля поиска, оба заголовка групп, текст пустого результата — всегда берётся из `labels`, дефолты которого русские. Англоязычному потребителю нужно передать `labels` вместе с `locale`.
- Плейсхолдеры маски остаются видны по мере ввода (`+7 (7__) ___-__-__`), поле намеренно пустое при фокусе — чтобы срабатывал автозаполнитель браузера.
- Хелперы: `parseE164`, `formatE164` («+7 701 234-56-78» для подписей), `isKazakhstanMobile` (белый список операторов identity — только такие номера достижимы по SMS).
- `Input mask="phone"` — deprecated: тот же движок, формат `+7 (7__) ___-__-__`; используйте `PhoneInput`. Удаление — 0.5.0. Пометка `@deprecated` стоит на всём типе `InputMask` и на пропе `mask` целиком, потому что TypeScript не умеет депрекейтить отдельный член union — поэтому IDE зачеркнёт и `mask="email" | "bin" | "url"`, хотя они никуда не уходят и полностью поддерживаются. Заменяется и удаляется в 0.5.0 только `mask="phone"`.

## Темизация

### Токены

Система использует CSS переменные (tokens) для всех параметров дизайна: цвета, типографика, отступы, радиусы скругления.

**Контракт токенов:**

- Источник истины — `tokens/schema.json`, `tokens/core.json`, `tokens/brands/*.json`; CSS генерируется (`npm run tokens:build`), таблица значений — `docs/tokens.md`.
- Канон имён v2: `--surface-*`, `--text-*`, `--border*`, `--accent*`, `--success|warning|danger|info` и `*-soft-bg`, `--radius-*`, `--shadow-*`, `--font-sans`. Старые имена (`--ink`, `--bg`, `--line`, `--brand`, `--warn`, `*-soft`) — алиасы, удаляются в 1.0.0.

Полный список токенов и их значения также доступны в Storybook на странице **Foundations → Tokens**.

### Переключение темы

Тема контролируется атрибутом `data-theme` на элементе `<html>`:

```tsx
<html data-theme="light">
<html data-theme="dark">
<html> {/* business, booking: тёмная; maps: светлая или системная */}
```

### Переключение бренда

Бренд установлен один раз на запуск приложения через `data-brand`:

```tsx
<html data-brand="business" data-theme="light">
```

Значения: `business`, `booking` или `maps`.

### Переопределение токенов в приложении

Если вашему приложению нужны дополнительные цвета, типографика или другие переменные, вы можете добавить их в CSS. **Важно:** селектор должен иметь специфичность НЕ СЛАБЕЕ, чем селектор бренда `[data-brand="..."]` (0,1,0), иначе бренд-токены будут игнорироваться. Порядок импорта решает сам специфичность только при равной специфичности.

```css
/* приложение может переопределить любой токен — селектор должен быть
   НЕ СЛАБЕЕ бренд-селектора [data-brand="..."] (порядок импорта решает
   только при равной специфичности). Пример business-client: подключить
   Inter из next/font (variable: --font-inter) и вернуть его в стек.
   ВАЖНО: --font-inter должен быть определён вашим загрузчиком шрифтов —
   голый var() на несуществующую переменную инвалидирует весь --font-sans. */
:root[data-brand] {
  --font-sans: var(--font-inter, "Inter"), "SF Pro Display", system-ui, sans-serif;
}
```

Все компоненты используют CSS переменные, поэтому изменения немедленно применяются ко всему интерфейсу.

## Разработка

### Storybook

Витрина компонентов с интерактивными примерами и переключателями бренда × темы:

```bash
npm run storybook
```

Откроется на `http://localhost:6006`.

### Проверка кода

```bash
# Линтинг
npm run lint

# Автоисправление
npm run lint:fix

# Проверка типов
npm run typecheck

# Тесты
npm run test

# Тесты в режиме просмотра
npm run test:watch

# Сборка
npm run build
```

## Релизы

### Runbook для публикации новой версии

1. **Обновите CHANGELOG.md**

   Добавьте секцию `## [X.Y.Z] — YYYY-MM-DD` с категориями `Added`, `Changed`, `Fixed`, `Breaking Changes` (если применимо).

2. **Запустите bumping версии**

   ```bash
   npm version patch|minor|major -m "chore: release X.Y.Z"
   ```

   Это:
   - Обновляет версию в `package.json`
   - Создаёт git commit
   - Создаёт git tag `vX.Y.Z`

3. **Запушьте в репозиторий**

   ```bash
   git push --follow-tags
   ```

4. **Опубликуйте на npm**

   ```bash
   npm publish
   ```

### Версионирование

- **0.x версии** — используются во время интеграции в business-client и booking-client.
- **1.0.0** — выпускается после того, как оба клиента полностью мигрировали на пакет.

## Лицензия

MIT, copyright Temirlan Shagyrov, 2026.
