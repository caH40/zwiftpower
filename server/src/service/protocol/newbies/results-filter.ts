import { errorHandler } from '../../../errors/error.js';

// types
import { ZwiftResultSchema } from '../../../types/model.interface.js';
import { ResultEventAdditional } from '../../../types/types.interface.js';

/**
 * Сортировка зачётных категорий (C,D) и далее сортировка категорий вне зачета
 */
export const filterByRank = <T extends ResultEventAdditional | ZwiftResultSchema>(
  results: T[]
): T[] => {
  try {
    const resultsCD = results
      .filter(
        (result) =>
          (result.subgroupLabel === 'C' || result.subgroupLabel === 'D') &&
          result.isDisqualification !== true
      )
      .sort(
        (a, b) => a.activityData.durationInMilliseconds - b.activityData.durationInMilliseconds
      );

    // для группы Е дисквал, так как участвуют вне зачёнта
    const resultsE = results
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

    // для группы Е дисквал, так как участвуют вне зачёнта
    const resultsOthers = results.filter(
      (result) => result.subgroupLabel !== 'E' && result.isDisqualification
    );

    return [...resultsCD, ...resultsE, ...resultsOthers];
  } catch (error) {
    errorHandler(error);
    return results;
  }
};
