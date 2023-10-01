import { millisecondsIn30Days, millisecondsIn3Month, millisecondsYear } from '../assets/dates';

/**
 * Перевод строки из selector в диаграммах в миллисекунды
 */
export const convertPeriodToMilliseconds = (period) => {
  switch (period) {
    case '3 месяца':
      return millisecondsIn3Month;
    case '30 дней':
      return millisecondsIn30Days;
    default:
      return millisecondsYear;
  }
};
