import { getAccessToken } from './token.js';
import { getRequest } from './request-get.js';
import { putRequest } from './request-put.js';
import { ZwiftEventSubgroup } from '../../Model/ZwiftEventSubgroup.js';
import { ZwiftEvent } from '../../Model/ZwiftEvent.js';

export async function getEventService(eventId, username, password) {
  try {
    const token = await getAccessToken(username, password);
    if (!token) throw { message: 'Ошибка при получении токена' };

    const urlEventData = `events/${eventId}?skip_cache=false`;

    const eventData = await getRequest(urlEventData, token);

    return eventData;
  } catch (error) {
    throw error;
  }
}
export async function putEventService(event, username, password) {
  try {
    const token = await getAccessToken(username, password);
    if (!token) throw { message: 'Ошибка при получении токена' };
    const urlEventData = `events/${event.eventData.id}`;

    const eventData = await putRequest(urlEventData, token, event);

    return { eventData, message: 'Изменения сохранены' };
  } catch (error) {
    throw error;
  }
}
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

    await ZwiftEvent.create({
      seriesId: event.seriesId,
      typeEventCustom: event.typeEventCustom,
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
    });

    return { message: 'Заезд сохранен' };
  } catch (error) {
    throw error;
  }
}
export async function getEventsService() {
  try {
    const eventsDB = await ZwiftEvent.find().populate('eventSubgroups');
    return { events: eventsDB, message: 'Получены все заезды' };
  } catch (error) {
    throw error;
  }
}
