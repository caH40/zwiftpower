import { optionsEventType } from '../../../assets/select/event-edit';
import { getAccessExpression } from '../../ZwiftEditEvent/utils/accessExpression';

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
  // фильтрация от несуществующих групп
  const eventSubgroups = [
    { ...eventSubgroup_1 },
    { ...eventSubgroup_2 },
    { ...eventSubgroup_3 },
    { ...eventSubgroup_4 },
    { ...eventSubgroup_5 },
  ].filter((elm) => elm.label);

  const rulesSet = [...checkboxRules].filter((rule) => rule.checked).map((rule) => rule.value);
  const tags = [...checkboxTags].filter((tag) => tag.checked).map((tag) => tag.value);
  event.rulesSet = rulesSet;
  event.tags = tags;

  // type тип заезда, значение которого идет в связке с eventType
  // для создания Эвента требуется указывать type, для редактирования eventType
  event.type = optionsEventType.find((type) => type.name === event.eventType)?.nameSecond;

  // если включен categoryEnforcement, но не задан accessExpression
  if (event.categoryEnforcement && !event.accessExpression) {
    event.accessExpression = getAccessExpression();
  } else if (!event.categoryEnforcement) {
    event.accessExpression = null;
  }

  return {
    eventData: {
      ...event,
      eventSubgroups,
    },
    eventTemplateId: 101,
  };
}
