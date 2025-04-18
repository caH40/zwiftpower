import { setDSQWithVirtualPower } from '../virtual-power.js';
import { handleAndLogError } from '../../../errors/error.js';

// types
import { ZwiftResultSchema } from '../../../types/model.interface.js';
import { ResultEventAdditional } from '../../../types/types.interface.js';

/**
 * Фильтрация и сортировка категорий для Эвента Догонялок (catchup)
 * Сортировка результатов в зачётных категориях (A,B,C) по финишному времени,
 * далее сортировка результатов в категории "E", участники участвуют вне зачета
 * дисквалификация райдеров с "Виртуальной мощностью"
 */
export const filterByRankCatchup = <T extends ResultEventAdditional | ZwiftResultSchema>(
  results: T[]
): T[] => {
  try {
    // установка данных дисквалификации при использовании VirtualPower
    const resultsWithVP = results.map((result) => setDSQWithVirtualPower(result));

    const resultsNorm = resultsWithVP
      .filter((result) => result.isDisqualification !== true)
      .sort(
        (a, b) => a.activityData.durationInMilliseconds - b.activityData.durationInMilliseconds
      );

    // для всех дисквалифицированных результатов, кроме группы Е
    const resultsOthers = resultsWithVP.filter((result) => result.isDisqualification);

    return [...resultsNorm, ...resultsOthers];
  } catch (error) {
    handleAndLogError(error);
    return results;
  }
};
