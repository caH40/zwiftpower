import { myAxios } from '../axios';

export async function changeZwiftEvents(event) {
  try {
    const response = await myAxios({
      url: '/api/zwift/events',
      method: 'put',
      data: { event },
    });

    return response;
  } catch (error) {
    console.error(error); // eslint-disable-line
    throw error;
  }
}
