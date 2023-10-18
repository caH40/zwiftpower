import { handlerProtocol } from '../../protocol/handler.js';
import { addCriticalPowers } from '../../race/criticalpower.js';
import { banUpdating } from './update-ban.js';

// types
import { EventWithSubgroup } from '../../../types/types.interface.js';
import { getResultsFromZwift } from './resultsFromZwift.js';

/**
 * Обновление результатов Эвента (event)
 */
export async function updateResultsEvent(event: EventWithSubgroup) {
  // запрет на обновление результатов Эвента который старше 7 дней
  const periodActual = 7;
  banUpdating(event.eventStart, periodActual);

  // получение результатов заезда из ZwiftAPI
  const resultsTotal = await getResultsFromZwift(event.eventSubgroups);

  // добавление CP в результаты райдеров
  const nameAndDate = { name: event.name, eventStart: new Date(event.eventStart).getTime() };
  const resultsWithCP = await addCriticalPowers(resultsTotal, nameAndDate);

  if (!event._id) {
    throw new Error(`Не найден event._id ${event._id}`);
  }
  if (!resultsWithCP) {
    throw new Error(`Не найден resultsWithCP ${resultsWithCP}`);
  }

  // параметры для функции handlerProtocol
  const handlerProtocolArg = {
    eventId: event._id,
    results: resultsWithCP,
    typeRaceCustom: event.typeRaceCustom,
  };

  // обработка результатов, согласно типа (typeRaceCustom) Эвента
  // и сохранение в БД
  await handlerProtocol(handlerProtocolArg);
}
