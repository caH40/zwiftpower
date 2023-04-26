import { ZwiftEvent } from '../../Model/ZwiftEvent';

export async function getResults() {
  try {
    const eventsDB = await ZwiftEvent.find([]);

    const token = await getAccessToken(username, password);
    if (!token) throw { message: 'Ошибка при получении токена' };

    const urlEventData = `events/${eventId}?skip_cache=false`;

    const eventData = await getRequest(urlEventData, token);

    return eventData;
  } catch (error) {
    throw error;
  }
}
