import { getAllServiceMessageForUserDto } from '../../dto/service-message.js';
import { handleAndLogError } from '../../errors/error.js';
import { ServiceMessageModel } from '../../Model/ServiceMessage.js';

// types
import { TGetAllServiceMessagesForUserDto } from '../../types/dto.interface.js';
import { TServiceMessage } from '../../types/model.interface.js';
import { TCreateMethodServiceMessageParams } from '../../types/service-message.types.js';
import { wsConnections } from '../../zp-server.js';
import { ServiceMessageDispatcher } from '../websocket/ServiceMessageDispatcher.js';

/**
 * Класс сервисные сообщения на сайте.
 */
export class ServiceMessage {
  /**
   * Все сообщения для пользователя.

   * Возвращает массив объектов с тексом сообщения и возможной ссылкой на сущность источника сообщения.
   */
  async getAll(
    userId: string
  ): Promise<{ data: TGetAllServiceMessagesForUserDto[]; message: string }> {
    const messagesDB = await ServiceMessageModel.find(
      {
        recipientUser: userId,
      },
      { initiatorUser: false, recipientUser: false }
    )
      .sort({ createdAt: -1 })
      .limit(20)
      .lean<Omit<TServiceMessage, 'recipientUser' | 'initiatorUser'>[]>();

    const messagesAfterDto = messagesDB.map((m) => getAllServiceMessageForUserDto(m));

    return { data: messagesAfterDto, message: 'Сервисные сообщения' };
  }

  /**
   * Создание сервисного сообщения.
   * Формируется после успешных/неуспешных выполнений сервисов для которых необходимо
   * формировать сервисные сообщения для информирования пользователей.
   */
  async create(params: TCreateMethodServiceMessageParams): Promise<void> {
    try {
      await ServiceMessageModel.create(params);
    } catch (error) {
      handleAndLogError(error);
    }
  }

  /**
   * Массовое создание сервисных сообщений.
   */
  async createMany(messages: TCreateMethodServiceMessageParams[]): Promise<void> {
    try {
      if (!messages.length) return;

      await ServiceMessageModel.insertMany(messages.map((m) => m));
    } catch (error) {
      handleAndLogError(error);
    }
  }

  /**
   * Отмечает как прочитанные сообщения.
   */
  async markMessagesAsRead(messagesId: string): Promise<{ data: null; message: string }> {
    const sMessageDB = await ServiceMessageModel.findOneAndUpdate(
      {
        _id: { $in: messagesId },
      },
      { $set: { isRead: true } }
    );

    if (!sMessageDB) {
      throw new Error(`Не найдено сервисное сообщение с _id: "${messagesId}"`);
    }

    // Отправка обновленных данных сервисных сообщений пользователю recipientUser.
    const dispatcher = new ServiceMessageDispatcher(wsConnections);
    dispatcher.notifyUser(sMessageDB.recipientUser.toString());

    return {
      data: null,
      message: `Сообщение отмеченное как прочитанное (${sMessageDB.text})`,
    };
  }
}
