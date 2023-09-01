import axios from 'axios';
import { getAccessToken } from './token.js';
import { errorAxios } from '../../app_modules/error/axios.js';

const apiUrl = process.env.ZWIFT_API;
const headersDefault = {
  'Content-Type': 'application/x-protobuf-lite',
  Accept: 'application/json',
  Connection: 'keep-alive',
  'Zwift-Api-Version': '2.6',
  'User-Agent': 'Zwift/115 CFNetwork/758.0.2 Darwin/15.0.0',
  'Accept-Language': 'en-us',
  'Accept-Encoding': 'gzip',
};

// запрос по url на открытое API Звифта
export async function getRequest(url, isMainToken = true) {
  try {
    const token = await getAccessToken(isMainToken);

    const response = await axios({
      method: 'get',
      url: `${apiUrl}${url}`,
      headers: {
        ...headersDefault,
        Authorization: 'Bearer ' + token,
      },
    }).catch((error) => {
      errorAxios(error, 'getRequest');
    });
    return response.data;
  } catch (error) {
    console.log(`${apiUrl}${url}`);
    console.error(error);
  }
}
