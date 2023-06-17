import { PowerCurve } from '../../Model/PowerCurve.js';
import { createFitFiles } from '../zwift/fitfiles/fitfiles.js';
import { updatePowerCurve } from '../zwift/power_curve/power-curve.js';

export async function updateAllPowerCurve() {
  try {
    const powerCurvesDB = await PowerCurve.find();
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
