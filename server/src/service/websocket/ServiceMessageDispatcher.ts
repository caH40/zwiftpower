import WebSocket from 'ws';

import { handleAndLogError } from '../../errors/error.js';
import { ServiceMessage } from '../ServiceMessage/ServiceMessage.js';

// types
import { TAudioType } from '../../types/types.interface.js';

export class ServiceMessageDispatcher {
  private serviceMessage: ServiceMessage;

  constructor(private wsConnections: Map<string, WebSocket>) {
    this.serviceMessage = new ServiceMessage();
  }

  /** Отправка сообщения одному пользователю */
  async notifyUser(recipientUser: string, audioType?: TAudioType): Promise<void> {
    try {
      const ws = this.wsConnections.get(recipientUser);
      if (ws && ws.readyState === WebSocket.OPEN) {
        const messages = await this.serviceMessage.getAll(recipientUser);
        ws.send(
          JSON.stringify({
            type: 'SERVICE_MESSAGES',
            data: messages.data,
            audioType,
          })
        );
      }
    } catch (error) {
      handleAndLogError(error);
    }
  }

  /** Отправка сообщения нескольким пользователям */
  async notifyUsers(recipientUsers: string[], audioType?: TAudioType): Promise<void> {
    for (const userId of recipientUsers) {
      await this.notifyUser(userId, audioType);
    }
  }

  /** Массовая рассылка всем онлайн-пользователям */
  async broadcast(audioType?: TAudioType): Promise<void> {
    for (const [userId, ws] of this.wsConnections) {
      if (ws.readyState === WebSocket.OPEN) {
        try {
          const messages = await this.serviceMessage.getAll(userId);
          ws.send(JSON.stringify({ type: 'SERVICE_MESSAGES', data: messages.data, audioType }));
        } catch (err) {
          handleAndLogError(err);
        }
      }
    }
  }
}
