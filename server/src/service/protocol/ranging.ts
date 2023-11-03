import { saveDocument } from './data-save.js';

// types
import { EventWithSubgroup, ResultEventAdditional } from '../../types/types.interface.js';
import { setDSQWithVirtualPower } from './virtual-power.js';

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
    // установка данных дисквалификации при использовании VirtualPower
    const resultWithDSQ = setDSQWithVirtualPower<ResultEventAdditional>(result);

    await saveDocument({
      eventId: eventDB._id,
      result: resultWithDSQ,
      rankEvent: resultWithDSQ.isDisqualification ? 0 : rankEvent++,
    });
  }
};
