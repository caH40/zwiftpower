import axios from 'axios';

const server = import.meta.env.VITE_SERVER_EXPRESS;

export async function getZwiftRider(zwiftId) {
  try {
    const response = await axios({
      url: `${server}/api/zwift/rider/${zwiftId}`,
      method: 'get',
    });

    return response;
  } catch (error) {
    console.error(error); // eslint-disable-line
    throw error;
  }
}
