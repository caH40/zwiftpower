import { requiredLabelsForCatchup } from '../../../../../assets/subgroups';

import { checkingRequiredSubgroups } from './subgroups';

/**
 * Установка паттерна настроек для Эвента CatchUp
 */
export const patternCatchUp = (rawEventParams) => {
  // проверка наличия обязательных подгрупп в созданном Эвенте
  checkingRequiredSubgroups(rawEventParams, requiredLabelsForCatchup);

  const eventParams = { ...rawEventParams };
  eventParams.categoryEnforcement = true;
  eventParams.accessExpression =
    '(powerCurves.category == 0 && subgroup.label == 1) || (powerCurves.category != 5 && powerCurves.category >= subgroup.label) || (powerCurves.category == 5 && subgroup.label == 5) || (powerCurves.category == 5 && subgroup.label == 1)';
  eventParams.rulesSet = ['SHOW_RACE_RESULTS', 'NO_POWERUPS'];
  eventParams.eventType = 'RACE';
  eventParams.type = 'EVENT_TYPE_RACE';
  eventParams.cullingType = 'CULLING_EVENT_ONLY';
  eventParams.tags = [];
  const eventSubgroupE = eventParams.eventSubgroups.find((subgroup) => subgroup.label === 5);

  if (!eventSubgroupE) {
    throw new Error('Не найдена группа "E"');
  }

  const [eventStartDate] = eventParams.eventStart.split('T');

  if (!eventStartDate) {
    throw new Error('Не найдена дата старта');
  }

  eventParams.eventSubgroups.forEach((subgroup) => {
    subgroup.tags = [];
    subgroup.rulesSet = ['SHOW_RACE_RESULTS', 'NO_POWERUPS'];
    // копирование данных из группы E в остальные группы
    subgroup.worldId = eventSubgroupE.worldId;
    subgroup.mapId = eventSubgroupE.mapId;
    subgroup.routeId = eventSubgroupE.routeId;
    subgroup.name = eventSubgroupE.name;
    subgroup.description = eventSubgroupE.description;
    subgroup.durationInSeconds = eventSubgroupE.durationInSeconds;
    subgroup.distanceInMeters = eventSubgroupE.distanceInMeters;
    subgroup.laps = eventSubgroupE.laps;
    subgroup.startLocation = eventSubgroupE.startLocation;

    switch (subgroup.label) {
      // группа A
      case 1:
        subgroup.registrationStart = `${eventStartDate}T16:06:00.000+0000`;
        subgroup.registrationEnd = `${eventStartDate}T16:36:00.000+0000`;
        subgroup.lineUpStart = `${eventStartDate}T16:31:00.000+0000`;
        subgroup.lineUpEnd = `${eventStartDate}T16:36:00.000+0000`;
        subgroup.eventSubgroupStart = `${eventStartDate}T16:36:00.000+0000`;
        subgroup.jerseyHash = 3090729076;
        break;

      // группа B
      case 2:
        subgroup.registrationStart = `${eventStartDate}T16:04:00.000+0000`;
        subgroup.registrationEnd = `${eventStartDate}T16:34:00.000+0000`;
        subgroup.lineUpStart = `${eventStartDate}T16:29:00.000+0000`;
        subgroup.lineUpEnd = `${eventStartDate}T16:34:00.000+0000`;
        subgroup.eventSubgroupStart = `${eventStartDate}T16:34:00.000+0000`;
        subgroup.jerseyHash = 4288197284;
        break;

      // группа C
      case 3:
        subgroup.registrationStart = `${eventStartDate}T16:00:00.000+0000`;
        subgroup.registrationEnd = `${eventStartDate}T16:30:00.000+0000`;
        subgroup.lineUpStart = `${eventStartDate}T16:25:00.000+0000`;
        subgroup.lineUpEnd = `${eventStartDate}T16:30:00.000+0000`;
        subgroup.eventSubgroupStart = `${eventStartDate}T16:30:00.000+0000`;
        subgroup.jerseyHash = 3271072532;
        break;

      // группа E
      default:
        subgroup.registrationStart = `${eventStartDate}T16:00:00.000+0000`;
        subgroup.registrationEnd = `${eventStartDate}T16:30:00.000+0000`;
        subgroup.lineUpStart = `${eventStartDate}T16:25:00.000+0000`;
        subgroup.lineUpEnd = `${eventStartDate}T16:30:00.000+0000`;
        subgroup.eventSubgroupStart = `${eventStartDate}T16:30:00.000+0000`;
        subgroup.jerseyHash = 1303932596;
    }
  });

  return eventParams;
};
