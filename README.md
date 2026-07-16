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
@import "@temirtator/kazmaps-design-system/styles/brands/business.css";

@source "../node_modules/@temirtator/kazmaps-design-system/dist";
```

Если ваш файл находится в `src/app/globals.css`:

```css
@import "tailwindcss";
@import "@temirtator/kazmaps-design-system/styles/core.css";
@import "@temirtator/kazmaps-design-system/styles/brands/business.css";

@source "../../node_modules/@temirtator/kazmaps-design-system/dist";
```

**Примечание:** выберите один из двух файлов бренда: `business.css` или `booking.css`. Это определяет палитру цветов, радиусы и типографию для данного приложения.

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

- `data-brand`: `business` | `booking` — определяет используемый бренд и его палитру.
- `data-theme`: `light` | `dark` (или отсутствует) — переключает тему. По умолчанию (при отсутствии атрибута) используется тёмная тема.

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

### Молекулы (7 компонентов)

Комбинации атомов для решения типичных задач:

- **FormField** — поле формы с label и error message.
- **SearchInput** — поле поиска с иконкой.
- **SegmentedControl** — сегментированный выбор (радио в виде кнопок).
- **StarRating** — рейтинг звёздами.
- **ThemeToggle** — переключатель светлой/тёмной темы.
- **Tabs** — вкладки.
- **ErrorBoundary** — граница для перехвата React ошибок.

## Темизация

### Токены

Система использует CSS переменные (tokens) для всех параметров дизайна: цвета, типографика, отступы, радиусы скругления.

**Контракт токенов:**

- Core tokens (`dist/styles/core.css` внутри установленного пакета) — значения по умолчанию для обеих тем.
- Brand tokens (`dist/styles/brands/{business,booking}.css`) — переопределение палитры, радиусов и шрифтов для каждого бренда.

Полный список токенов и их значения также доступны в Storybook на странице **Foundations → Tokens**.

### Переключение темы

Тема контролируется атрибутом `data-theme` на элементе `<html>`:

```tsx
// Светлая тема
<html data-theme="light">

// Тёмная тема (по умолчанию, атрибут можно опустить)
<html data-theme="dark">
<html> {/* тоже тёмная */}
```

### Переключение бренда

Бренд установлен один раз на запуск приложения через `data-brand`:

```tsx
<html data-brand="business" data-theme="light">
```

Значения: `business` или `booking`.

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
