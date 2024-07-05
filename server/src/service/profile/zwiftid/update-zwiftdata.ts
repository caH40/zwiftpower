import { User } from '../../../Model/User.js';

import { getZwiftRiderService } from '../../zwift/rider.js';

/**
 * Сервис обновление данных пользователя на сайте zwiftpower.ru с данных zwiftAPI
 */
export async function refreshProfileService(userId: string) {
  const userDB = await User.findOne({ _id: userId });
  if (!userDB) {
    throw new Error('Не найден профиль в БД');
  }
  if (!userDB.zwiftId) {
    throw new Error('zwiftId не привязан к профилю');
  }
  // запрос данных Райдера с сервера Zwift
  const riderData = await getZwiftRiderService(userDB.zwiftId);

  if (!riderData) {
    throw new Error(`Ошибка при получении данных профиля ${userDB.zwiftId} с ZwiftAPI`);
  }

  await User.findOneAndUpdate(
    { _id: userId },
    {
      $set: {
        'zwiftData.firstName': riderData.firstName,
        'zwiftData.lastName': riderData.lastName,
        'zwiftData.category': riderData.competitionMetrics?.category,
        'zwiftData.categoryWomen': riderData.competitionMetrics?.categoryWomen,
        'zwiftData.racingScore': riderData.competitionMetrics?.racingScore,
        'zwiftData.ftp': riderData.ftp,
        'zwiftData.weight': riderData.weight,
        'zwiftData.height': riderData.height,
        'zwiftData.age': riderData.age,
        'zwiftData.countryAlpha3': riderData.countryAlpha3,
        'zwiftData.imageSrc': riderData.imageSrc,
        'zwiftData.male': riderData.male,
        'zwiftData.publicId': riderData.publicId,
      },
    }
  );

  return {
    message: `Обновлены данные профиля ${userDB.zwiftId} на zwiftpower.ru `,
  };
}
