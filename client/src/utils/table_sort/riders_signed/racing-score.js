/**
 * Сортировка таблицы по рейтинговым очкам.
 * @param {*} data таблица данных.
 * @param {*} activeSorting столбец (свойство) по которому происходит сортировка.
 */

export const sortRacingScore = (data, activeSorting) => {
  return [...data].sort((a, b) => {
    if (activeSorting.isRasing) {
      return a.racingScore - b.racingScore;
    } else {
      return b.racingScore - a.racingScore;
    }
  });
};
