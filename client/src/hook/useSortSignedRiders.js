import { useMemo } from 'react';
import { useSelector } from 'react-redux';

import { sortTable } from '../utils/table_sort/riders_signed/table-sort';

/**
 * Фильтрация и сортировка таблицы результатов
 * @param {} results массив результатов райдеров в Эвенте
 * @param {} setShowIndex установка отображения/скрытия столбца со сквозной нумерацией
 * @returns
 */
export const useSortSignedRiders = (riders) => {
  // отображение данных в таблице: ватты или ватты/кг
  const filterWatts = useSelector((state) => state.filterWatts.value);
  // текущая колонка сортировки и направление сортировки
  const activeSorting = useSelector((state) => state.sortTable.activeSorting);

  const ridersSortedAndFiltered = useMemo(() => {
    return sortTable(riders, activeSorting, filterWatts);
  }, [filterWatts, activeSorting, riders]);

  return ridersSortedAndFiltered;
};
