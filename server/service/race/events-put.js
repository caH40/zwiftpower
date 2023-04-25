import { getEventService } from '../zwift/events.js';
import { deleteEventService } from './events-delete.js';
import { postEventService } from './events-post.js';

export async function putEventService(eventId) {
  try {
    const { additionalParams } = await deleteEventService(eventId);
    const event = await getEventService(eventId);
    await postEventService({ ...event, ...additionalParams });
    return { message: `Обновлены данные ${event.name}` };
  } catch (error) {
    throw error;
  }
}
