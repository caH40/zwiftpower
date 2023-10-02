// options for selects

import { seriesType } from './series-type';

/**
 * Сезоны для CatchUp
 */
export const optionsSeasons = [
  { name: 'Сезон 2022-2023', id: 0 },
  { name: 'Сезон 2023-2024', id: 1 },
];

/**
 * Периоды для диаграммы количества райдеров в Эвентах
 */
export const optionsPeriodsRidersInEvent = [
  { id: 0, name: 'Год' },
  { id: 1, name: '3 месяца' },
  { id: 2, name: '30 дней' },
];

/**
 * Названия паттернов настроек для Эвентов
 */
export const optionsEventPattern = [
  ...seriesType,
  { id: 100, name: 'Сброс настроек', label: 'Сброс настроек' },
];
