import { getAccessExpression } from './accessExpression';
import { changeTime } from './time-start';

/**
 * Дополнительные правила для Эвента и подгрупп
 */

export function prepareData(
  eventMainParams,
  eventSubgroup_0,
  eventSubgroup_1,
  eventSubgroup_2,
  eventSubgroup_3,
  eventSubgroup_4,
  checkboxRules,
  checkboxTags
) {
  const event = { ...eventMainParams };
  const dateNow = `timestamp=${Date.now()}`;

  const eventSubgroups = [
    { ...eventSubgroup_0 },
    { ...eventSubgroup_1 },
    { ...eventSubgroup_2 },
    { ...eventSubgroup_3 },
    { ...eventSubgroup_4 },
  ].filter((elm) => elm.id);

  event.rulesId = null;
  const rulesSet = [...checkboxRules].filter((rule) => rule.checked).map((rule) => rule.value);
  const tags = [...checkboxTags].filter((tag) => tag.checked).map((tag) => tag.value);
  tags.push(dateNow);

  event.rulesSet = rulesSet;

  // изменение тэга времени
  event.tags = tags;
  for (const subGroup of eventSubgroups) {
    if (subGroup.label === 1) {
      subGroup.fromPaceValue = 4.0;
      subGroup.toPaceValue = 4.59;
    }
    if (subGroup.label === 2) {
      subGroup.fromPaceValue = 3.2;
      subGroup.toPaceValue = 3.99;
    }
    if (subGroup.label === 3) {
      subGroup.fromPaceValue = 1;
      subGroup.toPaceValue = 3.19;
    }
    if (subGroup.label === 4) {
      subGroup.fromPaceValue = 4.6;
      subGroup.toPaceValue = 7;
    }
    if (subGroup.label === 5) {
      subGroup.fromPaceValue = 1;
      subGroup.toPaceValue = 7;
    }
    subGroup.tags = tags;
    subGroup.rulesSet = rulesSet;
    changeTime(subGroup);
    subGroup.rulesId = null;
  }

  // если включен categoryEnforcement, но не задан accessExpression
  if (event.categoryEnforcement && !event.accessExpression) {
    event.accessExpression = getAccessExpression();
  } else if (!event.categoryEnforcement) {
    event.accessExpression = null;
  }

  return {
    eventTemplateId: event.eventTemplateId,
    eventData: {
      ...event,
      eventSubgroups,
    },
  };
}
