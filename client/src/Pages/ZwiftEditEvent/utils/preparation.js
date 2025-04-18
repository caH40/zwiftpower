import { getCommonRulesSet } from '../../../hook/useRulesSet';

import { changeTime } from './time-start';

/**
 * Дополнительные правила для Эвента и подгрупп перед сохранением в API Zwift.
 */
export function prepareData({
  eventMainParams,
  eventSubgroup_1,
  eventSubgroup_2,
  eventSubgroup_3,
  eventSubgroup_4,
  eventSubgroup_5,
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

  // Установка в общие настройки эванта правил, которые установлены и являются общими для всех групп.
  event.rulesSet = getCommonRulesSet(eventSubgroups);

  // Обработка данных в tags.
  const tagsCheckedFromCheckbox = [...checkboxTags]
    .filter((tag) => tag.checked)
    .flatMap((tag) => tag.value);

  const tagsDefault = ['ranked', 'showplacements'];
  const tags = [...tagsCheckedFromCheckbox, ...tagsDefault];
  const tagsFiltered = tags.filter((tag) => !tag.includes('timestamp'));
  const timestamp = `timestamp=${Date.now()}`;

  tagsFiltered.push(timestamp);

  // изменение тэга времени
  event.tags = [...tagsFiltered];
  for (const subGroup of eventSubgroups) {
    subGroup.tags = [...tagsFiltered];
    // subGroup.rulesSet = [...rulesSet];
    // Добавляем 'LADIES_ONLY' только для subGroup с label === 4 или label === 5
    // if (subGroup.label === 5 || subGroup.label === 4) {
    //   subGroup.rulesSet.push('LADIES_ONLY');
    // }
    changeTime(subGroup);
    subGroup.rulesId = null;
    subGroup.accessValidationResult = true;
  }

  return {
    eventTemplateId: event.eventTemplateId,
    eventData: {
      ...event,
      eventSubgroups,
    },
  };
}
