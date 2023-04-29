import axios from 'axios';

const apiUrl = process.env.ZWIFT_API;
const headersDefault = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
  Connection: 'keep-alive',
  'Zwift-Api-Version': '2.6',
  'User-Agent': 'Zwift/115 CFNetwork/758.0.2 Darwin/15.0.0',
  'Accept-Language': 'ru,en;q=0.9,ko;q=0.8',
  'Accept-Encoding': 'gzip,deflate, br',
  'Cache-Control': 'no-cache',
  Referer: 'https://www.zwift.com/',
  Source: 'my-zwift',
};

export async function putRequest(url, token, data) {
  try {
    const response = await axios({
      method: 'put',
      url: `${apiUrl}${url}`,
      headers: {
        ...headersDefault,
        Authorization: 'Bearer ' + token,
      },
      data,
    });

    return response.data;
  } catch (error) {
    throw error;
  }
}