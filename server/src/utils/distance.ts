import { routes } from '../assets/zwift/raw/routes.js';
import { errorHandler } from '../errors/error.js';
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
    if (
      (route.leadinDistanceInMeters || route.leadinDistanceInMeters === 0) &&
      route.distanceInMeters
    ) {
      distanceInKilometers =
        Math.round(
          (+route.leadinDistanceInMeters + eventSubgroup.laps * +route.distanceInMeters) / 100
        ) / 10;
    }

    // расчет набора высоты на дистанции с учетом выезда из гейта
    if (
      (route.leadinAscentInMeters || route.leadinAscentInMeters === 0) &&
      route.ascentInMeters
    ) {
      elevationGainInMeters = Math.round(
        +route.leadinAscentInMeters + eventSubgroup.laps * +route.ascentInMeters
      );
    }

    return { distanceInKilometers, elevationGainInMeters };
  } catch (error) {
    errorHandler(error);
    return { distanceInKilometers: null, elevationGainInMeters: null };
  }
}
