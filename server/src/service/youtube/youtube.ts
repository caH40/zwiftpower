import { fetchYoutubeData } from './fetchYouTube.js';

// types
import {
  TChannelItem,
  TVideoItem,
  TYoutubeChannelListResponse,
  TYoutubeSearchListResponse,
  TYoutubeVideoListResponse,
} from '../../types/youtubeAPI.types.js';
import { dtoYoutubeStream } from '../../dto/youtube.js';
import { TResponseStreamDto } from '../../types/types.interface.js';
import { handleAndLogError } from '../../errors/error.js';
import { youtubeAPIBaseUrl } from '../../config/environment.js';

/**
 * Получение массива каналов с информацией о канале и запущенной трансляции всех участников channelHandles
 * channelHandles - ручка в url канала youtube после символа @
 */
export async function getYoutubeChannelsService(
  channelHandles: string[]
): Promise<TResponseStreamDto[]> {
  try {
    if (!channelHandles?.length) {
      throw new Error('Неверный формат данных или пустой массив channelHandles');
    }

    const channels = await Promise.allSettled(
      channelHandles.map((channelHandle) => getYoutubeChannel(channelHandle))
    );

    const channelsForResponse = [] as TResponseStreamDto[];

    for (const channel of channels) {
      if (channel.status === 'fulfilled' && channel.value !== null) {
        channelsForResponse.push(channel.value);
      }
    }

    return channelsForResponse;
  } catch (error) {
    handleAndLogError(error);
    return [];
  }
}

/**
 * Полные данные о канале и трансляции пользователя username.
 */
export async function getYoutubeChannel(
  channelHandle: string
): Promise<TResponseStreamDto | null> {
  try {
    const channelInfo = await getYoutubeChannelInfo(channelHandle);

    const liveBroadcastsInfo = await getLiveBroadcastsInfo(channelInfo.id);

    const streamAfterDto = dtoYoutubeStream(channelInfo, liveBroadcastsInfo);

    return streamAfterDto;
  } catch (error) {
    handleAndLogError(error);
    return null;
  }
}

/**
 * Основные данные о канале с Youtube с ручкой @channelHandle.
 * Ручка это имя после знака @ в url канала ютуб.
 */
export async function getYoutubeChannelInfo(channelHandle: string): Promise<TChannelItem> {
  const urlChanelInfo = `${youtubeAPIBaseUrl}channels`;

  const response = await fetchYoutubeData<TYoutubeChannelListResponse>({
    url: urlChanelInfo,
    params: {
      forHandle: channelHandle,
      part: 'id,snippet,brandingSettings',
    },
  });

  // Если в items существует и в нём есть элемент(ы), значит канал с channelHandle существует.
  if (!response.items?.length) {
    throw new Error(`Не найден канал с ручкой @${channelHandle}`);
  }

  const channelInfo = response.items[0];

  return channelInfo;
}

/**
 * Получение информации о трансляциях канала.
 */
export async function getLiveBroadcastsInfo(channelId: string): Promise<TVideoItem | null> {
  const urlLiveBroadcastInfo = `${youtubeAPIBaseUrl}search`;

  // Поиск запущенных трансляций.
  const responseBroadcast = await fetchYoutubeData<TYoutubeSearchListResponse>({
    url: urlLiveBroadcastInfo,
    params: {
      part: 'snippet',
      eventType: 'live',
      type: 'video',
      channelId,
    },
  });

  const videoId = responseBroadcast.items[0]?.id?.videoId;

  // Проверка запущенной трансляции.
  if (!videoId) {
    return null;
  }

  // Получение информации о трансляции.
  const urlLiveVideoInfo = `${youtubeAPIBaseUrl}videos`;
  const responseVideoList = await fetchYoutubeData<TYoutubeVideoListResponse>({
    url: urlLiveVideoInfo,
    params: {
      id: videoId,
      part: 'snippet,liveStreamingDetails',
    },
  });

  return responseVideoList.items[0];
}
