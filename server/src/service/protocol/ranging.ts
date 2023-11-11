// types
import { ResultEventAdditional } from '../../types/types.interface.js';

/**
 * Установка ранкинга райдерам
 * Необходимые результаты уже дисквалифицированы, остальные отсортированы по финишному времени
 * Все группы в одном ранкинге!!!
 */
export const setRankResultTotal = async (results: ResultEventAdditional[]) => {
  const resultsWithRank = [...results];
  let rankEvent = 1;
  for (const result of resultsWithRank) {
    result.rankEvent = result.isDisqualification ? 0 : rankEvent++;
  }

  return resultsWithRank;
};
