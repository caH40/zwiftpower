// options for selects

import { raceTypes } from './zwift/race-type';

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
 * Названия паттернов настроек для Эвентов
 */
export const optionsRaceTypes = raceTypes.map((option) => ({
  id: option.id,
  label: option.name,
  name: option.value,
  translate: option.name,
}));

export const optionsEventPattern = [
  ...optionsRaceTypes,
  // { id: 100, name: 'Сброс настроек', label: 'Сброс настроек' },
];

export const categoryEnforcement = [
  { id: 0, label: 'Выключена', name: 'disabled', translate: 'Выключена' },
  { id: 1, label: 'Категории, стандарт', name: 'category', translate: 'Категории' },
  { id: 2, label: 'Рейтинг, стандарт', name: 'racingScore', translate: 'Рейтинг' },
  { id: 3, label: 'Догонялки, новые', name: 'catchUpNew', translate: 'Догонялки, новые' },
];

/**
 * Настройки строгой категоризации
 */
export const optionsCategoryEnforcement = categoryEnforcement.map((option) => ({
  id: option.id,
  label: option.label,
  name: option.name,
  translate: option.translate,
}));
