import { useMemo } from 'react';
import { useSelector } from 'react-redux';

import { sortTable } from '../utils/table_sort/table-sort';

/**
 * Фильтрация и сортировка таблицы результатов
 * @param {} results массив результатов райдеров в Эвенте
 * @param {} setShowIndex установка отображения/скрытия столбца со сквозной нумерацией
 * @returns
 */
export const useSortResults = (results, typeRaceCustom) => {
  const filterCategory = useSelector((state) => state.filterCategory.value);
  const filterWatts = useSelector((state) => state.filterWatts.value);
  const activeSorting = useSelector((state) => state.sortTable.activeSorting);

  const resultSortedAndFiltered = useMemo(() => {
    let filteredResults = [...results];

    // фильтрация результатов по принадлежности к подгруппе (категории) райдера
    if (filterCategory.name !== 'All') {
      filteredResults = [...results].filter(
        (result) => result.subgroupLabel === filterCategory.name
      );
    }

    const sortedAndFilteredResults = sortTable(filteredResults, activeSorting, filterWatts);

    // условия для показа отставаний по общему времени
    if (
      ['classicGroup', 'newbies'].includes(typeRaceCustom) &&
      activeSorting.columnName === 'Категория'
    ) {
      return sortedAndFilteredResults;
    } else if (
      activeSorting.columnName !== 'Время' ||
      (activeSorting.columnName === 'Время' && activeSorting.isRasing === false) ||
      ['classicGroup', 'newbies'].includes(typeRaceCustom)
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
