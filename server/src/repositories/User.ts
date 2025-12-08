import { Types } from 'mongoose';
import { User } from '../Model/User.js';

// type
import { UserSchema } from '../types/model.interface.js';

export class UserRepository {
  remove = async (userId: string): Promise<void> => {
    await User.findByIdAndDelete(userId);
  };

  // Проверка существования одного пользователя
  exists = async (userId: string): Promise<boolean> => {
    const result = await User.exists({ _id: userId });
    return result !== null;
  };
  // Проверка существования одного пользователя
  getZwiftId = async (
    userId: string
  ): Promise<{ _id: Types.ObjectId; zwiftId: number } | null> => {
    return User.findOne({ _id: userId }, { zwiftId: 1 }).lean();
  };

  /**
   * Данные пользователя.
   */
  get = async (userId: string): Promise<UserSchema | null> => {
    return User.findOne({ _id: userId }).lean();
  };
}
