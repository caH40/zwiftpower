import { secondesToTimeThousandths } from '../utils/date-convert';

/**
 * Создание финишного времени как строку времени из миллисекунд.
 * @param {object} results - Результаты серии заездов.
 */
export const useFinishTime = (results) => {
  return results.map((r) => ({
    ...r,
    finalDurationInMilliseconds: secondesToTimeThousandths(r.finalDurationInMilliseconds),
  }));
};
