import { getEventService } from '../zwift/events.js';
import { deleteEventService } from './events-delete.js';
import { postEventService } from './events-post.js';

export async function putEventService(eventId) {
  try {
    const { additionalParams } = await deleteEventService(eventId);
    const event = await getEventService(eventId);
    console.log(new Date(), '4.получение обновленных данных эвента');
    await postEventService({ ...event, ...additionalParams });
    console.log(new Date(), '5.обновление данных эвента в БД');
    console.log('======================================================');
    return { message: `Обновлены данные ${event.name}` };
  } catch (error) {
    throw error;
  }
}
