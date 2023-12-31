import { sortCategory } from './category';
import { sortColumnsCP } from './critical-power';

/**
 * Сортировка таблицы зарегистрированных райдеров
 * в зависимости от выбранного столбца и направления (возрастание/убывание)
 */
export const sortTable = (data, activeSorting, filterWatts) => {
  // выбор сортировки watts или watsPerKg
  const powerTarget = filterWatts.column;

  // выбор сортировщика в зависимости от столбца по которому происходит сортировка
  switch (activeSorting.columnName) {
    case 'Категория':
      return sortCategory(data, activeSorting);

    default:
      return sortColumnsCP(data, activeSorting, powerTarget);
  }
};
