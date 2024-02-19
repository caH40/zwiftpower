import { errorHandler } from '../../../errors/error.js';
import { getSignedRiders } from '../../race/signed-riders.js';
import { getActivities, getActivitiesFullData } from '../../zwift/fitfiles/activities.js';

// types
import { ActivityFeedShort, ResultEventDNF } from '../../../types/types.interface.js';
import { ActivitiesDataFromZwiftAPI } from '../../../types/zwiftAPI/activitiesFromZwift.interface.js';
import { eventSubGroups } from '../../../assets/category.js';

/**
 * Получение результатов райдеров, которые не финишировали в Эвенте (сход)
 */
export async function getResultsDNFRiders(
  ridersWithFinish: number[],
  eventId: number
): Promise<ResultEventDNF[] | []> {
  try {
    // получение зарегистрированных райдеров в Эвенте из ZwiftAPI
    const signedRiders = await getSignedRiders(eventId);

    if (!signedRiders) {
      return [];
    }

    // райдеры которые сошли с дистанции
    const ridersWithoutFinish = signedRiders
      .map((profile) => ({
        profileId: profile.id,
        weight: profile.weight,
        height: profile.height,
      }))
      .filter((rider) => !ridersWithFinish.includes(rider.profileId));

    // если нет райдеров которые сошли с дистанции, то выход
    if (!ridersWithoutFinish.length) {
      return [];
    }

    // id активностей райдеров из текущего Эвента
    const activityCurrentIds: string[] = [];
    for (const rider of ridersWithoutFinish) {
      const activities: ActivityFeedShort[] | null = await getActivities(rider.profileId, 10);

      if (!activities) {
        continue;
      }

      const activityFromCurrentEvent = activities.find(
        (activity) => activity.eventId === eventId
      );

      if (!activityFromCurrentEvent || !activityFromCurrentEvent.activityId) {
        continue;
      }
      activityCurrentIds.push(activityFromCurrentEvent.activityId);
    }

    // данные активностей райдеров из текущего Эвента
    const activitiesCurrent: ActivitiesDataFromZwiftAPI[] = [];
    for (const activityId of activityCurrentIds) {
      const activity = await getActivitiesFullData(activityId);

      if (!activity) {
        continue;
      }

      activitiesCurrent.push(activity);
    }

    // // формирование массива результатов райдеров из данных с найденных активностей

    const results: ResultEventDNF[] = activitiesCurrent.map((activity) => {
      const rider = ridersWithoutFinish.find(
        (rider) => rider.profileId === activity.profileId
      )!;
      return {
        activityData: {
          activityId: activity.id_str,
          calories: activity.calories,
          durationInMilliseconds: activity.movingTimeInMs,
          elevationInMeters: Math.round(activity.totalElevation),
          segmentDistanceInMeters: Math.round(activity.distanceInMeters),
        },
        eventId: activity.eventInfo.id,
        eventSubgroupId: activity.eventInfo.eventSubGroupId,

        profileData: {
          firstName: activity.profile.firstName,
          gender: activity.profile.eventCategory,
          heightInCentimeters: rider.height,
          lastName: activity.profile.lastName,
          weightInGrams: rider.weight,
        },
        profileId: activity.profileId,
        sensorData: {
          avgWatts: activity.avgWatts,
          heartRateData: {
            avgHeartRate: Math.round(activity.avgHeartRate),
            heartRateMonitor: activity.avgHeartRate ? true : false,
          },
        },
        subgroupLabel: eventSubGroups.get(activity.eventInfo.subgroupEventLabel)!,
        speed: Math.round((activity.avgSpeedInMetersPerSecond * 360000) / 1000) / 100,
        isDisqualification: true,
        disqualification: 'DNF',
        disqualificationDescription: null,
        rank: 0,
      };
    });

    return results;
  } catch (error) {
    errorHandler(error);
    return [];
  }
}
