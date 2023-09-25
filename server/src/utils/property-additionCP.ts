import { intervals } from '../service/power/intervals-cp.js';

// types
import { PowerCurveSchema } from '../types/model.interface.js';
import { CpBestEffortsAdditional } from '../types/types.interface.js';

/**
 * изменение свойства cpBestEfforts
 */
export const addPropertyAdditionCP = (
  powerCurve: PowerCurveSchema
): CpBestEffortsAdditional[] =>
  intervals.map((interval) => {
    const wattsValue =
      powerCurve.pointsWatts.find((elm) => elm.duration === interval)?.value || 0;
    const wattsKgValue =
      powerCurve.pointsWattsPerKg.find((elm) => elm.duration === interval)?.value || 0;

    return {
      watts: { value: wattsValue, addition: String(wattsValue) },
      wattsKg: { value: wattsKgValue, addition: String(wattsKgValue) },
      cpLabel: interval < 60 ? `${interval} sec` : `${interval / 60} min`,
      duration: interval,
    };
  });
