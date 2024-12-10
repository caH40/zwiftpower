import { PowerCurve } from '../../Model/PowerCurve.js';
import { createFitFiles } from '../zwift/fitfiles/fitfiles.js';
import { updatePowerCurve } from '../zwift/power_curve/power-curve-update.js';
import { handleAndLogError } from '../../errors/error.js';

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
    handleAndLogError(error);
  }
}

/**
 * Добавление фитфайлов и данных из новых активностей райдера и обновление кривой мощности.
 */
export async function updateFitFileAndPowerCurve({
  zwiftId,
}: {
  zwiftId: number;
}): Promise<void> {
  try {
    // Добавление фитфайлов и данных из новых активностей.
    await createFitFiles(zwiftId);

    // Создание новой кривой мощности для обновленных активностей.
    await updatePowerCurve(zwiftId);
  } catch (error) {
    handleAndLogError(error);
  }
}
