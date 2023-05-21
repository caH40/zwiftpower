import { loggingAdmin } from '../log.js';
import { getEventZwiftService } from '../zwift/events.js';
import { deleteEventService } from './events-delete.js';
import { postEventService } from './events-post.js';

export async function putEventService(eventId, userId) {
  try {
    const { additionalParams } = await deleteEventService(eventId);
    const event = await getEventZwiftService(eventId);
    await postEventService({ ...event, ...additionalParams });
    // логирование действия
    if (userId) {
      const description = 'updateEventInDB';
      const { id, name, eventStart } = event;
      await loggingAdmin(id, name, eventStart, userId, description);
    }
    return { message: `Обновлены данные ${event.name}` };
  } catch (error) {
    throw error;
  }
}
