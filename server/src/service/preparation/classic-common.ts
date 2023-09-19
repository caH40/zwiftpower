import { ZwiftResult } from '../../Model/ZwiftResult.js';
import { addPropertyAddition } from '../../utils/property-addition.js';
import { secondesToTimeThousandths } from '../../utils/thousandths.js';
import { sortAndFilterResults } from './sortAndFilter.js';

// types
import { EventWithSubgroup } from '../../types/types.interface.js';

/**
 * Получение результатов райдеров в Эвенте типа ClassicCommon
 */
export async function getResultsClassicCommon(event: EventWithSubgroup) {
  const resultsDB = await ZwiftResult.find({ zwiftEventId: event._id }).lean();

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
