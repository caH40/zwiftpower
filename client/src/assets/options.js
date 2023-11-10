// options for selects

import { raceTypes } from './zwift/race-type';

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
const optionsRaceTypes = raceTypes.map((option) => ({
  id: option.id,
  label: option.name,
  name: option.value,
}));

export const optionsEventPattern = [
  ...optionsRaceTypes,
  { id: 100, name: 'Сброс настроек', label: 'Сброс настроек' },
];
