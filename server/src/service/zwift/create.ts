import { Types } from 'mongoose';

import { postRequest } from './api/request-post.js';
import { getAccessTokenOrganizer } from './token.js';
import { Club } from '../../Model/Club.js';

// types
import { PostZwiftEvent, TResponseService } from '../../types/http.interface.js';

/**
 * Сервис отправки запроса на создание Эвента в Zwift
 */
export async function postZwiftEventService({
  event,
}: {
  event: PostZwiftEvent;
}): Promise<TResponseService<{ eventId: number; organizerId: string }>> {
  // Для получения токена-доступа к zwiftAPI запрашиваем клуб в котором создается Эвент, а затем получем id организатора.
  const clubId = event.eventData.microserviceExternalResourceId;
  const clubDB = await Club.findOne({ id: clubId }, { _id: false, organizer: true }).lean<{
    organizer: Types.ObjectId;
  }>();

  if (!clubDB) {
    throw new Error('Не найден клуб в БД в котором создается Эвент!');
  }

  const tokenOrganizer = await getAccessTokenOrganizer({
    clubId,
    importanceToken: 'main',
  });

  // создание Эвента в ZwiftAPI, в ответе возвращается id созданного Эвента
  const urlCreate = 'events-core/events';
  const { id }: { id: number } = await postRequest({
    url: urlCreate,
    data: event,
    tokenOrganizer,
  });

  return {
    data: { eventId: id, organizerId: String(clubDB.organizer) },
    message: `Создан заезд на сервере Zwift с id: ${id}`,
  };
}
