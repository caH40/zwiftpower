import { User } from '../Model/User.js';
import { addMainProfileZwift } from './profile_additional/main-add.js';
import { deleteMainProfileZwift } from './profile_additional/main-delete.js';
import { getZwiftRiderService } from './zwift/rider.js';

/**
 * Сервис обновления zwiftId у пользователя
 */
export async function updateZwiftIdService(
  userId: string,
  zwiftId: number,
  isAdditional: boolean
) {
  const userWithZwiftId = await User.findOne({
    $or: [{ zwiftId }, { zwiftIdAdditional: [zwiftId] }],
  });

  // проверка был ли присвоен данный zwiftId другому пользователю
  if (userWithZwiftId) {
    const message = `Данный zwiftId "${zwiftId}" уже присвоен другому пользователю.`;
    throw new Error(message);
  }

  if (isAdditional) {
    const userDB = await User.findOneAndUpdate(
      { _id: userId },
      { $addToSet: { zwiftIdAdditional: zwiftId } }
    );

    if (!userDB) {
      throw new Error('Ошибка при добавлении дополнительного профиля Zwift');
    }

    await addMainProfileZwift({ zwiftIdMain: userDB?.zwiftId, zwiftIdAdditional: zwiftId });
    return {
      message: `Дополнительный ZwiftId ${zwiftId} привязан к профилю`,
      zwiftIdMain: userDB!.zwiftId,
    };
  } else {
    // запрос данных Райдера с сервера Zwift
    const riderData = await getZwiftRiderService(String(zwiftId));

    const photoProfile = riderData ? riderData.imageSrc : undefined;
    await User.findOneAndUpdate({ _id: userId }, { $set: { zwiftId, photoProfile } });
    return {
      message: `ZwiftId ${zwiftId} привязан к профилю`,
      zwiftIdMain: zwiftId,
    };
  }
}

/**
 * Сервис удаления дополнительного zwiftId у пользователя
 */
export async function deleteUserZwiftIdService(userId: string, zwiftId: number) {
  const userWithZwiftId = await User.findOneAndUpdate(
    { _id: userId },
    { $pull: { zwiftIdAdditional: zwiftId } },
    { new: true }
  );

  if (!userWithZwiftId || userWithZwiftId.zwiftIdAdditional.includes(zwiftId)) {
    throw new Error(`Дополнительный ZwiftId ${zwiftId} не был удалён из профиля`);
  }

  // удаление данных Основного профиля Звифт райдера из результатов,
  // показанных дополнительным профилем с zwiftId
  await deleteMainProfileZwift(zwiftId);

  return {
    message: `Дополнительный ZwiftId ${zwiftId} удалён из профиля`,
    zwiftIdMain: userWithZwiftId.zwiftId,
  };
}

/**
 * Сервис обновление данных пользователя на сайте zwiftpower.ru с данных zwiftAPI
 */
export async function refreshProfileService(userId: string) {
  const userDB = await User.findOne({ _id: userId });
  if (!userDB) {
    throw new Error('Не найден профиль в БД');
  }
  // запрос данных Райдера с сервера Zwift
  const riderData = await getZwiftRiderService(String(userDB.zwiftId));

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
        'zwiftData.ftp': riderData.ftp,
        'zwiftData.weight': riderData.weight,
        'zwiftData.height': riderData.height,
        'zwiftData.age': riderData.age,
        'zwiftData.countryAlpha3': riderData.countryAlpha3,
        'zwiftData.imageSrc': riderData.imageSrc,
        'zwiftData.male': riderData.male,
        'zwiftData.publicId': riderData.publicId,
      },
    },
    {
      new: true,
    }
  );

  return {
    message: `Обновлены данные профайла на zwiftpower.ru `,
  };
}
