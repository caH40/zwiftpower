// переменные для времени (даты)

export const millisecondsIn90Days = 90 * 24 * 60 * 60 * 1000;

/**
 * Дата 90 дней назад
 */
export const dateBefore90Days = Date.now() - millisecondsIn90Days;
