import axios from 'axios';

import { lsAccessToken } from '../constants/localstorage';

export async function postNotice(message) {
  try {
    const response = await axios({
      url: 'https://zwiftrace.ru/api/notice/message',
      method: 'post',
      data: { message },
      headers: { Authorization: `Bearer ${localStorage.getItem(lsAccessToken)}` },
    });

    return response;
  } catch (error) {
    console.error(error); // eslint-disable-line
    throw error;
  }
}

export async function postNoticeProtocol(protocol) {
  try {
    const response = await axios({
      url: 'https://zwiftrace.ru/api/notice/protocol',
      method: 'post',
      data: { protocol },
      headers: { Authorization: `Bearer ${localStorage.getItem(lsAccessToken)}` },
    });

    return response;
  } catch (error) {
    console.error(error); // eslint-disable-line
    throw error;
  }
}
