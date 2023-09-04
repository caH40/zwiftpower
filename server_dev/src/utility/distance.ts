import { routes } from '../asset/zwift/lib/esm/routes.js';
import { ZwiftEventSubgroupSchema } from '../types/model.interface.js';

/**
 * Расчет общей дистанции и набора высоты согласно маршрута и количества кругов
 */
export function countDistance(eventSubgroup: ZwiftEventSubgroupSchema) {
  try {
    const route = routes.find((route) => route.id === eventSubgroup.routeId);
    if (!route) {
      return { distanceInKilometers: null, elevationGainInMeters: null };
    }

    let distanceInKilometers: number = 0;
    let elevationGainInMeters: number = 0;

    if (route.leadInDistance && route.distance) {
      distanceInKilometers =
        +route.leadInDistance + Math.round(eventSubgroup.laps * +route.distance * 1000) / 1000;
    }
    if (route.leadInElevation && route.elevation) {
      elevationGainInMeters =
        +route.leadInElevation +
        Math.round(eventSubgroup.laps * +route.elevation * 1000) / 1000;
    }

    return { distanceInKilometers, elevationGainInMeters };
  } catch (error) {
    console.log(error);
    return { distanceInKilometers: null, elevationGainInMeters: null };
  }
}
