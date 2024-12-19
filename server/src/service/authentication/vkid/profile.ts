import axios, { AxiosResponse } from 'axios';

import { TResponseService, VkUserInfoResponse } from '../../../types/http.interface.js';
import { clientVkID } from '../../../config/environment.js';

/**
 * Получение данных авторизующегося профиля пользователя из VK API.
 */
export async function getUserProfileVkService({
  accessToken,
}: {
  accessToken: string;
}): Promise<TResponseService<VkUserInfoResponse>> {
  const response: AxiosResponse<VkUserInfoResponse> = await axios({
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    url: 'https://id.vk.com/oauth2/user_info',
    data: { client_id: clientVkID, access_token: accessToken },
  });

  return {
    data: response.data,
    message: 'Данные профиля авторизовавшегося пользователя из  VK ID',
  };
}
