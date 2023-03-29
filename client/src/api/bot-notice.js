import axios from 'axios';

export async function postNotice(message) {
  try {
    const response = await axios({
      url: 'http://localhost:8080/api/notice/message',
      method: 'post',
      data: { message },
      headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
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
      url: 'http://localhost:8080/api/notice/protocol',
      method: 'post',
      data: { protocol },
      headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
    });

    return response;
  } catch (error) {
    console.error(error); // eslint-disable-line
    throw error;
  }
}
