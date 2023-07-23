import { PowerCurve } from '../../../Model/PowerCurve.js';
import { ZwiftResult } from '../../../Model/ZwiftResult.js';
import { getProfile } from './profile.js';
import { getUserResultsFromDB } from './results.js';

export async function getUserResultsService(zwiftId) {
  try {
    if (zwiftId === 'undefined')
      return {
        userResults: [],
        profile: {},
        powerCurve: {},
        message: 'Некорректный zwiftId',
      };

    const powerCurveDB = await PowerCurve.findOne({ zwiftId });
    const results = await getUserResultsFromDB(zwiftId);
    const profile = await getProfile(zwiftId, powerCurveDB, results[0]);

    return {
      userResults: results,
      profile,
      powerCurve: powerCurveDB || {},
      message: 'Профайл и результаты райдера',
    };
  } catch (error) {
    throw error;
  }
}
export async function getUserPowerService(zwiftId) {
  try {
    if (zwiftId === 'undefined')
      return {
        userResults: [],
        profile: {},
        powerCurve: {},
        message: 'Некорректный zwiftId',
      };

    const powerCurveDB = await PowerCurve.findOne({ zwiftId });

    const resultsDB = await ZwiftResult.find(
      { profileId: zwiftId },
      { cpBestEfforts: true, zwiftEventId: true }
    ).populate('zwiftEventId');
    const powerFromEvents = resultsDB.map((result) => ({
      cpBestEfforts: result.cpBestEfforts,
      eventName: result.zwiftEventId.name,
      eventStart: result.zwiftEventId.eventStart,
    }));

    return {
      powerCurve: powerCurveDB,
      powerFromEvents,
      message: 'Кривая мощности райдера',
    };
  } catch (error) {
    throw error;
  }
}
