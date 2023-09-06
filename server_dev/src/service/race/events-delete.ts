import { ZwiftEvent } from '../../Model/ZwiftEvent.js';
import { ZwiftEventSubgroup } from '../../Model/ZwiftEventSubgroup.js';
import { ZwiftResult } from '../../Model/ZwiftResult.js';
import { ZwiftSignedRiders } from '../../Model/ZwiftSignedRiders.js';

import { AdditionalParamsEvent, EventWithSubgroup } from '../../types/types.interface.js';
import { loggingAdmin } from '../log.js';

/**
 * Удаление Event в БД
 */
export async function deleteEventService(eventId: number) {
  const eventDB: EventWithSubgroup | null = await ZwiftEvent.findOne({
    id: eventId,
  }).populate('eventSubgroups');

  if (!eventDB) {
    throw new Error(`Не найден Эвент ${eventId} для удаления из БД`);
  }

  for (const eventSubgroup of eventDB.eventSubgroups) {
    await ZwiftSignedRiders.deleteMany({ subgroup: eventSubgroup._id });
    await ZwiftEventSubgroup.deleteOne({ _id: eventSubgroup._id });
  }
  await ZwiftEvent.findByIdAndDelete(eventDB._id);
  await ZwiftResult.deleteMany({ zwiftEventId: eventDB._id });

  const additionalParams: AdditionalParamsEvent = {
    seriesId: eventDB.seriesId,
    organizer: eventDB.organizer,
    typeRaceCustom: eventDB.typeRaceCustom,
    creator: eventDB.creator,
    hasResults: eventDB.hasResults,
    needCount: eventDB.needCount,
    started: eventDB.started,
    clubName: eventDB.clubName,
  };

  return additionalParams;
}

/**
 * Удаления Эвента и зарегистрированных райдеров, результатов райдеров в БД
 */
export async function deleteEventAndResultsService(eventId: number, userId: string) {
  const eventDB: EventWithSubgroup | null = await ZwiftEvent.findOne({
    id: eventId,
  }).populate('eventSubgroups');

  if (!eventDB) {
    throw new Error(`Не найден Эвент ${eventId} для удаления из БД`);
  }

  for (const eventSubgroup of eventDB.eventSubgroups) {
    await ZwiftSignedRiders.deleteMany({ subgroup: eventSubgroup._id });
    await ZwiftEventSubgroup.deleteOne({ _id: eventSubgroup._id });
  }
  await ZwiftEvent.findByIdAndDelete(eventDB._id);
  await ZwiftResult.deleteMany({ zwiftEventId: eventDB._id });

  // логирование действия
  const description = 'deleteEventDataFromDB';
  const { id, name, eventStart } = eventDB;
  await loggingAdmin({ eventId: id, eventName: name, eventStart, userId, description });

  return {
    message: `Заезд ${eventDB.name} и результаты удалены!`,
  };
}
