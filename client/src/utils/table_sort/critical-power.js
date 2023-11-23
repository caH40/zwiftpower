import { sortDsq } from './dsq';

/**
 * сортировка таблицы при выборе сортировки в столбцах CriticalPower (CP)
 * @param {*} data таблица данных
 * @param {*} activeSorting столбец (свойство) по которому происходит сортировка
 * @param {*} powerTarget положение переключателя на значении Ватт или Ватт/кг
 * @returns отсортированная таблица
 */
export const sortColumnsCP = (data, activeSorting, powerTarget) => {
  return [...data].sort((a, b) => {
    // для дисквалифицированного райдера результат в конец массива
    const dsq = sortDsq(a, b);
    if (dsq !== 0) {
      return dsq;
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
    if (!valueB) {
      return -1;
    }

    if (activeSorting.isRasing) {
      return valueA - valueB;
    } else {
      return valueB - valueA;
    }
  });
};
