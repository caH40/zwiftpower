import { PowerCurve } from '../../Model/PowerCurve.js';
import { createFitFiles } from '../zwift/fitfiles/fitfiles.js';
import { updatePowerCurve } from '../zwift/power_curve/power-curve-update.js';
import { errorHandler } from '../../errors/error.js';

/**
 * Создание/обновления (FitFiles) фитфалов активностей райдера и
 * обновление кривой мощности за последние 90 дней
 */
export async function updateAllPowerCurve() {
  try {
    const powerCurvesDB = await PowerCurve.find({}, { zwiftId: true, _id: false }).lean<
      { zwiftId: number }[]
    >();

    for (const { zwiftId } of powerCurvesDB) {
      await createFitFiles(zwiftId);
    }
    for (const { zwiftId } of powerCurvesDB) {
      await updatePowerCurve(zwiftId);
    }
    console.log(new Date().toLocaleString(), 'Обновление fitFiles and powerCurve'); // eslint-disable-line
  } catch (error) {
    errorHandler(error);
  }
}
