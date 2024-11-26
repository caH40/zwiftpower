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

/**
 * Получение массива каналов с информацией о канале и запущенной трансляции всех участников channelHandles
 * channelHandles - ручка в url канала youtube после символа @
 */
export async function getYoutubeChannelsService(
  channelHandles: string[]
): Promise<TResponseStreamDto[]> {
  const channels = await Promise.allSettled(
    channelHandles.map((channelHandle) => getYoutubeChannel(channelHandle))
  );

  // const channelsFiltered = channels
  //   .filter((res) => res.status === 'fulfilled')
  //   .map(({ value }) => value);
  const channelsForResponse = [] as TResponseStreamDto[];

  for (const channel of channels) {
    if (channel.status === 'fulfilled') {
      channelsForResponse.push(channel.value);
    }
  }

  return channelsForResponse;
}

/**
 * Полные данные о канале и трансляции пользователя username
 */
export async function getYoutubeChannel(channelHandle: string) {
  const channelInfo = await getYoutubeChannelInfo(channelHandle);

  const liveBroadcastsInfo = await getLiveBroadcastsInfo(channelInfo.id);

  const streamAfterDto = dtoYoutubeStream(channelInfo, liveBroadcastsInfo);

  return streamAfterDto;
}

/**
 * Основные данные о канале с Youtube с ручкой @channelHandle.
 * Ручка это имя после знака @ в url канала ютуб.
 */
export async function getYoutubeChannelInfo(channelHandle: string): Promise<TChannelItem> {
  const urlChanelInfo = 'https://www.googleapis.com/youtube/v3/channels';

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
  const urlLiveBroadcastInfo = 'https://www.googleapis.com/youtube/v3/search';

  // Указываем тип ответа как TYoutubeLiveBroadcastListResponse
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
  const urlLiveVideoInfo = 'https://www.googleapis.com/youtube/v3/videos';
  const responseVideoList = await fetchYoutubeData<TYoutubeVideoListResponse>({
    url: urlLiveVideoInfo,
    params: {
      id: videoId,
      part: 'snippet,liveStreamingDetails',
    },
  });

  return responseVideoList.items[0];
}
