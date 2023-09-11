import { saveDocument } from './data-save.js';

// types
import { EventWithSubgroup, ResultEventAdditional } from '../../types/types.interface.js';

/**
 * Установка ранкинга райдерам. Сортировка по финишному времени.  Сохранение в БД.
 */
export const setRankResult = async (
  eventDB: EventWithSubgroup,
  results: ResultEventAdditional[]
) => {
  if (!eventDB._id) {
    throw new Error(`Не найден Event с eventId}`);
  }

  results.sort(
    (a, b) => a.activityData.durationInMilliseconds - b.activityData.durationInMilliseconds
  );

  let rankEvent = 1;
  for (const result of results) {
    // если с VIRTUAL_POWER то присваивается 0 место (вне ранкинга)
    const isNotRanking = result.sensorData.powerType === 'VIRTUAL_POWER';
    if (isNotRanking) {
      result.disqualification = 'VIRTUAL_POWER';
    }

    await saveDocument({
      eventId: eventDB._id,
      result,
      rankEvent: isNotRanking ? 0 : rankEvent++,
    });
  }
};
