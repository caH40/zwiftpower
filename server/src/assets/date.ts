// переменные для времени (даты)

export const millisecondsInMinute = 60 * 1000;

export const millisecondsInDay = 24 * 60 * millisecondsInMinute;
export const millisecondsIn23Minutes = 23 * millisecondsInMinute;
export const millisecondsIn10Minutes = 10 * millisecondsInMinute;
export const millisecondsIn12Minutes = 12 * millisecondsInMinute;
export const millisecondsInHour = 60 * millisecondsInMinute;

export const millisecondsInWeekDays = 7 * millisecondsInDay;
export const millisecondsIn90Days = 90 * millisecondsInDay;

/**
 * Дата 90 дней назад
 */
export const dateBefore90Days = Date.now() - millisecondsIn90Days;
// 7776000000
