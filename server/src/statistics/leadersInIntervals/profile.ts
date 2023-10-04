import { ZwiftResult } from '../../Model/ZwiftResult.js';

// types
import { RiderMaxWatt, RiderMaxWattsPerKg } from '../../types/types.interface.js';

/**
 * Добавление данных профиля в объекты с максимальными значениями мощности и удельной мощности
 * мутация объектов в массивах
 */
export const addProfile = async (
  maxWatts: RiderMaxWatt[],
  maxWattsPerKg: RiderMaxWattsPerKg[]
) => {
  // поиск уникальных zwiftId райдеров;
  const ridersZwiftId = new Set<number>();
  for (const elm of [...maxWatts, ...maxWattsPerKg]) {
    ridersZwiftId.add(elm.zwiftId);
  }

  type Profile = {
    profileId: number;
    profileData: {
      firstName: string;
      gender: string;
      heightInCentimeters: number;
      imageSrc: string;
      lastName: string;
      playerType: string;
      weightInGrams: number;
    };
  };

  const ridersDB: Profile[] = await ZwiftResult.find(
    { profileId: [...ridersZwiftId] },
    { profileId: true, profileData: true, _id: false }
  ).lean();

  // добавление данный райдера в объект максимальной мощности
  for (const interval of maxWatts) {
    interval.profile = ridersDB.find(
      (rider) => rider.profileId === interval.zwiftId
    )?.profileData;
  }

  // добавление данный райдера в объект максимальной удельной мощности
  for (const interval of maxWattsPerKg) {
    interval.profile = ridersDB.find(
      (rider) => rider.profileId === interval.zwiftId
    )?.profileData;
  }

  return { maxWattsWithProfile: [...maxWatts], maxWattsPerKgWithProfile: [...maxWattsPerKg] };
};
