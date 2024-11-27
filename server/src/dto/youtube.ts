// types
import { TResponseStreamDto } from '../types/types.interface.js';
import { TChannelItem, TVideoItem } from '../types/youtubeAPI.types.js';

/**
 * Формирование данных об канале youtube. Возвращается только первая (index:0) трансляция с канала.
 */
export function dtoYoutubeStream(
  channel: TChannelItem,
  liveBroadcastsInfo: TVideoItem | null
): TResponseStreamDto {
  const viewerCountRaw = Number(liveBroadcastsInfo?.liveStreamingDetails?.concurrentViewers);

  const stream = {
    online: liveBroadcastsInfo ? true : false,
    title: liveBroadcastsInfo?.snippet.title || null,
    thumbnailUrl: liveBroadcastsInfo?.snippet.thumbnails.high.url || null,
    viewerCount: Number.isInteger(viewerCountRaw) ? Number(viewerCountRaw) : null,
    startedAt: liveBroadcastsInfo?.liveStreamingDetails?.actualStartTime || null,
    channel: {
      title: channel.snippet.title,
      bannerUrl: channel.brandingSettings.image?.bannerExternalUrl,
      description: channel.brandingSettings.channel.description,
      handleYoutube: channel.snippet.customUrl.replace('@', ''),
    },
  };

  return stream;
}
