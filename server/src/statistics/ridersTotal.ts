import { PowerCurve } from '../Model/PowerCurve.js';

// types
import { TotalRidersFTP } from '../types/types.interface.js';

/**
 * Сервис получения распределения всех райдеров по удельной мощности с шагом 0.1вт/кг
 */
export const getRidersTotalService = async () => {
  const powerCurvesDB = await PowerCurve.find().lean();

  const ridersTotal = powerCurvesDB
    .map((powerCurve) => {
      // данные по интервалу 1200 секунд (20 минут)
      const pointWithDuration1200 = powerCurve.pointsWattsPerKg?.find(
        (point) => point.duration === 1200
      );

      // коэффициент для расчета FTP: CP20*0.95
      const ratioForFTP = 0.95;

      // FTP с точностью до десятых (без округления)
      const ftpWattsPerKg = pointWithDuration1200
        ? Math.trunc(pointWithDuration1200.value * 10 * ratioForFTP) / 10
        : 0;

      return {
        isMale: powerCurve.isMale,
        ftpWattsPerKg,
      };
    })
    .filter((point) => point.ftpWattsPerKg !== 0)
    .sort((a, b) => a.ftpWattsPerKg - b.ftpWattsPerKg);

  // инициализация массива для итогового результата
  const results = [] as TotalRidersFTP[];

  // текущее значение FTP на итерации
  let ftpWattsPerKg = ridersTotal[0].ftpWattsPerKg;
  // количество райдеров мужчин
  let quantityMale = 0;
  // количество райдеров женщин
  let quantityFemale = 0;

  for (let i = 0; i < ridersTotal.length; i++) {
    if (ftpWattsPerKg === ridersTotal[i].ftpWattsPerKg) {
      if (ridersTotal[i].isMale) {
        quantityMale++;
      } else {
        quantityFemale++;
      }
    } else {
      results.push({ ftp: ftpWattsPerKg, quantityMale, quantityFemale });

      // если FTP не равно текущему, то переход к подсчету количества райдеров

      // на следующий показатель FTP. Инициализация переменных для следующего FTP
      if (ridersTotal[i].isMale) {
        quantityMale = 1;
        quantityFemale = 0;
      } else {
        quantityMale = 0;
        quantityFemale = 1;
      }
      ftpWattsPerKg = ridersTotal[i].ftpWattsPerKg;
    }
  }

  // учет последнего значения FTP
  results.push({ ftp: ftpWattsPerKg, quantityMale, quantityFemale });

  return results;
};
