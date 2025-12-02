/**
 * Текущий сезон, указывается при первоначальном запросе для некоторых страниц: catchup
 */
export const seasonCurrent = '2024';
/**
 * Параметры для Variability Index
 * color - цвет отображения зоны
 * value - верхняя граница зоны (включая данное значение)
 */
export const viParams = {
  z1: { color: 'green', value: 1.05 },
  z2: { color: '#f3f300', value: 1.1 },
  z3: { color: 'orange', value: 1.2 },
  z4: { color: 'red', value: 1.99 },
};

/**
 * Количество записей при пагинации
 */
export const records = [
  { id: 0, value: 5 },
  { id: 1, value: 10 },
  { id: 2, value: 15 },
  { id: 3, value: 20 },
  { id: 4, value: 25 },
  { id: 5, value: 50 },
];

export const CURRENCY = ['RUB'];
export const currency = new Map([
  [
    'RUB',
    {
      shortName: 'руб',
      symbol: '₽',
    },
  ],
]);

export const PURCHASE_UNITS = ['month', 'week', 'day', 'piece'];
export const purchaseUnits = new Map([
  ['month', { label: 'месяц', symbol: 'мес.', full: 'за месяц' }],
  ['week', { label: 'неделя', symbol: 'нед.', full: 'за неделю' }],
  ['day', { label: 'день', symbol: 'дн.', full: 'за день' }],
  ['piece', { label: 'штука', symbol: 'шт.', full: 'за штуку' }],
]);

/**
 * Коды стран для отображения флага, которые не соответствуют БД флагов при простой операции исключения последней буквы.
 */
export const COUNTRY_CODE_MAP = {
  ukr: 'ua',
  tur: 'tr',
  dnk: 'dk',
  swe: 'se',
  kor: 'kr',
  pol: 'pl',
  and: 'ad',
  blr: 'by',
  ata: 'aq',
  kaz: 'kz',
  isr: 'il',
  arm: 'am',
  est: 'ee',
  spm: 'pm',
  srb: 'rs',
  jam: 'jm',
  prt: 'pt',
  fsm: 'fm',
};
