//types
import { PowerCurveSchema } from '../../types/model.interface.js';
import { RiderMaxWattsPerKg } from '../../types/types.interface.js';

/**
 * Поиск райдера с максимальным значением удельной мощности на интервале
 */
export const getRiderWithMaxWattsPerKgInInterval = (
  rider: RiderMaxWattsPerKg,
  powerCurve: PowerCurveSchema,
  interval: number
) => {
  const pointsWattsPerKg = powerCurve.pointsWattsPerKg.find((elm) => elm.duration === interval);

  if (!pointsWattsPerKg) {
    return;
  }

  if (pointsWattsPerKg.value > rider.wattsPerKg) {
    rider.interval = interval;
    rider.zwiftId = powerCurve.zwiftId;
    rider.wattsPerKg = pointsWattsPerKg.value;
    rider.date = pointsWattsPerKg.date;
    rider.name = pointsWattsPerKg.name;
  }

  return rider;
};
