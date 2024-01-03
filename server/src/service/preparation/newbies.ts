import { ZwiftResult } from '../../Model/ZwiftResult.js';
import { addPropertyAddition } from '../../utils/property-addition.js';
import { secondesToTimeThousandths } from '../../utils/thousandths.js';
import { filterByRankNewbies } from '../protocol/newbies/results-filter.js';
import { changeProfileData } from '../profile-main.js';
import { gapValue } from '../../utils/gaps-results.js';
import { filterThousandths } from '../../utils/thousandths-seconds.js';
import { setValueMax } from '../../utils/value-max.js';

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
  const resultsFiltered = filterByRankNewbies(results);

  /**
   * Замена некоторых свойств с number на object (string and object)
   */
  const resultsWithAdditions = addPropertyAddition(resultsFiltered);

  // добавление строки времени в addition durationInMilliseconds
  for (const result of resultsWithAdditions) {
    result.activityData.durationInMilliseconds.addition = secondesToTimeThousandths(
      result.activityData.durationInMilliseconds.value
    );
  }

  const resultsWithGap = gapValue([...resultsWithAdditions]);
  const resultsWithThousandths = filterThousandths([...resultsWithGap]);
  const resultsPrepared = setValueMax([...resultsWithThousandths]);

  event.results = resultsPrepared;

  return event;
}
