import { Request, Response } from 'express';

import { TourResultsManager } from '../service/series/tour/TourResultsManager.js';
import { handleErrorInController } from '../errors/error.js';
import {
  UpdateSeriesGCSchema,
  UpdateStageResultsSchema,
} from '../utils/deserialization/seriesResultsController.js';
import { TourGCManager } from '../service/series/tour/TourGCManager.js';
import { TSeriesType } from '../types/model.interface.js';
import { NSeriesModel } from '../Model/NSeries.js';
import { CategoryZSchema } from '../utils/deserialization/series/category.js';
import { SeriesController } from './series.js';
import { HandlerSeries } from '../service/series/HandlerSeries.js';

/**
 * Класс управления результатами серий.
 */
export class SeriesResultsController {
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

  /**
   * Обновление генеральной классификации Тура.
   */
  public updateGC = async (req: Request, res: Response): Promise<Response | void> => {
    try {
      // Десериализация и валидация входных данных.
      const { seriesId } = UpdateSeriesGCSchema.parse(req.body);

      // Получем тип серии заездов.
      const typeFromSeries = await NSeriesModel.findOne(
        { _id: seriesId },
        { _id: false, type: true }
      ).lean<{ type: TSeriesType }>();

      if (!typeFromSeries) {
        throw new Error(`Не найдена серия с _id:${seriesId}`);
      }

      let response = { data: null, message: 'Инициализация объекта responseService' };
      if (typeFromSeries.type === 'tour') {
        const tourGCService = new TourGCManager(seriesId);
        // Вызов сервиса.
        response = await tourGCService.update();
      } else {
        throw new Error(`Нет обработчика для типа серии: ${typeFromSeries.type}!`);
      }

      // Возврат успешного ответа.
      return res.status(200).json(response);
    } catch (error) {
      handleErrorInController(res, error);
    }
  };

  /**
   * Получает список всех серий заездов.
   * @param {Request} req - Запрос Express.
   * @param {Response} res - Ответ Express.
   * @returns {Promise<Response>} JSON-ответ с сериями.
   */
  public modifyCategory = async (req: Request, res: Response): Promise<Response | void> => {
    try {
      // id авторизованного пользователя, который делает запрос.
      const userId = req.user?.id;
      const result = CategoryZSchema.safeParse({ ...req.body, userId });

      if (!result.success) {
        return res.status(400).json({ errors: result.error.format() });
      }

      const { userId: moderator, seriesId, stageResultId, value, reason } = result.data;

      // Проверка, что запрос происходит от Организатора.
      const seriesController = new SeriesController();
      await seriesController.checkOrganizer(moderator);

      // Вызов сервиса.
      const handlerSeries = new HandlerSeries(seriesId);
      const response = await handlerSeries.modifyCategory({
        moderator: moderator.toString(),
        stageResultId,
        value,
        reason,
      });

      // Возврат успешного ответа.
      return res.status(200).json(response);
    } catch (error) {
      handleErrorInController(res, error);
    }
  };
}
