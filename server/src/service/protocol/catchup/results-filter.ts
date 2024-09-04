import { setDSQWithVirtualPower } from '../virtual-power.js';
import { errorHandler } from '../../../errors/error.js';

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

    const resultsABCD = resultsWithVP
      .filter(
        (result) =>
          (result.subgroupLabel === 'A' ||
            result.subgroupLabel === 'B' ||
            result.subgroupLabel === 'C' ||
            result.subgroupLabel === 'D') &&
          result.isDisqualification !== true
      )
      .sort(
        (a, b) => a.activityData.durationInMilliseconds - b.activityData.durationInMilliseconds
      );

    // для группы Е дисквал, так как участвуют вне зачёта
    const resultsE = resultsWithVP
      .filter((result) => result.subgroupLabel === 'E')
      .sort(
        (a, b) => a.activityData.durationInMilliseconds - b.activityData.durationInMilliseconds
      )
      .map((result) => ({
        ...result,
        isDisqualification: true,
        disqualification: 'OFF_RECORD',
        disqualificationDescription: 'Участвует вне зачёта',
      }));

    // для всех дисквалифицированных результатов, кроме группы Е
    const resultsOthers = resultsWithVP.filter(
      (result) => result.subgroupLabel !== 'E' && result.isDisqualification
    );

    return [...resultsABCD, ...resultsE, ...resultsOthers];
  } catch (error) {
    errorHandler(error);
    return results;
  }
};
