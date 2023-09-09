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
      .filter((result) => result.subgroupLabel === 'C' || result.subgroupLabel === 'D')
      .sort(
        (a, b) => a.activityData.durationInMilliseconds - b.activityData.durationInMilliseconds
      );
    const resultsE = results
      .filter((result) => result.subgroupLabel === 'E')
      .sort(
        (a, b) => a.activityData.durationInMilliseconds - b.activityData.durationInMilliseconds
      );

    return [...resultsCD, ...resultsE];
  } catch (error) {
    console.log(error);
    return results;
  }
};
