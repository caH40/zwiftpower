import { changeTime } from './time-start';

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

  // дополнительные правила для Эвента и подгрупп

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
    subGroup.tags = tags;
    subGroup.rulesSet = rulesSet;
    changeTime(subGroup);
    subGroup.rulesId = null;
  }

  if (event.categoryEnforcement) {
    // описание разрешенных групп при определенных категориях райдеров

    // для райдера категория "А" присвоена: powerCurves.category == 0
    // может подключиться только к группе "А": subgroup.label == 1
    const subgroupForFirstCat = '(powerCurves.category == 0 && subgroup.label == 1)';

    // может подключиться к группе большей или равной своей категории,
    // но кроме группы "E" powerCurves.category != 5
    const subgroupForCatExceptFifth =
      '(powerCurves.category != 5 && powerCurves.category >= subgroup.label)';

    // для райдера категория "E" присвоена: powerCurves.category == 5
    // может подключиться только к группе "E": subgroup.label == 5
    const subgroupForFifthCat = '(powerCurves.category == 5 && subgroup.label == 5)';

    // для райдера категория "E" присвоена: powerCurves.category == 5
    // может подключиться также к группе "A": subgroup.label == 1
    const subgroupForFifthCatException = '(powerCurves.category == 5 && subgroup.label == 1)';

    // суммарное правило подключение райдеров к группам
    event.accessExpression = `${subgroupForFirstCat} || ${subgroupForCatExceptFifth} || ${subgroupForFifthCat} || ${subgroupForFifthCatException}`;
  } else {
    event.accessExpression = null;
  }
  // event.microserviceExternalResourceId = null;
  // event.microserviceEventVisibility = null;
  // event.microserviceName = null;

  return {
    eventTemplateId: event.eventTemplateId,
    eventData: {
      ...event,
      eventSubgroups,
    },
  };
}
