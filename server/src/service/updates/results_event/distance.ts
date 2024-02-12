import { FitDataFromZwift, ResultEventAdditional } from '../../../types/types.interface.js';
// import { secondesToTime } from '../../../utils/date-convert.js';

/**
 * Расчет и добавление дистанции, пройденной райдерами с рулилками, в результаты Эвента
 */
export const addDistanceWithSteering = async (
  results: ResultEventAdditional[],
  fitFilesData: FitDataFromZwift[]
) => {
  for (const result of results) {
    // обрезка заезда после завершения гонки
    const distanceInCm = fitFilesData.find(
      (fitFile) => fitFile.zwiftId === result.profileId
    )?.distanceInCm;

    // нет данных если аккаунт закрытый или райдер не закончил активность
    // при текущем запросе продолжает двигаться в Звифте
    if (!distanceInCm) {
      continue;
    }

    // время из "кармана" до стартовой линии от которой идет отсчет дистанции.
    // время дистанции начинается из загона
    const timeToStart = 20;
    const durationInSeconds = result.activityData.durationInMilliseconds / 1000;

    // элемент массива, соответствующий количеству секунд за которую преодолена дистанция,
    // равен пройденной дистанции
    const distanceEstimated = Math.round(
      distanceInCm[Math.trunc(durationInSeconds) - timeToStart] / 100
    );

    const distance = result.activityData.segmentDistanceInMeters;
    const difference = distanceEstimated - distance;
    return difference > 0 ? `+${difference}` : difference;
    // console.log({
    //   name: result.profileData.lastName,
    //   distanceEstimated,
    //   distance,
    //   over: distanceEstimated - distance,
    //   timeSeconds: result.activityData.durationInMilliseconds,
    //   time: secondesToTime(result.activityData.durationInMilliseconds),
    // });
  }
};
