import { ZwiftEvent } from '../../Model/ZwiftEvent.js';
import { ZwiftEventSubgroup } from '../../Model/ZwiftEventSubgroup.js';
import { ZwiftSingedRiders } from '../../Model/ZwiftSingedRiders.js';

export async function deleteEventService(eventId) {
  try {
    const eventDB = await ZwiftEvent.findOne({ id: eventId }).populate('eventSubgroups');
    for (const eventSubgroup of eventDB.eventSubgroups) {
      await ZwiftSingedRiders.deleteMany({ subgroup: eventSubgroup._id });
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
      },
      message: `Заезд ${eventDB.name} удален!`,
    };
  } catch (error) {
    throw error;
  }
}
