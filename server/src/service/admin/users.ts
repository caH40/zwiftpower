import { User } from '../../Model/User.js';
import { UserSchema } from '../../types/model.interface.js';

/**
 * Сервис получения всех зарегистрированных Users на сайте zwiftpower.ru
 */
export const getUsersService = async () => {
  const usersDB: Omit<UserSchema, 'password'>[] = await User.find(
    {},
    { password: false, __v: false }
  ).lean();

  return usersDB;
};
