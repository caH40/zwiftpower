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
  wsConnections: Map<string, WebSocket>
) {
  wss.on('connection', (ws, req) => {
    const clientIP = req.socket.remoteAddress;
    console.log(`🔌 New connection from: ${clientIP}`);

    // Используем объект для сохранения состояния
    const state: ConnectionState = {
      isAuthenticated: false,
      userId: null,
    };

    // Таймаут на авторизацию
    const authTimeout = setTimeout(() => {
      if (!state.isAuthenticated) {
        console.log(`⏰ Auth timeout for: ${clientIP}`);

        ws.close(1008, 'Authentication timeout');
        state.userId && wsConnections.delete(state.userId);
      }
    }, 5000);

    // Отправляем запрос на аутентификацию
    ws.send(
      JSON.stringify({
        type: 'AUTH_REQUIRED',
        message: 'Send AUTH message with token',
      })
    );

    ws.on('message', (data) =>
      handleMessage({ ws, data, state, authTimeout, wsConnections, clientIP })
    );

    ws.on('close', (code, reason) => {
      clearTimeout(authTimeout);
      state.userId && wsConnections.delete(state.userId);
      console.log(`🔌 Connection closed: ${clientIP}, code: ${code}, reason: ${reason}`);
    });

    ws.on('error', (error) => {
      state.userId && wsConnections.delete(state.userId);
      handleAndLogError(error);
    });
  });
}

async function handleMessage({
  ws,
  data,
  state,
  authTimeout,
  wsConnections,
  clientIP,
}: {
  ws: WebSocket;
  data: WebSocket.RawData;
  state: ConnectionState;
  authTimeout: NodeJS.Timeout;
  wsConnections: Map<string, WebSocket>;
  clientIP?: string;
}) {
  try {
    const message = JSON.parse(data.toString());

    console.log(`📨 Message from ${clientIP}:`, message.type);

    // Если уже авторизован, обрабатываем как обычное сообщение
    if (state.isAuthenticated) {
      handleRegularMessage(ws, state.userId!, data);
      return;
    }

    // Обрабатываем аутентификацию
    if (message.type === 'AUTH' && message.token) {
      console.log(`🔑 Auth attempt from: ${clientIP}`);
      const authResult = handleAuthMessage(message.token);

      if (authResult.userId) {
        // Успешная авторизация
        state.isAuthenticated = true;
        state.userId = authResult.userId;
        wsConnections.set(authResult.userId, ws);
        clearTimeout(authTimeout);

        console.log(`✅ User ${state.userId} authenticated`);

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
    console.error(`💥 Parse error from ${clientIP}:`, error);

    ws.send(
      JSON.stringify({
        type: 'ERROR',
        message: 'Invalid message format',
      })
    );
    handleAndLogError(error);
  }
}
