// вычисление отставаний: gap-до лидера, gapPrev до райдера впереди
export function gapValue(results) {
  try {
    const lengthResult = results.length;
    for (let i = 1; i < lengthResult; i++) {
      results[i].gap =
        results[i].activityData.durationInMilliseconds.value -
        results[0].activityData.durationInMilliseconds.value;
      if (i !== lengthResult)
        results[i].gapPrev =
          results[i].activityData.durationInMilliseconds.value -
          results[i - 1].activityData.durationInMilliseconds.value;
    }
    return results;
  } catch (error) {
    throw error;
  }
}
