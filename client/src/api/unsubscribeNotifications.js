import axios from 'axios';

import { serverExpress } from '../config/environment';

export async function unsubscribeNotifications(userId) {
  try {
    const res = await axios.patch(`${serverExpress}/api/notifications/unsubscribe/${userId}`);

    return res.data;
  } catch (error) {
    throw error;
  }
}
