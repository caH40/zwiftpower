import { handlerProtocol } from '../../protocol/handler-protocol.js';
import { addCriticalPowers } from './criticalpower/criticalpower.js';
import { banUpdating } from './update-ban.js';
import { getResultsFromZwift } from './resultsFromZwift.js';
import { updatePowerCurveResults } from './criticalpower/criticalpower-update.js';
import { addCriticalPowersFast } from './criticalpower/criticalpower-fast.js';
import { ZwiftEvent } from '../../../Model/ZwiftEvent.js';
import { updateZwiftDataInProfiles } from '../../profile/zwiftid/profiles.js';
import { addSpeed } from './speed.js';
import { addNormalizedPowers } from './normalized-power.js';
import { addVariabilityIndex } from './variability-index.js';
import { getResultsDNFRiders } from './result-events-dnf.js';

// types
import { EventWithSubgroup, ResultEventAdditional } from '../../../types/types.interface.js';

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

  // дополнительные данные для фитфайла текущей активности добавляемого коллекцию FitFile в БД райдера
  const nameAndDate = {
    name: event.name,
    eventId: event.id,
    eventStart: new Date(event.eventStart).getTime(),
  };

  let resultsTotalWithCP = [] as ResultEventAdditional[];

  // выбор как обновлять результаты
  if (isFast) {
    resultsTotalWithCP = addCriticalPowersFast(resultsTotal);
  } else {
    // получение результатов райдеров которые не финишировали
    const ridersWithFinish = resultsTotal.map((result) => result.profileId);
    const resultsRidersDNF = await getResultsDNFRiders(ridersWithFinish, event.id);

    // обновление профайлов райдеров
    const zwiftIds = [...resultsTotal, ...resultsRidersDNF].map((result) => result.profileId);
    await updateZwiftDataInProfiles(zwiftIds);

    // добавление CP в результаты райдеров, сохранение FitFiles
    resultsTotalWithCP = await addCriticalPowers(
      [...resultsTotal, ...resultsRidersDNF],
      nameAndDate
    );

    // добавление NP нормализованной мощности
    await addNormalizedPowers(resultsTotalWithCP);

    // добавление Variability Index (VI) Индекс вариабельности
    await addVariabilityIndex(resultsTotalWithCP);

    // обновление CP райдеров в БД
    await updatePowerCurveResults(resultsTotalWithCP);
    // после полного обновления результатов остановить автоматическое быстрое обновление результатов
    await ZwiftEvent.findOneAndUpdate({ _id: event._id }, { $set: { hasResults: true } });
  }

  // добавление средней скорости в результаты (мутация свойства speed)
  resultsTotalWithCP = await addSpeed(resultsTotalWithCP, event);

  // параметры для функции handlerProtocol
  const handlerProtocolArg = {
    eventId: event._id,
    results: resultsTotalWithCP,
    typeRaceCustom: event.typeRaceCustom,
  };

  // обработка результатов, согласно типа (typeRaceCustom) Эвента
  // и сохранение в БД
  await handlerProtocol(handlerProtocolArg);
}
