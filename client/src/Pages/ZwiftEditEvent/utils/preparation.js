import { getAccessExpression } from './accessExpression';
import { changeTime } from './time-start';

/**
 * Дополнительные правила для Эвента и подгрупп
 */
export function prepareData({
  eventMainParams,
  eventSubgroup_1,
  eventSubgroup_2,
  eventSubgroup_3,
  eventSubgroup_4,
  eventSubgroup_5,
  checkboxRules,
  checkboxTags,
}) {
  const event = { ...eventMainParams };
  const dateNow = `timestamp=${Date.now()}`;

  // фильтрация от несуществующих групп
  const eventSubgroups = [
    { ...eventSubgroup_1 },
    { ...eventSubgroup_2 },
    { ...eventSubgroup_3 },
    { ...eventSubgroup_4 },
    { ...eventSubgroup_5 },
  ].filter((elm) => elm.label);

  event.rulesId = null;
  const rulesSet = [...checkboxRules].filter((rule) => rule.checked).map((rule) => rule.value);
  const tags = [...checkboxTags].filter((tag) => tag.checked).map((tag) => tag.value);
  tags.push(dateNow);

  event.rulesSet = rulesSet;

  // изменение тэга времени
  event.tags = tags;
  for (const subGroup of eventSubgroups) {
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
