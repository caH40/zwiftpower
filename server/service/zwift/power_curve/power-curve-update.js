import { PowerCurve } from '../../../Model/PowerCurve.js';

// обновление данных мощности и удельной мощности в базе данных для райдера zwiftId
export async function savePowerCurve(zwiftId, cpBestEfforts, date) {
  try {
    const powerCurveDB = await PowerCurve.findOne({ zwiftId });
    const powerCPUpdated = [];
    const powerPerKgCPUpdated = [];
    let dateLastRace = powerCurveDB.dateLastRace;

    if (!dateLastRace || dateLastRace <= date) dateLastRace = date;

    for (const power of cpBestEfforts) {
      // поиск CP для ватт соответствующего интервала
      const cpWattCurrent = powerCurveDB.pointsWatts.find(
        (cp) => cp.duration === power.duration
      );
      // если нет данных по данному интервалу, то добавить интервал
      if (!cpWattCurrent) {
        powerCPUpdated.push({ duration: power.duration, value: power.watts, date });
        continue;
      }
      // обновлять CP если текущее значение больше или равно в БД
      if (power.watts >= cpWattCurrent.value) {
        powerCPUpdated.push({ duration: power.duration, value: power.watts, date });
      } else {
        powerCPUpdated.push(cpWattCurrent);
      }
    }

    // для удельных ватт
    for (const power of cpBestEfforts) {
      const cpWattPerKgCurrent = powerCurveDB.pointsWattsPerKg.find(
        (cp) => cp.duration === power.duration
      );
      // если нет данных по данному интервалу, то добавить интервал
      if (!cpWattPerKgCurrent) {
        powerPerKgCPUpdated.push({ duration: power.duration, value: power.wattsKg, date });
        continue;
      }
      // обновлять CP если текущее значение больше или равно в БД
      if (power.wattsKg >= cpWattPerKgCurrent.value) {
        powerPerKgCPUpdated.push({ duration: power.duration, value: power.wattsKg, date });
      } else {
        powerPerKgCPUpdated.push(cpWattPerKgCurrent);
      }
    }

    await PowerCurve.findOneAndUpdate(
      { zwiftId },
      {
        $set: {
          dateLastRace,
          pointsWatts: powerCPUpdated,
          pointsWattsPerKg: powerPerKgCPUpdated,
        },
      }
    );
  } catch (error) {
    throw error;
  }
}
