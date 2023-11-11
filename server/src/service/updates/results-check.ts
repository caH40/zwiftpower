import { ZwiftEvent } from '../../Model/ZwiftEvent.js';
import { errorHandler } from '../../errors/error.js';

// types
import { EventWithSubgroup } from '../../types/types.interface.js';

/**
 * Проверка необходимости обновления результатов в Эвенте
 * после 3 часов hasResults изменяется на true и Эвент больше не попадёт в данный блок,
 * isLastUpdate: true  => произойдет полное обновление CriticalPower в результатах с сохранением
 * PowerCurve и FirFiles райдеров в БД
 * @param event Эвент в котором происходит автоматическое обновление результатов
 * @param timeForUpdateResults время в миллисекундах в течении которого происходит автоматическое обновление
 * @param delayBeforeUpdating время в миллисекундах после старта когда начинается обновление результатов
 * @returns
 */
export const checkDurationUpdating = async (
  event: EventWithSubgroup,
  timeForUpdateResults: number,
  delayBeforeUpdating: number
) => {
  try {
    const eventStart = new Date(event.eventStart).getTime();
    const timeCurrent = new Date().getTime();

    // начинать обновлять после delayBeforeUpdating после старта
    const needUpdate = timeCurrent - eventStart > delayBeforeUpdating;

    // timeForUpdateResults длительность обновления результатов
    // время для обновления результатов закончилось timesUp:true
    const timesUp = timeCurrent - eventStart > timeForUpdateResults;
    if (timesUp) {
      event.hasResults = true;

      await ZwiftEvent.findOneAndUpdate({ _id: event._id }, { $set: { hasResults: true } });
      return { isLastUpdate: true, needUpdate: true };
    } else {
      return { isLastUpdate: false, needUpdate };
    }
  } catch (error) {
    errorHandler(error);
    // при возникновении ошибки не обновлять результаты Эвента
    return { isLastUpdate: false, needUpdate: false };
  }
};
