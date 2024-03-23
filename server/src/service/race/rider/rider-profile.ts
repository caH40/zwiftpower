import { PowerCurve } from '../../../Model/PowerCurve.js';
import { ZwiftResult } from '../../../Model/ZwiftResult.js';
import { userPowerDto } from '../../../dto/user-power.dto.js';
import { userResultsDto } from '../../../dto/user-results.dto.js';
import { getProfileService } from './profile.js';
import { getUserResultsFromDB } from './results.js';

// types
import { GetProfileResultsQuery } from '../../../types/http.interface.js';
import { ResultWithEvent } from '../../../types/types.interface.js';

/**
 * Получение профайла райдера (анкеты), основных значений CriticalPower, всех результатов райдера
 */
export async function getUserResultsService({
  zwiftId,
  page = 1,
  docsOnPage = 20,
}: GetProfileResultsQuery) {
  if (zwiftId === undefined) {
    return null;
  }

  const powerCurveDB = await PowerCurve.findOne({ zwiftId }).lean();
  const { resultsWithMaxValues: results, quantityPages } = await getUserResultsFromDB(
    zwiftId,
    page,
    docsOnPage
  );
  const profile = await getProfileService(zwiftId);

  // подготовка данных для отправки при запросе API
  return userResultsDto({
    userResults: results,
    quantityPages,
    profile,
    powerCurve: powerCurveDB,
  });
}

/**
 * Сервис получения значений кривой CriticalPower за 90 дней
 * для райдера (zwiftId) и CriticalPower со всех Заездов
 */
export async function getUserPowerService(zwiftId: string) {
  if (zwiftId === 'undefined') {
    return null;
  }

  const powerCurveDB = await PowerCurve.findOne({ zwiftId }).lean();

  const resultsDB: ResultWithEvent[] = await ZwiftResult.find(
    { profileId: zwiftId },
    { cpBestEfforts: true, zwiftEventId: true }
  ).populate('zwiftEventId');

  const powerFromEvents = resultsDB.map((result) => ({
    _id: result._id,
    cpBestEfforts: result.cpBestEfforts,
    eventName: result.zwiftEventId.name,
    eventStart: new Date(result.zwiftEventId.eventStart).getTime(),
  }));

  powerFromEvents.sort((a, b) => b.eventStart - a.eventStart);

  // подготовка данных для отправки при запросе API
  return userPowerDto({ powerCurve: powerCurveDB, powerFromEvents });
}
