import WebSocket from 'ws';

import { handleAndLogError } from '../../errors/error.js';
import { ServiceMessage } from '../ServiceMessage/ServiceMessage.js';

// types
import { TAudioType } from '../../types/types.interface.js';

export class ServiceMessageDispatcher {
  private serviceMessage: ServiceMessage;

  constructor(private wsConnections: Map<string, Set<WebSocket>>) {
    this.serviceMessage = new ServiceMessage();
  }

  /** Отправка сообщения одному пользователю */
  async notifyUser(recipientUser: string, audioType?: TAudioType): Promise<void> {
    try {
      const connections = this.wsConnections.get(recipientUser);

      const messages = await this.serviceMessage.getAll(recipientUser);

      const payload = JSON.stringify({
        type: 'SERVICE_MESSAGES',
        data: messages.data,
        audioType,
      });

      connections?.forEach((ws) => {
        if (ws && ws.readyState === WebSocket.OPEN) {
          ws.send(payload);
        }
      });
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
    const broadcastPromises = Array.from(this.wsConnections.entries()).map(
      async ([userId, connections]) => {
        try {
          const messages = await this.serviceMessage.getAll(userId);
          const payload = JSON.stringify({
            type: 'SERVICE_MESSAGES',
            data: messages.data,
            audioType,
          });

          connections.forEach((ws) => {
            if (ws.readyState === WebSocket.OPEN) {
              try {
                ws.send(payload);
              } catch (err) {
                handleAndLogError(err);
              }
            }
          });
        } catch (err) {
          handleAndLogError(err);
        }
      }
    );

    await Promise.all(broadcastPromises);
  }
}
