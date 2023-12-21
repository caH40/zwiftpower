import { ZwiftResult } from '../../../Model/ZwiftResult.js';

// types
import {
  GetCurrentEventsSeries,
  ResultWithEventAndSubgroup,
} from '../../../types/types.interface.js';

/**
 * Получение результатов райдеров всех currentEvents Эвентов
 * @param currentEvents -  данные Эвентов Серии за выбранный сезон
 */
export async function getResultsSeriesRaw(
  currentEvents: GetCurrentEventsSeries
): Promise<ResultWithEventAndSubgroup[]> {
  return await ZwiftResult.find(
    {
      zwiftEventId: currentEvents,
      rankEvent: 1,
    },
    { cpBestEfforts: false }
  )
    .populate('subgroupId')
    .populate('zwiftEventId')
    .lean();
}
