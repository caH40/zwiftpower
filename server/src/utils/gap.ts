// types
import { EventWithSubgroup, ResultEventAdditional } from '../types/types.interface.js';

/**
 * Добавление стартовых гэпов к результатам
 */
export function addGapStart(event: EventWithSubgroup, results: ResultEventAdditional[]) {
  const resultsNewObj = [...results];
  const getTime = (time: string) => new Date(time).getTime();

  const gaps = event.eventSubgroups.map((subgroup) => ({
    gap: getTime(subgroup.eventSubgroupStart) - getTime(event.eventStart),
    id: subgroup.id,
  }));

  for (const result of resultsNewObj) {
    const gapStart = gaps.find((gap) => gap.id === result.eventSubgroupId)?.gap || 0;
    const durationInMilliseconds = result.activityData.durationInMilliseconds;

    result.activityData.durationInMilliseconds = durationInMilliseconds + gapStart;
  }

  return resultsNewObj;
}

// export function gapValue(results) {
//   try {
//     //вычисление отставаний
//     const lengthResult = results.length;
//     for (let i = 1; i < lengthResult; i++) {
//       results[i].gap =
//         results[i].activityData.durationInMilliseconds -
//         results[0].activityData.durationInMilliseconds;
//       if (i !== lengthResult)
//         results[i].gapPrev =
//           results[i].activityData.durationInMilliseconds -
//           results[i - 1].activityData.durationInMilliseconds;
//     }

//     return results;
//   } catch (error) {
//     console.log(error);
//   }
// }
// export function gapValueOld(results) {
//   try {
//     //вычисление отставаний
//     const lengthResult = results.length;
//     for (let i = 1; i < lengthResult; i++) {
//       results[i].gap = results[i].time - results[0].time;
//       if (i !== lengthResult) results[i].gapPrev = results[i].time - results[i - 1].time;
//     }

//     return results;
//   } catch (error) {
//     console.log(error);
//   }
// }
// export function gapValueTour(results) {
//   try {
//     //вычисление отставаний
//     const lengthResult = results.length;
//     for (let i = 1; i < results.length; i++) {
//       results[i].gap = results[i].timeTotal - results[0].timeTotal;
//       if (i !== lengthResult)
//         results[i].gapPrev = results[i].timeTotal - results[i - 1].timeTotal;
//     }
//     return results;
//   } catch (error) {
//     console.log(error);
//   }
// }
