import { TotalCatchup } from '../../../Model/TotalCatchup.js';
import { seasonsSeries } from '../../../assets/constants.js';
import { resultsSeriesDto } from '../../../dto/resultsSeries.dto.js';
import { getCurrentEvents } from './events.js';
import { getResults } from './results-list.js';
import { getResultsSeriesRaw } from './results-series.js';
import { getResultSummary } from './summary.js';

// types
import { TotalCatchupSchema } from '../../../types/model.interface.js';
import { addStartGaps } from './utils.js';
import { getLeaderboardCatchup } from './leaderboard.js';

const type = 'catchUp';

/**
 * Все победители Эвентов 'Догонялок' и сводные результаты за выбранный сезон seasonCurrent
 * @param seasonCurrent - сезон для запроса данных вида 'Сезон 2022-2023'
 */
export async function getResultsSeriesCatchup(seasonCurrent: string) {
  // Определяем, нужно ли запрашивать данные только для текущего сезона.
  const isSpecificSeason = seasonCurrent !== 'all';

  // Получение данных о серии Догонялки для указанного сезона.
  const totalCatchup = isSpecificSeason
    ? await TotalCatchup.findOne({
        type,
        season: seasonsSeries[seasonCurrent],
      }).lean<TotalCatchupSchema>()
    : null;

  if (isSpecificSeason && !totalCatchup) {
    throw new Error('Серия не найдена');
  }

  // получение _id всех Эвентов выбранного сезона,
  // при totalCatchup=null получение всех эвентов
  const currentEvents = await getCurrentEvents(type, totalCatchup);

  // получение результатов райдеров всех currentEvents Эвентов
  const resultsRaw = await getResultsSeriesRaw(currentEvents);

  // добавление стартовых гэпов эвентов в результаты первых мест
  const resultsRawWithGaps = addStartGaps(resultsRaw);

  // формирование массива результатов с необходимыми данными для запроса
  const results = getResults(resultsRawWithGaps);

  // Получение сводной информации за сезон (только для конкретных сезонов).
  const leaderboardCatchup = isSpecificSeason ? getLeaderboardCatchup(results) : null;

  // Получение сводной информации за сезон (только для конкретных сезонов).
  const resultsSummary = isSpecificSeason ? getResultSummary(results, totalCatchup) : undefined;

  return resultsSeriesDto({ results, resultsSummary, leaderboardCatchup });
}
