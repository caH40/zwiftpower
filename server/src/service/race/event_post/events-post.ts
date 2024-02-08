import { loggingAdmin } from '../../../logger/logger-admin.js';
import { updateStartInfoEvent } from '../../updates/schedule/start-event.js';
import { getClubName } from '../club.js';
import { putSignedRidersService } from '../signed-riders.js';
import { checkUnique } from './unique.js';
import { saveEventToDB } from './save.js';
import { checkModeratorClub } from '../../moderator-club.js';

// types
import { ZwiftEventSchema } from '../../../types/model.interface.js';
import { EventWithSubgroup } from '../../../types/types.interface.js';

/**
 * Добавление эвента в БД zp.ru
 */
export async function postEventService(eventParams: EventWithSubgroup, userId: string) {
  // Проверка является ли userId модератором клуба в котором создается данный Эвент
  await checkModeratorClub(userId, eventParams.microserviceExternalResourceId);

  // Проверка на уникальность id Эвента и id подгрупп
  await checkUnique(eventParams);

  // добавление названия клуба в котором был создал заезд в объект event
  if (!eventParams.clubName) {
    eventParams.clubName = await getClubName(eventParams.microserviceExternalResourceId);
  }

  const eventSaved: ZwiftEventSchema = await saveEventToDB(eventParams);

  // Получение зарегистрированных райдров с ZwiftApi и сохранение в БД
  await putSignedRidersService(eventSaved.id);

  // Обновление свойства старта заезда в одном event
  await updateStartInfoEvent(eventSaved);

  // Логирование запроса
  if (userId) {
    const description = 'postZwiftEvent';
    const { id, name, eventStart } = eventSaved;
    await loggingAdmin({ eventId: id, eventName: name, eventStart, userId, description });
  }
  return { message: 'Заезд добавлен в БД' };
}
