import axios from 'axios';

import { getAccessToken } from './token.js';
import { errorAxios } from '../../errors/axios.js';
import { zwiftAPI } from '../../config/environment.js';
import { PutEvent } from '../../types/http.interface.js';

const apiUrl = zwiftAPI;

const headersDefault = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
  Connection: 'keep-alive',
  'Zwift-Api-Version': '2.6',
  'User-Agent': 'Zwift/115 CFNetwork/758.0.2 Darwin/15.0.0',
  'Accept-Language': 'ru,en;q=0.9,ko;q=0.8',
  'Accept-Encoding': 'gzip,deflate, br',
  'Cache-Control': 'no-cache',
  Referer: 'https://www.zwift.com/',
  Source: 'my-zwift',
};

export async function putRequest(url: string, data: PutEvent, isMainToken = true) {
  const token = await getAccessToken(isMainToken);

  const response = await axios({
    method: 'put',
    url: `${apiUrl}${url}`,
    headers: {
      ...headersDefault,
      Authorization: 'Bearer ' + token,
    },
    data,
  }).catch((error) => {
    errorAxios(error, 'putRequest');
  });

  if (response) {
    return response.data;
  }
  return null;
}
