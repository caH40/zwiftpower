import axios from 'axios';

import { InfoDevelopmentSchema } from '../types/model.interface.js';
import { telegramBotHost } from '../config/environment.js';

// отправка сообщения с закреплением сообщения вверху окна
export async function sendMessageToTelegramBot(messageObg: InfoDevelopmentSchema) {
  const urlTelegramBot = telegramBotHost;
  const response = await axios(`${urlTelegramBot}/api/notice/group/pin`, {
    method: 'post',
    data: { messageObg },
  });

  return response;
}
