import { myAxios } from './axios';

export async function postSchedule(schedules) {
  try {
    delete schedules.fileAttributes;
    const response = await myAxios({
      url: '/api/schedule',
      method: 'post',
      data: { schedules },
    });
    return response;
  } catch (error) {
    console.error(error); // eslint-disable-line
    throw error;
  }
}
export async function postResults(results) {
  try {
    const response = await myAxios({
      url: '/api/results',
      method: 'post',
      data: { results },
    });
    return response;
  } catch (error) {
    console.error(error); // eslint-disable-line
    throw error;
  }
}
