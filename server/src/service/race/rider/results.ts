import { ZwiftEvent } from '../../../Model/ZwiftEvent.js';
import { ZwiftResult } from '../../../Model/ZwiftResult.js';
import { ZwiftEventSchema } from '../../../types/model.interface.js';
import { secondesToTime } from '../../../utility/date-convert.js';
import { addPropertyAddition } from '../../../utility/property-addition.js';

export async function getUserResultsFromDB(zwiftId: string) {
  const resultsDB = await ZwiftResult.find({ profileId: zwiftId });
  const results = resultsDB.map((result) => result.toObject());

  const resultsWithMaxValues = addPropertyAddition(results);
  for (const result of resultsWithMaxValues) {
    const zwiftEventDB: ZwiftEventSchema | null = await ZwiftEvent.findOne({
      id: result.eventId,
    });

    if (!zwiftEventDB) {
      continue;
    }

    const { name, eventStart } = zwiftEventDB;

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
  resultsWithMaxValues.sort((a, b) => {
    if (b.eventStart && a.eventStart) {
      return b.eventStart - a.eventStart;
    }
    return 0;
  });

  return resultsWithMaxValues;
}
