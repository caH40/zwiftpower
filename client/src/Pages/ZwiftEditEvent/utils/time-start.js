import { addNull } from '../../../utils/date-convert';

export function changeTime(subGroup) {
  if (!subGroup) return;

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
