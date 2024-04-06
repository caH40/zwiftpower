import { Request, Response } from 'express';

import { errorHandler } from '../errors/error.js';
import {
  getDevelopmentService,
  postDevelopmentService,
  deleteDevelopmentService,
  putDevelopmentService,
} from '../service/information/development.js';
import { sendMessageToTelegramBot } from '../service/telegrambot.js';

// types
import { PostDevelopment } from '../types/http.interface.js';
import { InfoDevelopmentSchema } from '../types/model.interface.js';

/**
 * Обработчик запроса на получение информации о разработке.
 */
export async function getDevelopment(req: Request, res: Response) {
  try {
    const query = req.query;
    if (!query?.quantityPosts) {
      throw new Error('Некорректное значение количества постов по изменениям на сайте');
    }
    const quantityPosts: number = +query.quantityPosts;
    if (isNaN(quantityPosts) || quantityPosts <= 0) {
      throw new Error('Некорректное значение количества постов по изменениям на сайте');
    }

    const informationDev = await getDevelopmentService(quantityPosts);
    res.status(200).json(informationDev);
  } catch (error) {
    errorHandler(error);
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    }
  }
}
//
//
export async function postDevelopment(req: Request, res: Response) {
  try {
    const releaseData: PostDevelopment = req.body.releaseData;

    const { userId } = req.params;

    const responsePosted = await postDevelopmentService(releaseData, userId);
    if (!responsePosted) {
      throw new Error('Ошибка при сохранении релиза в БД');
    }

    const { infoDevelopment, ...response } = responsePosted;

    if (infoDevelopment) {
      await sendMessageToTelegramBot(infoDevelopment).catch((error) => errorHandler(error));
    }
    res.status(201).json(response);
  } catch (error) {
    errorHandler(error);
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    }
  }
}
//
//
export async function putDevelopment(req: Request, res: Response) {
  try {
    const releaseData: InfoDevelopmentSchema = req.body.releaseData;
    const { userId } = req.params;

    const response = await putDevelopmentService(releaseData, userId);
    res.status(200).json(response);
  } catch (error) {
    errorHandler(error);
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    }
  }
}
//
//
export async function deleteDevelopment(req: Request, res: Response) {
  try {
    const id: string = req.body.id;
    const response = await deleteDevelopmentService(id);
    res.status(201).json(response);
  } catch (error) {
    errorHandler(error);
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    }
  }
}
