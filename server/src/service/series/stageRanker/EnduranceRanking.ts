import { setStageRank } from './setStageRank.js';

// type
import { TStageResult } from '../../../types/model.interface.js';

/**
 * Установка мест в финишном протоколе для этапов серии типа Endurance.
 */
export class EnduranceStageRanking {
  /**
   * Сортировка результатов и установка ранкинга в результатах этапа для каждой категории
   * с учетом полной дистанции.
   * FIXME: Необходима логика выявления участников заезда, которые ехали не из кармана,
   * а присоединились позже.
   */
  set = async (stageResults: TStageResult[]): Promise<TStageResult[]> => {
    if (!stageResults.length) {
      return [];
    }

    // Результаты в которых райдер проехал не полную дистанцию из-за позднего подключения
    // ставятся ниже тех, кто проехал полную.
    const sortedResults = stageResults.toSorted((a, b) => {
      return a.activityData.durationInMilliseconds - b.activityData.durationInMilliseconds;
    });

    return setStageRank(sortedResults);
  };
}
