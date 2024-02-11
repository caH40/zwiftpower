import { optionsEventType } from '../assets/select/event-edit';
import { routes } from '../assets/zwift/lib/esm/routes';
import { worlds } from '../assets/zwift/lib/esm/worlds';

import { secondesToMinutes, secondesToTime } from './date-convert';
import { getLapsString } from './declination';
import { checkSeconds } from './seconds';

export const map = (id) => {
  return worlds.find((map) => map.id === id)?.name;
};

/**
 * Получение типа Эвента (Race, Ride ...)
 * @param {string} eventType свойство eventType из настроек Эвента
 * @returns {string}
 */
export const getEventType = (eventType) => {
  const typeForTitle = optionsEventType.find((elm) => elm.name === eventType)?.title;
  if (!typeForTitle) {
    return '';
  }
  return typeForTitle;
};

/**
 * Название маршрута по ID
 */
export const routeName = (id) => {
  return routes.find((route) => route.id === id)?.name;
};
/**
 * Линки на описание маршрутов на сторонних маршрутах
 */
export const getLinksRouteDescription = (routeId) => {
  const route = routes.find((route) => route.id === routeId);
  if (!route) {
    return null;
  }

  const linkWhatsonzwift = route.whatsOnZwiftUrl;
  const linkZwiftinsider = route.zwiftInsiderUrl;
  const linkZwifterbikes = route.zwifterBikesUrl;
  const linkStravaSegment = route.stravaSegmentUrl;
  return { linkZwifterbikes, linkZwiftinsider, linkWhatsonzwift, linkStravaSegment };
};

/**
 * Получение объекта Гэпов на старте между началом Эвента и стартом соответствующей группы
 */
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

/**
 * Расчет Гэпа на старте между началом Эвента (dateStart) и стартом группы (dateStartGroup)
 */
const gap = (dateStart, dateStartGroup) => {
  const gapMilliseconds = new Date(dateStartGroup).getTime() - new Date(dateStart).getTime();
  return checkSeconds(dateStartGroup)
    ? secondesToTime(gapMilliseconds, true)
    : secondesToMinutes(gapMilliseconds);
};

export const replaceWithBr = (text = '') => text.replace(/\n/g, '<br />');

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

export const distanceObject = (eventSubgroup) => {
  // если не задана дистанция и время, то показывать расчетные дистанцию и набор высоты
  const showDistanceAndElevation =
    eventSubgroup?.durationInSeconds === 0 && eventSubgroup?.distanceInMeters === 0;
  // строка отображения кругов
  const lapsStr = getLaps(eventSubgroup?.laps)
    ? `${getLapsString(getLaps(eventSubgroup?.laps))}`
    : '';
  // строка отображения кругов
  const laps = getLaps(eventSubgroup?.laps) ? getLaps(eventSubgroup?.laps) : '';
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
      ? `${getDistanceEstimated(distance)}`
      : '';
  // строка отображения расчетного набора высоты
  const elevation = eventSubgroup?.distanceSummary?.elevationGainInMeters;
  const elevationStr =
    getElevationEstimated(elevation) && showDistanceAndElevation
      ? getElevationEstimated(elevation)
      : '';

  return { durationStr, distanceStr, lapsStr, laps, distanceEstimated, elevationStr };
};

// формирование строки расстояния дистанции
function getDistanceString(distanceInKilometers) {
  return Math.round(distanceInKilometers * 10) / 10 + 'км';
}
