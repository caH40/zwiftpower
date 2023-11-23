import { sortDsq } from './dsq';

/**
 * сортировка таблицы при выборе сортировки по столбцу время
 * @param {*} data таблица данных
 * @param {{columnName: string, isRasing: boolean}} activeSorting столбец (свойство) по которому происходит сортировка
 * @returns отсортированная таблица
 */
export const sortColumns = (data, activeSorting) => {
  return [...data].sort((a, b) => {
    // для дисквалифицированного райдера результат в конец массива
    const dsq = sortDsq(a, b);
    if (dsq !== 0) {
      return dsq;
    }

    const valueA = a.activityData.durationInMilliseconds.value;
    const valueB = b.activityData.durationInMilliseconds.value;

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
