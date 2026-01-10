import { setStageRank } from './setStageRank.js';

// types
import { TStageResult } from '../../../types/model.interface.js';

/**
 * Установка мест в финишном протоколе для этапов тура.
 */
export class TourStageRanking {
  /**
   * Сортировка результатов и установка ранкинга в результатах этапа для каждой категории
   * по наименьшему финишному времени.
   */
  set = (stageResults: TStageResult[]): TStageResult[] => {
    if (!stageResults.length) {
      return [];
    }

    const sortedResults = stageResults.toSorted((a, b) => {
      const aResult =
        a.durationInMillisecondsWithPenalties || a.activityData.durationInMilliseconds;
      const bResult =
        b.durationInMillisecondsWithPenalties || b.activityData.durationInMilliseconds;
      return aResult - bResult;
    });

    return setStageRank(sortedResults);
  };
}
