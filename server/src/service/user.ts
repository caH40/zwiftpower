import { User } from '../Model/User.js';
import { getZwiftRiderService } from './zwift/rider.js';

export async function updateZwiftIdService(userId: string, zwiftId: string) {
  /**
   *  Запрос данных Райдера с сервера Zwift
   */
  const riderData = await getZwiftRiderService(zwiftId);

  const userWithZwiftId = await User.findOne({ zwiftId });
  /**
   *  Проверка был ли присвоен данный zwiftId другому пользователю
   */
  if (userWithZwiftId) {
    const message = `Данный zwiftId "${zwiftId}" уже присвоен другому пользователю.`;
    throw new Error(message);
  }

  const photoProfile = riderData ? riderData.imageSrc : undefined;

  await User.findOneAndUpdate({ _id: userId }, { $set: { zwiftId, photoProfile } });

  return { message: 'ZwiftId  обновлён!' };
}
