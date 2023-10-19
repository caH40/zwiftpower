import { handlerProtocol } from '../../protocol/handler.js';
import { addCriticalPowers } from './criticalpower/criticalpower.js';
import { banUpdating } from './update-ban.js';

// types
import { EventWithSubgroup, ResultEventAdditional } from '../../../types/types.interface.js';
import { getResultsFromZwift } from './resultsFromZwift.js';
import { updatePowerCurveResults } from './criticalpower/criticalpower-update.js';
import { addCriticalPowersFast } from './criticalpower/criticalpower-fast.js';
import { ZwiftEvent } from '../../../Model/ZwiftEvent.js';

/**
 * Обновление результатов Эвента (event)
 */
export async function updateResultsEvent(event: EventWithSubgroup, isFast?: boolean) {
  if (!event._id) {
    throw new Error(`Не найден event._id ${event._id}`);
  }
  // запрет на обновление результатов Эвента который старше 14 дней
  const periodActual = 14;
  banUpdating(event.eventStart, periodActual);

  // получение результатов заезда из ZwiftAPI
  const resultsTotal = await getResultsFromZwift(event.eventSubgroups);

  // добавление CP в результаты райдеров, сохранение FitFiles
  const nameAndDate = { name: event.name, eventStart: new Date(event.eventStart).getTime() };

  let resultsWithCP = [] as ResultEventAdditional[];
  // выбор как обновлять результаты
  if (isFast) {
    resultsWithCP = addCriticalPowersFast(resultsTotal);
  } else {
    resultsWithCP = await addCriticalPowers(resultsTotal, nameAndDate);
    // обновление CP райдеров в БД
    await updatePowerCurveResults(resultsWithCP);
    // после полного обновления результатов остановить автоматическое быстрое обновление результатов
    await ZwiftEvent.findOneAndUpdate({ _id: event._id }, { $set: { hasResults: true } });
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
