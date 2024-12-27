import { User } from '../../../Model/User.js';
import { TResponseService } from '../../../types/http.interface.js';
import { addMainProfileZwift } from '../../profile_additional/main-add.js';
import { updateProfileService } from '../rider.js';

/**
 * Сервис обновления zwiftId у пользователя
 */
export async function updateZwiftIdService(
  userId: string,
  zwiftId: number,
  isAdditional: boolean
): Promise<TResponseService<{ zwiftIdMain: number }>> {
  // Проверка был ли присвоен данный zwiftId другому пользователю.
  const userWithZwiftId = await User.findOne({
    $or: [{ zwiftId }, { zwiftIdAdditional: [zwiftId] }],
  });

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
      data: { zwiftIdMain: userDB.zwiftId },
    };
  } else {
    await User.findOneAndUpdate({ _id: userId }, { $set: { zwiftId } });

    await updateProfileService(userId);

    return {
      message: `ZwiftId ${zwiftId} привязан к профилю`,
      data: { zwiftIdMain: zwiftId },
    };
  }
}
