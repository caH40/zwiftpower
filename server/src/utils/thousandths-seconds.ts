// types
import { UserResult } from '../types/types.interface.js';

export function filterThousandths(results: UserResult[]) {
  const lengthArr = results.length;

  // если не было участников
  if (!lengthArr) return [];

  // если был только один участник
  if (lengthArr === 1) {
    [results[0].activityData.durationInMilliseconds.addition] =
      results[0].activityData.durationInMilliseconds.addition.split('.');
    return results;
  }

  if (
    results[0].activityData.durationInMilliseconds.addition.split('.')[0] !==
    results[1].activityData.durationInMilliseconds.addition.split('.')[0]
  )
    [results[0].activityData.durationInMilliseconds.addition] =
      results[0].activityData.durationInMilliseconds.addition.split('.');

  if (
    results[lengthArr - 1].activityData.durationInMilliseconds.addition.split('.')[0] !==
    results[lengthArr - 2].activityData.durationInMilliseconds.addition.split('.')[0]
  )
    [results[lengthArr - 1].activityData.durationInMilliseconds.addition] =
      results[lengthArr - 1].activityData.durationInMilliseconds.addition.split('.');

  for (let i = 1; i < lengthArr; i++) {
    let timePrev = '';
    let timeCurrent = '';
    let timeNext = '';

    if (i + 1 === lengthArr) return results;

    [timePrev] = results[i - 1].activityData.durationInMilliseconds.addition.split('.');
    [timeCurrent] = results[i].activityData.durationInMilliseconds.addition.split('.');
    [timeNext] = results[i + 1].activityData.durationInMilliseconds.addition.split('.');

    if (timeCurrent !== timePrev && timeCurrent !== timeNext) {
      results[i].activityData.durationInMilliseconds.addition = timeCurrent;
    }
  }

  if (
    results[lengthArr - 1].activityData.durationInMilliseconds.addition.split('.')[0] !==
    results[lengthArr - 2].activityData.durationInMilliseconds.addition.split('.')[0]
  )
    [results[lengthArr - 1].activityData.durationInMilliseconds.addition] =
      results[lengthArr - 1].activityData.durationInMilliseconds.addition.split('.');

  return results; // если не выполнилось ни одно условие
}
