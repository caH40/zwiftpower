// types
import { UserResult } from '../types/types.interface.js';

/**
 * вычисление и добавление отставаний в результаты: gap-до лидера, gapPrev до райдера впереди
 */
export function gapValue(results: UserResult[]) {
  const lengthResult = results.length;

  for (let i = 1; i < lengthResult; i++) {
    results[i].gap =
      results[i].activityData.durationInMilliseconds.value -
      results[0].activityData.durationInMilliseconds.value;

    if (i !== lengthResult)
      results[i].gapPrev =
        results[i].activityData.durationInMilliseconds.value -
        results[i - 1].activityData.durationInMilliseconds.value;
  }

  return results;
}

/**
 * вычисление и добавление отставаний в результаты: gap-до лидера, gapPrev до райдера впереди
 * для классический заездов с группами (для каждой группы свои гэпы)
 */
export function gapValueWithGroups(results: UserResult[]) {
  const labels = ['A', 'B', 'C', 'D', 'E'];

  const resultsGroups = [] as UserResult[][];

  for (const label of labels) {
    const resultsCurrentLabel = results.filter(
      (result) => result.subgroupLabel === label && result.rankEvent !== 0
    );
    resultsGroups.push(resultsCurrentLabel);
  }
  const resultsNotRanked = results.filter((result) => result.rankEvent === 0);

  for (const resultsGroup of resultsGroups) {
    const lengthResult = resultsGroup.length;
    for (let i = 1; i < lengthResult; i++) {
      resultsGroup[i].gap =
        resultsGroup[i].activityData.durationInMilliseconds.value -
        resultsGroup[0].activityData.durationInMilliseconds.value;

      if (i !== lengthResult)
        resultsGroup[i].gapPrev =
          resultsGroup[i].activityData.durationInMilliseconds.value -
          resultsGroup[i - 1].activityData.durationInMilliseconds.value;
    }
  }

  const resultsRanked = resultsGroups.reduce((acc, cur) => [...acc, ...cur], []);

  return [...resultsRanked, ...resultsNotRanked];
}
