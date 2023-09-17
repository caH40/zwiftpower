import { PowerCurve } from '../../Model/PowerCurve.js';
import { PowerCurveSchema } from '../../types/model.interface.js';
import { createFitFiles } from '../zwift/fitfiles/fitfiles.js';

// types
import { updatePowerCurve } from '../zwift/power_curve/power-curve-update.js';

export async function updateAllPowerCurve() {
  try {
    const powerCurvesDB: PowerCurveSchema[] = await PowerCurve.find();
    for (const powerCurve of powerCurvesDB) {
      await createFitFiles(powerCurve.zwiftId);
    }
    for (const powerCurve of powerCurvesDB) {
      await updatePowerCurve(powerCurve.zwiftId);
    }
  } catch (error) {
    console.log(error);
  }
}
