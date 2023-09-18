import { PowerCurve } from '../../Model/PowerCurve.js';
import { createFitFiles } from '../zwift/fitfiles/fitfiles.js';
import { updatePowerCurve } from '../zwift/power_curve/power-curve-update.js';

// types
import { PowerCurveSchema } from '../../types/model.interface.js';

export async function updateAllPowerCurve() {
  try {
    const powerCurvesDB: PowerCurveSchema[] = await PowerCurve.find();
    for (const powerCurve of powerCurvesDB) {
      await createFitFiles(powerCurve.zwiftId);
    }
    for (const powerCurve of powerCurvesDB) {
      await updatePowerCurve(powerCurve.zwiftId);
    }
    console.log(new Date().toLocaleString(), 'Обновление fitFiles and powerCurve');
  } catch (error) {
    console.log(error);
  }
}
