// types
import { ResultSeries, ResultWithEventAndSubgroup } from '../../../types/types.interface.js';

/**
 * Формирование массива результатов с необходимыми данными для запроса
 */
export function getResults(resultsRow: ResultWithEventAndSubgroup[]) {
  const results = resultsRow
    .map((event) => {
      const result = <ResultSeries>{};
      result.eventId = event.eventId;
      result.subgroupLabel = event.subgroupLabel;
      result.profileId = event.profileId;
      result.profileData = event.profileData;
      result.durationInMilliseconds = event.activityData.durationInMilliseconds;
      result.eventSubgroup = event.subgroupId;
      result.eventStart = new Date(event.zwiftEventId.eventStart).getTime();
      result.totalFinishedCount = event.zwiftEventId.totalFinishedCount;
      return result;
    })
    .sort((a, b) => b.eventStart - a.eventStart);

  return results;
}
