import { ZwiftEvent } from '../../Model/ZwiftEvent.js';
import { ZwiftEventSubgroup } from '../../Model/ZwiftEventSubgroup.js';
import { putSingedRidersService } from './singed-riders.js';

// --postEventService-- добавление эвента в БД zp.ru
export async function postEventService(event) {
  try {
    // проверка на уникальность id нового заезда
    const hasEvent = await ZwiftEvent.findOne({ id: event.id });
    if (hasEvent) throw { message: `Event с id=${event.id} уже есть в БД` };
    // проверка на уникальность id групп нового заезда
    for (const eventSubgroup of event.eventSubgroups) {
      const hasSubGroup = await ZwiftEventSubgroup.findOne({ id: eventSubgroup.id });
      if (hasSubGroup) throw { message: `SubGroup с id=${eventSubgroup.id} уже есть в БД` };
    }

    const eventSaved = await saveEventToDB(event);
    await putSingedRidersService(eventSaved.id);

    return { message: 'Заезд добавлен в БД' };
  } catch (error) {
    throw error;
  }
}

// создание модели эвента и сохранения в БД
async function saveEventToDB(event) {
  try {
    const eventSubgroups = [];
    for (const eventSubgroup of event.eventSubgroups) {
      const { _id } = await ZwiftEventSubgroup.create({
        bikeHash: eventSubgroup.bikeHash,
        description: eventSubgroup.description,
        eventSubgroupStart: eventSubgroup.eventSubgroupStart,
        id: eventSubgroup.id,
        jerseyHash: eventSubgroup.jerseyHash,
        label: eventSubgroup.label,
        laps: eventSubgroup.laps,
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
      });
      eventSubgroups.push(_id);
    }

    const eventDB = await ZwiftEvent.create({
      seriesId: event.seriesId,
      typeRaceCustom: event.typeRaceCustom,
      organizer: event.organizer,
      id: event.id,
      mapId: event.mapId,
      categoryEnforcement: event.categoryEnforcement,
      accessExpression: event.accessExpression,
      cullingType: event.cullingType,
      description: event.description,
      eventStart: event.eventStart,
      eventType: event.eventType,
      type: event.type,
      imageUrl: event.imageUrl,
      microserviceEventVisibility: event.microserviceEventVisibility,
      name: event.name,
      rulesSet: event.rulesSet,
      tags: event.tags,
      visible: event.visible,
      totalEntrantCount: event.totalEntrantCount,
      totalJoinedCount: event.totalJoinedCount,
      totalSignedUpCount: event.totalSignedUpCount,
      eventSubgroups,
      updated: Date.now(),
      creator: event.creator,
    });

    return eventDB;
  } catch (error) {
    throw error;
  }
}
