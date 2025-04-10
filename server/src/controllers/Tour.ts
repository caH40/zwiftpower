import { Request, Response } from 'express';

import { TourResultsManager } from '../service/series/tour/TourResultsManager.js';
import { handleErrorInController } from '../errors/error.js';
import { UpdateStageResultsSchema } from '../utils/deserialization/tourController.js';

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
      // Десериализация и валидация входных данных.
      const { seriesId, stageOrder } = UpdateStageResultsSchema.parse(req.body);

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
