import { EventWithSubgroupAndSeries } from '../../../types/types.interface.js';

/**
 * Фильтрация по полям: название, организатор, карта, маршрут найденных Эвентов согласно поисковому запросу search
 */
export function getEventsFiltered(events: EventWithSubgroupAndSeries[], search?: string) {
  // Если search пустой, вернуть весь список без фильтрации.
  if (!search) {
    return events;
  }

  const eventsFiltered = events.filter((event) => {
    // При пустом search возвращать все элементы.
    if (!search) {
      return true;
    }

    const searchLower = search.toLocaleLowerCase(); // Приводим запрос к нижнему регистру один раз.

    return [
      event.name,
      event.description,
      event.organizer,
      event.organizerId?.name,
      event.organizerId?.shortName,
    ]
      .filter((elm) => Boolean(elm))
      .some((field) => field.toLocaleLowerCase().includes(searchLower));
  });

  return eventsFiltered;
}
