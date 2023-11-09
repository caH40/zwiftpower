import { setDSQWithVirtualPower } from '../virtual-power.js';

// types
import { ResultEventAdditional } from '../../../types/types.interface.js';

/**
 * Установка ранкинга райдерам
 */
export const setRankResult = async (results: ResultEventAdditional[]) => {
  const resultsWithRank = [...results];
  let rankEvent = 1;
  for (const result of resultsWithRank) {
    // установка данных дисквалификации при использовании VirtualPower
    const resultWithDSQ = setDSQWithVirtualPower<ResultEventAdditional>(result);
    result.rankEvent = resultWithDSQ.isDisqualification ? 0 : rankEvent++;
  }

  return resultsWithRank;
};
