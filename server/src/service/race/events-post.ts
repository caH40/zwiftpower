import { Types } from 'mongoose';

import { ZwiftEvent } from '../../Model/ZwiftEvent.js';
import { ZwiftEventSubgroup } from '../../Model/ZwiftEventSubgroup.js';
import { countDistance } from '../../utils/distance.js';
// import { getZwiftInsiderUrl } from '../../utility/route.js';
import { loggingAdmin } from '../log.js';
import { updateStartInfoEvent } from '../updates/schedule-events.js';
import { getClubName } from './club.js';
import { putSignedRidersService } from './signed-riders.js';
// типы
import { ZwiftEventSchema } from '../../types/model.interface.js';
import { EventWithSubgroup } from '../../types/types.interface.js';

// добавление эвента в БД zp.ru
export async function postEventService(eventParams: EventWithSubgroup, userId?: string) {
  await checkUnique(eventParams);
  const clubName = await getClubName(eventParams);

  // добавление названия клуба в котором был создал заезд в объект event
  eventParams.clubName = clubName;

  const eventSaved: ZwiftEventSchema = await saveEventToDB(eventParams);

  /**
   * Получение зарегистрированных райдров с ZwiftApi и сохранение в БД
   */
  await putSignedRidersService(eventSaved.id);

  /**
   * Обновление свойства старта заезда в одном event
   */
  await updateStartInfoEvent(eventSaved);

  /**
   * Логирование запроса
   */
  if (userId) {
    const description = 'postZwiftEvent';
    const { id, name, eventStart } = eventSaved;
    await loggingAdmin({ eventId: id, eventName: name, eventStart, userId, description });
  }
  return { message: 'Заезд добавлен в БД' };
}

/**
 * Создание модели эвента и сохранения в БД
 */
async function saveEventToDB(eventParams: EventWithSubgroup) {
  // сохранение подгрупп в параметры Event
  const eventSubgroups: Types.ObjectId[] = [];

  for (const eventSubgroup of eventParams.eventSubgroups) {
    /**
     * Расчет общей дистанции и набора высоты согласно маршрута и количества кругов
     */
    const { distanceInKilometers, elevationGainInMeters } = countDistance(eventSubgroup);

    // const zwiftInsiderUrl = getZwiftInsiderUrl(eventSubgroup.routeId);

    const { _id } = await ZwiftEventSubgroup.create({
      bikeHash: eventSubgroup.bikeHash,
      description: eventSubgroup.description,
      eventSubgroupStart: eventSubgroup.eventSubgroupStart,
      id: eventSubgroup.id,
      jerseyHash: eventSubgroup.jerseyHash,
      label: eventSubgroup.label,
      laps: eventSubgroup.laps,
      distanceInMeters: eventSubgroup.distanceInMeters,
      durationInSeconds: eventSubgroup.durationInSeconds,
      distanceSummary: {
        distanceInKilometers,
        elevationGainInMeters,
      },
      // zwiftInsiderUrl,
      mapId: eventSubgroup.mapId,
      name: eventSubgroup.name,
      routeId: eventSubgroup.routeId,
      rulesSet: eventSubgroup.rulesSet,
      subgroupLabel: eventSubgroup.subgroupLabel,
      tags: eventSubgroup.tags,
      timeTrialOptions: eventSubgroup.timeTrialOptions,
      totalEntrantCount: eventSubgroup.totalEntrantCount,
      totalJoinedCount: eventSubgroup.totalJoinedCount,
      totalSignedUpCount: eventSubgroup.totalSignedUpCount,
      invitedLeaders: eventSubgroup.invitedLeaders,
      invitedSweepers: eventSubgroup.invitedSweepers,
    });

    // добавление ObjectId подгрупп в массив
    if (_id) {
      eventSubgroups.push(_id);
    }
  }

  const eventDB: ZwiftEventSchema = await ZwiftEvent.create({
    seriesId: eventParams.seriesId,
    typeRaceCustom: eventParams.typeRaceCustom,
    organizer: eventParams.organizer,
    id: eventParams.id,
    mapId: eventParams.mapId,
    categoryEnforcement: eventParams.categoryEnforcement,
    accessExpression: eventParams.accessExpression,
    cullingType: eventParams.cullingType,
    description: eventParams.description,
    eventStart: eventParams.eventStart,
    eventType: eventParams.eventType,
    type: eventParams.type,
    imageUrl: eventParams.imageUrl,
    microserviceEventVisibility: eventParams.microserviceEventVisibility,
    microserviceExternalResourceId: eventParams.microserviceExternalResourceId,
    clubName: eventParams.clubName,
    name: eventParams.name,
    rulesSet: eventParams.rulesSet,
    tags: eventParams.tags,
    visible: eventParams.visible,
    totalEntrantCount: eventParams.totalEntrantCount,
    totalJoinedCount: eventParams.totalJoinedCount,
    totalSignedUpCount: eventParams.totalSignedUpCount,
    eventSubgroups,
    updated: Date.now(),
    creator: eventParams.creator,
    started: eventParams.started,
  });

  return eventDB;
}

async function checkUnique(event: EventWithSubgroup) {
  // проверка на уникальность id нового заезда
  const hasEvent = await ZwiftEvent.findOne({ id: event.id });
  if (hasEvent) {
    throw new Error(`Event с id=${event.id} уже есть в БД`);
  }
  // проверка на уникальность id групп нового заезда
  for (const eventSubgroup of event.eventSubgroups) {
    const hasSubGroup = await ZwiftEventSubgroup.findOne({ id: eventSubgroup.id });
    if (hasSubGroup) {
      throw new Error(`SubGroup с id=${eventSubgroup.id} уже есть в БД`);
    }
  }
}
