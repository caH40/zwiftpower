import { ZwiftEvent } from '../../Model/ZwiftEvent.js';
import { ZwiftEventSubgroup } from '../../Model/ZwiftEventSubgroup.js';
import { ZwiftSingedRiders } from '../../Model/ZwiftSingedRiders.js';
import { postEventService } from './events-post.js';

export async function putEventService(eventId) {
  try {
    const eventDB = await ZwiftEvent.findOne({ id: eventId }).populate('eventSubgroups');
    for (const eventSubgroup of eventDB.eventSubgroups) {
      await ZwiftSingedRiders.deleteMany({ subgroup: eventSubgroup._id });
      await ZwiftEventSubgroup.deleteOne({ _id: eventSubgroup._id });
    }
    await ZwiftEvent.findByIdAndDelete(eventDB._id);

    await postEventService(eventDB);
    return { message: 'Обновлены данные заезда' };
  } catch (error) {
    throw error;
  }
}
