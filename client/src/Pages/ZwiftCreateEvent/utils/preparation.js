import { optionsEventType } from '../../../assets/select/event-edit';
import { accessExpressionsDefault } from '../../../assets/zwift/accessExpression';

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

  // event.rulesSet = rulesSet;

  // Установка значений в tags.
  const tagsRules = [...checkboxTags].filter((tag) => tag.checked).map((tag) => tag.value);

  const timestamp = `timestamp=${Date.now()}`;
  // Стандартные по умолчанию настройки, изменяются в  ручную.
  const tagsDefault = ['ranked', 'showplacements'];
  const tags = [...tagsRules, timestamp, ...tagsDefault];

  // Установка тэгов для общих настроек Эвента.
  event.tags = tags;

  // параметры для TIME TRIAL
  if (event.eventType === 'TIME_TRIAL') {
    eventSubgroups.forEach((subgroup) => {
      subgroup.timeTrialOptions = event.timeTrialOptions;
      subgroup.tags = tags;
    });
  } else {
    delete event.timeTrialOptions;
    eventSubgroups.forEach((subgroup) => {
      subgroup.tags = tags;
    });
  }

  // type тип заезда, значение которого идет в связке с eventType
  // для создания Эвента требуется указывать type, для редактирования eventType
  event.type = optionsEventType.find((type) => type.name === event.eventType)?.nameSecond;

  return {
    eventData: {
      ...event,
      eventSubgroups,
    },
    eventTemplateId: 100,
  };
}
