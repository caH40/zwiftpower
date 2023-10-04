//types
import { PowerCurveSchema } from '../../types/model.interface.js';
import { RiderMaxWatt } from '../../types/types.interface.js';

/**
 * Поиск райдера с максимальным значением мощности на интервале
 */
export const getRiderWithMaxPowerInInterval = (
  powerCurveDB: PowerCurveSchema[],
  interval: number
) => {
  const powerCurveDBCurrentInterval = powerCurveDB.map((elm) => ({
    zwiftId: elm.zwiftId,
    pointsWatts: elm.pointsWatts.find((power) => power.duration === interval),
  }));

  powerCurveDBCurrentInterval.sort(
    (a, b) => (b.pointsWatts?.value || 0) - (a.pointsWatts?.value || 0)
  );

  // количество мест (лучших результатов) для поиска
  const places = 3;

  const wattsInInterval = [];
  for (let i = 0; i < places; i++) {
    const riderMaxWatt: RiderMaxWatt = {
      id: 0,
      zwiftId: 0,
      interval: 0,
      watts: 0,
      eventStart: 0,
      eventName: '',
    };

    riderMaxWatt.zwiftId = powerCurveDBCurrentInterval[i].zwiftId;
    riderMaxWatt.interval = interval;
    riderMaxWatt.watts = powerCurveDBCurrentInterval[i].pointsWatts?.value || 0;
    riderMaxWatt.eventStart = powerCurveDBCurrentInterval[i].pointsWatts?.date || 0;
    riderMaxWatt.eventName = powerCurveDBCurrentInterval[i].pointsWatts?.name || '';
    wattsInInterval.push(riderMaxWatt);
  }
  return wattsInInterval;
};
