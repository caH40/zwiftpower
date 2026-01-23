import { setStageRank } from './setStageRank.js';
import { setStageTimeLimit } from './setStageTimeLimit.js';

// types
import { TStageResult } from '../../../types/model.interface.js';
import { SeriesTimePenalty } from '../edit-result/SeriesTimePenalty.js';

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

    // Сортировка результатов.
    const sortedResults = this.sort(stageResults);

    const seriesId = stageResults[0].series.toString();

    // Проверка результатов этапа на превышение временного лимита и установка поля finishTimeLimit.
    const resultsWithTimeLimits = await setStageTimeLimit(seriesId, sortedResults);

    return setStageRank(resultsWithTimeLimits);
  };

  /**
   * Сортировка результатов происходит по фактическому финишному времени плюс время штрафа.
   * По finalDurationInMilliseconds не сортируется, так как при включенном правиле "общего финишного
   * времени" будут одинаковые времена у нескольких участников и проставить ранкинг не получиться.
   */
  private sort = (stageResults: TStageResult[]): TStageResult[] => {
    const seriesTimePenalty = new SeriesTimePenalty();

    return stageResults.toSorted((a, b) => {
      // При сортировке учитывается временной штраф.
      const aResult =
        seriesTimePenalty.getSumTimePenalty(a.timePenalty) +
        a.activityData.durationInMilliseconds;

      const bResult =
        seriesTimePenalty.getSumTimePenalty(b.timePenalty) +
        b.activityData.durationInMilliseconds;

      return aResult - bResult;
    });
  };
}
