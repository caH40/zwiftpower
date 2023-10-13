import { ZwiftResult } from '../../Model/ZwiftResult.js';
import { secondesToTimeThousandths } from '../../utils/thousandths.js';
import { addPropertyAddition } from '../../utils/property-addition.js';
import { sortAndFilterResults } from './sortAndFilter.js';
import { changeProfileData } from '../profile-main.js';

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

  // подмена данных профиля на Основной, если результат был показан Дополнительным профилем
  const results = changeProfileData(resultsDB);

  // Фильтрация и сортировка отправляемого протокола с результатами
  const resultsFilteredAndSorted = sortAndFilterResults(results);

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
