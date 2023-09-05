import { EventWithSubgroupAndSeries } from '../../../types/types.interface.js';

/**
 * Фильтрация по названию найденных Эвентов согласно поисковому запросу search
 */
export function getEventsFiltered(events: EventWithSubgroupAndSeries[], search?: string) {
  const eventsFiltered = events.filter((event) => {
    if (!search) return true;
    if (event.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())) return true;
    return false;
  });

  return eventsFiltered;
}
