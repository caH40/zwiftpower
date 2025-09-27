import WebSocket from 'ws';

import { handleAuthMessage, handleRegularMessage } from './service/websocket/auth.js';
import { ServiceMessage } from './service/ServiceMessage/ServiceMessage.js';
import { handleAndLogError } from './errors/error.js';

interface ConnectionState {
  isAuthenticated: boolean;
  userId: string | null;
}

export function setupWebSocketWithAuth(
  wss: WebSocket.Server,
  wsConnections: Map<string, Set<WebSocket>>
) {
  wss.on('connection', (ws) => {
    // Используем объект для сохранения состояния.
    const state: ConnectionState = {
      isAuthenticated: false,
      userId: null,
    };

    // Таймаут на авторизацию.
    const authTimeout = setTimeout(() => {
      if (!state.isAuthenticated) {
        ws.close(1008, 'Authentication timeout');
        if (state.userId) {
          removeUserConnection(wsConnections, state.userId, ws);
        }
      }
    }, 5000);

    // Отправляем запрос на аутентификацию.
    ws.send(
      JSON.stringify({
        type: 'AUTH_REQUIRED',
        message: 'Send AUTH message with token',
      })
    );

    ws.on('message', (data) => handleMessage({ ws, data, state, authTimeout, wsConnections }));

    ws.on('close', () => {
      clearTimeout(authTimeout);
      if (state.userId) {
        removeUserConnection(wsConnections, state.userId, ws);
      }
    });

    ws.on('error', (error) => {
      if (state.userId) {
        removeUserConnection(wsConnections, state.userId, ws);
      }
      handleAndLogError(error);
    });
  });

  // Отправка пинга на клиент.
  setInterval(() => {
    wss.clients.forEach((ws) => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.ping();
      }
    });
  }, 30000); // Пинг каждые 30 секунд.
}

async function handleMessage({
  ws,
  data,
  state,
  authTimeout,
  wsConnections,
}: {
  ws: WebSocket;
  data: WebSocket.RawData;
  state: ConnectionState;
  authTimeout: NodeJS.Timeout;
  wsConnections: Map<string, Set<WebSocket>>;
}) {
  try {
    const message = JSON.parse(data.toString());

    // Если уже авторизован, обрабатываем как обычное сообщение
    if (state.isAuthenticated) {
      handleRegularMessage(ws, data);
      return;
    }

    // Обрабатываем аутентификацию
    if (message.type === 'AUTH' && message.token) {
      const authResult = handleAuthMessage(message.token);

      if (authResult.userId) {
        // Успешная авторизация
        state.isAuthenticated = true;
        state.userId = authResult.userId;

        let connections = wsConnections.get(authResult.userId);

        if (!connections) {
          connections = new Set<WebSocket>();
          wsConnections.set(authResult.userId, connections);
        }
        connections.add(ws);

        clearTimeout(authTimeout);

        // Отправляем подтверждение
        ws.send(
          JSON.stringify({
            type: 'AUTH_SUCCESS',
            userId: state.userId,
          })
        );

        const serviceMessage = new ServiceMessage();
        const messages = await serviceMessage.getAll(state.userId);

        ws.send(
          JSON.stringify({
            type: 'SERVICE_MESSAGES',
            data: messages.data,
          })
        );

        // Переключаем на обработку обычных сообщений
        // Обработчик messageHandler остаётся, но теперь будет вызывать handleRegularMessage
        // благодаря проверке state.isAuthenticated
      } else {
        ws.send(
          JSON.stringify({
            type: 'AUTH_ERROR',
            message: authResult.error,
          })
        );
        ws.close(1008, authResult.error);
      }
    } else {
      // Если первое сообщение не AUTH
      ws.send(
        JSON.stringify({
          type: 'AUTH_ERROR',
          message: 'First message must be AUTH with token',
        })
      );
      ws.close(1008, 'Authentication required');
    }
  } catch (error) {
    ws.send(
      JSON.stringify({
        type: 'ERROR',
        message: 'Invalid message format',
      })
    );
    handleAndLogError(error);
  }
}

function removeUserConnection(
  wsConnections: Map<string, Set<WebSocket>>,
  userId: string,
  wc: WebSocket
): void {
  const userConnections = wsConnections.get(userId);

  if (!userConnections) {
    return;
  }

  userConnections.delete(wc);

  if (userConnections.size === 0) {
    wsConnections.delete(userId);
  }
}
