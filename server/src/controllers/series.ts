import { Request, Response } from 'express';

import { handleErrorInController } from '../errors/error.js';
import { getNSeriesCurrentService, getNSeriesService } from '../service/series/series.js';

/**
 * Контроллер получения серий заездов.
 */
export async function getNSeries(req: Request, res: Response) {
  try {
    // Вызов сервиса.
    const response = await getNSeriesService();

    // Возврат успешного ответа.
    return res.status(200).json(response);
  } catch (error) {
    handleErrorInController(res, error);
  }
}

/**
 * Контроллер получения серии заездов.
 */
export async function getNSeriesCurrent(req: Request, res: Response) {
  try {
    const { urlSlug } = req.params;

    if (!urlSlug) {
      throw new Error(`Не получен urlSlug! urlSlug:${urlSlug}`);
    }

    // Вызов сервиса.
    const response = await getNSeriesCurrentService({ urlSlug });

    // Возврат успешного ответа.
    return res.status(200).json(response);
  } catch (error) {
    handleErrorInController(res, error);
  }
}
