import { Request, Response } from 'express';

import { TourResultsManager } from '../service/series/tour/TourResultsManager.js';
import { handleErrorInController } from '../errors/error.js';

export class TourController {
  constructor() {}

  /**
   * Получает список всех серий заездов.
   * @param {Request} req - Запрос Express.
   * @param {Response} res - Ответ Express.
   * @returns {Promise<Response>} JSON-ответ с сериями.
   */
  public updateResultsFromZwift = async (
    req: Request,
    res: Response
  ): Promise<Response | void> => {
    try {
      const { seriesId, stageOrder } = req.body;

      const tourResultsManager = new TourResultsManager(seriesId);

      // Вызов сервиса.
      const response = await tourResultsManager.buildStageProtocol(stageOrder);

      // Возврат успешного ответа.
      return res.status(200).json(response);
    } catch (error) {
      handleErrorInController(res, error);
    }
  };
}
