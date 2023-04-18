import { addNull } from '../../../utils/date-convert';

export function prepareData(
  eventMainParams,
  eventSubgroup_0,
  eventSubgroup_1,
  eventSubgroup_2,
  eventSubgroup_3,
  eventSubgroup_4,
  selectedRules
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
  const rulesSet = [...selectedRules].map((rule) => rule.value);
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
    event.accessExpression =
      '(subgroup.label == 1 && powerCurves.category == 0) || (powerCurves.category != 5 && powerCurves.category >= subgroup.label) || (powerCurves.category == 5 && subgroup.label == 5)'; // eslint-disable-line
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

function changeTime(subGroup) {
  subGroup.lineUpEnd = subGroup.eventSubgroupStart;
  subGroup.registrationEnd = subGroup.eventSubgroupStart;

  const date = subGroup.eventSubgroupStart.slice(0, 11);
  const timeArray = subGroup.eventSubgroupStart.slice(11, 19).split(':');
  const minutes = Number(timeArray[0] * 60) + Number(timeArray[1]);

  subGroup.lineUpStart = date + countGap(minutes, 5);
  subGroup.registrationStart = date + countGap(minutes, 30);
}

function countGap(timeInMinutes, gap) {
  const hour = addNull(Math.trunc((timeInMinutes - gap) / 60));
  const minutes = addNull(timeInMinutes - gap - hour * 60);
  return `${hour}:${minutes}:00.000+0000`;
}
