import { User } from '../../../Model/User.js';

import { getZwiftRiderService } from '../../zwift/rider.js';

// !!! Удалить данный сервис!!!
// !!! Удалить данный сервис!!!
// !!! Удалить данный сервис!!!
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
        'DelwiftData.firstName': riderData.firstName,
        'DelwiftData.lastName': riderData.lastName,
        'DelwiftData.category': riderData.competitionMetrics?.category,
        'DelwiftData.categoryWomen': riderData.competitionMetrics?.categoryWomen,
        'DelwiftData.racingScore': riderData.competitionMetrics?.racingScore,
        'DelwiftData.ftp': riderData.ftp,
        'DelwiftData.weight': riderData.weight,
        'DelwiftData.height': riderData.height,
        'DelwiftData.age': riderData.age,
        'DelwiftData.countryAlpha3': riderData.countryAlpha3,
        'DelwiftData.imageSrc': riderData.imageSrc,
        'DelwiftData.male': riderData.male,
        'DelwiftData.publicId': riderData.publicId,
      },
    }
  );

  return {
    message: `Обновлены данные профиля ${userDB.zwiftId} на zwiftpower.ru `,
  };
}
