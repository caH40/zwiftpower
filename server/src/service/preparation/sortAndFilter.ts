// types
import { ZwiftResultSchema } from '../../types/model.interface.js';

/**
 * Фильтрация и сортировка отправляемого протокола с результатами
 */
export const sortAndFilterResults = (results: ZwiftResultSchema[]) => {
  const resultsNorm = results
    .filter((result) => result.rankEvent !== 0)
    .sort(
      (a, b) => a.activityData.durationInMilliseconds - b.activityData.durationInMilliseconds
    );

  // результаты дисквалифицированных райдеров (rankEvent=0) опускаются вниз таблицы
  const resultsDSQ = results
    .filter((result) => result.rankEvent === 0)
    .sort(
      (a, b) => a.activityData.durationInMilliseconds - b.activityData.durationInMilliseconds
    );

  return [...resultsNorm, ...resultsDSQ];
};

/**
 * Фильтрация и сортировка отправляемого протокола с результатами с разделением на группы
 */
export const sortAndFilterResultsGroups = (results: ZwiftResultSchema[]) => {
  const resultsNorm = results
    .filter((result) => result.rankEvent !== 0)
    .sort(
      (a, b) => a.activityData.durationInMilliseconds - b.activityData.durationInMilliseconds
    )
    .sort((a, b) => a.subgroupLabel.toLowerCase().localeCompare(b.subgroupLabel.toLowerCase()));

  // результаты дисквалифицированных райдеров (rankEvent=0) опускаются вниз таблицы
  const resultsDSQ = results
    .filter((result) => result.rankEvent === 0)
    .sort(
      (a, b) => a.activityData.durationInMilliseconds - b.activityData.durationInMilliseconds
    );

  return [...resultsNorm, ...resultsDSQ];
};
