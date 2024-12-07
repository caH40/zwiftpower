import { postRequest } from './api/request-post.js';

// types
import { PostZwiftEvent } from '../../types/http.interface.js';
import { checkModeratorClub } from '../moderator-club.js';

/**
 * Сервис отправки запроса на создание Эвента в Zwift
 */
export async function postZwiftEventService(
  userId: string,
  event: PostZwiftEvent
): Promise<{ eventId: number; message: string }> {
  // Проверка является ли userId модератором клуба в котором создается данный Эвент
  await checkModeratorClub(userId, event.eventData.microserviceExternalResourceId);

  // создание Эвента в ZwiftAPI, в ответе возвращается id созданного Эвента
  const urlCreate = 'events-core/events';
  const { id }: { id: number } = await postRequest({ url: urlCreate, data: event });

  return { eventId: id, message: `Создан заезд на сервере Zwift с id: ${id}` };
}
