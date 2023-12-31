import { sortColumnsCP } from './critical-power';

/**
 * Сортировка таблицы зарегистрированных райдеров
 * в зависимости от выбранного столбца и направления (возрастание/убывание)
 */
export const sortTable = (data, activeSorting, filterWatts) => {
  // выбор сортировки watts или watsPerKg
  const powerTarget = filterWatts.column;

  // выбор сортировщика в зависимости от столбца по которому происходит сортировка
  // по столбцам CriticalPower или по всем остальным (activeSorting.columnName)

  return sortColumnsCP(data, activeSorting, powerTarget);
};
