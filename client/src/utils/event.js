import { worlds } from '../asset/zwift/lib/esm/worlds';
import { routes } from '../asset/zwift/lib/esm/routes';

import { secondesToMinutes } from './date-convert';

export const map = (id) => {
  return worlds.find((map) => map.id === id)?.name;
};
export const route = (id) => {
  return routes.find((route) => route.id === id)?.name;
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
