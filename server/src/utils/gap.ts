// types
import { EventWithSubgroup, ResultEventAdditional } from '../types/types.interface.js';

/**
 * Добавление стартовых гэпов к результатам
 */
export function addGapStart(event: EventWithSubgroup, results: ResultEventAdditional[]) {
  if (event.typeRaceCustom === 'classicGroup') {
    return results;
  }

  const resultsNewObj = [...results];
  const getTime = (time: string) => new Date(time).getTime();

  const gaps = event.eventSubgroups.map((subgroup) => ({
    gap: getTime(subgroup.eventSubgroupStart) - getTime(event.eventStart),
    id: subgroup.id,
  }));

  for (const result of resultsNewObj) {
    const gapStart = gaps.find((gap) => gap.id === result.eventSubgroupId)?.gap || 0;
    const durationInMilliseconds = result.activityData.durationInMilliseconds;

    result.activityData.durationInMilliseconds = durationInMilliseconds + gapStart;
  }

  return resultsNewObj;
}
