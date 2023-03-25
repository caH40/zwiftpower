import { myAxios } from './axios';

export async function getRiders() {
  try {
    const response = await myAxios({
      url: '/api/riders',
      method: 'get',
    });
    return response;
  } catch (error) {
    console.error(error); // eslint-disable-line
    throw error;
  }
}
export async function getRider(zwiftId) {
  try {
    const response = await myAxios({
      url: `/api/rider/${zwiftId}`,
      method: 'get',
    });
    return response;
  } catch (error) {
    console.error(error); // eslint-disable-line
    throw error;
  }
}
