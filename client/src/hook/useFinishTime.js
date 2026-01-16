import { secondesToTimeThousandths } from '../utils/date-convert';

/**
 * Создание финишного времени как строку времени из миллисекунд.
 * @param {object} results - Результаты серии заездов.
 */
export const useFinishTime = (results, timeGapThresholdEnabled) => {
  // console.log(results.filter((r) => r.timePenalty));

  return results.map((r) => {
    // const rawFinishTime = timeGapThresholdEnabled
    //   ? r.durationInMillisecondsWithPenalties || r.finishTimeClassification.timeInMilliseconds
    //   : r.durationInMillisecondsWithPenalties || r.activityData.durationInMilliseconds;

    return {
      ...r,
      finalDurationInMilliseconds: secondesToTimeThousandths(r.finalDurationInMilliseconds),
    };
  });
};
