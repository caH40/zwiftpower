import { ZwiftEvent } from '../../Model/ZwiftEvent.js';
import { getResultsCatchup } from '../preparation/catchup.js';
import { getResultsClassicCommon } from '../preparation/classic-common.js';
import { getResultsNewbies } from '../preparation/newbies.js';

export async function getResultsService(eventId: number) {
  const eventDB = await ZwiftEvent.findOne({ id: eventId }).populate('eventSubgroups').lean();
  const event = eventDB.toObject();

  let eventPrepared = {};

  if (event.typeRaceCustom === 'catchUp') {
    eventPrepared = await getResultsCatchup(event);
  }
  if (event.typeRaceCustom === 'newbies') {
    eventPrepared = await getResultsNewbies(event);
  }
  if (event.typeRaceCustom === 'classicCommon') {
    eventPrepared = await getResultsClassicCommon(event);
  }

  return { event: eventPrepared, message: 'Результаты заезда' };
}
