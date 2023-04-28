import axios from 'axios';

const serverExpress = process.env.REACT_APP_SERVER_EXPRESS;

export async function putResults(eventId) {
  try {
    const response = await axios({
      url: `${serverExpress}/api/race/results`,
      method: 'put',
      data: { eventId },
    });

    return response;
  } catch (error) {
    console.error(error); // eslint-disable-line
    throw error;
  }
}

export async function getResults(eventId) {
  try {
    const response = await axios({
      url: `${serverExpress}/api/race/results/${eventId}`,
      method: 'get',
    });

    return response;
  } catch (error) {
    console.error(error); // eslint-disable-line
    throw error;
  }
}
