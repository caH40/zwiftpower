import { TotalCatchup } from '../../../Model/TotalCatchup.js';
import { seasonsSeries } from '../../../assets/constants.js';
import { resultsSeriesDto } from '../../../dto/resultsSeries.dto.js';
import { getCurrentEvents } from './events.js';
import { getResults } from './results-list.js';
import { getResultsSeriesRaw } from './results.js';
import { getResultSummary } from './summary.js';

// types
import { TotalCatchupSchema } from '../../../types/model.interface.js';

/**
 * Все победители Эвентов типа type и сводные результаты за выбранный сезон seasonCurrent
 * @param type - тип Эвента typeRaceCustom
 * @param seasonCurrent - сезон для запроса данных вида 'Сезон 2022-2023'
 */
export async function getResultsSeriesService(type: string, seasonCurrent: string) {
  // получение всех результатов Catchup
  if (seasonsSeries[seasonCurrent] === 'all') {
    // получение _id всех Эвентов выбранного сезона
    const currentEvents = await getCurrentEvents(type);
    // получение результатов райдеров всех currentEvents Эвентов
    const resultsRaw = await getResultsSeriesRaw(currentEvents);
    // формирование массива результатов с необходимыми данными для запроса
    const results = getResults(resultsRaw);

    return resultsSeriesDto({ results });
  }

  // получение результатов Catchup за выбранный сезон и сводную информацию за сезон
  // коллекция создана для ручного добавления результата Эвента и последующего учета
  const totalCatchupDB: TotalCatchupSchema | null = await TotalCatchup.findOne({
    type,
    season: seasonsSeries[seasonCurrent],
  });

  if (!totalCatchupDB) {
    return { results: [], resultsSummary: [], message: 'Серия не найдена' };
  }

  // получение _id всех Эвентов выбранного сезона
  const currentEvents = await getCurrentEvents(type, totalCatchupDB);
  // получение результатов райдеров всех currentEvents Эвентов
  const resultsRaw = await getResultsSeriesRaw(currentEvents);
  // формирование массива результатов с необходимыми данными для запроса
  const results = getResults(resultsRaw);
  // получение сводной информации о победах за сезон
  const resultsSummary = getResultSummary(results, totalCatchupDB);

  return resultsSeriesDto({ results, resultsSummary });
}
