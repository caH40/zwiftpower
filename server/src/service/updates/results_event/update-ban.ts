import { millisecondsInDay } from '../../../assets/date.js';

/**
 * Запрет обновления результатов Эвента после period дней
 * @param eventStart дата старта Эвента
 * @param periodActual количество разрешенных дней для обновления результатов после старта Эвента
 */
export const banUpdating = (eventStart: string, periodActual: number): void => {
  const eventStartTime = new Date(eventStart).getTime();
  const notRequiredUpdate = Date.now() - eventStartTime > periodActual * millisecondsInDay;
  if (notRequiredUpdate) {
    throw new Error('Запрет на обновление результатов Эвента который старше недели!');
  }
};
