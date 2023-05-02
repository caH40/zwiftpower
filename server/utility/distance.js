import { routes } from '../asset/zwift/lib/esm/routes.js';

// расчет общей дистанции и набора высоты согласно маршрута и количества кругов
export function countDistance(eventSubgroup) {
  try {
    const route = routes.find((route) => route.id === eventSubgroup.routeId);
    if (!route) {
      return { distanceInKilometers: null, elevationGainInMeters: null };
    }

    const distanceInKilometers = route.leadInDistance + eventSubgroup.laps * route.distance;
    const elevationGainInMeters = route.leadInElevation + eventSubgroup.laps * route.elevation;

    return { distanceInKilometers, elevationGainInMeters };
  } catch (error) {
    throw error;
  }
}
