import { Request, Response } from 'express';

import { handleAndLogError } from '../errors/error.js';
import { isValidNotifications } from './profile.js';
import { postNotificationService } from '../service/notifications/notofocations.js';

/**
 * Контроллер получения включенных трансляций пользователей.
 */
export async function postNotification(req: Request, res: Response) {
  try {
    const { text, notificationsTypes, subject, title } = req.body;

    if (!isValidNotifications(notificationsTypes)) {
      throw new Error(`Некорректные данные notificationsTypes`);
    }

    if (!title) {
      throw new Error('Нет заголовка для письма!');
    }

    if (!subject) {
      throw new Error('Нет темы для письма!');
    }

    if (!text) {
      throw new Error('Нет текстового сообщения!');
    }

    const response = await postNotificationService({
      text,
      notificationsTypes,
      subject,
      title,
    });

    return res.status(200).json(response);
  } catch (error) {
    handleAndLogError(error);
    const message = error instanceof Error ? error.message : 'Неизвестная ошибка';
    return res.status(400).json({ message });
  }
}
