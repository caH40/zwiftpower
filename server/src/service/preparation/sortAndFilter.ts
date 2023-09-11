// types
import { ZwiftResultSchema } from '../../types/model.interface.js';

/**
 * Фильтрация и сортировка отправляемого протокола с результатами
 */
export const sortAndFilterResults = (results: ZwiftResultSchema[]) => {
  const resultsNorm = results
    .filter((result) => result.rankEvent !== 0)
    .sort((a, b) => a.rankEvent - b.rankEvent);

  // результаты дисквалифицированных райдеров (rankEvent=0) опускаются вниз таблицы
  const resultsDSQ = results
    .filter((result) => result.rankEvent === 0)
    .sort((a, b) => a.rankEvent - b.rankEvent);

  return [...resultsNorm, ...resultsDSQ];
};
