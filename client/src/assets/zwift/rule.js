export const rules = [
  {
    id: 0,
    value: 'SHOW_RACE_RESULTS',
    label: 'Показывать результаты',
    translate: 'Показывать результаты',
  },
  { id: 1, value: 'NO_POWERUPS', label: 'Нет power ups', translate: 'Отключение PowerUp' },
  {
    id: 2,
    value: 'ENFORCE_NO_ZPOWER',
    label: 'Только с PM',
    translate: 'Обязательное наличие измерителя мощности',
  },
  {
    id: 3,
    value: 'ENFORCE_HRM',
    label: 'Только с HRM',
    translate: 'Обязательное наличие измерителя пульса',
  },
  {
    id: 4,
    value: 'NO_DRAFTING',
    label: 'Нет драфта (ТТ)',
    translate: 'Отключение драфта (ТТ режим)',
  },
  { id: 5, value: 'NO_TT_BIKES', label: 'Запрет ТТ', translate: 'Запрет ТТ велосипедов' },
  {
    id: 6,
    value: 'ALLOWS_LATE_JOIN',
    label: 'Позднее подключение',
    translate: 'Позднее подключение',
  },
  { id: 7, value: 'TEST_BIT_10', label: 'TEST_BIT_10', translate: 'Резиновая лента' },
];

// Список правил, применяемых независимо для каждой группы.
export const rulesPerGroup = [
  { id: 0, value: 'LADIES_ONLY', label: 'LADIES_ONLY', translate: 'Только для женщин' },
];
