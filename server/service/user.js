import { User } from '../Model/User.js';

export async function updateZwiftIdService(userId, zwiftId) {
  try {
    const userDB = await User.findOneAndUpdate({ _id: userId }, { $set: { zwiftId } });

    return { message: 'ZwiftId обновлён!' };
  } catch (error) {
    throw error;
  }
}
