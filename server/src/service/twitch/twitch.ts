import { dtoTwitchChannel, ResponseChannelDto } from '../../dto/twitch.js';
import { TTwitchStreamsFromAPI, TTwitchUserFromAPI } from '../../types/http.interface.js';

import { fetchTwitchData } from './fetchTwitch.js';

/**
 * Данные о канале с Твича:
 */
export async function getTwitchChannel(channelName: string) {
  const urlStreams = 'https://api.twitch.tv/helix/streams';
  const paramsStreams = { user_login: channelName };

  const urlUser = 'https://api.twitch.tv/helix/users';
  const paramsUser = { login: channelName };

  const channel: [TTwitchStreamsFromAPI, TTwitchUserFromAPI] = await Promise.all([
    fetchTwitchData({ url: urlStreams, params: paramsStreams }),
    fetchTwitchData({ url: urlUser, params: paramsUser }),
  ]);

  const channelAfterDto = dtoTwitchChannel(channel);

  return channelAfterDto;
}

/**
 * Данные о канале с Твича:
 */
export async function getTwitchChannelsService(channelsNames: string[]) {
  const channels = await Promise.allSettled(
    channelsNames.map((channelName) => getTwitchChannel(channelName))
  );

  const channelsForResponse: ResponseChannelDto[] = [];

  for (const channel of channels) {
    if (channel.status === 'fulfilled') {
      channelsForResponse.push(channel.value);
    }
  }

  return channelsForResponse;
}