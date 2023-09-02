import { User } from '../Model/User.js';
import { getZwiftRiderService } from './zwift/rider.js';

export async function updateZwiftIdService(userId: string, zwiftId: string) {
  const riderData = await getZwiftRiderService(zwiftId);
  const userWithZwiftId = await User.findOne({ zwiftId });
  if (userWithZwiftId) {
    const message = `Данный zwiftId "${zwiftId}" уже присвоен другому пользователю.`;
    throw { message };
  }
  await User.findOneAndUpdate(
    { _id: userId },
    { $set: { zwiftId, photoProfile: riderData.imageSrc } }
  );

  return { message: 'ZwiftId обновлён!' };
}
