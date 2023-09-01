import { FitFile } from '../../../Model/FitFile.js';
import { PowerCurve } from '../../../Model/PowerCurve.js';
import { intervals } from './intervals-cp.js';
import { getIntervals } from './powerintervals.js';

export async function updatePowerCurve(zwiftId) {
  try {
    const fitFileDB = await FitFile.findOne({ zwiftId });
    if (!fitFileDB) return console.log(`Не найден fitfile для ${zwiftId}`);

    // кривая мощности из БД
    const powerCurveDB = await PowerCurve.findOne({ zwiftId });
    const millisecondsIn90Days = 90 * 24 * 60 * 60 * 1000;
    // брать из БД CP которые не старше 90 дней
    const pointsWattsFiltered = powerCurveDB.pointsWatts.filter(
      (cp) => Date.now() - millisecondsIn90Days < new Date(cp.date).getTime()
    );
    const pointsWattsPerKgFiltered = powerCurveDB.pointsWattsPerKg.filter(
      (cp) => Date.now() - millisecondsIn90Days < new Date(cp.date).getTime()
    );

    const cpWattsUpdated = [];
    const cpWattsPerKgUpdated = [];

    // для каждого временного интервала поиск максимального значения мощности и удельной мощности
    for (const interval of intervals) {
      // объект по мощности
      let cpWattsCurrent = pointsWattsFiltered.find((cp) => cp.duration === interval);
      if (!cpWattsCurrent)
        cpWattsCurrent = { duration: interval, value: 0, date: Date.now(), name: '' };

      // объект по удельной мощности
      let cpWattsPerKgCurrent = pointsWattsPerKgFiltered.find((cp) => cp.duration === interval);
      if (!cpWattsPerKgCurrent)
        cpWattsPerKgCurrent = { duration: interval, value: 0, date: Date.now(), name: '' };

      for (const activity of fitFileDB.activities) {
        const powerInWatts = JSON.parse(activity.powerInWatts);
        // поиск интервалов в "сырых данных" заезда
        const cpBestEfforts = getIntervals(powerInWatts, activity.weightInGrams / 1000, [
          interval,
        ]);

        if (cpBestEfforts[0].watts >= cpWattsCurrent.value)
          cpWattsCurrent = {
            duration: interval,
            value: cpBestEfforts[0].watts,
            date: activity.date,
            name: activity.name,
          };

        if (cpBestEfforts[0].wattsKg >= cpWattsPerKgCurrent.value)
          cpWattsPerKgCurrent = {
            duration: interval,
            value: cpBestEfforts[0].wattsKg,
            date: activity.date,
            name: activity.name,
          };
      }
      cpWattsUpdated.push(cpWattsCurrent);
      cpWattsPerKgUpdated.push(cpWattsPerKgCurrent);
    }

    await PowerCurve.findOneAndUpdate(
      { zwiftId },
      {
        $set: {
          date: Date.now(),
          pointsWatts: cpWattsUpdated,
          pointsWattsPerKg: cpWattsPerKgUpdated,
        },
      }
    );
  } catch (error) {
    console.log(error);
  }
}
