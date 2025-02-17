import { ZwiftEvent } from '../../../Model/ZwiftEvent.js';
import { getTimerLocal } from '../../../utils/date-local.js';
import { eventOptionsVisibility, optionsEventType } from '../../../assets/constants.js';
import { routes } from '../../../assets/zwift/lib/cjs/routes.js';
import { worlds } from '../../../assets/zwift/lib/cjs/worlds.js';
import { capitalizeFirstLetter } from '../../../utils/text.js';

// types
import { NextWeekRacesResponseDB } from '../../../types/mongodb-response.types.js';
import { TNextWeekRace, TRoute } from '../../../types/types.interface.js';
import { TResponseService } from '../../../types/http.interface.js';

/**
 * Получает список предстоящих заездов на следующую неделю для рассылки.
 */
export async function getNextWeekRacesService(): Promise<TResponseService<TNextWeekRace[]>> {
  // Получаем список событий из базы данных.
  const eventsDB = await ZwiftEvent.find(
    { started: false }, // Фильтруем только те, которые еще не начались.
    {
      id: true,
      name: true,
      eventType: true,
      eventStart: true,
      organizerId: true,
      microserviceEventVisibility: true,
      microserviceExternalResourceId: true,
    }
  )
    .populate({ path: 'organizerId', select: ['name', '-_id'] })
    .populate({
      path: 'eventSubgroups',
      select: [
        'mapId',
        'routeId',
        'distanceSummary',
        'distanceInMeters',
        'durationInSeconds',
        'laps',
      ],
      // options: { limit: 1 }, // Данные из первой подгруппы. Улучшить: если дистанции разные, то делать для каждой.
    })
    .sort({ eventStart: 1 })
    .lean<NextWeekRacesResponseDB[]>();

  // Преобразуем данные из БД в удобный формат
  const events = eventsDB.map((event) => {
    const {
      eventStart,
      eventType,
      eventSubgroups,
      microserviceExternalResourceId,
      id,
      microserviceEventVisibility,
      organizerId,
    } = event;

    // Форматируем дату начала события с добавлением названия дня недели.
    const eventStartFormatted = capitalizeFirstLetter(
      getTimerLocal(eventStart, 'DDMMYYHm', { weekday: true })
    );

    // Получаем локализованный перевод типа события.
    const eventTypeFormatted = optionsEventType.find(
      (type) => type.name === eventType
    )?.translate;

    // URL регистрации на событие.
    const registrationUrl = `https://www.zwift.com/eu/events/view/${id}`;

    // URL вступления в клуб.
    const joinClubUrl = `https://www.zwift.com/eu/clubs/${microserviceExternalResourceId}/join`;

    // Получаем локализованный перевод видимости события (кто может участвовать в заезде).
    const eventVisibility = eventOptionsVisibility.find(
      (option) => option.name === microserviceEventVisibility
    )?.translate;

    // Достаем данные о маршруте и мире из подгруппы.
    const { mapId, routeId, distanceSummary, distanceInMeters, durationInSeconds, laps } =
      eventSubgroups[0];

    // Получаем название маршрута (если найден).
    const { name: routeName } = (routes.find((route) => route.id === routeId) as TRoute) || {};

    // Получаем название мира (если найден).
    const worldName = worlds.find((world) => world.id === mapId)?.name;

    return {
      distanceInMeters,
      distanceSummary,
      durationInSeconds,
      eventStart: eventStartFormatted,
      eventType: eventTypeFormatted,
      eventVisibility,
      joinClubUrl,
      laps,
      organizerName: organizerId.name,
      registrationUrl,
      routeName,
      worldName,
    };
  });

  return {
    data: events,
    message: 'Данные предстоящих заездов для информационной рассылки по e-mail',
  };
}
