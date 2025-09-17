import { routes } from '../assets/zwift/lib/cjs/routes.js';
import { worlds } from '../assets/zwift/lib/cjs/worlds.js';

/**
 * Название карты (мир) по ID
 */
export const getMapName = (id: number) => {
  return worlds.find((map) => map.id === id)?.name;
};
/**
 * Название маршрута по ID
 */
export const getRouteName = (id: number) => {
  return routes.find((route) => route.id === id)?.name;
};
