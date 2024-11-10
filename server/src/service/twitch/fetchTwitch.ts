import axios from 'axios';
import { twitchClientId, twitchClientSecret } from '../../config/environment.js';

type Params = {
  url: string;
  params: object;
};

/**
 * Запрос на API твича.
 */
export async function fetchTwitchData({ url, params }: Params) {
  const accessToken = await getAccessToken();

  const response = await axios.get(url, {
    headers: {
      'Client-ID': twitchClientId,
      Authorization: `Bearer ${accessToken}`,
    },
    params,
  });

  return response.data;
}

/**
 * Получение API ключа доступа.
 */
async function getAccessToken() {
  const response = await axios.post('https://id.twitch.tv/oauth2/token', null, {
    params: {
      client_id: twitchClientId,
      client_secret: twitchClientSecret,
      grant_type: 'client_credentials',
    },
  });

  return response.data.access_token;
}
