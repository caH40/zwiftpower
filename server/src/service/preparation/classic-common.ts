import { ZwiftResult } from '../../Model/ZwiftResult.js';
import { addPropertyAddition } from '../../utils/property-addition.js';
import { secondesToTimeThousandths } from '../../utils/thousandths.js';
import { sortAndFilterResults } from './sortAndFilter.js';
import { changeProfileData } from '../profile-main.js';
import { gapValue } from '../../utils/gaps-results.js';
import { filterThousandths } from '../../utils/thousandths-seconds.js';
import { setValueMax } from '../../utils/value-max.js';

// types
import { EventWithSubgroup } from '../../types/types.interface.js';

/**
 * Получение результатов райдеров в Эвенте типа ClassicCommon
 */
export async function getResultsClassicCommon(event: EventWithSubgroup) {
  const resultsDB = await ZwiftResult.find({ zwiftEventId: event._id }).lean();

  // подмена данных профиля на Основной, если результат был показан Дополнительным профилем
  const results = changeProfileData(resultsDB);

  // Фильтрация и сортировка отправляемого протокола с результатами
  const resultsFilteredAndSorted = sortAndFilterResults(results);

  const resultsWithAdditions = addPropertyAddition(resultsFilteredAndSorted);

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
