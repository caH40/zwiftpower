import { handleAndLogError } from '../../errors/error.js';
import { NSeriesModel } from '../../Model/NSeries.js';

/**
 * Проверка на завершение серии и установка соответствующего флага.
 */
export async function closeExpiredSeries() {
  try {
    const now = new Date();
    await NSeriesModel.updateMany(
      { isFinished: false, dateEnd: { $lt: now } },
      { $set: { isFinished: true } }
    );
  } catch (error) {
    handleAndLogError(error);
  }
}
