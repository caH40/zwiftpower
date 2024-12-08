import { postRequest } from './api/request-post.js';

// types
import { PostZwiftEvent } from '../../types/http.interface.js';
import { getAccessTokenOrganizer } from './token.js';
import { Club } from '../../Model/Club.js';
import { Types } from 'mongoose';

/**
 * Сервис отправки запроса на создание Эвента в Zwift
 */
export async function postZwiftEventService({
  event,
  clubId,
}: {
  event: PostZwiftEvent;
  clubId: string;
}): Promise<{ eventId: number; message: string }> {
  // Для получения токена-доступа к zwiftAPI запрашиваем клуб в котором создается Эвент, а затем получем id организатора.
  const clubDB = await Club.findOne({ id: clubId }, { _id: false, organizer: true }).lean<{
    organizer: Types.ObjectId;
  }>();

  if (!clubDB) {
    throw new Error('Не найден клуб в БД в котором создается Эвент!');
  }

  const tokenOrganizer = await getAccessTokenOrganizer({
    organizerId: String(clubDB.organizer),
    importanceToken: 'main',
  });

  // создание Эвента в ZwiftAPI, в ответе возвращается id созданного Эвента
  const urlCreate = 'events-core/events';
  const { id }: { id: number } = await postRequest({
    url: urlCreate,
    data: event,
    tokenOrganizer,
  });

  return { eventId: id, message: `Создан заезд на сервере Zwift с id: ${id}` };
}
