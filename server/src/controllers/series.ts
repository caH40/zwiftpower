import { Request, Response } from 'express';
import mongoose, { Types } from 'mongoose';

import { handleErrorInController } from '../errors/error.js';
import { SeriesService } from '../service/series/series.js';
import { Organizer } from '../Model/Organizer.js';
import { SeriesDataZSchema } from '../utils/deserialization/series/series-data.js';

// types
import {
  SeriesDataFromClientForCreate,
  SeriesStagesFromClientForPatch,
} from '../types/http.interface.js';
import { NSeriesModel } from '../Model/NSeries.js';

/**
 * Контроллер работы с сущностью "Серия заездов".
 */
export class SeriesController {
  seriesService: SeriesService;

  constructor() {
    this.seriesService = new SeriesService();
  }

  /**
   * Получает список всех серий заездов.
   * @param {Request} req - Запрос Express.
   * @param {Response} res - Ответ Express.
   * @returns {Promise<Response>} JSON-ответ с сериями.
   */
  public getAll = async (req: Request, res: Response): Promise<Response | void> => {
    try {
      // id авторизованного пользователя, который делает запрос.
      const { userId } = req.params;

      // Проверка, что запрос происходит от Организатора.
      const organizerId = await this.checkOrganizer(userId);

      // Вызов сервиса.
      const response = await this.seriesService.getAll(organizerId);

      // Возврат успешного ответа.
      return res.status(200).json(response);
    } catch (error) {
      handleErrorInController(res, error);
    }
  };

  /**
   * Контроллер получения запрашиваемой серии заездов.
   * @param {Request} req - Запрос Express.
   * @param {Response} res - Ответ Express.
   * @returns {Promise<Response>} JSON-ответ с сериями.
   */
  public get = async (req: Request, res: Response): Promise<Response | void> => {
    try {
      // id авторизованного пользователя, который делает запрос.
      const { userId, seriesId } = req.params;

      // Проверка, что запрос происходит от Организатора.
      const organizerId = await this.checkOrganizer(userId);

      // Вызов сервиса.
      const response = await this.seriesService.get({ seriesId, organizerId });

      // Возврат успешного ответа
      res.status(201).json(response);
    } catch (error) {
      handleErrorInController(res, error);
    }
  };

  /**
   * Контроллер создания серии заездов.
   * @param {Request} req - Запрос Express.
   * @param {Response} res - Ответ Express.
   * @returns {Promise<Response>} JSON-ответ с сериями.
   */
  public post = async (req: Request, res: Response): Promise<Response | void> => {
    try {
      // id авторизованного пользователя, который делает запрос.
      const { userId } = req.params;

      // Проверка, что запрос происходит от Организатора.
      const organizerId = await this.checkOrganizer(userId);

      // Получение файлов изображений, если они есть.
      const files = req.files as { [fieldname: string]: Express.Multer.File[] };
      const logoFile = files?.logoFile?.[0];
      const posterFile = files?.posterFile?.[0];

      // Десериализация данных из тела запроса.
      const deserializedSeriesData = SeriesDataZSchema.parse(
        req.body
      ) as SeriesDataFromClientForCreate;

      // Вызов сервиса.
      const response = await this.seriesService.post({
        ...deserializedSeriesData,
        organizerId,
        logoFile,
        posterFile,
      });

      // Возврат успешного ответа
      res.status(201).json(response);
    } catch (error) {
      handleErrorInController(res, error);
    }
  };

  /**
   * Контроллер обновления данных серии заездов.
   * @param {Request} req - Запрос Express.
   * @param {Response} res - Ответ Express.
   * @returns {Promise<Response>} JSON-ответ с сериями.
   */
  public put = async (req: Request, res: Response): Promise<Response | void> => {
    try {
      // id авторизованного пользователя, который делает запрос.
      const { userId } = req.params;

      // Проверка, что запрос происходит от Организатора.
      const organizerId = await this.checkOrganizer(userId);

      // Получение файлов изображений, если они есть.
      const files = req.files as { [fieldname: string]: Express.Multer.File[] };
      const logoFile = files?.logoFile?.[0];
      const posterFile = files?.posterFile?.[0];

      // Десериализация данных из тела запроса.
      const deserializedSeriesData = SeriesDataZSchema.parse(
        req.body
      ) as SeriesDataFromClientForCreate;

      // Проверка, что изменяемая Серия заездов принадлежит Организатору, редактировавшего данную Серию.
      await this.checkEditedSeries(deserializedSeriesData.seriesId, organizerId);

      // Вызов сервиса.
      const response = await this.seriesService.put({
        ...deserializedSeriesData,
        organizerId,
        logoFile,
        posterFile,
      });

      // Возврат успешного ответа
      res.status(201).json(response);
    } catch (error) {
      handleErrorInController(res, error);
    }
  };

  /**
   * Удаление серии заездов.
   * @param {Request} req - Запрос Express.
   * @param {Response} res - Ответ Express.
   * @returns {Promise<Response>} JSON-ответ с сериями.
   */
  public delete = async (req: Request, res: Response): Promise<Response | void> => {
    try {
      // id авторизованного пользователя, который делает запрос.
      const { userId } = req.params;

      // Проверка, что запрос происходит от Организатора.
      await this.checkOrganizer(userId);

      const { seriesId } = req.body;

      if (!seriesId) {
        throw new Error('Не получен seriesId для удалении Серии заездов!');
      }

      // Вызов сервиса.
      const response = await this.seriesService.delete({ seriesId });

      // Возврат успешного ответа.
      return res.status(200).json(response);
    } catch (error) {
      handleErrorInController(res, error);
    }
  };

  /**
   * Добавление/удаление этапа Серии.
   * @param {Request} req - Запрос Express.
   * @param {Response} res - Ответ Express.
   * @returns {Promise<Response>} JSON-ответ с сериями.
   */
  public patchStages = async (req: Request, res: Response): Promise<Response | void> => {
    try {
      // id авторизованного пользователя, который делает запрос.
      const { userId } = req.params;

      // Валидация данных из тела запроса.
      this.validateBodyParamsMethodPatchStages(req.body);

      const { seriesId, stage, action } = req.body;

      // Проверка, что запрос происходит от Организатора.
      const organizerId = await this.checkOrganizer(userId);

      // Проверка, что запрос происходит от Организатора.
      await this.checkEditedSeries(seriesId, organizerId);

      // Вызов сервиса.
      const response = await this.seriesService.patchStages({ seriesId, stage, action });

      // Возврат успешного ответа.
      return res.status(200).json(response);
    } catch (error) {
      handleErrorInController(res, error);
    }
  };

  /**
   * Изменение настроек этапа в Серии заездов.
   * @param {Request} req - Запрос Express.
   * @param {Response} res - Ответ Express.
   * @returns {Promise<Response>} JSON-ответ с сериями.
   */
  public patchStage = async (req: Request, res: Response): Promise<Response | void> => {
    try {
      // id авторизованного пользователя, который делает запрос.
      const { userId } = req.params;

      // Валидация данных из тела запроса.
      this.validateBodyParamsMethodPatchStage(req.body);

      const { seriesId, stage } = req.body;

      // Проверка, что запрос происходит от Организатора.
      const organizerId = await this.checkOrganizer(userId);

      // Проверка, что запрос происходит от Организатора.
      await this.checkEditedSeries(seriesId, organizerId);

      // Вызов сервиса.
      const response = await this.seriesService.patchStage({ seriesId, stage });

      // Возврат успешного ответа.
      return res.status(200).json(response);
    } catch (error) {
      handleErrorInController(res, error);
    }
  };

  /**
   * Получение актуальных (не завершившихся) серий заездов организатора (organizerId).
   * @param {Request} req - Запрос Express.
   * @param {Response} res - Ответ Express.
   * @returns {Promise<Response>} JSON-ответ с сериями.
   */
  public getActual = async (req: Request, res: Response): Promise<Response | void> => {
    try {
      // id организатора серии заездов.
      const { organizerId } = req.params;

      // Валидация данных из тела запроса.

      // Вызов сервиса.
      const response = await this.seriesService.getActual({ organizerId });

      // Возврат успешного ответа.
      return res.status(200).json(response);
    } catch (error) {
      handleErrorInController(res, error);
    }
  };

  /**
   * Проверка, что запрос происходит от Организатора.
   */
  public async checkOrganizer(userId: string): Promise<Types.ObjectId> {
    // Проверка, что userId является валидным ObjectId.
    if (!mongoose.isValidObjectId(userId)) {
      throw new Error(`userId: "${userId}" НЕ является валидным ObjectId`);
    }
    // Проверка, что запрос происходит от Организатора.
    const organizerDB = await Organizer.findOne({ creator: userId }, { _id: true }).lean<{
      _id: Types.ObjectId;
    }>();

    if (!organizerDB) {
      throw new Error('Вы не являетесь организатором заездов!');
    }

    return organizerDB._id;
  }

  /**
   * Проверка, что изменяемая Серия заездов принадлежит Организатору, редактировавшего данную Серию.
   */
  public async checkEditedSeries(
    seriesId: string | undefined,
    organizerId: Types.ObjectId
  ): Promise<void> {
    if (!seriesId) {
      throw new Error('Не получен seriesId');
    }
    // Проверка, что seriesId является валидным ObjectId.
    if (!mongoose.isValidObjectId(seriesId)) {
      throw new Error(`seriesId: "${seriesId}" НЕ является валидным ObjectId`);
    }
    // Проверка, что запрос происходит от Организатора.
    const seriesDB = await NSeriesModel.findOne(
      { _id: seriesId, organizer: organizerId },
      { _id: true }
    ).lean<{
      _id: Types.ObjectId;
    }>();

    if (!seriesDB) {
      throw new Error(
        `У вас нет прав для изменения данной Серии с _id: "${seriesId}". Так как вы не являетесь Организатором данной Серии!`
      );
    }
  }

  /**
   * Приватный метод для проверки параметров из тела запроса в методе patchStage.
   */
  private validateBodyParamsMethodPatchStage({
    seriesId,
    stage,
  }: Omit<SeriesStagesFromClientForPatch, 'action'>): void {
    // Проверка seriesId
    if (!seriesId || typeof seriesId !== 'string') {
      throw new Error('Параметр seriesId отсутствует или не является строкой');
    }

    // Проверка stage
    if (!stage || typeof stage !== 'object') {
      throw new Error('Параметр stage отсутствует или имеет неверный формат');
    }

    // Проверка stage.event (должен быть ObjectId в строковом виде)
    if (
      !stage.event ||
      typeof stage.event !== 'string' ||
      !/^[0-9a-fA-F]{24}$/.test(stage.event)
    ) {
      throw new Error('Параметр stage.event отсутствует или не является корректным ObjectId');
    }

    // Проверка stage.order (число >= 0)
    if (typeof stage.order !== 'number' || stage.order < 0) {
      throw new Error(
        'Параметр stage.order отсутствует или не является числом больше или равным 0'
      );
    }

    // Проверка stage.label (если передан, то должен быть строкой)
    if (stage.label !== undefined && typeof stage.label !== 'string') {
      throw new Error('Параметр stage.label должен быть строкой, если указан');
    }

    // Проверка stage.includeResults (boolean)
    if (typeof stage.includeResults !== 'boolean') {
      throw new Error('Параметр stage.includeResults отсутствует или не является boolean');
    }
  }

  /**
   * Приватный метод для проверки параметров из тела запроса в методе patchStages.
   */
  private validateBodyParamsMethodPatchStages({
    seriesId,
    stage,
    action,
  }: SeriesStagesFromClientForPatch): void {
    this.validateBodyParamsMethodPatchStage({ seriesId, stage });

    // Проверка action
    if (!['add', 'delete'].includes(action)) {
      throw new Error('Параметр action отсутствует или значение не равно add или delete');
    }
  }
}
