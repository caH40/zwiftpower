import { ZwiftResult } from '../../Model/ZwiftResult.js';
import { addPropertyAddition } from '../../utils/property-addition.js';
import { secondesToTimeThousandths } from '../../utils/thousandths.js';
import { filterByRank } from '../protocol/newbies/results-filter.js';
import { changeProfileData } from '../profile-main.js';

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

  // подмена данных профиля на Основной, если результат был показан Дополнительным профилем
  const results = changeProfileData(resultsDB);

  /**
   * Сортировка зачётных категорий (C,D) и далее сортировка категорий вне зачета
   */
  const resultsFiltered = filterByRank(results);

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
