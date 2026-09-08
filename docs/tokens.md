# Токены контракта v2

Источник истины — `tokens/brands/*.json`. Имена ролей = имена Figma Variables (`группа/роль` → `--группа-роль`).

## Роли по темам

| Роль                   |
| ---------------------- |
| `--surface-base`       |
| `--surface-panel`      |
| `--surface-raised`     |
| `--surface-subtle`     |
| `--backdrop-scrim`     |
| `--text-primary`       |
| `--text-secondary`     |
| `--text-muted`         |
| `--text-tertiary`      |
| `--text-faint`         |
| `--text-on-accent`     |
| `--border`             |
| `--border-subtle`      |
| `--border-hairline`    |
| `--border-input`       |
| `--accent`             |
| `--accent-press`       |
| `--accent-soft-bg`     |
| `--accent-soft-border` |
| `--success`            |
| `--success-soft-bg`    |
| `--warning`            |
| `--warning-soft-bg`    |
| `--danger`             |
| `--danger-soft-bg`     |
| `--info`               |
| `--info-soft-bg`       |
| `--shadow-sm`          |
| `--shadow-md`          |
| `--shadow-lg`          |

## Статические роли

| Роль            |
| --------------- |
| `--radius-sm`   |
| `--radius-md`   |
| `--radius-lg`   |
| `--radius-full` |
| `--font-sans`   |

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

## Ожидает значения от дизайнера

## Как отдать значения

1. В Figma Variables имена ролей совпадают с таблицей выше; коллекция на бренд, режим на тему.
2. Значения переносятся в `tokens/brands/<brand>.json` литералами (без ссылок), PR в этот репозиторий.
3. `npm run tokens:build` перегенерирует CSS и этот файл; `npm test` не пропустит пропущенную роль или `var()` в значении.
