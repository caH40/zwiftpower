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

  // Установка значений в tags.
  const tagsRules = [...checkboxTags].filter((tag) => tag.checked).map((tag) => tag.value);
  event.rulesSet = rulesSet;
  const timestamp = `timestamp=${Date.now()}`;
  const tagsDefault = ['ranked', 'showplacements'];
  const tag = [...tagsRules, timestamp, ...tagsDefault];
  event.tags = tag;

  // параметры для TIME TRIAL
  if (event.eventType === 'TIME_TRIAL') {
    eventSubgroups.forEach((subgroup) => {
      subgroup.timeTrialOptions = event.timeTrialOptions;
      subgroup.tags = tag;
    });
  } else {
    delete event.timeTrialOptions;
    eventSubgroups.forEach((subgroup) => {
      subgroup.tags = tag;
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
    eventTemplateId: 101,
  };
}
