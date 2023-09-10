import { Request, Response } from 'express';

import {
  getDevelopmentService,
  postDevelopmentService,
  deleteDevelopmentService,
  putDevelopmentService,
} from '../service/information/development.js';
import { sendMessageToTelegramBot } from '../service/telegrambot.js';
import { PostDevelopment } from '../types/http.interface.js';
import { InfoDevelopmentSchema } from '../types/model.interface.js';
//
//
export async function getDevelopment(req: Request, res: Response) {
  try {
    const informationDev = await getDevelopmentService();
    res.status(200).json(informationDev);
  } catch (error) {
    console.log(error);
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
      await sendMessageToTelegramBot(infoDevelopment).catch((error) => console.log(error));
    }
    res.status(201).json(response);
  } catch (error) {
    console.log(error);
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
    console.log(error);
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
    console.log(error);
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    }
  }
}
