import axios from 'axios';

export async function sendMessageToTelegramBot(messageObg) {
  try {
    const urlTelegramBot = process.env.TELEGRAM_BOT_HOST;
    const response = await axios(`${urlTelegramBot}/api/notice/group/pin`, {
      method: 'post',
      data: { messageObg },
    });

    return response;
  } catch (error) {
    console.error(error);
  }
}
