import { worlds } from '../asset/zwift/lib/esm/worlds';
import { routes } from '../asset/zwift/lib/esm/routes';
import { raceTypes } from '../asset/zwift/race-type';
import { organizers } from '../asset/zwift/organizer';

import { secondesToMinutes } from './date-convert';

export const map = (id) => {
  return worlds.find((map) => map.id === id)?.name;
};
export const route = (id) => {
  return routes.find((route) => route.id === id)?.name;
};
export const raceType = (value) => {
  return raceTypes.find((race) => race.value === value)?.name;
};
export const organizer = (value) => {
  return organizers.find((organizer) => organizer.value === value)?.name;
};
export const gapStart = (eventParams) => {
  if (!eventParams.id) return {};
  const gaps = {};
  for (const eventSubgroup of eventParams.eventSubgroups) {
    gaps[eventSubgroup.subgroupLabel] = gap(
      eventParams.eventStart,
      eventSubgroup.eventSubgroupStart
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
