import { myAxios } from './axios';

export async function putDisqualification(isDisqualification, resultId) {
  try {
    const response = await myAxios({
      url: '/api/disqualification',
      method: 'put',
      data: { isDisqualification, resultId },
    });
    return response;
  } catch (error) {
    console.error(error); // eslint-disable-line
    throw error;
  }
}
