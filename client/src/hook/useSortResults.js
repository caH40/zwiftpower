import { useMemo } from 'react';
import { useSelector } from 'react-redux';

import { sortTable } from '../utils/table_sort/table-sort';

/**
 * Фильтрация и сортировка таблицы результатов
 * @param {} results массив результатов райдеров в Эвенте
 * @returns
 */
export const useSortResults = (results) => {
  const filterCategory = useSelector((state) => state.filterCategory.value);
  const filterWatts = useSelector((state) => state.filterWatts.value);
  const activeSorting = useSelector((state) => state.sortTable.activeSorting);

  const resultSortedAndFiltered = useMemo(() => {
    let filteredResults = [...results];

    //
    if (filterCategory.name !== 'All') {
      filteredResults = [...results].filter(
        (result) => result.subgroupLabel === filterCategory.name
      );
    }

    const sortedAndFilteredResults = sortTable(filteredResults, activeSorting, filterWatts);

    // убирать гэпы, кроме сортировки по общему времени с возрастанием
    if (
      activeSorting.columnName !== 'Время' ||
      (activeSorting.columnName === 'Время' && activeSorting.isRasing === false)
    ) {
      return sortedAndFilteredResults.map((result) => {
        const newResult = { ...result };
        newResult.gap = '';
        newResult.gapPrev = '';
        return newResult;
      });
    }

    return sortedAndFilteredResults;
  }, [filterCategory, filterWatts, activeSorting, results]);

  return resultSortedAndFiltered;
};
