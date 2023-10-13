import { getZwiftRiderService } from './zwift/rider.js';

// types
import { ProfileZwiftAPI } from '../types/zwiftAPI/profileFromZwift.interface.js';
import { ZwiftResult } from '../Model/ZwiftResult.js';
import { ProfileDataInResultWithId } from '../types/types.interface.js';

interface Params {
  zwiftIdMain: number;
  zwiftIdAdditional: number;
}
/**
 * Добавление Основного профиля Zwift (данных) в результат Эвента,
 * который был показан дополнительным профилем Zwift
 * @param zwiftIdMain zwiftId основного профиля Райдера из Звифт
 * @param zwiftIdAdditional zwiftId дополнительного профиля Райдера из Звифт
 */
export const addMainProfileZwift = async ({
  zwiftIdMain,
  zwiftIdAdditional,
}: Params): Promise<void> => {
  // проверка наличия результатов у дополнительного профиля, если нет то выход (оптимизация)
  const resultDB = await ZwiftResult.findOne({ profileId: zwiftIdAdditional });
  if (!resultDB) {
    return;
  }

  // запрос данных основного профиля с сервера Zwift
  const profileMainZwiftAPI: ProfileZwiftAPI | null = await getZwiftRiderService(
    String(zwiftIdMain)
  );

  if (!profileMainZwiftAPI) {
    throw new Error('Ошибка при запросе данных Profile с ZwiftAPI');
  }

  const profileDataMain: ProfileDataInResultWithId = {
    profileIdMain: zwiftIdMain,
    firstName: profileMainZwiftAPI.firstName,
    lastName: profileMainZwiftAPI.lastName,
    gender: profileMainZwiftAPI.male ? 'MALE' : 'FEMALE',
    weightInGrams: profileMainZwiftAPI.weight,
    heightInCentimeters: profileMainZwiftAPI.height / 10,
    imageSrc: profileMainZwiftAPI.imageSrc,
    countryAlpha3: profileMainZwiftAPI.countryAlpha3,
    age: profileMainZwiftAPI.age,
  };

  await ZwiftResult.updateMany(
    { profileId: zwiftIdAdditional },
    { $set: { profileDataMain } },
    { new: true }
  );
};
