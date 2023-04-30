import { ZwiftEvent } from '../../../Model/ZwiftEvent.js';
import { ZwiftResult } from '../../../Model/ZwiftResult.js';
import { addWattsPerKg } from '../../../utility/watts.js';
import { addAgeAndFlag } from '../age-and-flag.js';
import { filterByRank } from './results-filter.js';

// формирует финишный протокол для сохранения в БД, для гонки newbies
export async function handlerNewbies(eventId, results) {
  try {
    const eventDB = await ZwiftEvent.findOne({ _id: eventId }).populate('eventSubgroups');

    const resultsWithAgeAndFlag = await addAgeAndFlag(eventDB, results);
    const resultsWithWPK = addWattsPerKg(resultsWithAgeAndFlag);

    const resultsSorted = filterByRank(resultsWithWPK);

    let rankEvent = 0;
    for (const result of resultsSorted) {
      if (result.subgroupLabel === 'C' || result.subgroupLabel === 'D') {
        rankEvent += 1;
      } else {
        rankEvent = 0; // всем группам кроме C,D присваивается место в протоколе равное 0
      }

      await ZwiftResult.findOneAndUpdate(
        { $and: [{ profileId: result.profileId }, { zwiftEventId: eventDB._id }] },
        {
          $set: {
            zwiftEventId: eventId, // id документа БД
            subgroupId: result.subgroupId, // id документа БД
            profileId: result.profileId,

            profileData: {
              firstName: result.profileData.firstName,
              lastName: result.profileData.lastName,
              gender: result.profileData.gender,
              weightInGrams: result.profileData.weightInGrams,
              heightInCentimeters: result.profileData.heightInCentimeters,
              imageSrc: result.profileData.imageSrc,
              countryAlpha3: result.profileData.countryAlpha3,
              age: result.profileData.age,
            },

            eventSubgroupId: result.eventSubgroupId,
            subgroupLabel: result.subgroupLabel,
            rank: result.rank,
            rankEvent,
            eventId: result.eventId,

            activityData: {
              activityId: result.activityData.activityId,
              sport: result.activityData.sport,
              durationInMilliseconds: result.activityData.durationInMilliseconds,
            },

            sensorData: {
              heartRateData: { avgHeartRate: result.sensorData.heartRateData.avgHeartRate },
              avgWatts: result.sensorData.avgWatts,
              powerType: result.sensorData.powerType,
            },
            wattsPerKg: result.wattsPerKg,

            flaggedCheating: result.flaggedCheating,
            flaggedSandbagging: result.flaggedSandbagging,
          },
        },
        {
          upsert: true,
        }
      );
    }

    eventDB.totalFinishedCount = resultsSorted.length;
    eventDB.updated = Date.now();
    await eventDB.save();
  } catch (error) {
    console.error(error);
  }
}
