//types
import { PowerCurveSchema } from '../../types/model.interface.js';
import { RiderMaxWatt } from '../../types/types.interface.js';

/**
 * Поиск райдера с максимальным значением мощности на интервале
 */
export const getRiderWithMaxPowerInInterval = (
  rider: RiderMaxWatt,
  powerCurve: PowerCurveSchema,
  interval: number
) => {
  const pointWatts = powerCurve.pointsWatts.find((elm) => elm.duration === interval);

  if (!pointWatts) {
    return;
  }

  if (pointWatts.value > rider.watts) {
    rider.interval = interval;
    rider.zwiftId = powerCurve.zwiftId;
    rider.watts = pointWatts.value;
    rider.date = pointWatts.date;
    rider.name = pointWatts.name;
  }

  return rider;
};
