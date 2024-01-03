// types
import { ResultEventAdditional } from '../../types/types.interface.js';
type Label = 'A' | 'B' | 'C' | 'D' | 'E';
/**
 * Установка ранкинга райдерам
 * Необходимые результаты уже дисквалифицированы, остальные отсортированы по финишному времени
 * Все группы в одном ранкинге!!!
 */
export const setRankResultTotal = async (
  results: ResultEventAdditional[],
  typeRaceCustom: string
) => {
  const resultsWithRank = [...results];
  let rankEvent = 1;

  const rank = {
    A: 1,
    B: 1,
    C: 1,
    D: 1,
    E: 0,
  };

  if (typeRaceCustom === 'classicGroup') {
    for (const result of resultsWithRank) {
      const subgroupLabel = result.subgroupLabel as Label;
      const label: Label = subgroupLabel ? subgroupLabel : 'E';
      result.rankEvent = result.isDisqualification ? 0 : rank[label]++;
    }

    return resultsWithRank;
  }

  for (const result of resultsWithRank) {
    result.rankEvent = result.isDisqualification ? 0 : rankEvent++;
  }

  return resultsWithRank;
};
