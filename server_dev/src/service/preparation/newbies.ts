import { ZwiftResult } from '../../Model/ZwiftResult.js';
import { addPropertyAddition } from '../../utility/property-addition.js';
import { secondesToTimeThousandths } from '../../utility/thousandths.js';
import { filterByRank } from '../protocol/newbies/results-filter.js';

// types
import { ZwiftResultSchema } from '../../types/model.interface.js';
import { EventWithSubgroup } from '../../types/types.interface.js';

/**
 * Получение результатов райдеров в Эвенте типа Newbies
 */
export async function getResultsNewbies(event: EventWithSubgroup) {
  const resultsDB: ZwiftResultSchema[] = await ZwiftResult.find({
    zwiftEventId: event._id,
  }).lean();

  const resultsFiltered = filterByRank(resultsDB);

  const resultsWithMaxValues = addPropertyAddition(resultsFiltered);

  // добавление строки времени в addition durationInMilliseconds
  for (const result of resultsWithMaxValues) {
    result.activityData.durationInMilliseconds.addition = secondesToTimeThousandths(
      result.activityData.durationInMilliseconds.value
    );
  }

  event.results = resultsWithMaxValues;

  return event;
}
