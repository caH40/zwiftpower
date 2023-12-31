import { sortColumnsCP } from './critical-power';
import { sortColumnsTime } from './time-total';

/**
 * Сортировка таблицы в зависимости от выбранного столбца и направления (возрастание/убывание)
 */
export const sortTable = (data, activeSorting, filterWatts) => {
  // выбор сортировки watts или watsPerKg
  const powerTarget = filterWatts.column;

  // выбор сортировщика в зависимости от столбца по которому происходит сортировка
  switch (activeSorting.columnName) {
    case 'Время':
      return sortColumnsTime(data, activeSorting, powerTarget);

    default:
      return sortColumnsCP(data, activeSorting, powerTarget);
  }
};
