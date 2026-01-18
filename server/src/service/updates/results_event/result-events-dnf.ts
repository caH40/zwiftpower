import { handleAndLogError } from '../../../errors/error.js';
import { getSignedRiders } from '../../race/signed-riders.js';
import { getActivities, getActivitiesFullData } from '../../zwift/fitfiles/activities.js';

// types
import { ActivityFeedShort, ResultEventAdditional } from '../../../types/types.interface.js';
import { ActivitiesDataFromZwiftAPI } from '../../../types/zwiftAPI/activitiesFromZwift.interface.js';
import { eventSubGroups } from '../../../assets/category.js';

/**
 * Получение результатов райдеров, которые не финишировали в Эвенте (сход)
 */
export async function getDNFRidersResults({
  ridersWithFinish,
  eventId,
  clubId,
}: {
  ridersWithFinish: number[];
  eventId: number;
  clubId: string;
}): Promise<ResultEventAdditional[]> {
  try {
    // получение зарегистрированных райдеров в Эвенте из ZwiftAPI
    const signedRiders = await getSignedRiders({ eventId, clubId });

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

    // Количество запрашиваемых последних активностей райдера, для поиска в них активности из
    // текущего Эвента.
    const lastActivitiesCount = 5;

    // id последних lastActivitiesCount активностей райдеров, которые не финишировали в текущем Эвенте.
    let allActivityIds: string[] = [];

    for (const rider of ridersWithoutFinish) {
      const riderActivities: ActivityFeedShort[] | null = await getActivities(
        rider.profileId,
        lastActivitiesCount
      );

      if (!riderActivities) {
        continue;
      }

      // const activityFromCurrentEvent = activities.find(
      //   (activity) => activity.eventId === eventId
      // );

      // if (!activityFromCurrentEvent || !activityFromCurrentEvent.activityId) {
      //   continue;
      // }

      const riderAllActivityIds = riderActivities
        .filter(({ activityId }) => activityId)
        .map(({ activityId }) => activityId);

      allActivityIds = [...allActivityIds, ...riderAllActivityIds];
    }

    // данные активностей райдеров из текущего Эвента
    const currentActivities: ActivitiesDataFromZwiftAPI[] = [];
    for (const activityId of allActivityIds) {
      const activity = await getActivitiesFullData(activityId);

      if (!activity || !activity.eventInfo?.id || activity.eventInfo.id !== eventId) {
        continue;
      }

      currentActivities.push(activity);
    }

    //формирование массива результатов райдеров из данных с найденных активностей

    const results = currentActivities.map((activity) => {
      const rider = ridersWithoutFinish.find(
        (rider) => rider.profileId === activity.profileId
      )!;
      return {
        activityData: {
          activityId: activity.id_str,
          calories: activity.calories,
          durationInMilliseconds: activity.movingTimeInMs ?? 0, // При баге movingTimeInMs может отсутствовать в активности!
          elevationInMeters: Math.round(activity.totalElevation),
          segmentDistanceInMeters: Math.round(activity.distanceInMeters),
          segmentDistanceInCentimeters: Math.round(activity.distanceInMeters) * 100,
        },
        eventId: activity.eventInfo.id,
        eventSubgroupId: activity.eventInfo.eventSubGroupId,
        profileData: {
          firstName: activity.profile.firstName,
          gender: activity.profile.eventCategory,
          imageSrc: activity.profile.imageSrc,
          heightInCentimeters: rider.height / 10,
          lastName: activity.profile.lastName,
          weightInGrams: rider.weight,
        },
        profileId: activity.profileId,
        sensorData: {
          avgWatts: Math.round(activity.avgWatts),
          heartRateData: {
            avgHeartRate: Math.round(activity.avgHeartRate),
            heartRateMonitor: activity.avgHeartRate ? true : false,
          },
          powerType: 'unknown', // Данных в активности нет, поэтому фикс.
        },

        scoreHistory: {
          newScore: 0,
          previousScore: 0,
          scoreChangeType: 'NO_CHANGE',
        }, // Данных в активности нет, поэтому фикс.

        subgroupLabel: eventSubGroups.get(activity.eventInfo.subgroupEventLabel)!,
        speed: Math.round((activity.avgSpeedInMetersPerSecond * 360000) / 1000) / 100,
        isDisqualification: true,
        disqualification: 'DNF',
        disqualificationDescription: null,
        rank: 0,
        finishersCount: { absolute: ridersWithFinish.length, category: 0 },
      };
    });

    return results;
  } catch (error) {
    handleAndLogError(error);
    return [];
  }
}
