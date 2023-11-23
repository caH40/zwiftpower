/**
 * Сортировка дисквалифицированных результатов
 * дисквалифицированные результаты перемещаются вниз таблицы
 */
export const sortDsq = (a, b) => {
  if (a.isDisqualification) {
    return 1;
  }
  if (b.isDisqualification) {
    return -1;
  }
  return 0;
};
