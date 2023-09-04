import { PowerCurve } from '../../../Model/PowerCurve.js';
import { ZwiftResult } from '../../../Model/ZwiftResult.js';
import { userPowerDto } from '../../../dto/user-power.dto.js';
import { userResultsDto } from '../../../dto/user-results.dto.js';

import { ResultWithEvent } from '../../../types/types.interface.js';
import { getProfile } from './profile.js';
import { getUserResultsFromDB } from './results.js';

export async function getUserResultsService(zwiftId: string) {
  if (zwiftId === 'undefined') {
    return null;
  }

  const powerCurveDB = await PowerCurve.findOne({ zwiftId });
  const results = await getUserResultsFromDB(zwiftId);
  const profile = await getProfile({
    zwiftId,
    powerCurve: powerCurveDB,
    resultLast: results[0],
  });

  // подготовка данных для отправки при запросе API
  return userResultsDto({ userResults: results, profile, powerCurve: powerCurveDB });
}
//
// данные для страницы профиля райдера с кривой мощности
export async function getUserPowerService(zwiftId: string) {
  if (zwiftId === 'undefined') {
    return null;
  }

  const powerCurveDB = await PowerCurve.findOne({ zwiftId });

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
