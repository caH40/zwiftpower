import { TotalCatchup } from '../../Model/TotalCatchup.js';
import { ZwiftEvent } from '../../Model/ZwiftEvent.js';
import { ZwiftResult } from '../../Model/ZwiftResult.js';

export async function getResultsSeriesService(type, seasonCurrent) {
  try {
    const endDate = (season) => {
      switch (season) {
        case 'Сезон 2022-2023':
          return 1693526400000;
        // по умолчанию возвращать текущий сезон, придумать улучшенный алгоритм
        default:
          return null;
      }
    };
    // !!!задействовать выбор сезона
    const totalCatchupDB = await TotalCatchup.findOne({ type, end: endDate(seasonCurrent) });
    if (!totalCatchupDB) return { results: [], resultsSummary: [] };

    const zwiftEventsDB = await ZwiftEvent.find(
      { typeRaceCustom: type },
      { _id: true, totalFinishedCount: true }
    );

    const resultsDB = await ZwiftResult.find(
      {
        zwiftEventId: zwiftEventsDB,
        rankEvent: 1,
      },
      { cpBestEfforts: false }
    )
      .populate('subgroupId')
      .populate('zwiftEventId');

    const results = getResults(resultsDB);
    const resultsSummary = getResultSummary(results, totalCatchupDB);

    return { results, resultsSummary };
  } catch (error) {
    throw error;
  }
}

function getResults(resultsFromDB) {
  try {
    const results = [];
    for (const event of resultsFromDB) {
      const result = {};
      result.eventId = event.eventId;
      result.subgroupLabel = event.subgroupLabel;
      result.profileId = event.profileId;
      result.profileData = event.profileData;
      result.durationInMilliseconds = event.activityData.durationInMilliseconds;
      result.durationInMilliseconds = event.activityData.durationInMilliseconds;
      result.eventSubgroup = event.subgroupId;
      result.eventStart = new Date(event.zwiftEventId.eventStart).getTime();
      result.totalFinishedCount = event.zwiftEventId.totalFinishedCount;
      results.push(result);
    }
    return results.sort((a, b) => b.eventStart - a.eventStart);
  } catch (error) {
    throw error;
  }
}
function getResultSummary(results, totalCatchup) {
  try {
    let winsA = 0;
    let winsB = 0;
    let winsC = 0;
    for (const result of results) {
      switch (result.eventSubgroup.subgroupLabel) {
        case 'A': {
          winsA++;
          break;
        }
        case 'B': {
          winsB++;
          break;
        }
        case 'C': {
          winsC++;
          break;
        }
        default: {
          break;
        }
      }
    }

    for (const result of totalCatchup.manual) {
      switch (result.winnerCategory) {
        case 'A': {
          winsA++;
          break;
        }
        case 'B': {
          winsB++;
          break;
        }
        case 'C': {
          winsC++;
          break;
        }
        default: {
          break;
        }
      }
    }
    const resultSummary = [
      { id: 0, groupCategory: 'A', winsTotal: winsA },
      { id: 1, groupCategory: 'B', winsTotal: winsB },
      { id: 2, groupCategory: 'C', winsTotal: winsC },
    ];
    resultSummary.sort((a, b) => b.winsTotal - a.winsTotal);
    return resultSummary;
  } catch (error) {
    throw error;
  }
}
// сезон начинается с 01.09 и заканчивается 31.08
// получить временной промежуток из модели TotalCatchup
// согласно временному промежутку получить эвенты catchup
// для каждого эвента получить данные победителя
