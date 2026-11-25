import { User } from '../../Model/User.js';
import { TResponseService } from '../../types/http.interface.js';

// types
import { TExternalService } from '../../types/types.interface.js';

type Params = {
  userId: string;
  service: TExternalService;
  accountId: string;
};

export async function putExternalAccountService({
  userId,
  service,
  accountId,
}: Params): Promise<TResponseService<null>> {
  // 1. Пытаемся обновить существующий элемент массива с нужным service
  let userDB = await User.findOneAndUpdate(
    { _id: userId, 'externalAccountServices.service': service },
    { $set: { 'externalAccountServices.$.accountId': accountId } },
    { new: true }
  ).lean();

  // 2. Если такого сервиса ещё нет — добавляем новый элемент в массив
  if (!userDB) {
    userDB = await User.findByIdAndUpdate(
      userId,
      { $push: { externalAccountServices: { service, accountId } } },
      { new: true }
    ).lean();
  }

  if (!userDB) {
    throw new Error(`Не найден пользователь с userId:${userId} в БД!`);
  }

  const message = `Добавлен ${service} ID: ${accountId} к вашему аккаунту`;

  return { data: null, message };
}
