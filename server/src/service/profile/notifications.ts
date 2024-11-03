import mongoose from 'mongoose';

import { User } from '../../Model/User.js';
import { TResponseService } from '../../types/http.interface.js';
import { TNotifications } from '../../types/model.interface.js';

// Временная конфигурация, пока не добавлен данных объект во все документы User в БД.
const notificationDefault: TNotifications = {
  news: false,
  events: false,
  development: false,
};

type TResponseGetNotifications = {
  notifications: TNotifications;
  zwiftId: number;
};
/**
 * Получение настроек оповещения пользователя на email.
 */
export async function getNotificationsService({
  zwiftId,
}: {
  zwiftId: number;
}): Promise<TResponseService<TResponseGetNotifications>> {
  const userDB: { notifications: TNotifications } | null = await User.findOne(
    { zwiftId },
    { notifications: true, _id: false }
  ).lean();

  if (!userDB) {
    throw new Error(`Не найден пользователь с zwiftId:${zwiftId} в БД!`);
  }

  const data = { notifications: userDB.notifications || notificationDefault, zwiftId };

  const message = 'Данные по параметрам оповещений для пользователя.';
  return { data, message };
}

/**
 * Обновление настроек оповещения пользователя на email.
 */
export async function putNotificationsService({
  zwiftId,
  notifications,
}: {
  zwiftId: number;
  notifications: TNotifications;
}): Promise<TResponseService<{ notifications: TNotifications }>> {
  const userDB = await User.findOneAndUpdate(
    { zwiftId },
    { $set: { notifications } },
    { new: true, projection: { notifications: true } }
  ).lean<{ notifications: TNotifications; _id: mongoose.Types.ObjectId }>();

  if (!userDB) {
    throw new Error(`Не найден пользователь с zwiftId:${zwiftId} в БД!`);
  }

  const message = 'Обновлены параметры оповещений для пользователя.';

  return { data: { notifications: userDB.notifications }, message };
}
