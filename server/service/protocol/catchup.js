import { ZwiftEvent } from '../../Model/ZwiftEvent.js';
import { ZwiftResult } from '../../Model/ZwiftResult.js';
import { addGapStart } from '../../utility/gap.js';

export async function handlerCatchUp(eventId, results) {
  try {
    // получение гэпов для групп
    const eventDB = await ZwiftEvent.findOne({ _id: eventId }).populate('eventSubgroups');
    const resultsWithStartGap = addGapStart(eventDB, results);

    resultsWithStartGap.sort(
      (a, b) => a.activityData.durationInMilliseconds - b.activityData.durationInMilliseconds
    );

    let rankEvent = 0;
    for (const result of results) {
      rankEvent += 1;
      const zwiftResultDB = await ZwiftResult.findOneAndUpdate(
        { profileId: result.profileId },
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

            flaggedCheating: result.flaggedCheating,
            flaggedSandbagging: result.flaggedSandbagging,
          },
        },
        {
          upsert: true,
          returnDocument: 'after',
        }
      );
    }
  } catch (error) {
    console.error(error);
  }
}
