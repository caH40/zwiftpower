import { User } from '../../../Model/User.js';
import { addMainProfileZwift } from '../../profile_additional/main-add.js';
import { getZwiftRiderService } from '../../zwift/rider.js';

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

    // добавление Основного профиля Zwift (данных) в результат Эвента
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
