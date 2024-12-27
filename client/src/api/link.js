import { myAxios } from './axios';

/**
 * Привязка аккаунта VK ID к текущему пользователю.
 */
export async function postLinkVkAccount({ tokens }) {
  try {
    const response = await myAxios({
      method: 'post',
      url: '/api/auth/link/vk',
      data: { tokens },
    });

    return response.data;
  } catch (error) {
    console.error(error); // eslint-disable-line
    throw error;
  }
}
