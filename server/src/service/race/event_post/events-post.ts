import { loggingAdmin } from '../../../logger/logger-admin.js';
import { updateStartInfoEvent } from '../../updates/schedule/start-event.js';
import { putSignedRidersService } from '../signed-riders.js';
import { checkUnique } from './unique.js';
import { saveEventToDB } from './save.js';

// types
import {
  ClubSchema,
  OrganizerSchema,
  ZwiftEventSchema,
} from '../../../types/model.interface.js';
import { EventWithSubgroup } from '../../../types/types.interface.js';

import { Club } from '../../../Model/Club.js';

type ClubWithOrganizer = Omit<ClubSchema, 'organizer'> & {
  organizer: OrganizerSchema;
};

/**
 * Добавление эвента в БД zp.ru
 */
export async function postEventService(eventParams: EventWithSubgroup, userId: string) {
  const clubId = eventParams.microserviceExternalResourceId;

  // Проверка на уникальность id Эвента и id подгрупп
  await checkUnique(eventParams);

  // добавление названия клуба  в котором был создал заезд и организатора в объект event
  const clubDB = await Club.findOne({
    id: clubId,
  })
    .populate('organizer')
    .lean<ClubWithOrganizer>();

  if (!clubDB) {
    throw new Error(`Не найден клуб "${clubId}" в БД сайта`);
  }

  eventParams.clubName = clubDB.name;
  eventParams.organizer = clubDB.organizer.shortName;
  eventParams.organizerId = clubDB.organizer._id;

  const eventSaved: ZwiftEventSchema = await saveEventToDB(eventParams);

  // Получение зарегистрированных райдров с ZwiftApi и сохранение в БД
  await putSignedRidersService({ eventId: eventSaved.id, clubId });

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
