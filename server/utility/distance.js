import { routes } from '../asset/zwift/lib/esm/routes.js';

// расчет общей дистанции и набора высоты согласно маршрута и количества кругов
export function countDistance(eventSubgroup) {
  try {
    const route = routes.find((route) => route.id === eventSubgroup.routeId);
    if (!route) {
      return { distanceInKilometers: null, elevationGainInMeters: null };
    }

    const distanceInKilometers =
      route.leadInDistance + Math.round(eventSubgroup.laps * route.distance * 1000) / 1000;
    const elevationGainInMeters =
      route.leadInElevation + Math.round(eventSubgroup.laps * route.elevation * 1000) / 1000;

    return { distanceInKilometers, elevationGainInMeters };
  } catch (error) {
    throw error;
  }
}
