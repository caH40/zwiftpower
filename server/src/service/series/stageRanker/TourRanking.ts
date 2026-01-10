import { setStageRank } from './setStageRank.js';
import { setStageTimeLimit } from './setStageTimeLimit.js';

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
  set = async (stageResults: TStageResult[]): Promise<TStageResult[]> => {
    if (!stageResults.length) {
      return [];
    }

    const sortedResults = this.sort(stageResults);

    const seriesId = stageResults[0].series.toString();

    const resultsWithTimeLimits = await setStageTimeLimit(seriesId, sortedResults);

    return setStageRank(resultsWithTimeLimits);
  };

  /**
   * Сортировка результатов.
   */
  private sort = (stageResults: TStageResult[]): TStageResult[] => {
    return stageResults.toSorted((a, b) => {
      const aResult =
        a.durationInMillisecondsWithPenalties || a.activityData.durationInMilliseconds;
      const bResult =
        b.durationInMillisecondsWithPenalties || b.activityData.durationInMilliseconds;
      return aResult - bResult;
    });
  };
}
