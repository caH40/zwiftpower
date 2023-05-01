import { ZwiftEvent } from '../../Model/ZwiftEvent.js';
import { ZwiftEventSubgroup } from '../../Model/ZwiftEventSubgroup.js';
import { ZwiftResult } from '../../Model/ZwiftResult.js';
import { ZwiftSignedRiders } from '../../Model/ZwiftSignedRiders.js';

export async function deleteEventService(eventId) {
  try {
    const eventDB = await ZwiftEvent.findOne({ id: eventId }).populate('eventSubgroups');
    for (const eventSubgroup of eventDB.eventSubgroups) {
      await ZwiftSignedRiders.deleteMany({ subgroup: eventSubgroup._id });
      await ZwiftEventSubgroup.deleteOne({ _id: eventSubgroup._id });
    }
    await ZwiftEvent.findByIdAndDelete(eventDB._id);

    return {
      additionalParams: {
        seriesId: eventDB.seriesId,
        organizer: eventDB.organizer,
        typeRaceCustom: eventDB.typeRaceCustom,
        creator: eventDB.creator,
        hasResults: eventDB.hasResults,
        needCount: eventDB.needCount,
        started: eventDB.started,
      },
      message: `Заезд ${eventDB.name} удален!`,
    };
  } catch (error) {
    throw error;
  }
}

export async function deleteEventAndResultsService(eventId) {
  try {
    const eventDB = await ZwiftEvent.findOne({ id: eventId }).populate('eventSubgroups');
    for (const eventSubgroup of eventDB.eventSubgroups) {
      await ZwiftSignedRiders.deleteMany({ subgroup: eventSubgroup._id });
      await ZwiftEventSubgroup.deleteOne({ _id: eventSubgroup._id });
    }
    await ZwiftEvent.findByIdAndDelete(eventDB._id);
    await ZwiftResult.deleteMany({ zwiftEventId: eventDB._id });

    return {
      message: `Заезд ${eventDB.name} и результаты удалены!`,
    };
  } catch (error) {
    throw error;
  }
}
