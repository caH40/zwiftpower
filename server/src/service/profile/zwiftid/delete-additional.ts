import { User } from '../../../Model/User.js';
import { deleteMainProfileZwift } from '../../profile_additional/main-delete.js';

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
