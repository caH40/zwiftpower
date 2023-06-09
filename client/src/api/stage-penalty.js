import { myAxios } from './axios';

export async function putPenalty(newPenalty, resultId) {
  try {
    const response = await myAxios({
      url: '/api/penalty',
      method: 'put',
      data: { newPenalty, resultId },
    });
    return response;
  } catch (error) {
    console.error(error); // eslint-disable-line
    throw error;
  }
}
