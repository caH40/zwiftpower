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

  // Обработка данных в tags.
  const tagsFromCheckbox = [...checkboxTags]
    .filter((tag) => tag.checked)
    .map((tag) => tag.value);
  const tags = [...eventMainParams.tags, ...tagsFromCheckbox];
  const tagsFiltered = tags.filter((tag) => !tag.includes('timestamp'));
  const timestamp = `timestamp=${Date.now()}`;

  tagsFiltered.push(timestamp);

  event.rulesSet = rulesSet;

  // изменение тэга времени
  event.tags = tagsFiltered;
  for (const subGroup of eventSubgroups) {
    subGroup.tags = tagsFiltered;
    subGroup.rulesSet = rulesSet;
    changeTime(subGroup);
    subGroup.rulesId = null;
  }

  return {
    eventTemplateId: event.eventTemplateId,
    eventData: {
      ...event,
      eventSubgroups,
    },
  };
}
