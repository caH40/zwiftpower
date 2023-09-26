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
    eventId: number;
    eventStart: number;
    organizer: string;
    typeRaceCustom: string;
  }[];

  // получение Эвентов за запрашиваемый период period
  const eventsDB: EventData = await ZwiftEvent.find(
    { eventStart: { $gt: eventsStartFromDate } },
    { eventId: true, eventStart: true, organizer: true, typeRaceCustom: true, _id: false }
  ).lean();

  // инициализация итогового массива
  const ridersInEvents: StatisticsRidersInEvent[] = [];

  // подсчет финишировавших райдеров в Эвенте и создание итогового массива статистики
  for (const event of eventsDB) {
    const zwiftResultDB = await ZwiftResult.find(
      { eventId: event.eventId },
      { profileData: true, _id: false }
    );

    const riders = {
      // подсчет мужчин
      male: zwiftResultDB.filter((result) => result.profileData.gender === 'male').length,
      // подсчет женщин
      female: zwiftResultDB.filter((result) => result.profileData.gender === 'female').length,
    };

    ridersInEvents.push({ ...event, riders });
  }

  return ridersInEvents;
};
