import { PowerCurve } from '../../Model/PowerCurve.js';
import { User } from '../../Model/User.js';
import { ZwiftEvent } from '../../Model/ZwiftEvent.js';
import { ZwiftResult } from '../../Model/ZwiftResult.js';
import { secondesToTime } from '../../utility/date-convert.js';
import { addPropertyAddition } from '../../utility/property-addition.js';

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

    const resultsDB = await ZwiftResult.find({ profileId: zwiftId });
    const results = resultsDB.map((result) => result.toObject());

    const resultsWithMaxValues = addPropertyAddition(results);
    for (let result of resultsWithMaxValues) {
      const { name, eventStart } = await ZwiftEvent.findOne({
        id: result.eventId,
      });
      result.eventName = name;
      result.eventStart = new Date(eventStart).getTime();
    }

    // добавление строки времени в addition durationInMilliseconds
    for (const result of resultsWithMaxValues) {
      result.activityData.durationInMilliseconds.addition = secondesToTime(
        result.activityData.durationInMilliseconds.value
      );
    }
    // сортировка по дате старта заезда
    resultsWithMaxValues.sort((a, b) => b.eventStart - a.eventStart);
    const userDB = await User.findOne({ zwiftId });

    return {
      userResults: resultsWithMaxValues,
      profile: userDB,
      powerCurve: powerCurveDB || {},
      message: 'Профайл и результаты райдера',
    };
  } catch (error) {
    throw error;
  }
}
