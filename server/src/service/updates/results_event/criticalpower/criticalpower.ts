import { getCPFromResult } from '../../../power/empty-cp.js';
import { getIntervals } from '../../../power/powerintervals.js';
import { getFullDataUrl } from '../../../zwift/activity.js';
import { getPowers } from '../../../zwift/power.js';

import { saveFitFile } from './fitfile-save.js';
import { sliceExcess } from './slice-excess.js';

// types
import { ResultEventAdditional } from '../../../../types/types.interface.js';
import { handleAndLogError } from '../../../../errors/error.js';

/**
 * Добавление CP (все интервалы) в результаты Эвента
 * Сохранение данных в FitFile в БД ()
 * @param results массив результатов Эвента
 * @param nameAndDate название и время старта Эвента
 * @returns результаты Эвента с добавленными CriticalPowers
 */
export const addCriticalPowers = async (
  results: ResultEventAdditional[],
  nameAndDate: {
    name: string;
    eventStart: number;
    eventId: number;
  }
): Promise<ResultEventAdditional[]> => {
  // инициализация массива для итоговых результатов
  const resultsWithCP = [] as ResultEventAdditional[];

  for (const result of results) {
    // получение данных fit файла активности (заезда) райдера
    const fullDataUrl = await getFullDataUrl(result.activityData.activityId);

    // если ссылки на активность нет,
    // райдер еще не закончил активность или закрыт доступ к активностям
    if (!fullDataUrl) {
      result.cpBestEfforts = getCPFromResult(result);
      resultsWithCP.push(result);
      continue;
    }

    // запрос powerInWatts из FitFile из активности из ZwiftAPI
    const powerInWatts: number[] = await getPowers(fullDataUrl);

    // сохранение фитфайла в БД
    await saveFitFile({ powerInWatts, result, nameAndDate }).catch((e) => handleAndLogError(e));

    // обрезка заезда после завершения гонки
    const powerInWattsCorrect = sliceExcess(
      powerInWatts,
      result.activityData.durationInMilliseconds
    );

    // получение critical powers гонки
    const weightRider = result.profileData.weightInGrams / 1000;
    const cpBestEfforts = getIntervals(powerInWattsCorrect, weightRider);

    result.cpBestEfforts = cpBestEfforts;
    resultsWithCP.push(result);
  }

  return resultsWithCP;
};

/**
 * Изменение основных CP (15, 60, 300, 1200) в массиве powerInWatts на данные из результата zwiftAPI.
 */
// function changeMainCPsInPowerInWatts() {
//   // Подмена CP 15s, 1, 5, 20 на данные из протокола с zwiftAPI.
//   if (cPFromResult && cPFromResult.length > 0) {
//     for (const duration of durationsFromZwiftAPIResult) {
//       const cPIntervalFromResult = cPFromResult.find(
//         (cp) => cp.watts && cp.duration === duration
//       );
//       // console.log(duration, cPIntervalFromResult);

//       if (
//         cPIntervalFromResult &&
//         cPIntervalFromResult.watts != null &&
//         cPIntervalFromResult.wattsKg !== null
//       ) {
//         const { watts, wattsKg, cpLabel, duration } = cPIntervalFromResult;
//         if (result.profileData.lastName === 'Bulo4ka') {
//           console.log('From protocol', cpLabel, { watts, wattsKg, cpLabel, duration });

//           cpBestEfforts;
//           console.log(
//             'From fitFile',
//             cpLabel,
//             cpBestEfforts.find((cp) => cp.watts && cp.duration === duration)
//           );
//           console.log('=============================');
//         }
//         cpBestEfforts = cpBestEfforts.filter((cp) => cp.cpLabel !== cpLabel);
//         cpBestEfforts.push({ watts, wattsKg, cpLabel, duration });
//       }
//     }
//   }
// }
