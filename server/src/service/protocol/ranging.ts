// types
import { ResultEventAdditional } from '../../types/types.interface.js';
type Label = 'A' | 'B' | 'C' | 'D' | 'E';
/**
 * Установка ранкинга в результатах райдеров в Эвенте.
 * Все группы в одном ранкинге!!!
 */
export const setRankResultTotal = async (
  results: ResultEventAdditional[],
  typeRaceCustom: string
) => {
  // Сортировка результатов по финишному времени для установки места в протоколе.
  const resultsWithRank = results.toSorted(
    (a, b) => a.activityData.durationInMilliseconds - b.activityData.durationInMilliseconds
  );

  let rankEvent = 1;

  const rank: Record<Label, number> = {
    A: 1,
    B: 1,
    C: 1,
    D: 1,
    E: 1,
  };

  // Для заездов типа 'classicGroup', 'newbies'. Для каждой группы своя нумерация.
  if (['classicGroup', 'newbies'].includes(typeRaceCustom)) {
    for (const result of resultsWithRank) {
      const subgroupLabel = result.subgroupLabel as Label;

      // Если subgroupLabel не задан, то присваивается 'E'.
      const label: Label = subgroupLabel ? subgroupLabel : 'E';
      result.rankEvent = result.isDisqualification ? 0 : rank[label]++;
    }

    return resultsWithRank;
  }

  // Для для остальных типов заездов. Общая нумерация для всех результатов.
  for (const result of resultsWithRank) {
    result.rankEvent = result.isDisqualification ? 0 : rankEvent++;
  }

  return resultsWithRank;
};
