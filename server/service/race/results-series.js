import { TotalCatchup } from '../../Model/TotalCatchup.js';
import { ZwiftEvent } from '../../Model/ZwiftEvent.js';
import { ZwiftResult } from '../../Model/ZwiftResult.js';

export async function getResultsSeriesService(type, seasonCurrent) {
  try {
    const endDate = (season) => {
      switch (season) {
        case '2022-2023':
          return 1693526400000;
        // по умолчанию возвращать текущий сезон, придумать улучшенный алгоритм
        default:
          return 1693526400000;
      }
    };

    const totalCatchupDB = await TotalCatchup.findOne({ type, end: endDate(seasonCurrent) });

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

    return { results };
  } catch (error) {
    throw error;
  }
}

function getResults(resultsFromDB) {
  try {
    const results = [];
    for (const event of resultsFromDB) {
      const result = {};
      result._id = event._id;
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
// сезон начинается с 01.09 и заканчивается 31.08
// получить временной промежуток из модели TotalCatchup
// согласно временному промежутку получить эвенты catchup
// для каждого эвента получить данные победителя
