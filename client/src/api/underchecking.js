import { myAxios } from './axios';

export async function putUnderchecking(isUnderChecking, resultId) {
  try {
    const response = await myAxios({
      url: '/api/underchecking',
      method: 'put',
      data: { isUnderChecking, resultId },
    });
    return response;
  } catch (error) {
    console.error(error); // eslint-disable-line
    throw error;
  }
}
