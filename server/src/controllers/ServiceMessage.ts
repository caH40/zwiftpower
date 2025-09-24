import { Request, Response } from 'express';

import { handleErrorInController } from '../errors/error.js';
import { ServiceMessage } from '../service/ServiceMessage/ServiceMessage.js';

/**
 * Контроллер работы с сущностью "Команда".
 */
export class ServiceMessageController {
  private serviceMessage: ServiceMessage;

  constructor() {
    this.serviceMessage = new ServiceMessage();
  }

  /**
   * Возвращает массив объектов с тексом сообщения и возможной ссылкой на сущность источника сообщения.
   */
  public getAll = async (req: Request, res: Response): Promise<Response | void> => {
    try {
      const userId = req.user?.id;

      if (!userId) {
        return res.status(400).json({ message: 'Не получен userId' });
      }

      // Вызов сервиса.
      const response = await this.serviceMessage.getAll(userId);

      // Возврат успешного ответа.
      return res.status(200).json(response);
    } catch (error) {
      handleErrorInController(res, error);
    }
  };

  /**
   * Возвращает массив объектов с тексом сообщения и возможной ссылкой на сущность источника сообщения.
   */
  public markMessagesAsRead = async (req: Request, res: Response): Promise<Response | void> => {
    try {
      const userId = req.user?.id;
      const messageIds = req.body.messageIds;

      if (!userId) {
        return res.status(400).json({ message: 'Не получен userId' });
      }
      if (!messageIds || messageIds.length === 0) {
        return res.status(400).json({ message: 'Не получены messageIds' });
      }

      // Вызов сервиса.
      const response = await this.serviceMessage.markMessagesAsRead(messageIds);

      // Возврат успешного ответа.
      return res.status(200).json(response);
    } catch (error) {
      handleErrorInController(res, error);
    }
  };
}
