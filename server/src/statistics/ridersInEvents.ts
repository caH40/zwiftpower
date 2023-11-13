import { ZwiftEvent } from '../Model/ZwiftEvent.js';
import { ZwiftResult } from '../Model/ZwiftResult.js';

// types
import {
  GetRidersInEventsServiceArg,
  StatisticsRidersInEvent,
} from '../types/types.interface.js';

/**
 * Данные для графика количества участвующих райдеров в заездах
 */
export const getRidersInEventsService = async ({ period }: GetRidersInEventsServiceArg) => {
  // расчет даты с которой запрашиваются Эвенты
  const eventsStartFromDate = Date.now() - period;

  type EventData = {
    id: number;
    eventStart: number;
    organizer: string;
    typeRaceCustom: string;
  }[];

  // получение Эвентов
  const eventsDB: EventData = await ZwiftEvent.find(
    { started: true },
    { id: true, eventStart: true, organizer: true, typeRaceCustom: true, _id: false }
  ).lean();

  // фильтрация Эвентов за запрашиваемый период period
  const eventIds = eventsDB
    .filter((event) => new Date(event.eventStart).getTime() > eventsStartFromDate)
    .map((event) => event.id);

  // инициализация итогового массива
  const ridersInEvents: StatisticsRidersInEvent[] = [];

  const zwiftResultsDB = await ZwiftResult.find(
    { eventId: eventIds },
    { 'profileData.gender': true, eventId: true, _id: false }
  );

  // подсчет количества мужчин/женщин в Эвенте и формирование итогового массива для фронта
  for (const event of eventsDB) {
    let male = 0;
    let female = 0;

    for (const result of zwiftResultsDB) {
      if (result.eventId === event.id) {
        // подсчет мужчин
        if (result.profileData.gender.toLowerCase() === 'male') {
          male++;
        } else {
          // подсчет женщин
          female++;
        }
      }
    }
    const riders = { male, female };
    // замена строки времени на число
    event.eventStart = new Date(event.eventStart).getTime();

    ridersInEvents.push({ ...event, riders });
  }

  return ridersInEvents;
};
