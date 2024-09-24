import { requiredLabelsForSeries } from '../../../../../assets/subgroups';
import { accessExpressionDefault } from '../../../../../assets/zwift/accessExpression';

import { checkingRequiredSubgroups } from './subgroups';

/**
 * Установка паттерна настроек для Эвента Series
 */
export const patternSeries = (rawEventParams, eventSubgroups, subgroupLabels) => {
  // проверка наличия обязательных подгрупп в созданном Эвенте
  checkingRequiredSubgroups(subgroupLabels, requiredLabelsForSeries);

  const eventParams = { ...rawEventParams };
  eventParams.categoryEnforcement = true;
  eventParams.accessExpression = accessExpressionDefault.value;
  eventParams.rulesSet = ['SHOW_RACE_RESULTS', 'NO_POWERUPS'];
  eventParams.eventType = 'GROUP_RIDE';
  eventParams.type = 'EVENT_TYPE_GROUP_RIDE';
  eventParams.cullingType = 'CULLING_EVENT_ONLY';
  eventParams.microserviceEventVisibility = 'DEFINED_BY_RESOURCE_ID';
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
  eventParams.eventStart = `${eventStartDate}T08:00:00.000+0000`;

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
    subgroup.startLocation = eventSubgroupE.startLocation;

    subgroup.registrationStart = `${eventStartDate}T07:30:00.000+0000`;
    subgroup.registrationEnd = `${eventStartDate}T08:00:00.000+0000`;
    subgroup.lineUpStart = `${eventStartDate}T07:55:00.000+0000`;
    subgroup.lineUpEnd = `${eventStartDate}T08:00:00.000+0000`;
    subgroup.eventSubgroupStart = `${eventStartDate}T08:00:00.000+0000`;

    switch (subgroup.label) {
      // группа A
      case 1:
        subgroup.fromPaceValue = 4.0;
        subgroup.toPaceValue = 4.59;
        break;

      // группа B
      case 2:
        subgroup.fromPaceValue = 3.2;
        subgroup.toPaceValue = 3.99;
        break;

      // группа C
      case 3:
        subgroup.fromPaceValue = 1;
        subgroup.toPaceValue = 3.19;
        break;

      // группа C
      case 4:
        subgroup.fromPaceValue = 4.6;
        subgroup.toPaceValue = 7;
        break;

      // группа E
      default:
        subgroup.fromPaceValue = 1;
        subgroup.toPaceValue = 7;
    }
  });

  return { ...eventParams, eventSubgroups };
};
