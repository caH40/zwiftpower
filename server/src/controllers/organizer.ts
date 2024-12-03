import { ObjectId } from 'mongoose';
import { Request, Response } from 'express';

import { errorHandler } from '../errors/error.js';
import {
  deleteOrganizerBotZwiftService,
  getOrganizerBotZwiftService,
  putOrganizerBotZwiftService,
} from '../service/organizer/bot.js';
import { Organizer } from '../Model/Organizer.js';

/**
 * Контроллер для добавления или редактирования данных бота-модератора для организаторов в Звифт.
 */
export async function putOrganizerBotZwift(req: Request, res: Response) {
  try {
    const { organizerId, username, password, importance } = req.body;
    const { userId } = req.params;

    // Проверка обязательных параметров
    if (!username) {
      throw new Error('Нет username (email) для бота!');
    }

    if (!password) {
      throw new Error('Нет password для бота!');
    }

    if (!organizerId) {
      throw new Error('Нет organizerId!');
    }

    // Проверка, что пользователь имеет доступ к организатору.
    const organizerDB = await Organizer.findOne({ creator: userId }, { _id: true }).lean<{
      _id: ObjectId;
    }>();

    if (!organizerDB) {
      return res.status(404).json({ message: 'Организатор не найден!' });
    }

    // Проверка, что organizerId, который пришел с клиента, совпадает с id организатора в БД.
    if (organizerId !== String(organizerDB._id)) {
      return res.status(403).json({ message: 'У вас нет доступа к этому организатору!' });
    }

    // Вызов сервиса для добавления/обновления данных бота
    const response = await putOrganizerBotZwiftService({
      organizerId,
      username,
      password,
      importance,
    });

    // Возврат успешного ответа
    return res.status(200).json(response);
  } catch (error) {
    // Обработка ошибок
    errorHandler(error);

    // Сообщение об ошибке
    const message = error instanceof Error ? error.message : 'Неизвестная ошибка';
    return res.status(400).json({ message });
  }
}

/**
 * Контроллер для добавления или редактирования данных бота-модератора для организаторов в Звифт.
 */
export async function getOrganizerBotZwift(req: Request, res: Response) {
  try {
    const { userId } = req.params;

    // Вызов сервиса для добавления/обновления данных бота
    const response = await getOrganizerBotZwiftService({ creatorId: userId });

    // Возврат успешного ответа
    return res.status(200).json(response);
  } catch (error) {
    // Обработка ошибок
    errorHandler(error);

    // Сообщение об ошибке
    const message = error instanceof Error ? error.message : 'Неизвестная ошибка';
    return res.status(400).json({ message });
  }
}

/**
 * Контроллер для удаления токена и данных бота-модератора для организаторов в Звифт.
 */
export async function deleteOrganizerBotZwift(req: Request, res: Response) {
  try {
    const { tokenId } = req.body;

    if (!tokenId) {
      throw new Error('Нет tokenId!');
    }

    // Вызов сервиса для удаления токена и данных бота.
    const response = await deleteOrganizerBotZwiftService({ tokenId });

    // Возврат успешного ответаю
    return res.status(200).json(response);
  } catch (error) {
    // Обработка ошибок.
    errorHandler(error);

    // Сообщение об ошибке.
    const message = error instanceof Error ? error.message : 'Неизвестная ошибка';
    return res.status(400).json({ message });
  }
}
