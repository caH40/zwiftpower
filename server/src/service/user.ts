import { User } from '../Model/User.js';
import { addMainProfileZwift, deleteMainProfileZwift } from './result-profile.js';
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
  // запрос данных Райдера с сервера Zwift
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
