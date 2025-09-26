import WebSocket from 'ws';

import { handleAndLogError } from '../../errors/error.js';
import { ServiceMessage } from '../ServiceMessage/ServiceMessage.js';

export class ServiceMessageDispatcher {
  private serviceMessage: ServiceMessage;

  constructor(private wsConnections: Map<string, WebSocket>) {
    this.serviceMessage = new ServiceMessage();
  }

  /** Отправка сообщения одному пользователю */
  async notifyUser(recipientUser: string): Promise<void> {
    try {
      const ws = this.wsConnections.get(recipientUser);
      if (ws && ws.readyState === WebSocket.OPEN) {
        const messages = await this.serviceMessage.getAll(recipientUser);
        ws.send(JSON.stringify({ type: 'SERVICE_MESSAGES', data: messages.data }));
      }
    } catch (error) {
      handleAndLogError(error);
    }
  }

  /** Отправка сообщения нескольким пользователям */
  async notifyUsers(recipientUsers: string[]): Promise<void> {
    for (const userId of recipientUsers) {
      await this.notifyUser(userId);
    }
  }

  /** Массовая рассылка всем онлайн-пользователям */
  async broadcast(): Promise<void> {
    for (const [userId, ws] of this.wsConnections) {
      if (ws.readyState === WebSocket.OPEN) {
        try {
          const messages = await this.serviceMessage.getAll(userId);
          ws.send(JSON.stringify({ type: 'SERVICE_MESSAGES', data: messages.data }));
        } catch (err) {
          handleAndLogError(err);
        }
      }
    }
  }
}
