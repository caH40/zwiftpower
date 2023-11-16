import { PowerCurve } from '../../Model/PowerCurve.js';
import { createFitFiles } from '../zwift/fitfiles/fitfiles.js';
import { updatePowerCurve } from '../zwift/power_curve/power-curve-update.js';
import { errorHandler } from '../../errors/error.js';

// types
import { PowerCurveSchema } from '../../types/model.interface.js';

/**
 * Создание/обновления (FitFiles) фитфалов активностей райдера и
 * обновление кривой мощности за последние 90 дней
 */
export async function updateAllPowerCurve() {
  try {
    const powerCurvesDB: PowerCurveSchema[] = await PowerCurve.find();
    for (const powerCurve of powerCurvesDB) {
      await createFitFiles(powerCurve.zwiftId);
    }
    for (const powerCurve of powerCurvesDB) {
      await updatePowerCurve(powerCurve.zwiftId);
    }
    console.log(new Date().toLocaleString(), 'Обновление fitFiles and powerCurve'); // eslint-disable-line
  } catch (error) {
    errorHandler(error);
  }
}
