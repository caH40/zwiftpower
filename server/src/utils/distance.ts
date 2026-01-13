import { routes } from '../assets/zwift/lib/cjs/routes.js';
import { handleAndLogError } from '../errors/error.js';

/**
 * Расчет общей дистанции и набора высоты согласно маршрута и количества кругов
 */
export function countDistance<T extends { routeId: number; laps: number }>(eventSubgroup: T) {
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

// Предполагаемая средняя скорость райдера в км/ч.
// Используется только для ориентировочного расчёта при заданном времени
const AVERAGE_SPEED_KMH = 30;

/**
 * Дистанция в подгруппе заезда на выбранном маршруте.
 * Может быть задана ТОЛЬКО ОДНА из трёх сущностей: круги, время или дистанция.
 *
 * 1. Проверка задана ли дистанция в метрах, если да - возврат этих данных.
 * 2. Проверка задано ли время, если да - расчёт дистанции по средней скорости.
 * 3. Значит заданы круги, расчёт дистанции по маршруту.
 *
 * @returns number // дистанция в метрах
 */
export function getRouteDistanceInMeters({
  routeId,
  durationInSeconds,
  distanceInMeters,
  laps = 0,
}: {
  routeId: number;
  durationInSeconds?: number;
  distanceInMeters?: number;
  laps?: number;
}): number {
  const metersInKilometer = 1000;

  // 1. Если задана дистанция - возвращаем её
  if (distanceInMeters != null && distanceInMeters !== 0) {
    return distanceInMeters;
  }

  // 2. Если задано время - рассчитываем примерную дистанцию
  if (durationInSeconds != null && durationInSeconds != 0) {
    const durationInHours = durationInSeconds / 3600;
    // Округляем до целых метров для порядка величин
    return Math.round(AVERAGE_SPEED_KMH * durationInHours * metersInKilometer);
  }

  // 3. Значит заданы круги - рассчитываем точную дистанцию маршрута
  const result = countDistance({ routeId, laps });

  // Проверяем, что результат есть и дистанция не null
  if (!result || result.distanceInKilometers === null) {
    // Если маршрут не найден - возвращаем 0
    // Можно добавить логирование при необходимости
    return 0;
  }

  // Округляем до целых метров
  return Math.round(result.distanceInKilometers * metersInKilometer);
}

export function getShortestDistanceInMetersInEvent<
  T extends {
    routeId: number;
    durationInSeconds?: number;
    distanceInMeters?: number;
    laps?: number;
  }
>(subgroups: T[]): number {
  let shortestDistance: number | null = null;

  for (const subgroup of subgroups) {
    const calculatedDistance = getRouteDistanceInMeters({
      routeId: subgroup.routeId,
      durationInSeconds: subgroup.durationInSeconds,
      distanceInMeters: subgroup.distanceInMeters,
      laps: subgroup.laps,
    });

    // Игнорируем 0 и отрицательные значения
    if (calculatedDistance <= 0) {
      continue;
    }

    // Если это первое валидное значение или оно меньше текущего минимального
    if (shortestDistance === null || calculatedDistance < shortestDistance) {
      shortestDistance = calculatedDistance;
    }
  }

  // Возвращаем 0, если ни одной валидной дистанции не найдено
  return shortestDistance ?? 0;
}
