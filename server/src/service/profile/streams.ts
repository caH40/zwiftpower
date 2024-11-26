import mongoose from 'mongoose';

import { User } from '../../Model/User.js';
import { TResponseService } from '../../types/http.interface.js';
import { TUserStreams } from '../../types/model.interface.js';
import { getYoutubeChannelInfo } from '../youtube/youtube.js';
import { TChannelItem } from '../../types/youtubeAPI.types.js';

type TPutUserStreamsParams = {
  streamsParams: TUserStreams;
  zwiftId: number;
};

/**
 * Обновления настроек для отображения трансляций с разных ресурсов.
 */
export async function putUserStreamsService({
  streamsParams: { youtube, twitch },
  zwiftId,
}: TPutUserStreamsParams): Promise<TResponseService<{ streams: TUserStreams }>> {
  // Проверка обновляются/добавляются данные для youtube.
  const youtubeChannel = youtube?.channelHandle
    ? await getYoutubeChannel(youtube.channelHandle)
    : null;

  const dataSet = {
    ...(twitch && { 'streams.twitch': twitch }),
    ...(youtubeChannel && { 'streams.youtube': youtube }),
  };

  const userDB = await User.findOneAndUpdate(
    { zwiftId },
    { $set: dataSet },
    { new: true, projection: { streams: true } }
  ).lean<{ streams: TUserStreams; _id: mongoose.Types.ObjectId }>();

  if (!userDB) {
    throw new Error(`Не найден пользователь с zwiftId:${zwiftId} в БД!`);
  }

  const message = 'Обновлены настройки для трансляций.';

  return { data: { streams: userDB.streams }, message };
}

/**
 * Проверка существования канала и добавление данных в БД для пользователя.
 */
async function getYoutubeChannel(channelHandle: string): Promise<TChannelItem> {
  // Получение данных о канале. Если канала с ручкой channelHandle не существует, то пробросится исключение.
  const youtubeChannelInfo = await getYoutubeChannelInfo(channelHandle);

  return youtubeChannelInfo;
}
