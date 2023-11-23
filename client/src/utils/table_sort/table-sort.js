import { columnsWithSorting } from '../../assets/table-sort';

import { sortColumnsCP } from './critical-power';
import { sortColumns } from './time-total';

/**
 * Сортировка таблицы в зависимости от выбранного столбца и направления (возрастание/убывание)
 */
export const sortTable = (data, activeSorting, filterWatts) => {
  // выбор сортировки watts или watsPerKg
  const powerTarget = filterWatts.column;

  // выбор сортировщика в зависимости от столбца по которому происходит сортировка
  // по столбцам CriticalPower или по всем остальным (activeSorting.columnName)
  if (columnsWithSorting.results.includes(activeSorting.columnName)) {
    return sortColumns(data, activeSorting, powerTarget);
  } else {
    return sortColumnsCP(data, activeSorting, powerTarget);
  }
};
