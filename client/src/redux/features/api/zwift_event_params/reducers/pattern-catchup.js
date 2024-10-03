import { requiredLabelsForCatchup } from '../../../../../assets/subgroups';
import {
  accessExpressions,
  accessExpressionsDefault,
} from '../../../../../assets/zwift/accessExpression';

import { checkingRequiredSubgroups } from './subgroups';

/**
 * Установка паттерна настроек для Эвента CatchUp
 */
export const patternCatchUp = (rawEventParams, eventSubgroups, subgroupLabels) => {
  // проверка наличия обязательных подгрупп в созданном Эвенте
  checkingRequiredSubgroups(subgroupLabels, requiredLabelsForCatchup);

  const accessExpressionCatchUp =
    accessExpressions.find((elm) => elm.name === 'catchUp') || accessExpressionsDefault;

  // Удаления value,paceValues строки, так как она уже есть в сущности ZwiftEvent в которую вносятся данные изменения.
  const { value, paceValues, ...accessExpressionObj } = accessExpressionCatchUp;

  const eventParams = { ...rawEventParams };
  eventParams.categoryEnforcement = true;
  eventParams.accessExpression = value;
  eventParams.accessExpressionObj = accessExpressionObj;
  eventParams.rulesSet = ['SHOW_RACE_RESULTS', 'NO_POWERUPS'];
  eventParams.eventType = 'RACE';
  eventParams.type = 'EVENT_TYPE_RACE';
  eventParams.cullingType = 'CULLING_EVENT_ONLY';
  eventParams.microserviceEventVisibility = 'SHAREABLE';
  eventParams.tags = ['ttbikesdraft'];
  const eventSubgroupE = eventSubgroups.find((subgroup) => subgroup.label === 5);

  if (!eventSubgroupE) {
    throw new Error('Не найдена группа "E"');
  }

  const [eventStartDate] = eventParams.eventStart.split('T');

  if (!eventStartDate) {
    throw new Error('Не найдена дата старта');
  }

  // время старта Эвента
  eventParams.eventStart = `${eventStartDate}T16:30:00.000+0000`;

  eventSubgroups.forEach((subgroup) => {
    subgroup.tags = ['ttbikesdraft'];
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

    switch (subgroup.label) {
      // группа A
      case 1:
        subgroup.registrationStart = `${eventStartDate}T16:00:00.000+0000`;
        subgroup.registrationEnd = `${eventStartDate}T16:30:00.000+0000`;
        subgroup.lineUpStart = `${eventStartDate}T16:25:00.000+0000`;
        subgroup.lineUpEnd = `${eventStartDate}T16:30:00.000+0000`;
        subgroup.eventSubgroupStart = `${eventStartDate}T16:30:00.000+0000`;
        subgroup.jerseyHash = 3090729076;
        subgroup.fromPaceValue = 1;
        subgroup.toPaceValue = 6;
        break;

      // группа B
      case 2:
        subgroup.registrationStart = `${eventStartDate}T16:00:00.000+0000`;
        subgroup.registrationEnd = `${eventStartDate}T16:30:00.000+0000`;
        subgroup.lineUpStart = `${eventStartDate}T16:25:00.000+0000`;
        subgroup.lineUpEnd = `${eventStartDate}T16:30:00.000+0000`;
        subgroup.eventSubgroupStart = `${eventStartDate}T16:30:00.000+0000`;
        subgroup.jerseyHash = 4288197284;
        subgroup.fromPaceValue = 1;
        subgroup.toPaceValue = 6;
        break;

      // группа C
      case 3:
        subgroup.registrationStart = `${eventStartDate}T16:00:00.000+0000`;
        subgroup.registrationEnd = `${eventStartDate}T16:30:00.000+0000`;
        subgroup.lineUpStart = `${eventStartDate}T16:25:00.000+0000`;
        subgroup.lineUpEnd = `${eventStartDate}T16:30:00.000+0000`;
        subgroup.eventSubgroupStart = `${eventStartDate}T16:30:00.000+0000`;
        subgroup.fromPaceValue = 1;
        subgroup.toPaceValue = 6;
        subgroup.jerseyHash = 3271072532;
        break;

      // группа D
      case 4:
        subgroup.registrationStart = `${eventStartDate}T16:00:00.000+0000`;
        subgroup.registrationEnd = `${eventStartDate}T16:30:00.000+0000`;
        subgroup.lineUpStart = `${eventStartDate}T16:25:00.000+0000`;
        subgroup.lineUpEnd = `${eventStartDate}T16:30:00.000+0000`;
        subgroup.eventSubgroupStart = `${eventStartDate}T16:30:00.000+0000`;
        subgroup.fromPaceValue = 1;
        subgroup.toPaceValue = 6;
        subgroup.jerseyHash = 1893222148;
        break;

      // группа E
      case 5:
        subgroup.registrationStart = `${eventStartDate}T16:00:00.000+0000`;
        subgroup.registrationEnd = `${eventStartDate}T16:30:00.000+0000`;
        subgroup.lineUpStart = `${eventStartDate}T16:25:00.000+0000`;
        subgroup.lineUpEnd = `${eventStartDate}T16:30:00.000+0000`;
        subgroup.eventSubgroupStart = `${eventStartDate}T16:30:00.000+0000`;
        subgroup.fromPaceValue = 1;
        subgroup.toPaceValue = 6;
        subgroup.jerseyHash = 3992094603;
    }
  });

  return { ...eventParams, eventSubgroups };
};
