// options for selects

import { accessExpressions } from './zwift/accessExpression';

/**
 * Сезоны для CatchUp
 */
export const optionsSeasons = [
  { label: 'Все сезоны', name: 'all', id: 0 },
  { label: 'Сезон 2022-2023', name: '2022', id: 1 },
  { label: 'Сезон 2023-2024', name: '2023', id: 2 },
  { label: 'Сезон 2024-2025', name: '2024', id: 3 },
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
 * Настройки строгой категоризации
 */
export const optionsCategoryEnforcement = accessExpressions.map((option) => ({
  id: option.id,
  label: option.label,
  name: option.name,
  translate: option.label,
}));

/**
 * Типы серий заездов с описанием.
 */
export const seriesTypes = [
  {
    id: 0,
    value: 'series',
    name: 'Серия заездов',
  },
  {
    id: 1,
    value: 'tour',
    name: 'Тур',
  },
  {
    id: 2,
    value: 'catchUp',
    name: 'Догонялки',
  },
  // {
  //   id: 3,
  //   value: 'criterium',
  //   name: 'Критериум',
  // },
];

export const siteServicesList = (services) =>
  services.map((s) => ({
    label: s.label,
    name: s.id,
    id: s.id,
  }));

export const seriesCategoryOptions = (categories) =>
  categories.map((c) => ({
    label: c,
    name: c,
    id: c,
  }));
