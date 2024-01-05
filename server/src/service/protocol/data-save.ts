import { ZwiftResult } from '../../Model/ZwiftResult.js';

// types
import { SaveDocumentArg } from '../../types/types.interface.js';

/**
 * Подготовка структуры данных и сохранение результата (result) в БД
 */
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
        rankEvent: rankEvent ? rankEvent : result.rankEvent,
        eventId: result.eventId,

        activityData: {
          activityId: result.activityData.activityId,
          sport: result.activityData.sport,
          durationInMilliseconds: result.activityData.durationInMilliseconds,
          segmentDistanceInMeters: result.activityData.segmentDistanceInMeters,
        },

        sensorData: {
          heartRateData: { avgHeartRate: result.sensorData.heartRateData.avgHeartRate },
          avgWatts: result.sensorData.avgWatts,
          powerType: result.sensorData.powerType,
          pairedSteeringDevice: result.sensorData.pairedSteeringDevice,
        },
        wattsPerKg: result.wattsPerKg,
        speed: result.speed,
        normalizedPower: result.normalizedPower,

        flaggedCheating: result.flaggedCheating,
        flaggedSandbagging: result.flaggedSandbagging,
        cpBestEfforts: result.cpBestEfforts,
        isDisqualification: result.isDisqualification,
        disqualification: result.disqualification,
        disqualificationDescription: result.disqualificationDescription,
        profileDataMain: result.profileDataMain,
      },
    },
    {
      upsert: true,
    }
  );
}
