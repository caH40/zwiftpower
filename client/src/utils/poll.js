import { getTimerLocal } from './date-local';

/**
 * В зависимости от текущей даты возвращает состояние голосования.
 */
export function getDateStatusForPoll(startDate, endDate) {
  if (!startDate || !endDate) {
    return null;
  }

  const now = new Date();
  // Голосование еще не началось.
  if (new Date(startDate) < now) {
    return `Старт ${getTimerLocal(startDate, 'DDMMYYYY')}`;
  }

  // Голосование завершено.
  if (new Date(endDate) < now) {
    return 'Завершено';
  }

  return `До ${getTimerLocal(endDate, 'DDMMYYYY')}`;
}
