export function filterThousandths(results) {
  try {
    if (!results.length) return [];
    const lengthArr = results.length;

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
  } catch (error) {
    throw error;
  }
}
