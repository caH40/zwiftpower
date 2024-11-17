import { Rider } from '../../Model/Rider.js';

// types
import {
  RiderMaxWatt,
  RiderMaxWattsPerKg,
  TRiderDataForStatistics,
} from '../../types/types.interface.js';

/**
 *  Получение данных всех профилей Rider.
 */
export const getProfilesData = async (
  isMale: boolean
): Promise<Map<number, TRiderDataForStatistics>> => {
  const ridersDB = await Rider.find(
    { male: isMale },
    {
      zwiftId: true,
      firstName: true,
      gender: true,
      imageSrc: true,
      lastName: true,
      countryAlpha3: true,
      _id: false,
    }
  ).lean<
    {
      zwiftId: number;
      firstName: string;
      gender: string;
      imageSrc: string;
      lastName: string;
      countryAlpha3: string;
    }[]
  >();

  const profilesData: [number, TRiderDataForStatistics][] = ridersDB.map((profile) => [
    profile.zwiftId,
    {
      firstName: profile.firstName,
      gender: profile.gender,
      imageSrc: profile.imageSrc,
      lastName: profile.lastName,
      countryAlpha3: profile.countryAlpha3,
    },
  ]);

  const profilesDataMap = new Map(profilesData);

  return profilesDataMap;
};

/**
 * Добавление данных профиля в объекты с максимальными значениями мощности и удельной мощности
 * мутация объектов в массивах.
 */
export const addProfileData = (
  maxWatts: RiderMaxWatt[],
  maxWattsPerKg: RiderMaxWattsPerKg[],
  profilesData: Map<number, TRiderDataForStatistics>
) => {
  [];

  // Добавление данный райдера в объект максимальной мощности и максимальной удельной мощности.
  [maxWatts, maxWattsPerKg].forEach((arr) => {
    for (const interval of arr) {
      interval.profileData = profilesData.get(interval.zwiftId) || null;
    }
  });

  return { maxWattsWithProfile: maxWatts, maxWattsPerKgWithProfile: maxWattsPerKg };
};
