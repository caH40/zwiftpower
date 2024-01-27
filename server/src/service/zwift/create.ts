import { postRequest } from './request-post.js';

// types
import { PostZwiftEvent } from '../../types/http.interface.js';

/**
 * Сервис отправки запроса на создание Эвента в Zwift
 */
export async function postZwiftEventService(
  userId: string,
  event: PostZwiftEvent
): Promise<number> {
  // проверять является ли userId модератором клуба в котором содается данный Эвент

  // создание Эвента в ZwiftAPI, в ответе возвращается id созданного Эвента
  const urlCreate = 'events-core/events';
  const { id }: { id: number } = await postRequest(urlCreate, event);

  return id;
}
