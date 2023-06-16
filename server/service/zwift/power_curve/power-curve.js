import { FitFile } from '../../../Model/FitFile.js';
import { intervals } from './intervals-cp.js';
import { savePowerCurve } from './power-curve-update.js';
import { getIntervals } from './powerintervals.js';

export async function updatePowerCurve(zwiftId) {
  try {
    const fitFileDB = await FitFile.findOne({ zwiftId });
    if (!fitFileDB) return console.log(`Не найден fitfile для ${zwiftId}`);

    for (const activity of fitFileDB.activities) {
      const powerInWatts = JSON.parse(activity.powerInWatts);

      const cpBestEfforts = getIntervals(
        powerInWatts,
        activity.weightInGrams / 1000,
        intervals
      );

      await savePowerCurve(zwiftId, cpBestEfforts, activity.date, activity.name);
    }
  } catch (error) {
    console.log(error);
  }
}
