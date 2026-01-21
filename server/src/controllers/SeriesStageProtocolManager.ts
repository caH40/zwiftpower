import { Request, Response } from 'express';

import { handleErrorInController } from '../errors/error.js';
import {
  UpdateSeriesGCSchema,
  UpdateStageResultsSchema,
} from '../utils/deserialization/seriesResultsController.js';
import { CategoryZSchema } from '../utils/deserialization/series/category.js';
import { SeriesOrganizerController } from './SeriesOrganizer.js';
import { SeriesStageProtocolManager } from '../service/series/SeriesStageProtocolManager.js';
import { SeriesGCManager } from '../service/series/SeriesGCManager.js';
import { SeriesCategoryService } from '../service/series/category/SeriesCategory.js';
import { TimePenaltyZSchema } from '../utils/deserialization/series/timePenalty.js';
import { SeriesTimePenalty } from '../service/series/SeriesTimePenalty.js';
import { AddStageResultZSchema } from '../utils/deserialization/series/addStageResult.js';
import { SeriesAddStageResult } from '../service/series/SeriesAddStageResult.js';
import { handleSafeParseErrors } from '../utils/zod.js';

/**
 * Класс управления результатами серий.
 */
export class SeriesStageProtocolManagerController {
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

      const protocolManager = new SeriesStageProtocolManager(seriesId);

      // Вызов сервиса.
      const response = await protocolManager.updateStageProtocolAndGC(stageOrder);

      // Возврат успешного ответа.
      return res.status(200).json(response);
    } catch (error) {
      handleErrorInController(res, error);
    }
  };

  /**
   * Обновление генеральной классификации.
   */
  public updateGC = async (req: Request, res: Response): Promise<Response | void> => {
    try {
      // Десериализация и валидация входных данных.
      const { seriesId } = UpdateSeriesGCSchema.parse(req.body);

      const gCManager = new SeriesGCManager(seriesId);
      const response = await gCManager.recalculateGCWithAllStages();

      // Возврат успешного ответа.
      return res.status(200).json(response);
    } catch (error) {
      handleErrorInController(res, error);
    }
  };

  /**
   * Изменение категории райдера в заезде.
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
      const seriesController = new SeriesOrganizerController();
      await seriesController.checkOrganizer(moderator);

      // Вызов сервиса.
      const categoryService = new SeriesCategoryService(seriesId);
      const response = await categoryService.modifyCategory({
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

  /**
   * Изменение временного штрафа райдера в заезде.
   * @param {Request} req - Запрос Express.
   * @param {Response} res - Ответ Express.
   * @returns {Promise<Response>} JSON-ответ с сериями.
   */
  public modifyTimePenalty = async (req: Request, res: Response): Promise<Response | void> => {
    try {
      // id авторизованного пользователя, который делает запрос.
      const userId = req.user?.id;

      const result = TimePenaltyZSchema.safeParse({ ...req.body, userId });

      if (!result.success) {
        return res.status(400).json({ errors: result.error.format() });
      }

      const { userId: moderator, seriesId, stageResultId, timePenalty } = result.data;

      // Проверка, что запрос происходит от Организатора.
      const seriesController = new SeriesOrganizerController();
      await seriesController.checkOrganizer(moderator);

      // Вызов сервиса.
      const timePenaltyService = new SeriesTimePenalty();
      const response = await timePenaltyService.modify({
        seriesId,
        stageResultId,
        timePenalty,
      });

      // Возврат успешного ответа.
      return res.status(200).json(response);
    } catch (error) {
      handleErrorInController(res, error);
    }
  };

  /**
   * Изменение временного штрафа райдера в заезде.
   * @param {Request} req - Запрос Express.
   * @param {Response} res - Ответ Express.
   * @returns {Promise<Response>} JSON-ответ с сериями.
   */
  public addStageResult = async (req: Request, res: Response): Promise<Response | void> => {
    try {
      // id авторизованного пользователя, который делает запрос.
      const userId = req.user?.id;

      const result = AddStageResultZSchema.safeParse({ ...req.body, userId });

      if (!result.success) {
        return res.status(400).json({ message: handleSafeParseErrors(result.error) });
      }

      // Проверка, что запрос происходит от Организатора.
      const seriesController = new SeriesOrganizerController();
      await seriesController.checkOrganizer(result.data.userId);

      // Вызов сервиса.
      const seriesAddStageResult = new SeriesAddStageResult();
      const response = await seriesAddStageResult.add(result.data);

      // Возврат успешного ответа.
      return res.status(200).json(response);
    } catch (error) {
      handleErrorInController(res, error);
    }
  };
}
