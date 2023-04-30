import { ZwiftEvent } from '../../Model/ZwiftEvent.js';
import { ZwiftResult } from '../../Model/ZwiftResult.js';
import { addGapStart } from '../../utility/gap.js';
import { addWattsPerKg } from '../../utility/watts.js';
import { addAgeAndFlag } from './age-and-flag.js';

// формирует финишный протокол для сохранения в БД, для гонки CatchUp
export async function handlerCatchUp(eventId, results) {
  try {
    const eventDB = await ZwiftEvent.findOne({ _id: eventId }).populate('eventSubgroups');

    const resultsWithStartGap = addGapStart(eventDB, results); // получение стартовых гэпов для групп
    const resultsWithAgeAndFlag = await addAgeAndFlag(eventDB, resultsWithStartGap);
    const resultsWithWPK = addWattsPerKg(resultsWithAgeAndFlag);

    resultsWithWPK.sort(
      (a, b) => a.activityData.durationInMilliseconds - b.activityData.durationInMilliseconds
    );

    let rankEvent = 0;
    for (const result of resultsWithWPK) {
      rankEvent += 1;
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

    eventDB.totalFinishedCount = resultsWithWPK.length;
    await eventDB.save();
  } catch (error) {
    console.error(error);
  }
}
