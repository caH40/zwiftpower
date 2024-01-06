import { errorHandler } from '../../../errors/error.js';
import { getNormalizedPower } from '../../power/normalized.js';
import { sliceExcess } from './criticalpower/slice-excess.js';

// types
import { FitFile } from '../../../Model/FitFile.js';
import { ResultEventAdditional } from '../../../types/types.interface.js';

/**
 * Добавление NP (мутация) нормализованной мощности в результаты при обновлении результатов Эвента
 * Необходимо что бы fitFile(ы) данного эвента для каждого райдера уже были в БД
 */
export const addNormalizedPowers = async (results: ResultEventAdditional[]) => {
  try {
    for (const result of results) {
      // получение соответствующего FitFile для result
      const fitFilesDB = await FitFile.findOne({
        zwiftId: result.profileId,
        'activities.eventId': result.eventId,
      }).lean();

      if (!fitFilesDB) {
        continue;
      }

      const powerInWattsStr = fitFilesDB.activities.find(
        (activity) => activity.eventId === result.eventId
      )!.powerInWatts;

      const powerInWatts = JSON.parse(powerInWattsStr);

      // обрезка заезда после завершения гонки
      const powerInWattsCorrect = sliceExcess(
        powerInWatts,
        result.activityData.durationInMilliseconds
      );

      const normalizedPower = getNormalizedPower(powerInWattsCorrect);

      result.normalizedPower = normalizedPower;
    }
  } catch (error) {
    errorHandler(error);
  }
};
