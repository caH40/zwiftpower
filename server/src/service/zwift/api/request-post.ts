import axios, { isAxiosError } from 'axios';

import { zwiftAPI } from '../../../config/environment.js';

//types
import { PostZwiftEvent } from '../../../types/http.interface.js';
import { ParamsRequestToZwift } from '../../../types/types.interface.js';

const apiUrl = zwiftAPI;

const headersDefault = {
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

export async function postRequest({
  url,
  data,
  tokenOrganizer,
}: ParamsRequestToZwift<PostZwiftEvent>) {
  try {
    if (!tokenOrganizer) {
      throw new Error('Не получен токен доступа организатора к ZwiftAPI!');
    }

    const response = await axios({
      method: 'post',
      url: `${apiUrl}${url}`,
      headers: {
        ...headersDefault,
        Authorization: 'Bearer ' + tokenOrganizer,
      },
      data,
    });

    // Проверка на пустое тело ответа.
    if (!response?.data) {
      throw new Error('Пустое тело ответа от Zwift API. Возможно, токен устарел.');
    }

    return response.data;
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
