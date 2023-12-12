import { PowerCurve } from '../../../Model/PowerCurve.js';
import { categoryFemale as female, categoryMale as male } from '../../../assets/category.js';
import { errorHandler } from '../../../errors/error.js';

/**
 * Определение категории по ftp=CP20*0*95 и старым zwiftpwer правилам
 */
export async function getCategory(zwiftId: string) {
  try {
    const powerCurveDB = await PowerCurve.findOne({ zwiftId }).lean();

    if (!powerCurveDB) {
      throw new Error('Ошибка при получении Power Curve');
    }

    // поиск CP20
    const cpWattsPerKg = powerCurveDB.pointsWattsPerKg.find((cp) => cp.duration === 1200);
    const cpWatts = powerCurveDB.pointsWatts.find((cp) => cp.duration === 1200);

    // ftp рассчитывается как 95% от результата за 20 минут
    const ftpWattsPerKg = cpWattsPerKg ? Math.trunc(cpWattsPerKg.value * 95) / 100 : null;
    const ftpWatts = cpWatts ? Math.trunc(cpWatts.value * 95) / 100 : null;

    if (!ftpWattsPerKg || !ftpWatts) {
      throw new Error('Нет данных по мощности или по удельной мощности');
    }

    if (powerCurveDB.isMale) {
      if (ftpWattsPerKg >= male.APlus.ftpWattsPerKg && ftpWatts >= male.APlus.ftpWatts) {
        return 'APlus';
      } else if (ftpWattsPerKg >= male.A.ftpWattsPerKg && ftpWatts >= male.A.ftpWatts) {
        return 'A';
      } else if (ftpWattsPerKg >= male.B.ftpWattsPerKg && ftpWatts >= male.B.ftpWatts) {
        return 'B';
      } else if (ftpWattsPerKg >= male.C.ftpWattsPerKg && ftpWatts >= male.C.ftpWatts) {
        return 'C';
      } else {
        return 'D';
      }
    }

    // определение категории для женщин
    if (female.A.ftpWattsPerKg >= ftpWattsPerKg) {
      return 'A';
    } else if (female.B.ftpWattsPerKg >= ftpWattsPerKg) {
      return 'B';
    } else {
      return 'C';
    }
  } catch (error) {
    errorHandler(error);
    return 'E';
  }
}
