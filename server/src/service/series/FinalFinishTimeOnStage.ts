import { SeriesTimePenalty } from './SeriesTimePenalty.js';
// types
import { TStageResult } from '../../types/model.interface.js';

export class FinalFinishTimeOnStage {
  static set(results: TStageResult[], timeGapThresholdSeconds: number): TStageResult[] {
    // Если правило общего времени выключено в серии.
    if (!timeGapThresholdSeconds) {
      return results;
    }

    const seriesTimePenalty = new SeriesTimePenalty();

    return results.map(({ activityData, finishTimeClassification, ...result }) => {
      const sumTimePenalties = seriesTimePenalty.getSumTimePenalty(result.timePenalty);

      const rawTime = activityData.durationInMilliseconds + sumTimePenalties;

      // В классификационном времени уже учтен временно штраф.
      const timeFinishTimeClassification = finishTimeClassification?.timeInMilliseconds;

      // Итоговое финишное время райдера в протоколе.
      const finalDurationInMilliseconds = timeFinishTimeClassification || rawTime;

      return { ...result, finishTimeClassification, finalDurationInMilliseconds, activityData };
    });
  }
}
