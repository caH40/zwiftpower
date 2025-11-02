import { User } from '../Model/User.js';

export class UserRepository {
  remove = async (userId: string): Promise<void> => {
    await User.findByIdAndDelete(userId);
  };

  // Проверка существования одного пользователя
  exists = async (userId: string): Promise<boolean> => {
    const result = await User.exists({ _id: userId });
    return result !== null;
  };
}
