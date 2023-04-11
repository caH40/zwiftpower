import axios from 'axios';

const apiUrl = process.env.ZWIFT_API;
const headersDefault = {
  'Content-Type': 'application/x-protobuf-lite',
  Accept: 'application/json',
  Connection: 'keep-alive',
  'Zwift-Api-Version': '',
  'User-Agent': 'Zwift/115 CFNetwork/758.0.2 Darwin/15.0.0',
  'Accept-Language': 'en-us',
  'Accept-Encoding': 'gzip',
};

export async function getRequest(url, token) {
  try {
    const response = await axios({
      method: 'get',
      url: `${apiUrl}${url}`,
      headers: {
        ...headersDefault,
        Authorization: 'Bearer ' + token,
      },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
}
