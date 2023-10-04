//types
import { PowerCurveSchema } from '../../types/model.interface.js';
import { RiderMaxWattsPerKg } from '../../types/types.interface.js';

/**
 * Поиск райдера с максимальным значением удельной мощности на интервале
 */
export const getRiderWithMaxWattsPerKgInInterval = (
  powerCurveDB: PowerCurveSchema[],
  interval: number
) => {
  const powerCurveDBCurrentInterval = powerCurveDB.map((elm) => ({
    zwiftId: elm.zwiftId,
    pointsWatts: elm.pointsWattsPerKg.find((power) => power.duration === interval),
  }));

  powerCurveDBCurrentInterval.sort(
    (a, b) => (b.pointsWatts?.value || 0) - (a.pointsWatts?.value || 0)
  );

  // количество мест (лучших результатов) для поиска
  const places = 3;

  const wattsPerKgInInterval = [];
  for (let i = 0; i < places; i++) {
    const riderMaxWattsPerKgt: RiderMaxWattsPerKg = {
      id: 0,
      zwiftId: 0,
      interval: 0,
      wattsPerKg: 0,
      eventStart: 0,
      eventName: '',
    };

    riderMaxWattsPerKgt.zwiftId = powerCurveDBCurrentInterval[i].zwiftId;
    riderMaxWattsPerKgt.interval = interval;
    riderMaxWattsPerKgt.wattsPerKg = powerCurveDBCurrentInterval[i].pointsWatts?.value || 0;
    riderMaxWattsPerKgt.eventStart = powerCurveDBCurrentInterval[i].pointsWatts?.date || 0;
    riderMaxWattsPerKgt.eventName = powerCurveDBCurrentInterval[i].pointsWatts?.name || '';
    wattsPerKgInInterval.push(riderMaxWattsPerKgt);
  }
  return wattsPerKgInInterval;
};
