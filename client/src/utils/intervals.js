/**
 * Преобразование значений интервалов из секунд в минуты
 */
export const getIntervalName = (interval) => {
  if (interval < 60) {
    return `${interval} секунд`;
  } else if (interval === 60) {
    return '1 минута';
  }
  return `${interval / 60} минут`;
};
