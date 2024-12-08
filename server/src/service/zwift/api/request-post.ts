import axios from 'axios';

import { zwiftAPI } from '../../../config/environment.js';

//types
import { PostZwiftEvent } from '../../../types/http.interface.js';
import { ParamsRequestToZwift } from '../../../types/types.interface.js';

const apiUrl = zwiftAPI;

const headersDefault = {
  Accept: 'application/json',
  'Accept-Encoding': 'gzip',
  'User-Agent':
    'com.zwift.android.prod/3.52.0-1675 (samsung SM-S901N/Android 9) loggedInUserId=169979',
  'Content-Type': 'application/json',
  Source: 'zwift-companion',
  'Zwift-Api-Version': '2.6',
  Connection: 'keep-alive',
  Host: 'us-or-rly101.zwift.com',
};

export async function postRequest({
  url,
  data,
  tokenOrganizer,
}: ParamsRequestToZwift<PostZwiftEvent>) {
  const response = await axios({
    method: 'post',
    url: `${apiUrl}${url}`,
    headers: {
      ...headersDefault,
      Authorization: 'Bearer ' + tokenOrganizer,
    },
    data,
  });

  if (response) {
    return response.data;
  }
  return null;
}
