import { millisecondsIn90Days } from '../../../../assets/date.js';

// types
import { PowerCurveSchema } from '../../../../types/model.interface.js';

/**
 * Удаление данных которые старше 90 дней
 */
export const filter90Days = (powerCurveDB: PowerCurveSchema) => {
  // брать из БД CP которые не старше 90 дней
  const pointsWattsFiltered = powerCurveDB.pointsWatts.filter(
    (cp) => Date.now() - millisecondsIn90Days < new Date(cp.date).getTime()
  );
  const pointsWattsPerKgFiltered = powerCurveDB.pointsWattsPerKg.filter(
    (cp) => Date.now() - millisecondsIn90Days < new Date(cp.date).getTime()
  );

  return { pointsWattsFiltered, pointsWattsPerKgFiltered };
};
