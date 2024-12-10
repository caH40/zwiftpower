import { routes } from '../assets/zwift/lib/cjs/routes.js';
import { handleAndLogError } from '../errors/error.js';
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

    // расчет дистанции с учетом выезда из гейта
    if ((route.leadInDistance || route.leadInDistance === 0) && route.distance) {
      distanceInKilometers =
        +route.leadInDistance + Math.round(eventSubgroup.laps * +route.distance * 1000) / 1000;
    }

    // расчет набора высоты на дистанции с учетом выезда из гейта
    if ((route.leadInElevation || route.leadInElevation === 0) && route.elevation) {
      elevationGainInMeters =
        +route.leadInElevation +
        Math.round(eventSubgroup.laps * +route.elevation * 1000) / 1000;
    }

    return { distanceInKilometers, elevationGainInMeters };
  } catch (error) {
    handleAndLogError(error);
    return { distanceInKilometers: null, elevationGainInMeters: null };
  }
}
