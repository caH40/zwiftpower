// types
import { ResultEventAdditional } from '../../../types/types.interface.js';

export function filterByRank(results: ResultEventAdditional[]) {
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
}
