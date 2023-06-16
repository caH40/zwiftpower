import { PowerCurve } from '../../../Model/PowerCurve.js';

// обновление данных мощности и удельной мощности в базе данных для райдера zwiftId
export async function savePowerCurve(zwiftId, cpBestEfforts, date, name) {
  try {
    const powerCurveDB = await PowerCurve.findOne({ zwiftId });

    const millisecondsIn90Days = 90 * 24 * 60 * 60 * 1000;

    // брать из БД CP которые не старше 90 дней
    const pointsWattsFiltered = powerCurveDB.pointsWatts.filter(
      (cp) => Date.now() - millisecondsIn90Days < new Date(cp.date).getTime()
    );
    const powerCPUpdated = [];

    for (const power of cpBestEfforts) {
      // поиск CP для ватт соответствующего интервала
      const cpWattCurrent = pointsWattsFiltered.find((cp) => cp.duration === power.duration);
      // если нет данных по данному интервалу, то добавить интервал
      if (!cpWattCurrent) {
        powerCPUpdated.push({ duration: power.duration, value: power.watts, date, name });
        continue;
      }
      // обновлять CP если текущее значение больше или равно в БД
      if (power.watts >= cpWattCurrent.value) {
        powerCPUpdated.push({ duration: power.duration, value: power.watts, date, name });
      } else {
        powerCPUpdated.push(cpWattCurrent);
      }
    }

    // для удельных ватт
    const powerPerKgCPUpdated = [];
    const pointsWattsPerKgFiltered = powerCurveDB.pointsWattsPerKg.filter(
      (cp) => Date.now() - millisecondsIn90Days < new Date(cp.date).getTime()
    );

    for (const power of cpBestEfforts) {
      const cpWattPerKgCurrent = pointsWattsPerKgFiltered.find(
        (cp) => cp.duration === power.duration
      );
      // если нет данных по данному интервалу, то добавить интервал
      if (!cpWattPerKgCurrent) {
        powerPerKgCPUpdated.push({
          duration: power.duration,
          value: power.wattsKg,
          date,
          name,
        });
        continue;
      }
      // обновлять CP если текущее значение больше или равно в БД
      if (power.wattsKg >= cpWattPerKgCurrent.value) {
        powerPerKgCPUpdated.push({
          duration: power.duration,
          value: power.wattsKg,
          date,
          name,
        });
      } else {
        powerPerKgCPUpdated.push(cpWattPerKgCurrent);
      }
    }

    await PowerCurve.findOneAndUpdate(
      { zwiftId },
      {
        $set: {
          date: Date.now(),
          pointsWatts: powerCPUpdated,
          pointsWattsPerKg: powerPerKgCPUpdated,
        },
      }
    );
  } catch (error) {
    throw error;
  }
}
