import { requiredLabelsForNewbies } from '../../../../../assets/subgroups';
import {
  accessExpressions,
  accessExpressionsDefault,
} from '../../../../../assets/zwift/accessExpression';

import { checkingRequiredSubgroups } from './subgroups';

/**
 * Установка паттерна настроек для Эвента Series
 */
export const patternNewbies = (rawEventParams, eventSubgroups, subgroupLabels) => {
  // проверка наличия обязательных подгрупп в созданном Эвенте
  checkingRequiredSubgroups(subgroupLabels, requiredLabelsForNewbies);

  const accessExpressionCatchUp =
    accessExpressions.find((elm) => elm.name === 'newbies') || accessExpressionsDefault;

  const eventParams = { ...rawEventParams };
  eventParams.categoryEnforcement = true;
  eventParams.accessExpression = accessExpressionCatchUp.value;
  eventParams.categoryEnforcementName = accessExpressionCatchUp.name;
  eventParams.rulesSet = ['SHOW_RACE_RESULTS', 'NO_POWERUPS'];
  eventParams.eventType = 'GROUP_RIDE';
  eventParams.type = 'EVENT_TYPE_GROUP_RIDE';
  eventParams.cullingType = 'CULLING_EVENT_ONLY';
  eventParams.microserviceEventVisibility = 'SHAREABLE';
  eventParams.tags = [];
  const eventSubgroupE = eventSubgroups.find((subgroup) => subgroup.label === 5);

  if (!eventSubgroupE) {
    throw new Error('Не найдена группа "E"');
  }

  const [eventStartDate] = eventParams.eventStart.split('T');

  if (!eventStartDate) {
    throw new Error('Не найдена дата старта');
  }

  // изменение времени для mainEvent
  eventParams.eventStart = `${eventStartDate}T16:00:00.000+0000`;

  eventSubgroups.forEach((subgroup) => {
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
    // subgroup.startLocation = eventSubgroupE.startLocation;

    subgroup.registrationStart = `${eventStartDate}T15:30:00.000+0000`;
    subgroup.registrationEnd = `${eventStartDate}T16:00:00.000+0000`;
    subgroup.lineUpStart = `${eventStartDate}T15:55:00.000+0000`;
    subgroup.lineUpEnd = `${eventStartDate}T16:00:00.000+0000`;
    subgroup.eventSubgroupStart = `${eventStartDate}T16:00:00.000+0000`;

    switch (subgroup.label) {
      // группа C
      case 3:
        subgroup.fromPaceValue = 2.63;
        subgroup.toPaceValue = 3.36;
        subgroup.jerseyHash = 2439396652;
        break;

      // группа D
      case 4:
        subgroup.fromPaceValue = 1;
        subgroup.toPaceValue = 2.629;
        subgroup.jerseyHash = 2808241362;
        break;

      // группа E
      case 5:
        subgroup.fromPaceValue = 1;
        subgroup.toPaceValue = 7;
        subgroup.jerseyHash = 2214060235;
    }
  });

  return { ...eventParams, eventSubgroups };
};
