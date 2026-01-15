import { secondesToTimeThousandths } from '../utils/date-convert';

/**
 * Создание финишного времени как строку времени из миллисекунд.
 * @param {object} results - Результаты серии заездов.
 */
export const useFinishTime = (results, timeGapThresholdEnabled) => {
  return results.map((r) => {
    const rawFinishTime = timeGapThresholdEnabled
      ? r.durationInMillisecondsWithPenalties || r.finishTimeClassification.timeInMilliseconds
      : r.durationInMillisecondsWithPenalties || r.activityData.durationInMilliseconds;

    return {
      ...r,
      finishTime: secondesToTimeThousandths(rawFinishTime),
    };
  });
};
