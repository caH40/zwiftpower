import { TTwitchStreamsFromAPI, TTwitchUserFromAPI } from '../types/http.interface.js';
import { TTwitchStreamDto, TTwitchUserDto } from '../types/types.interface.js';

type Params = [TTwitchStreamsFromAPI, TTwitchUserFromAPI];
export type ResponseChannelDto = { stream: TTwitchStreamDto; user: TTwitchUserDto };

/**
 * Формирование данных об канале твича. Возвращается только первая (index:0) трансляция с канала.
 */
export function dtoTwitchChannel(channel: Params): ResponseChannelDto {
  const streams: TTwitchStreamDto[] = channel[0].data.map((stream) => ({
    id: stream.id,
    userId: stream.user_id,
    userLogin: stream.user_login,
    userName: stream.user_name,
    gameId: stream.game_id,
    gameName: stream.game_name,
    type: stream.type,
    title: stream.title,
    tags: stream.tags,
    viewerCount: stream.viewer_count,
    startedAt: stream.started_at,
    language: stream.language,
    thumbnailUrl: stream.thumbnail_url,
    tagIds: stream.tag_ids,
    isMature: stream.is_mature,
  }));

  const user: TTwitchUserDto[] = channel[1].data.map((user) => ({
    id: user.id,
    login: user.login,
    displayName: user.display_name,
    type: user.type,
    broadcasterType: user.broadcaster_type,
    description: user.description,
    profileImageUrl: user.profile_image_url,
    offlineImageUrl: user.offline_image_url,
    viewCount: user.view_count,
    createdAt: user.created_at,
  }));

  return { stream: streams[0], user: user[0] };
}
