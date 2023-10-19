import { getCPFromResult } from '../../../power/empty-cp.js';

// types
import { ResultEventAdditional } from '../../../../types/types.interface.js';

/**
 * Добавление CP (15,60,300,1200 секунд) в результаты Эвента в БД
 * CP берутся из ZwiftAPI результатов Эвента
 * @param results массив результатов Эвента
 * @param nameAndDate название и время старта Эвента
 * @returns результаты Эвента с добавленными CriticalPowers
 */
export const addCriticalPowersFast = (
  results: ResultEventAdditional[]
): ResultEventAdditional[] => {
  // инициализация массива для итоговых результатов
  const resultsWithCP = [] as ResultEventAdditional[];

  for (const result of results) {
    result.cpBestEfforts = getCPFromResult(result);
    resultsWithCP.push(result);
    resultsWithCP.push(result);
  }

  return resultsWithCP;
};
