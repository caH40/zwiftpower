import { Request, Response } from 'express';

import { getEnabledUserStreamsService } from '../service/streams/streams.js';
import { handleAndLogError } from '../errors/error.js';

/**
 * Контроллер получения включенных трансляций пользователей.
 */
export async function getEnabledUserStreams(req: Request, res: Response) {
  try {
    const response = await getEnabledUserStreamsService();

    return res.status(200).json(response);
  } catch (error) {
    handleAndLogError(error);
    const message = error instanceof Error ? error.message : 'Неизвестная ошибка';
    return res.status(400).json({ message });
  }
}
