/**
 * Цвет заливки для блока Нормализованной мощности и Индекс вариабельности
 * @param {number} vi Индекс вариабельности
 * @returns {string} цвет
 */
export const getBgColor = (vi) => {
  if (vi <= 1.06) {
    return 'green';
  } else if (vi <= 1.1) {
    return '#f3f300';
  } else if (vi <= 1.17) {
    return 'orange';
  } else {
    return 'red';
  }
};
