import axios from 'axios';

const server = import.meta.env.VITE_SERVER_EXPRESS;

export async function postLogout() {
  try {
    const response = await axios({
      method: 'post',
      url: `${server}/api/auth/logout`,
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error(error); // eslint-disable-line
    throw error;
  }
}
