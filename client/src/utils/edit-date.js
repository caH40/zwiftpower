import { getTimerLocal } from './date-local';

/**
 * Получение даты последнего редактирование результатов Эвента модератором
 * @param {*} moderators
 */
export const getEditDate = (moderators) => {
  const [moderatorLast] = [...moderators].sort((a, b) => b.date - a.date);

  if (moderatorLast) {
    return getTimerLocal(moderatorLast.date, 'DDMMYYHm');
  }
  return null;
};
