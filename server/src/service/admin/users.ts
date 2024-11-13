import { Rider } from '../../Model/Rider.js';
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

  const zwiftIds = usersDB.map((user) => user.zwiftId);

  const ridersDB = await Rider.find(
    { zwiftId: zwiftIds },
    { _id: false, zwiftId: true, imageSrc: true, firstName: true, lastName: true }
  ).lean<{ zwiftId: number; firstName: string; lastName: string; imageSrc: string | null }[]>();

  const ridersMap = new Map(ridersDB.map((rider) => [rider.zwiftId, rider]));

  const users = usersDB.map((user) => {
    // Не все зарегистрированные райдеры добавили zwiftId
    // и следовательно не у всех есть { imageSrc, firstName, lastName }
    const empty = { imageSrc: null, firstName: null, lastName: null };
    const { imageSrc, firstName, lastName } = ridersMap.get(user.zwiftId) || empty;

    const _id = String(user._id);

    return { ...user, imageSrc, firstName, lastName, _id };
  });

  return users;
};
