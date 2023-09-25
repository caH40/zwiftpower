/**
 * Сортировка таблицы в зависимости от выбранного столбца и направления (возрастание/убывание)
 */
export const sortTable = (data, activeSorting, filterWatts) => {
  // выбор сортировки watts или watsPerKg
  const powerTarget = filterWatts.column;

  return [...data].sort((a, b) => {
    const findValue = (values) =>
      values.cpBestEfforts.find((cp) => cp.duration === activeSorting.columnName)[powerTarget]
        .value;

    const valueA = findValue(a);
    const valueB = findValue(b);

    // пустые значения в конец массива
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
