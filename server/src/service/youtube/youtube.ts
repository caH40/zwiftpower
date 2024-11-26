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

/**
 *
 */
export async function getYoutubeChannelsService(channelHandles: string[]) {
  for (const channelHandle of channelHandles) {
    await getYoutubeChannel(channelHandle);
  }
}

/**
 * Полные данные о канале и трансляции пользователя username
 */
export async function getYoutubeChannel(channelHandle: string) {
  const channelInfo = await getYoutubeChannelInfo(channelHandle);
  const liveBroadcastsInfo = await getLiveBroadcastsInfo(channelInfo.id);

  const streamAfterDto = dtoYoutubeStream(channelInfo, liveBroadcastsInfo);

  console.log(streamAfterDto);

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
      part: 'id,snippet,statistics,brandingSettings',
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
