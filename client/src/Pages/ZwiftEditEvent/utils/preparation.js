import { changeTime } from './time-start';

export function prepareData(
  eventMainParams,
  eventSubgroup_0,
  eventSubgroup_1,
  eventSubgroup_2,
  eventSubgroup_3,
  eventSubgroup_4,
  checkboxRules
) {
  const event = { ...eventMainParams };
  const dateNow = [`timestamp=${Date.now()}`];

  const eventSubgroups = [
    { ...eventSubgroup_0 },
    { ...eventSubgroup_1 },
    { ...eventSubgroup_2 },
    { ...eventSubgroup_3 },
    { ...eventSubgroup_4 },
  ].filter((elm) => elm.id);

  event.rulesId = null;
  const rulesSet = [...checkboxRules].filter((rule) => rule.checked).map((rule) => rule.value);

  event.rulesSet = rulesSet;

  // изменение тэга времени
  event.tags = dateNow;
  for (const subGroup of eventSubgroups) {
    subGroup.tags = dateNow;
    subGroup.rulesSet = rulesSet;
    changeTime(subGroup);
    subGroup.rulesId = null;
  }

  if (event.categoryEnforcement) {
    // описание разрешенных групп при определенных категориях райдеров
    const subgroupForFirstCat = '(subgroup.label == 1 && powerCurves.category == 0)';
    const subgroupForCatExceptFifth =
      '(powerCurves.category != 5 && powerCurves.category >= subgroup.label)';
    const subgroupForFifthCat = '(powerCurves.category == 5 && subgroup.label == 5)';
    const subgroupForFifthCatException = '(powerCurves.category == 5 && subgroup.label == 1)';

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
