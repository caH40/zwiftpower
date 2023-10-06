/**
 * Преобразование значений интервалов из секунд в минуты
 */
export const getIntervalName = (interval) => {
  if (interval < 60) {
    return `${interval} сек`;
  } else if (interval === 60) {
    return '1 мин';
  }
  return `${interval / 60} мин`;
};
