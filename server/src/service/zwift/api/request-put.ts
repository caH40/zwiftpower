import axios, { isAxiosError } from 'axios';

import { zwiftAPI } from '../../../config/environment.js';

//types
import { PutEvent } from '../../../types/http.interface.js';
import { ParamsRequestToZwift } from '../../../types/types.interface.js';

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

export async function putRequest({
  url,
  data,
  tokenOrganizer,
}: ParamsRequestToZwift<PutEvent>) {
  try {
    if (!tokenOrganizer) {
      throw new Error('Не получен токен доступа организатора к Zwift API!');
    }

    const response = await axios({
      method: 'put',
      url: `${apiUrl}${url}`,
      headers: {
        ...headersDefault,
        Authorization: 'Bearer ' + tokenOrganizer,
      },
      data,
    });

    return response.data; // response.data null это нормальный ответ
  } catch (error) {
    // Обработка ошибок, связанных с токеном.
    if (isAxiosError(error)) {
      if (error.response?.status === 401) {
        throw new Error('Токен доступа невалидный или истёк! Пожалуйста, обновите токен.');
      } else if (!error.response) {
        throw new Error('Ошибка сети или недоступность API.');
      }
    }

    // Повторно выбрасываем остальные ошибки
    throw error;
  }
}
