import { ZwiftResult } from '../../Model/ZwiftResult.js';
import { addPropertyAddition } from '../../utility/property-addition.js';
import { secondesToTimeThousandths } from '../../utility/thousandths.js';

// types
import { EventWithSubgroup } from '../../types/types.interface.js';

/**
 * Получение результатов райдеров в Эвенте типа ClassicCommon
 */
export async function getResultsClassicCommon(event: EventWithSubgroup) {
  const resultsDB = await ZwiftResult.find({ zwiftEventId: event._id }).lean();

  resultsDB.sort(
    (a, b) => a.activityData.durationInMilliseconds - b.activityData.durationInMilliseconds
  );

  const resultsWithMaxValues = addPropertyAddition(resultsDB);

  // добавление строки времени в addition durationInMilliseconds
  for (const result of resultsWithMaxValues) {
    result.activityData.durationInMilliseconds.addition = secondesToTimeThousandths(
      result.activityData.durationInMilliseconds.value
    );
  }

  event.results = resultsWithMaxValues;

  return event;
}
