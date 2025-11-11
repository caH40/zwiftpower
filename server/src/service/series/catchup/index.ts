import { Types } from 'mongoose';

import { resultsSeriesDto } from '../../../dto/resultsSeries.dto.js';
import { getCurrentEvents } from './events.js';
import { getResults } from './results-list.js';
import { getResultsSeriesRaw } from './results-series.js';
import { getResultSummary } from './summary.js';
import { addStartGaps } from './utils.js';
import { getLeaderboardCatchup } from './leaderboard.js';

/**
 * Все победители Эвентов 'Догонялок' и сводные результаты
 * @param seriesId - _id серии заездов.
 */
export async function getResultsSeriesCatchup(seriesId?: Types.ObjectId) {
  if (!seriesId) {
    throw new Error('Не получен seriesId для догонялок!');
  }

  // получение _id всех Эвентов выбранного сезона,
  const currentEvents = await getCurrentEvents(seriesId);

  // получение результатов райдеров всех currentEvents Эвентов
  const resultsRaw = await getResultsSeriesRaw(currentEvents);

  // добавление стартовых гэпов эвентов в результаты первых мест
  const resultsRawWithGaps = addStartGaps(resultsRaw);

  // формирование массива результатов с необходимыми данными для запроса
  const results = getResults(resultsRawWithGaps);

  // Получение сводной информации за сезон.
  const leaderboardCatchup = getLeaderboardCatchup(results);

  // Получение сводной информации за сезон.
  const resultsSummary = getResultSummary(results);

  return resultsSeriesDto({ results, resultsSummary, leaderboardCatchup });
}
