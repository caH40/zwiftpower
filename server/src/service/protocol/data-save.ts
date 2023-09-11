import { ZwiftResult } from '../../Model/ZwiftResult.js';

// types
import { SaveDocumentArg } from '../../types/types.interface.js';

export async function saveDocument({ eventId, result, rankEvent }: SaveDocumentArg) {
  await ZwiftResult.findOneAndUpdate(
    { $and: [{ profileId: result.profileId }, { zwiftEventId: eventId }] },
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
          pairedSteeringDevice: result.sensorData.pairedSteeringDevice,
        },
        wattsPerKg: result.wattsPerKg,

        flaggedCheating: result.flaggedCheating,
        flaggedSandbagging: result.flaggedSandbagging,
        cpBestEfforts: result.cpBestEfforts,
        disqualification: result.disqualification,
      },
    },
    {
      upsert: true,
    }
  );
}
