import { ZwiftResultSchema } from '../types/model.interface.js';

/**
 * Подмена данных профиля на Основной, если результат был показан Дополнительным профилем
 */
export const changeProfileData = (results: ZwiftResultSchema[]): ZwiftResultSchema[] => {
  return results.map((result) => {
    if (result.profileDataMain) {
      // подмена zwiftId
      result.profileId = result.profileDataMain.profileIdMain;

      // подмена данных профиля
      result.profileData = {
        ...result.profileDataMain,
        weightInGrams: result.profileData.weightInGrams,
        heightInCentimeters: result.profileData.heightInCentimeters,
        gender: result.profileData.gender,
      };
      return result;
    } else {
      return result;
    }
  });
};
