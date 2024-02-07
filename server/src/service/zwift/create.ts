import { Club } from '../../Model/Club.js';
import { User } from '../../Model/User.js';
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
  const clubId = event.eventData.microserviceExternalResourceId;

  const clubDB = await Club.findOne({ id: clubId }, { id: true }).lean();

  if (!clubDB) {
    throw new Error(`Не найден клуб "${clubId}" в котором создается заезд!`);
  }

  const userDB = await User.findOne({
    _id: userId,
    'moderator.clubs': clubDB._id,
  });

  if (!userDB) {
    throw new Error('У вас нет прав для создания Эвента в данном клубе!');
  }

  // создание Эвента в ZwiftAPI, в ответе возвращается id созданного Эвента
  const urlCreate = 'events-core/events';
  const { id }: { id: number } = await postRequest(urlCreate, event);

  return { eventId: id, message: `Создан заезд на сервере Zwift с id: ${id}` };
}
