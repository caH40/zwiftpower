import WebSocket from 'ws';

import { validateAccessToken } from '../authentication/token.js';

// Отдельная функция для обработки аутентификации
export function handleAuthMessage(token: string): { userId: string | null; error?: string } {
  try {
    if (!token || token === 'null') {
      return { userId: null, error: 'Токен отсутствует или равен null' };
    }

    const isValidAccessToken = validateAccessToken(token);
    if (!isValidAccessToken) {
      return { userId: null, error: 'Неактуальный accessToken' };
    }

    return { userId: isValidAccessToken.id };
  } catch (error) {
    return { userId: null, error: 'Ошибка аутентификации' };
  }
}

// Обработка обычных сообщений после аутентификации
export function handleRegularMessage(
  ws: WebSocket,
  userId: string | null,
  data: WebSocket.RawData
) {
  try {
    const message = JSON.parse(data.toString());
    console.log(`📨 Message from userId ${userId}:`, message);

    switch (message.type) {
      case 'PING':
        ws.send(JSON.stringify({ type: 'PONG', timestamp: Date.now() }));
        break;
      case 'MARK_AS_READ':
        if (message.messageId) {
          // Обработка пометки как прочитанного
        }
        break;
      default:
        ws.send(
          JSON.stringify({
            type: 'ERROR',
            message: 'Unknown message type',
          })
        );
    }
  } catch (error) {
    ws.send(
      JSON.stringify({
        type: 'ERROR',
        message: 'Invalid JSON format',
      })
    );
  }
}
