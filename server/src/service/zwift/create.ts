import { postRequest } from './request-post.js';

// types
import { PostZwiftEvent } from '../../types/http.interface.js';

/**
 * Сервис отправки запроса на создание Эвента в Zwift
 */
export async function postZwiftEventService(
  userId: string,
  event: PostZwiftEvent
): Promise<{ eventId: number; message: string }> {
  // проверять является ли userId модератором клуба в котором содается данный Эвент

  // создание Эвента в ZwiftAPI, в ответе возвращается id созданного Эвента
  const urlCreate = 'events-core/events';
  const { id }: { id: number } = await postRequest(urlCreate, event);

  return { eventId: id, message: `Создан заезд на сервере Zwift с id: ${id}` };
}
