import { ResultsSeriesFetch } from '../../common/types/resultsSeries.interface.js';
import { getResultsSeriesCatchup } from './catchup/index.js';

/**
 * Все победители Эвентов типа type и сводные результаты за выбранный сезон seasonCurrent
 * @param type - тип Эвента typeRaceCustom
 * @param seasonCurrent - сезон для запроса данных вида 'Сезон 2022-2023'
 */
export async function getResultsSeriesService(
  type: string,
  seasonCurrent: string
): Promise<ResultsSeriesFetch | null> {
  switch (type) {
    case 'catchUp':
      return await getResultsSeriesCatchup(seasonCurrent);
  }

  return null;
}
