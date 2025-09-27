/* eslint-disable no-console */
import { useEffect } from 'react';

import { webSocketServer } from '../config/environment';

export function useWebSocket(setServerData) {
  useEffect(() => {
    const token = localStorage.getItem('__zp_accessToken');

    const ws = new WebSocket(webSocketServer);

    ws.onerror = (error) => {
      console.error('Ошибка соединения WebSocket:', error);
    };

    ws.onopen = () => {
      ws.send(
        JSON.stringify({
          type: 'AUTH',
          token,
        })
      );
    };

    ws.onmessage = (event) => {
      console.log(event.data?.type);

      try {
        const data = JSON.parse(event.data);

        switch (data.type) {
          case 'AUTH_REQUIRED':
            console.log(data.message);
            break;
          case 'AUTH_SUCCESS':
            console.log('Authenticated successfully');
            break;
          case 'SERVICE_MESSAGES':
            setServerData(data.data);
            break;
          case 'AUTH_ERROR':
            console.error('Auth failed:', data.message);
            break;
          default:
            // любые полезные данные от сервера
            console.log(data);

            break;
        }
      } catch (e) {
        console.error('Ошибка парсинга сообщения:', e);
      }
    };

    ws.onclose = (event) => {
      console.log('🔌 WebSocket closed:', {
        code: event.code,
        reason: event.reason,
        wasClean: event.wasClean,
        timestamp: new Date().toISOString(),
      });
    };

    // 🧹 cleanup — закрыть соединение
    return () => {
      ws.close();
      // console.log('WebSocket closed');
    };
  }, [setServerData]);
}
