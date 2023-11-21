import { Types } from 'mongoose';

import { ZwiftEvent } from '../../../Model/ZwiftEvent.js';
import { ZwiftEventSubgroup } from '../../../Model/ZwiftEventSubgroup.js';
import { countDistance } from '../../../utils/distance.js';

// types
import { ZwiftEventSchema } from '../../../types/model.interface.js';
import { EventWithSubgroup } from '../../../types/types.interface.js';

/**
 * Создание модели эвента и сохранения в БД
 */
export async function saveEventToDB(eventParams: EventWithSubgroup) {
  // сохранение подгрупп в параметры Event
  const eventSubgroups: Types.ObjectId[] = [];

  for (const eventSubgroup of eventParams.eventSubgroups) {
    // Расчет общей дистанции и набора высоты согласно маршрута и количества кругов
    const { distanceInKilometers, elevationGainInMeters } = countDistance(eventSubgroup);

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
