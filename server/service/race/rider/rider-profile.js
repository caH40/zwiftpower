import { PowerCurve } from '../../../Model/PowerCurve.js';
import { User } from '../../../Model/User.js';
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
