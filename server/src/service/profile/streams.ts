import mongoose from 'mongoose';

import { User } from '../../Model/User.js';
import { TResponseService } from '../../types/http.interface.js';
import { TUserStreams } from '../../types/model.interface.js';

type TPutUserStreamsParams = {
  streamsParams: TUserStreams;
  zwiftId: number;
};

/**
 * Обновления настроек для отображения трансляций с разных ресурсов.
 */
export async function putUserStreamsService({
  streamsParams,
  zwiftId,
}: TPutUserStreamsParams): Promise<TResponseService<{ streams: TUserStreams }>> {
  const userDB = await User.findOneAndUpdate(
    { zwiftId },
    { $set: { 'streams.twitch': streamsParams.twitch } },
    { new: true, projection: { streams: true } }
  ).lean<{ streams: TUserStreams; _id: mongoose.Types.ObjectId }>();

  if (!userDB) {
    throw new Error(`Не найден пользователь с zwiftId:${zwiftId} в БД!`);
  }

  const message = 'Обновлены настройки для трансляций.';

  return { data: { streams: userDB.streams }, message };
}
