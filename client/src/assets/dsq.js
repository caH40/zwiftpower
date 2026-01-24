/**
 * Описание возможных причин дисквалификации
 */
export const dsqValues = [
  { type: 'VIRTUAL_POWER', label: 'VP' },
  { type: 'DSQ', label: 'DSQ' },
  { type: 'OFF_RECORD', label: 'OFR' }, // выступают вне зачета заезда
  { type: 'DNF', label: 'DNF' },
  { type: 'FINISH_TIME_LIMIT', label: 'LMT' }, // не уложился в лимит времени
];

/**
 * Короткие названия для дисквалификации результата.
 */
export const DISQUALIFICATION_LABELS = [
  'DSQ',
  'DNF',
  'DNS',
  'OUT',
  'LMT',
  'LAP',
  'NP',
  'MRS',
  'MC',
  'UNC',
];

/**
 * DSQ  Disqualified (Синоним) — Дисквалифицирован.
 * DNF  Did Not Finish — Не финишировал.
 * DNS  Did Not Start — Не стартовал.
 * OUT  Out of Classification — Вне зачёта / Не выполнены условия.
 * LMT  Limit Time — Превышен лимит времени.
 * LAP  Lapped — Обогнан на круг / Снят с гонки.
 * NP   No Placement / Not Placed — Без места / Не имеет итогового места.
 * MRS  Missing Required Stage — Не завершён обязательный этап серии.
 * MC   Mixed Categories — На этапах разные категории участия. Для зачёта необходимо проехать
 *   все обязательные этапы в одной категории.
 * UNC  Undefined Category — Не определена категория в Серии.
 */

/**
 * Опции дисквалификации для выбора в интерфейсе.
 */
export const DISQUALIFICATION_OPTIONS = [
  {
    id: 1,
    value: 'DSQ',
    name: 'Дисквалифицирован (Общая причина)',
    description: 'DSQ — Disqualified (Синоним)',
    shortLabel: 'DSQ',
  },
  {
    id: 2,
    value: 'DNF',
    name: 'Не финишировал',
    description: 'DNF — Did Not Finish',
    shortLabel: 'DNF',
  },
  {
    id: 3,
    value: 'DNS',
    name: 'Не стартовал',
    description: 'DNS — Did Not Start',
    shortLabel: 'DNS',
  },
  {
    id: 4,
    value: 'OUT',
    name: 'Вне зачёта',
    description: 'OUT — Out of Classification',
    shortLabel: 'OUT',
  },
  {
    id: 5,
    value: 'LMT',
    name: 'Превышен лимит времени',
    description: 'LMT — Limit Time',
    shortLabel: 'LMT',
  },
  {
    id: 6,
    value: 'LAP',
    name: 'Обогнан на круг',
    description: 'LAP — Lapped',
    shortLabel: 'LAP',
  },
  {
    id: 7,
    value: 'NP',
    name: 'Без места',
    description: 'NP — No Placement / Not Placed',
    shortLabel: 'NP',
  },
  {
    id: 8,
    value: 'MRS',
    name: 'Не завершён обязательный этап',
    description: 'MRS — Missing Required Stage',
    shortLabel: 'MRS',
  },
  {
    id: 9,
    value: 'MC',
    name: 'Разные категории на этапах',
    description: 'MC — Mixed Categories',
    shortLabel: 'MC',
  },
  {
    id: 10,
    value: 'UNC',
    name: 'Не определена категория',
    description: 'UNC — Undefined Category',
    shortLabel: 'UNC',
  },
];
