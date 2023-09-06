import { ZwiftEvent } from '../../Model/ZwiftEvent.js';
import { getResultsCatchup } from '../preparation/catchup.js';
import { getResultsClassicCommon } from '../preparation/classic-common.js';
import { getResultsNewbies } from '../preparation/newbies.js';

// types
import { EventWithSubgroup } from '../../types/types.interface.js';
import { eventResultsDto } from '../../dto/eventResults.dto.js';

/**
 * Получение результатов райдеров в Эвенте
 */
export async function getResultsService(eventId: number) {
  const eventDB: EventWithSubgroup | null = await ZwiftEvent.findOne({ id: eventId })
    .populate('eventSubgroups')
    .lean();

  if (!eventDB) {
    throw new Error(`Не найден Event (${eventId} в БД`);
  }

  let eventPrepared = <EventWithSubgroup>{};

  switch (eventDB.typeRaceCustom) {
    case 'catchUp':
      eventPrepared = await getResultsCatchup(eventDB);
      break;
    case 'newbies':
      eventPrepared = await getResultsNewbies(eventDB);
      break;
    default: // все остальные обрабатывать как 'classicCommon'
      eventPrepared = await getResultsClassicCommon(eventDB);
  }

  return eventResultsDto({ event: eventPrepared, message: 'Эвент с результаты заезда' });
}
