import { TTwitchStreamsFromAPI, TTwitchUserFromAPI } from '../types/http.interface.js';
import { TResponseStreamDto } from '../types/types.interface.js';

type Params = { streams: TTwitchStreamsFromAPI; users: TTwitchUserFromAPI };

/**
 * Формирование данных об канале твича. Возвращается только первая (index:0) трансляция с канала.
 */
export function dtoTwitchChannel({ streams, users }: Params): TResponseStreamDto {
  const streamCurrent = streams.data[0];
  const userCurrent = users.data[0];
  const online = streamCurrent ? true : false;

  const thumbnailUrlCurrent = streamCurrent?.thumbnail_url
    ? streamCurrent.thumbnail_url.replace('{width}x{height}', '400x225')
    : null;

  // Баннер
  const bannerUrl = userCurrent.offline_image_url
    ? userCurrent.offline_image_url
    : userCurrent.profile_image_url;

  const stream = {
    online,
    title: streamCurrent?.title || null,
    thumbnailUrl: thumbnailUrlCurrent,
    viewerCount: streamCurrent?.viewer_count || null,
    startedAt: online ? streamCurrent?.started_at : null,
    channel: {
      title: userCurrent.display_name,
      bannerUrl: bannerUrl,
      description: userCurrent.display_name,
    },
  };

  return stream;
}
