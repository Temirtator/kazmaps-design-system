# Токены контракта v2

Источник истины — `tokens/brands/*.json`. Имена ролей = имена Figma Variables (`группа/роль` → `--группа-роль`).

## Роли по темам

| Роль                   | business light          | business dark           | booking light                     | booking dark            | maps light                                 | maps dark                                  |
| ---------------------- | ----------------------- | ----------------------- | --------------------------------- | ----------------------- | ------------------------------------------ | ------------------------------------------ |
| `--surface-base`       | `#fbfbfb`               | `#08090a`               | `#f4f6f9`                         | `#141921`               | `#e9ece4`                                  | `#0a0e18`                                  |
| `--surface-panel`      | `#ffffff`               | `#232326`               | `#ffffff`                         | `#1e2635`               | `#ffffff`                                  | `#0d1320`                                  |
| `--surface-raised`     | `#f4f4f5`               | `#1c1c1f`               | `#eef1f6`                         | `#1c2330`               | `#f2f4f7`                                  | `#141d31`                                  |
| `--surface-subtle`     | `#f4f4f5`               | `#1c1c1f`               | `#eef1f6`                         | `#1c2330`               | `#f7f8fa`                                  | `#141d31`                                  |
| `--backdrop-scrim`     | `#00000080`             | `#00000080`             | `#00000080`                       | `#00000080`             | `#dcdfd8`                                  | `#0a0e18`                                  |
| `--text-primary`       | `#282a30`               | `#f7f8f8`               | `#1b2230`                         | `#e8edf4`               | `#22272e`                                  | `#e8edf7`                                  |
| `--text-secondary`     | `#3c4149`               | `#d0d6e0`               | `#3a4456`                         | `#b8c4d4`               | `#39424f`                                  | `#93a5c4`                                  |
| `--text-muted`         | `#6f6e77`               | `#8a8f98`               | `#6b7585`                         | `#7a8699`               | `#667085`                                  | `#5f7392`                                  |
| `--text-tertiary`      | `#86848d`               | `#62666d`               | `#97a0ae`                         | `#5a6575`               | `#98a2b3`                                  | `#5f7392`                                  |
| `--text-faint`         | `#86848d`               | `#62666d`               | `#97a0ae`                         | `#5a6575`               | `#8a9182`                                  | `#5f7392`                                  |
| `--text-on-accent`     | `#ffffff`               | `#ffffff`               | `#ffffff`                         | `#ffffff`               | `#ffffff`                                  | `#0a0e18`                                  |
| `--border`             | `#e9e8ea`               | `#23252a`               | `#e6e9ef`                         | `#414b5e`               | `#d5dae2`                                  | `#1e2a44`                                  |
| `--border-subtle`      | `#e4e2e4`               | `#34343a`               | `#eff1f5`                         | `#243040`               | `#dfe3e8`                                  | `#1e2a44`                                  |
| `--border-hairline`    | `#e4e2e4`               | `#34343a`               | `#eff1f5`                         | `#243040`               | `#eceef2`                                  | `#1e2a44`                                  |
| `--border-input`       | `#e9e8ea`               | `#23252a`               | `#e6e9ef`                         | `#414b5e`               | `#c9d0da`                                  | `#1e2a44`                                  |
| `--accent`             | `#5e6ad2`               | `#5e6ad2`               | `#5e6ad2`                         | `#6e79d6`               | `#1668c9`                                  | `#35e0ff`                                  |
| `--accent-press`       | `#4f5ab8`               | `#4f5ab8`               | `#4f5ab8`                         | `#8b94e0`               | `#1668c9`                                  | `#35e0ff`                                  |
| `--accent-soft-bg`     | `#f0f1fb`               | `#1a1d33`               | `#eef0fb`                         | `#262a52`               | `#eef4fc`                                  | `#141d31`                                  |
| `--accent-soft-border` | `#c5cbf0`               | `#262a52`               | `#c4c8f0`                         | `#262a52`               | `#cfe0f5`                                  | `#1e2a44`                                  |
| `--success`            | `#27a644`               | `#27a644`               | `#1f8a5b`                         | `#1f8a5b`               | `#12a454`                                  | `#3fd68a`                                  |
| `--success-soft-bg`    | `#e7f6ec`               | `#0f2417`               | `#e5f4ec`                         | `#17362b`               | `#e7f7ee`                                  | `#141d31`                                  |
| `--warning`            | `#c99a16`               | `#f0bf00`               | `#c9871a`                         | `#c9871a`               | `#ef7d1a`                                  | `#ffb638`                                  |
| `--warning-soft-bg`    | `#f9f0d8`               | `#241f10`               | `#fbefd3`                         | `#382d1a`               | `#fdf3e6`                                  | `#141d31`                                  |
| `--danger`             | `#eb5757`               | `#eb5757`               | `#d8334a`                         | `#d8334a`               | `#dd3b2e`                                  | `#ff5a4d`                                  |
| `--danger-soft-bg`     | `#fdecec`               | `#2a1416`               | `#fce7eb`                         | `#3a222b`               | `#fdecec`                                  | `#141d31`                                  |
| `--info`               | `#4ea7fc`               | `#4ea7fc`               | `#2a6fdb`                         | `#2a6fdb`               | `#1668c9`                                  | `#35e0ff`                                  |
| `--info-soft-bg`       | `#e8f3fe`               | `#0e1f2e`               | `#e7f0fc`                         | `#1c2c47`               | `#eef4fc`                                  | `#141d31`                                  |
| `--shadow-sm`          | `0 1px 2px #0000000f`   | `0 1px 2px #0000004d`   | `0 1px 3px rgba(0, 0, 0, 0.08)`   | `0 1px 2px #0000004d`   | `rgba(16, 24, 40, 0.08) 0px 1px 3px 0px`   | `rgba(16, 24, 40, 0.08) 0px 1px 3px 0px`   |
| `--shadow-md`          | `0 4px 12px #00000014`  | `0 4px 12px #00000066`  | `0 4px 12px rgba(0, 0, 0, 0.1)`   | `0 4px 12px #00000066`  | `rgba(16, 24, 40, 0.22) 0px 12px 32px 0px` | `rgba(16, 24, 40, 0.22) 0px 12px 32px 0px` |
| `--shadow-lg`          | `0 16px 48px #0000001f` | `0 16px 48px #00000080` | `0 20px 48px rgba(0, 0, 0, 0.14)` | `0 20px 48px #00000080` | `rgba(16, 24, 40, 0.28) 0px 18px 48px 0px` | `rgba(16, 24, 40, 0.28) 0px 18px 48px 0px` |

## Статические роли

| Роль            | business                                                                                       | booking                                                     | maps                                               |
| --------------- | ---------------------------------------------------------------------------------------------- | ----------------------------------------------------------- | -------------------------------------------------- |
| `--text-xs`     | `11px`                                                                                         | `11px`                                                      | `0.75rem`                                          |
| `--text-sm`     | `13px`                                                                                         | `13px`                                                      | `0.875rem`                                         |
| `--text-base`   | `15px`                                                                                         | `15px`                                                      | `1rem`                                             |
| `--text-lg`     | `17px`                                                                                         | `17px`                                                      | `1.125rem`                                         |
| `--text-xl`     | `20px`                                                                                         | `20px`                                                      | `1.25rem`                                          |
| `--text-2xl`    | `24px`                                                                                         | `24px`                                                      | `1.5rem`                                           |
| `--text-3xl`    | `30px`                                                                                         | `30px`                                                      | `1.875rem`                                         |
| `--radius-sm`   | `6px`                                                                                          | `8px`                                                       | `0.25rem`                                          |
| `--radius-md`   | `8px`                                                                                          | `12px`                                                      | `0.375rem`                                         |
| `--radius-lg`   | `12px`                                                                                         | `16px`                                                      | `0.5rem`                                           |
| `--radius-full` | `9999px`                                                                                       | `9999px`                                                    | `9999px`                                           |
| `--font-sans`   | `"Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif` | `"Lexend", "Manrope", system-ui, -apple-system, sans-serif` | `var(--font-ibm-plex-sans), system-ui, sans-serif` |

## Кит бренда

- maps: `--ease-standard` = `cubic-bezier(0.4, 0, 0.2, 1)`
- maps: `--motion-fast` = `140ms`
- maps: `--motion-panel` = `240ms`
- maps: `--motion-shimmer` = `1.6s`
- maps: `--shadow-column` = `rgba(16, 24, 40, 0.05) 2px 0px 8px 0px`
- maps: `--shadow-button-sm` = `rgba(16, 24, 40, 0.08) 0px 1px 3px 0px`
- maps: `--shadow-button-md` = `rgba(16, 24, 40, 0.1) 0px 1px 3px 0px`
- maps: `--shadow-modal` = `rgba(16, 24, 40, 0.28) 0px 18px 48px 0px`
- maps: `--shadow-sheet-top` = `rgba(16, 24, 40, 0.14) 0px -4px 20px 0px`
- maps: `--shadow-dropdown` = `rgba(16, 24, 40, 0.22) 0px 12px 32px 0px`

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
- maps: `--surface-map`, `--text-on-map`, `--rating-star`, `--marker-primary`, `--border-state-card`, `--gold`, `--gold-soft`, `--shimmer-peak`

## Ожидает значения от дизайнера

- business light `--backdrop-scrim` = `#00000080` — ожидает значения от дизайнера
- business dark `--backdrop-scrim` = `#00000080` — ожидает значения от дизайнера
- booking light `--backdrop-scrim` = `#00000080` — ожидает значения от дизайнера
- booking dark `--backdrop-scrim` = `#00000080` — ожидает значения от дизайнера
- maps light `--accent-press` = `#1668c9` — ожидает значения от дизайнера
- maps light `--danger-soft-bg` = `#fdecec` — ожидает значения от дизайнера
- maps light `--info` = `#1668c9` — ожидает значения от дизайнера
- maps light `--info-soft-bg` = `#eef4fc` — ожидает значения от дизайнера
- maps dark `--accent-press` = `#35e0ff` — ожидает значения от дизайнера
- maps dark `--danger-soft-bg` = `#141d31` — ожидает значения от дизайнера
- maps dark `--info` = `#35e0ff` — ожидает значения от дизайнера
- maps dark `--info-soft-bg` = `#141d31` — ожидает значения от дизайнера
- maps light `--gold-soft` = `#fdf3e6` — ожидает значения от дизайнера
- maps dark `--gold-soft` = `#141d31` — ожидает значения от дизайнера

## Как отдать значения

1. В Figma Variables имена ролей совпадают с таблицей выше; коллекция на бренд, режим на тему.
2. Значения переносятся в `tokens/brands/<brand>.json` литералами (без ссылок), PR в этот репозиторий.
3. `npm run tokens:build` перегенерирует CSS и этот файл; `npm test` не пропустит пропущенную роль или `var()` в значении.
