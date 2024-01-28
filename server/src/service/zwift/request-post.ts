import axios from 'axios';

import { getAccessToken } from './token.js';
import { zwiftAPI } from '../../config/environment.js';

//types
import { PostZwiftEvent } from '../../types/http.interface.js';

const apiUrl = zwiftAPI;

const headersDefault = {
  // 'Content-Type': 'application/json',
  // Accept: 'application/json',
  // Connection: 'keep-alive',
  // 'Zwift-Api-Version': '2.6',
  // 'User-Agent': 'Zwift/115 CFNetwork/758.0.2 Darwin/15.0.0',
  // 'Accept-Language': 'ru,en;q=0.9,ko;q=0.8',
  // 'Accept-Encoding': 'gzip,deflate, br',
  // 'Cache-Control': 'no-cache',
  // Referer: 'https://www.zwift.com/',
  // Source: 'my-zwift',
  Accept: 'application/json',
  'Accept-Encoding': 'gzip',
  'User-Agent':
    'com.zwift.android.prod/3.52.0-1675 (samsung SM-S901N/Android 9) loggedInUserId=169979',
  'Content-Type': 'application/json',
  Source: 'zwift-companion',
  'Zwift-Api-Version': '2.6',
  Connection: 'keep-alive',
  Host: 'us-or-rly101.zwift.com',
};

export async function postRequest(url: string, data: PostZwiftEvent, isMainToken = true) {
  const token = await getAccessToken(isMainToken);

  const response = await axios({
    method: 'post',
    url: `${apiUrl}${url}`,
    headers: {
      ...headersDefault,
      Authorization: 'Bearer ' + token,
    },
    data,
  });

  if (response) {
    return response.data;
  }
  return null;
}
