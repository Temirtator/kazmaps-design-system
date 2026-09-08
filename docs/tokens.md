# Токены контракта v2

Источник истины — `tokens/brands/*.json`. Имена ролей = имена Figma Variables (`группа/роль` → `--группа-роль`).

## Роли по темам

| Роль                   | business light          | business dark           | booking light                     | booking dark            |
| ---------------------- | ----------------------- | ----------------------- | --------------------------------- | ----------------------- |
| `--surface-base`       | `#fbfbfb`               | `#08090a`               | `#f4f6f9`                         | `#141921`               |
| `--surface-panel`      | `#ffffff`               | `#232326`               | `#ffffff`                         | `#1e2635`               |
| `--surface-raised`     | `#f4f4f5`               | `#1c1c1f`               | `#eef1f6`                         | `#1c2330`               |
| `--surface-subtle`     | `#f4f4f5`               | `#1c1c1f`               | `#eef1f6`                         | `#1c2330`               |
| `--backdrop-scrim`     | `#00000080`             | `#00000080`             | `#00000080`                       | `#00000080`             |
| `--text-primary`       | `#282a30`               | `#f7f8f8`               | `#1b2230`                         | `#e8edf4`               |
| `--text-secondary`     | `#3c4149`               | `#d0d6e0`               | `#3a4456`                         | `#b8c4d4`               |
| `--text-muted`         | `#6f6e77`               | `#8a8f98`               | `#6b7585`                         | `#7a8699`               |
| `--text-tertiary`      | `#86848d`               | `#62666d`               | `#97a0ae`                         | `#5a6575`               |
| `--text-faint`         | `#86848d`               | `#62666d`               | `#97a0ae`                         | `#5a6575`               |
| `--text-on-accent`     | `#ffffff`               | `#ffffff`               | `#ffffff`                         | `#ffffff`               |
| `--border`             | `#e9e8ea`               | `#23252a`               | `#e6e9ef`                         | `#414b5e`               |
| `--border-subtle`      | `#e4e2e4`               | `#34343a`               | `#eff1f5`                         | `#243040`               |
| `--border-hairline`    | `#e4e2e4`               | `#34343a`               | `#eff1f5`                         | `#243040`               |
| `--border-input`       | `#e9e8ea`               | `#23252a`               | `#e6e9ef`                         | `#414b5e`               |
| `--accent`             | `#5e6ad2`               | `#5e6ad2`               | `#5e6ad2`                         | `#6e79d6`               |
| `--accent-press`       | `#4f5ab8`               | `#4f5ab8`               | `#4f5ab8`                         | `#8b94e0`               |
| `--accent-soft-bg`     | `#f0f1fb`               | `#1a1d33`               | `#eef0fb`                         | `#262a52`               |
| `--accent-soft-border` | `#c5cbf0`               | `#262a52`               | `#c4c8f0`                         | `#262a52`               |
| `--success`            | `#27a644`               | `#27a644`               | `#1f8a5b`                         | `#1f8a5b`               |
| `--success-soft-bg`    | `#e7f6ec`               | `#0f2417`               | `#e5f4ec`                         | `#17362b`               |
| `--warning`            | `#c99a16`               | `#f0bf00`               | `#c9871a`                         | `#c9871a`               |
| `--warning-soft-bg`    | `#f9f0d8`               | `#241f10`               | `#fbefd3`                         | `#382d1a`               |
| `--danger`             | `#eb5757`               | `#eb5757`               | `#d8334a`                         | `#d8334a`               |
| `--danger-soft-bg`     | `#fdecec`               | `#2a1416`               | `#fce7eb`                         | `#3a222b`               |
| `--info`               | `#4ea7fc`               | `#4ea7fc`               | `#2a6fdb`                         | `#2a6fdb`               |
| `--info-soft-bg`       | `#e8f3fe`               | `#0e1f2e`               | `#e7f0fc`                         | `#1c2c47`               |
| `--shadow-sm`          | `0 1px 2px #0000000f`   | `0 1px 2px #0000004d`   | `0 1px 3px rgba(0, 0, 0, 0.08)`   | `0 1px 2px #0000004d`   |
| `--shadow-md`          | `0 4px 12px #00000014`  | `0 4px 12px #00000066`  | `0 4px 12px rgba(0, 0, 0, 0.1)`   | `0 4px 12px #00000066`  |
| `--shadow-lg`          | `0 16px 48px #0000001f` | `0 16px 48px #00000080` | `0 20px 48px rgba(0, 0, 0, 0.14)` | `0 20px 48px #00000080` |

## Статические роли

| Роль            | business                                                                                       | booking                                                     |
| --------------- | ---------------------------------------------------------------------------------------------- | ----------------------------------------------------------- |
| `--radius-sm`   | `6px`                                                                                          | `8px`                                                       |
| `--radius-md`   | `8px`                                                                                          | `12px`                                                      |
| `--radius-lg`   | `12px`                                                                                         | `16px`                                                      |
| `--radius-full` | `9999px`                                                                                       | `9999px`                                                    |
| `--font-sans`   | `"Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif` | `"Lexend", "Manrope", system-ui, -apple-system, sans-serif` |

## Алиасы (deprecated, удаление в 1.0.0)

- `--bg` → `--surface-base`
- `--card` → `--surface-panel`
- `--bg-2` → `--surface-raised`
- `--ink` → `--text-primary`
- `--ink-2` → `--text-secondary`
- `--muted` → `--text-muted`
- `--muted-2` → `--text-tertiary`
- `--line` → `--border`
- `--line-2` → `--border-subtle`
- `--brand` → `--accent`
- `--brand-press` → `--accent-press`
- `--brand-soft` → `--accent-soft-bg`
- `--warn` → `--warning`
- `--success-soft` → `--success-soft-bg`
- `--warn-soft` → `--warning-soft-bg`
- `--danger-soft` → `--danger-soft-bg`
- `--info-soft` → `--info-soft-bg`

## Расширения брендов

- business: `--brand-50`, `--brand-100`, `--brand-200`, `--brand-300`, `--brand-400`, `--brand-500`, `--brand-600`, `--brand-700`, `--gold`, `--gold-press`, `--gold-soft`
- booking: `--brand-50`, `--brand-100`, `--brand-200`, `--brand-300`, `--brand-400`, `--brand-500`, `--brand-600`, `--brand-700`, `--gold`, `--gold-press`, `--gold-soft`

## Ожидает значения от дизайнера

- business light `--backdrop-scrim` = `#00000080` — ожидает значения от дизайнера
- business dark `--backdrop-scrim` = `#00000080` — ожидает значения от дизайнера
- booking light `--backdrop-scrim` = `#00000080` — ожидает значения от дизайнера
- booking dark `--backdrop-scrim` = `#00000080` — ожидает значения от дизайнера

## Как отдать значения

1. В Figma Variables имена ролей совпадают с таблицей выше; коллекция на бренд, режим на тему.
2. Значения переносятся в `tokens/brands/<brand>.json` литералами (без ссылок), PR в этот репозиторий.
3. `npm run tokens:build` перегенерирует CSS и этот файл; `npm test` не пропустит пропущенную роль или `var()` в значении.
