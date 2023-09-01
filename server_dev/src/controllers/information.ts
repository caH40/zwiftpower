import { Request, Response } from 'express';

import {
  getDevelopmentService,
  postDevelopmentService,
  deleteDevelopmentService,
  putDevelopmentService,
} from '../service/information/development.js';
import { sendMessageToTelegramBot } from '../service/telegrambot.js';

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
export async function postDevelopment(req: Request, res: Response) {
  try {
    const { releaseData } = req.body;
    const { userId } = req.params;

    const { infoDevelopment, ...response } = await postDevelopmentService(releaseData, userId);

    if (infoDevelopment) {
      await sendMessageToTelegramBot(infoDevelopment);
    }
    res.status(201).json(response);
  } catch (error) {
    console.log(error);
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    }
  }
}
export async function putDevelopment(req: Request, res: Response) {
  try {
    const { releaseData } = req.body;
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
export async function deleteDevelopment(req: Request, res: Response) {
  try {
    const { id } = req.body;
    const response = await deleteDevelopmentService(id);
    res.status(201).json(response);
  } catch (error) {
    console.log(error);
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    }
  }
}
