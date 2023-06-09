import { ZwiftEvent } from '../../Model/ZwiftEvent.js';
import { ZwiftEventSubgroup } from '../../Model/ZwiftEventSubgroup.js';
import { countDistance } from '../../utility/distance.js';
import { getZwiftInsiderUrl } from '../../utility/route.js';
import { loggingAdmin } from '../log.js';
import { updateStartInfoEvent } from '../updates/schedule-events.js';
import { getClubName } from './club.js';
import { putSignedRidersService } from './signed-riders.js';

// добавление эвента в БД zp.ru
export async function postEventService(event, userId) {
  try {
    await checkUnique(event);
    await getClubName(event);

    const eventSaved = await saveEventToDB(event);

    await putSignedRidersService(eventSaved.id);
    await updateStartInfoEvent(eventSaved);

    // логирование действия
    if (userId) {
      const description = 'postZwiftEvent';
      const { id, name, eventStart } = eventSaved;
      await loggingAdmin(id, name, eventStart, userId, description);
    }

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
      const { distanceInKilometers, elevationGainInMeters } =
        countDistance(eventSubgroup) || {};
      const zwiftInsiderUrl = getZwiftInsiderUrl(eventSubgroup.routeId);

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
        zwiftInsiderUrl,
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
      microserviceExternalResourceId: event.microserviceExternalResourceId,
      clubName: event.clubName,
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
      started: event.started,
    });

    return eventDB;
  } catch (error) {
    throw error;
  }
}

async function checkUnique(event) {
  try {
    // проверка на уникальность id нового заезда
    const hasEvent = await ZwiftEvent.findOne({ id: event.id });
    if (hasEvent) throw { message: `Event с id=${event.id} уже есть в БД` };
    // проверка на уникальность id групп нового заезда
    for (const eventSubgroup of event.eventSubgroups) {
      const hasSubGroup = await ZwiftEventSubgroup.findOne({ id: eventSubgroup.id });
      if (hasSubGroup) throw { message: `SubGroup с id=${eventSubgroup.id} уже есть в БД` };
    }
  } catch (error) {
    throw error;
  }
}
