// options for selects

import { raceTypes } from './zwift/race-type';

/**
 * Сезоны для CatchUp
 */
export const optionsSeasons = [
  { label: 'Все сезоны', name: 'all', id: 0 },
  { label: 'Сезон 2022-2023', name: '2022', id: 1 },
  { label: 'Сезон 2023-2024', name: '2023', id: 2 },
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
  // { id: 100, name: 'Сброс настроек', label: 'Сброс настроек' },
];
