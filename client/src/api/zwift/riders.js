import { myAxios } from '../axios';

export async function putSingedRiders(eventId) {
  try {
    const response = await myAxios({
      url: '/api/zwift/events/singed',
      method: 'put',
      data: { eventId },
    });

    return response;
  } catch (error) {
    console.error(error); // eslint-disable-line
    throw error;
  }
}
