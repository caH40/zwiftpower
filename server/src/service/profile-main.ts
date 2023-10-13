import { ZwiftResultSchema } from '../types/model.interface.js';

/**
 * Подмена данных профиля на Основной, если результат был показан Дополнительным профилем
 */
export const changeProfileData = (results: ZwiftResultSchema[]): ZwiftResultSchema[] => {
  return results.map((result) => {
    if (result.profileDataMain) {
      result.profileId = result.profileDataMain.profileIdMain;
      result.profileData = result.profileDataMain;
      return result;
    } else {
      return result;
    }
  });
};
