import { useMemo } from 'react';
import { useSelector } from 'react-redux';

import { sortTable } from '../utils/table_sort/table-sort';

/**
 * Фильтрация и сортировка таблицы результатов
 * @param {} results массив результатов райдеров в Эвенте
 * @param {} setShowIndex установка отображения/скрытия столбца со сквозной нумерацией
 * @returns
 */
export const useSortResults = (results, setShowIndex) => {
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

    // не отображать скозную нумерацию только при сортировке по общему времени
    if (activeSorting.columnName === 'Время' && filterCategory.name === 'All') {
      setShowIndex(false);
    } else {
      setShowIndex(true);
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
