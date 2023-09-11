import { TotalCatchup } from '../../../Model/TotalCatchup.js';
import { ZwiftResult } from '../../../Model/ZwiftResult.js';
import { resultsSeriesDto } from '../../../dto/resultsSeries.dto.js';
import { TotalCatchupSchema } from '../../../types/model.interface.js';

// types
import { ResultWithEventAndSubgroup } from '../../../types/types.interface.js';
import { getCurrentEvents } from './events.js';
import { getResults } from './results-list.js';
import { getResultSummary } from './summary.js';

/**
 * Все победители Эвентов типа type и сводные результаты за выбранный сезон seasonCurrent
 * @param type - тип Эвента typeRaceCustom
 * @param seasonCurrent - сезон для запроса данных вида 'Сезон 2022-2023'
 */
export async function getResultsSeriesService(type: string, seasonCurrent: string) {
  // выбор сезона
  const getSeason = (seasonStr: string) => {
    switch (seasonStr) {
      case 'Сезон 2022-2023':
        return '2022-2023';
      case 'Сезон 2023-2024':
        return '2023-2024';
      default:
        return null;
    }
  };

  // коллекция создана для ручного добавления результата Эвента и последующего учета
  const totalCatchupDB: TotalCatchupSchema | null = await TotalCatchup.findOne({
    type,
    season: getSeason(seasonCurrent),
  });

  if (!totalCatchupDB) {
    return { results: [], resultsSummary: [] };
  }

  // получение _id всех Эвентов выбранного сезона
  const currentEvents = await getCurrentEvents(type, totalCatchupDB);

  const resultsDB: ResultWithEventAndSubgroup[] = await ZwiftResult.find(
    {
      zwiftEventId: currentEvents,
      rankEvent: 1,
    },
    { cpBestEfforts: false }
  )
    .populate('subgroupId')
    .populate('zwiftEventId')
    .lean();

  // Формирование массива результатов с необходимыми данными для запроса
  const results = getResults(resultsDB);

  // Получение сводной информации о победах за сезон
  const resultsSummary = getResultSummary(results, totalCatchupDB);

  return resultsSeriesDto({ results, resultsSummary });
}
