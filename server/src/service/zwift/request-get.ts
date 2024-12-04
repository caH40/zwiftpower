import axios from 'axios';

import { getAccessToken } from './token.js';
import { zwiftAPI } from '../../config/environment.js';
import { errorHandler } from '../../errors/error.js';

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
export async function getRequest(url: string, isMainToken = true, tokenOrganizer?: string) {
  try {
    // получение токена для API Zwift из БД
    const token = await getAccessToken(isMainToken);

    // Если есть токен организатора tokenOrganizer, то использовать его.
    const tokenCurrent = tokenOrganizer ? tokenOrganizer : token;

    const response = await axios({
      method: 'get',
      url: `${apiUrl}${url}`,
      headers: {
        ...headersDefault,
        Authorization: 'Bearer ' + tokenCurrent,
      },
    }).catch((error) => {
      errorHandler(error);
    });

    if (response) {
      return response.data;
    }
    return null;
  } catch (error) {
    return null;
  }
}
