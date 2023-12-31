/**
 * сортировка таблицы зарегистрированных райдеров по категориям:
 * 1. райдеры группируются по категориям;
 * 2. в категориях сортируются по имени;
 * 3. сортируются категории;
 * @param {*} data таблица данных
 * @param {*} activeSorting столбец (свойство) по которому происходит сортировка
 */
export const sortCategory = (data, activeSorting) => {
  return [...data].sort((a, b) => {
    if (activeSorting.isRasing) {
      return a.subgroupLabel.toLowerCase().localeCompare(b.subgroupLabel.toLowerCase());
    } else {
      return b.subgroupLabel.toLowerCase().localeCompare(a.subgroupLabel.toLowerCase());
    }
  });
};
