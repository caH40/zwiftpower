import { columnsWithSorting } from '../assets/table-sort';

/**
 * Сортировка таблицы в зависимости от выбранного столбца и направления (возрастание/убывание)
 */
export const sortTable = (data, activeSorting, filterWatts) => {
  // выбор сортировки watts или watsPerKg
  const powerTarget = filterWatts.column;
  if (columnsWithSorting.results.includes(activeSorting.columnName)) {
    return sortColumns(data, activeSorting, powerTarget);
  } else {
    return sortColumnsCP(data, activeSorting, powerTarget);
  }
};

const sortColumnsCP = (data, activeSorting, powerTarget) => {
  return [...data].sort((a, b) => {
    // для дисквалифицированного райдера результат в конец массива
    if (a.disqualification) {
      return 1;
    }

    const findValue = (values) =>
      values.cpBestEfforts.find((cp) => cp.duration === activeSorting.columnName)[powerTarget]
        .value;

    const valueA = findValue(a);
    const valueB = findValue(b);

    // пустые значения в конец результат массива
    if (!valueA) {
      return 1;
    }

    if (activeSorting.isRasing) {
      return valueA - valueB;
    } else {
      return valueB - valueA;
    }
  });
};

const sortColumns = (data, activeSorting) => {
  return [...data].sort((a, b) => {
    // для дисквалифицированного райдера результат в конец массива
    if (a.disqualification) {
      return 1;
    }

    const valueA = a.activityData.durationInMilliseconds.value;
    const valueB = b.activityData.durationInMilliseconds.value;

    // пустые значения в конец результат массива
    if (!valueA) {
      return 1;
    }

    if (activeSorting.isRasing) {
      return valueA - valueB;
    } else {
      return valueB - valueA;
    }
  });
};
