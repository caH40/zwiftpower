// types
import { PowerCurveSchema } from '../../../../types/model.interface.js';

/**
 * Поиск данных не старше 90 дней
 */
export const filter90Days = (powerCurveDB: PowerCurveSchema) => {
  const millisecondsIn90Days = 90 * 24 * 60 * 60 * 1000;
  // брать из БД CP которые не старше 90 дней
  const pointsWattsFiltered = powerCurveDB.pointsWatts.filter(
    (cp) => Date.now() - millisecondsIn90Days < new Date(cp.date).getTime()
  );
  const pointsWattsPerKgFiltered = powerCurveDB.pointsWattsPerKg.filter(
    (cp) => Date.now() - millisecondsIn90Days < new Date(cp.date).getTime()
  );

  return { pointsWattsFiltered, pointsWattsPerKgFiltered };
};
