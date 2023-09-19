import axios from 'axios';
import { getAccessToken } from './token.js';

import { errorAxios } from '../../errors/axios.js';
import { zwiftAPI } from '../../config/environment.js';

const apiUrl = zwiftAPI;
const headersDefault = {
  'Content-Type': 'application/x-protobuf-lite',
  Accept: 'application/json',
  Connection: 'keep-alive',
  'Zwift-Api-Version': '2.6',
  'User-Agent': 'Zwift/115 CFNetwork/758.0.2 Darwin/15.0.0',
  'Accept-Language': 'en-us',
  'Accept-Encoding': 'gzip',
};

// запрос по url на открытое API Звифта
export async function getRequest(url: string, isMainToken = true) {
  try {
    // получение токена для API Zwift из БД
    const token = await getAccessToken(isMainToken);

    const response = await axios({
      method: 'get',
      url: `${apiUrl}${url}`,
      headers: {
        ...headersDefault,
        Authorization: 'Bearer ' + token,
      },
    }).catch((error) => {
      errorAxios(error, 'getRequest');
    });

    if (response) {
      return response.data;
    }
    return null;
  } catch (error) {
    console.log(`${apiUrl}${url}`);
    return null;
  }
}
