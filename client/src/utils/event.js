import { worlds } from '../asset/zwift/lib/esm/worlds';
import { routes } from '../asset/zwift/lib/esm/routes';
import { organizers } from '../asset/zwift/organizer';

import { secondesToMinutes, secondesToTime } from './date-convert';
import { getLapsString } from './declination';

export const map = (id) => {
  return worlds.find((map) => map.id === id)?.name;
};
export const route = (id) => {
  return routes.find((route) => route.id === id)?.name;
};

export const organizer = (value) => {
  return organizers.find((organizer) => organizer.value === value)?.name;
};
export const gapStart = (eventParams) => {
  if (!eventParams.id) return {};
  const gaps = {};
  for (const eventSubgroup of eventParams.eventSubgroups) {
    gaps[eventSubgroup?.subgroupLabel] = gap(
      eventParams.eventStart,
      eventSubgroup?.eventSubgroupStart
    );
  }
  return gaps;
};

const gap = (dateStart, dateStartGroup) => {
  const gapMilliseconds = new Date(dateStartGroup).getTime() - new Date(dateStart).getTime();
  return secondesToMinutes(gapMilliseconds);
};

export const replaceWithBr = (text = '') => text.replace(/\n/g, '<br />');

export const getAgeCategory = (age) => {
  if (!age) return '';
  if (age < 30) return 'Snr';
  if (age >= 30 && age < 40) return 'Mas';
  if (age >= 40 && age < 50) return 'Vet';
  if (age >= 50 && age < 60) return '50+';
  return '60+';
};

export const getWeightStr = (weight) => {
  if (String(weight).includes('max')) {
    // отделение слова 'max', что изменить вес
    const [value] = weight.split('max');
    return Math.round(value / 100) / 10 + 'max';
  }
  return Math.round(weight / 100) / 10;
};

export const getHeightStr = (height, measure) => {
  if (measure === 'cm') return height;
  return Math.round(height / 10);
};
export const getGenderStr = (isMale, string) => {
  if (string) return string === 'MALE' ? 'муж' : 'жен';
  return isMale ? 'муж' : 'жен';
};

// ========================================================
// обработка свойства laps
export const getLaps = (laps) => {
  if (laps === 0) return null;
  return laps;
};

//  обработка свойства durationInSeconds, продолжительность заезда задана в секундах
export const getDuration = (duration) => {
  if (duration === 0) return null;
  return secondesToTime(duration * 1000);
};

//  обработка свойства distanceInMeters, продолжительность заезда задана в секундах
export const getDistance = (distance) => {
  if (distance === 0) return null;
  return getDistanceString(distance / 1000);
};

// дистанции если заданы круги
export const getDistanceEstimated = (distance) => {
  if (!distance) return null;
  return getDistanceString(distance);
};

// набор высоты  если заданы круги
export const getElevationEstimated = (elevation) => {
  if (!elevation) return null;
  return elevation + 'м';
};

export const distanceSummary = (eventSubgroup) => {
  // если не задана дистанция и время, то показывать расчетные дистанцию и набор высоты
  const showDistanceAndElevation =
    eventSubgroup?.durationInSeconds === 0 && eventSubgroup?.distanceInMeters === 0;
  // строка отображения кругов
  const lapsStr = getLaps(eventSubgroup?.laps)
    ? `${getLapsString(getLaps(eventSubgroup?.laps))}, `
    : '';
  // строка отображения продолжительности заезда
  const duration = eventSubgroup?.durationInSeconds;
  const durationStr = getDuration(duration) ? getDuration(duration) : '';
  // строка отображения дистанции заезда
  const distanceStr = getDistance(eventSubgroup?.distanceInMeters)
    ? `${getDistance(eventSubgroup?.distanceInMeters)}`
    : '';
  // строка отображения расчетной дистанции заезда
  const distance = eventSubgroup?.distanceSummary?.distanceInKilometers;
  const distanceEstimated =
    getDistanceEstimated(distance) && showDistanceAndElevation
      ? `${getDistanceEstimated(distance)}, `
      : '';
  // строка отображения расчетного набора высоты
  const elevation = eventSubgroup?.distanceSummary?.elevationGainInMeters;
  const elevationStr =
    getElevationEstimated(elevation) && showDistanceAndElevation
      ? getElevationEstimated(elevation)
      : '';

  return `${durationStr}${distanceStr}${lapsStr}${distanceEstimated}${elevationStr}`;
};

// окончательная строка дистанции для таблицы
export const getDistanceForTd = (eventSubgroup) => {
  if (eventSubgroup?.durationInSeconds !== 0) return null;
  return (
    getDistance(eventSubgroup?.distanceInMeters) ||
    getDistanceEstimated(eventSubgroup?.distanceSummary?.distanceInKilometers)
  );
};

// окончательная строка дистанции для таблицы
export const getElevationForTd = (eventSubgroup) => {
  if (eventSubgroup?.durationInSeconds !== 0 || eventSubgroup?.distanceInMeters !== 0)
    return null;
  return getElevationEstimated(eventSubgroup?.distanceSummary?.elevationGainInMeters);
};

// формирование строки расстояния дистанции
function getDistanceString(distanceInKilometers) {
  return Math.round(distanceInKilometers * 10) / 10 + 'км';
}
