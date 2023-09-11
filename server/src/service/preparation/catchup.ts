import { ZwiftResult } from '../../Model/ZwiftResult.js';
import { secondesToTimeThousandths } from '../../utility/thousandths.js';
import { addPropertyAddition } from '../../utility/property-addition.js';
import { sortAndFilterResults } from './sortAndFilter.js';

// types
import { EventWithSubgroup } from '../../types/types.interface.js';
import { ZwiftResultSchema } from '../../types/model.interface.js';

/**
 * Получение результатов райдеров в Эвенте типа Catchup
 */
export async function getResultsCatchup(event: EventWithSubgroup) {
  const resultsDB: ZwiftResultSchema[] = await ZwiftResult.find({
    zwiftEventId: event._id,
  }).lean();

  // Фильтрация и сортировка отправляемого протокола с результатами
  const resultsFilteredAndSorted = sortAndFilterResults(resultsDB);

  const resultsWithMaxValues = addPropertyAddition(resultsFilteredAndSorted);

  // добавление строки времени в addition durationInMilliseconds
  for (const result of resultsWithMaxValues) {
    result.activityData.durationInMilliseconds.addition = secondesToTimeThousandths(
      result.activityData.durationInMilliseconds.value
    );
  }

  event.results = resultsWithMaxValues;

  return event;
}
