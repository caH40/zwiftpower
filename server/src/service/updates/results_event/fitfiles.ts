import { FitDataFromZwift, ResultEventAdditional } from '../../../types/types.interface.js';
import { getFullDataUrl } from '../../zwift/activity.js';
import { getFitFileFromZwift } from '../../zwift/fitfile.js';

/**
 * Получение фитфайлов участников заезда
 * Возвращаются данные powerInWatts, distanceInCm запись ведется с периодичностью в секунду
 */
export const getFitFilesData = async (
  results: ResultEventAdditional[]
): Promise<FitDataFromZwift[]> => {
  const fitFilesData = [] as FitDataFromZwift[];
  for (const result of results) {
    // получение данных fit файла активности (заезда) райдера
    const fullDataUrl = await getFullDataUrl(result.activityData.activityId);

    if (!fullDataUrl) {
      continue;
    }

    const fitFile = await getFitFileFromZwift(fullDataUrl);

    if (!fitFile) {
      continue;
    }

    fitFilesData.push({
      zwiftId: result.profileId,
      powerInWatts: fitFile.powerInWatts,
      distanceInCm: fitFile.distanceInCm,
    });
  }

  return fitFilesData;
};
