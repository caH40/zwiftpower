import { useEffect } from 'react';
import { useSelector } from 'react-redux';

/**
 * Отображение столбца сквозной нумерации
 * @param {} setShowIndex установка отображения/скрытия столбца со сквозной нумерацией
 * @param {string} typeRaceCustom тип Эвента
 * @returns
 */
export const useShowIndex = (setShowIndex, typeRaceCustom) => {
  const filterCategory = useSelector((state) => state.filterCategory.value);
  const activeSorting = useSelector((state) => state.sortTable.activeSorting);

  useEffect(() => {
    // Условия отображения столбца сквозной нумерации
    if (activeSorting.columnName === 'Время' && filterCategory.name === 'All') {
      setShowIndex(false);
    } else if (
      (activeSorting.columnName === 'Время' && filterCategory.name !== 'All') ||
      (['classicGroup', 'newbies'].includes(typeRaceCustom) &&
        (activeSorting.columnName === 'Время' || activeSorting.columnName === 'Категория'))
    ) {
      setShowIndex(false);
    } else {
      setShowIndex(true);
    }
  }, [filterCategory, activeSorting]);
};
