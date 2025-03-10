import { loggingAdmin } from '../../../logger/logger-admin.js';
import { updateStartInfoEvent } from '../../updates/schedule/start-event.js';
import { putSignedRidersService } from '../signed-riders.js';
import { checkUnique } from './unique.js';
import { saveEventToDB } from './save.js';
import { Club } from '../../../Model/Club.js';

// types
import {
  ClubSchema,
  OrganizerSchema,
  TSeriesStage,
  ZwiftEventSchema,
} from '../../../types/model.interface.js';
import { EventWithSubgroup } from '../../../types/types.interface.js';
import { NSeriesModel } from '../../../Model/NSeries.js';
import { SeriesService } from '../../series/series.js';

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

  // eventParams
  if (eventParams.seriesId) {
    const seriesDB = await NSeriesModel.findOne(
      { _id: eventParams.seriesId },
      { stages: true, name: true, _id: false }
    ).lean<{ stages: TSeriesStage[]; name: string }>();

    if (seriesDB) {
      const seriesService = new SeriesService();
      await seriesService.addStage({
        stage: { event: String(eventSaved._id), order: 0, includeResults: true },
        stages: seriesDB.stages,
        seriesId: String(eventParams.seriesId),
      });
    }
  }

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
