import { ZwiftResult } from '../../Model/ZwiftResult.js';
import { addPropertyAddition } from '../../utils/property-addition.js';
import { secondesToTimeThousandths } from '../../utils/thousandths.js';
import { filterByRank } from '../protocol/newbies/results-filter.js';

// types
import { EventWithSubgroup } from '../../types/types.interface.js';
import { ZwiftResultSchema } from '../../types/model.interface.js';

/**
 * Получение результатов райдеров в Эвенте типа Newbies
 */
export async function getResultsNewbies(event: EventWithSubgroup) {
  const resultsDB: ZwiftResultSchema[] = await ZwiftResult.find({
    zwiftEventId: event._id,
  }).lean();

  /**
   * Сортировка зачётных категорий (C,D) и далее сортировка категорий вне зачета
   */
  const resultsFiltered = filterByRank(resultsDB);

  /**
   * Замена некоторых свойств с number на object (string and object)
   */
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
