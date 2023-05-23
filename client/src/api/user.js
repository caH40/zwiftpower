import { myAxios } from './axios';

export async function updateZwiftId(zwiftId) {
  try {
    const response = await myAxios({
      method: 'put',
      url: '/api/user',
      data: { zwiftId },
    });

    return response;
  } catch (error) {
    console.error(error); // eslint-disable-line
    throw error;
  }
}
