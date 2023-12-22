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
import { ResultSummaryCatchup } from '../../../types/types.interface.js';

/**
 * Все победители Эвентов типа type и сводные результаты за выбранный сезон seasonCurrent
 * @param type - тип Эвента typeRaceCustom
 * @param seasonCurrent - сезон для запроса данных вида 'Сезон 2022-2023'
 */
export async function getResultsSeriesService(type: string, seasonCurrent: string) {
  // получение результатов Catchup за выбранный сезон и сводную информацию за сезон
  let totalCatchup = {} as TotalCatchupSchema | null | undefined;

  const needOnlyCurrentSeason = seasonsSeries[seasonCurrent] !== 'all';

  if (needOnlyCurrentSeason) {
    totalCatchup = await TotalCatchup.findOne({
      type,
      season: seasonsSeries[seasonCurrent],
    });

    if (!totalCatchup) {
      throw new Error('Серия не найдена');
    }
  } else {
    totalCatchup = null;
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
  // получение сводной информации о победах за сезон
  // при needOnlyCurrentSeason===false сводную информацию не показывать
  let resultsSummary = [] as ResultSummaryCatchup[] | undefined;
  if (needOnlyCurrentSeason) {
    if (!totalCatchup) {
      throw new Error('Серия не найдена');
    }

    resultsSummary = getResultSummary(results, totalCatchup);
  } else {
    resultsSummary = undefined;
  }

  return resultsSeriesDto({ results, resultsSummary });
}
