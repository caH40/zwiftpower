import { ZwiftEvent } from '../../Model/ZwiftEvent.js';

export async function getEventService(eventId) {
  try {
    const eventDataDB = await ZwiftEvent.findOne({ id: eventId }).populate('eventSubgroups');

    return { event: eventDataDB };
  } catch (error) {
    throw error;
  }
}
