import { Request, Response } from 'express';

import { handleErrorInController } from '../errors/error.js';
import { TeamService } from '../service/Team.js';
import { TeamZSchema } from '../utils/deserialization/team.js';
import { TeamStatisticsService } from '../service/TeamStatistics.js';

/**
 * Контроллер работы с сущностью "Команда".
 */
export class TeamController {
  teamService: TeamService;

  constructor() {
    this.teamService = new TeamService();
  }

  /**
   * Получает данные команды.
   */
  public get = async (req: Request, res: Response): Promise<Response | void> => {
    try {
      const urlSlug = req.params.urlSlug;

      if (!urlSlug) {
        return res.status(400).json({ message: 'В запросе не получен urlSlug команды!' });
      }

      // Вызов сервиса.
      const response = await this.teamService.get(urlSlug);

      // Возврат успешного ответа.
      return res.status(200).json(response);
    } catch (error) {
      handleErrorInController(res, error);
    }
  };

  /**
   * Получает список всех команд.
   */
  public getAll = async (req: Request, res: Response): Promise<Response | void> => {
    try {
      // Вызов сервиса.
      const response = await this.teamService.getAll();

      // Возврат успешного ответа.
      return res.status(200).json(response);
    } catch (error) {
      handleErrorInController(res, error);
    }
  };

  /**
   * Создание команды.
   */
  public post = async (req: Request, res: Response): Promise<Response | void> => {
    try {
      const userId = req.user?.id;

      if (!userId) {
        return res.status(400).json({ message: 'Не получен userId!' });
      }

      const result = TeamZSchema.safeParse(req.body);

      if (!result.success) {
        return res.status(400).json({ errors: result.error.format() });
      }

      const parsedTeamData = result.data;

      // Получение файлов изображений, если они есть.
      const files = req.files as { [fieldname: string]: Express.Multer.File[] };
      const logoFile = files?.logoFile?.[0];
      const posterFile = files?.posterFile?.[0];

      // Вызов сервиса.
      const response = await this.teamService.create({
        team: { ...parsedTeamData, creator: userId },
        logoFile,
        posterFile,
      });

      // Возврат успешного ответа.
      return res.status(200).json(response);
    } catch (error) {
      handleErrorInController(res, error);
    }
  };

  /**
   * Обновление данных команды.
   */
  public put = async (req: Request, res: Response): Promise<Response | void> => {
    try {
      const userId = req.user?.id;

      if (!userId) {
        return res.status(400).json({ message: 'Не получен userId!' });
      }

      const result = TeamZSchema.safeParse(req.body);

      if (!result.success) {
        return res.status(400).json({ errors: result.error.format() });
      }

      const parsedTeamData = result.data;

      // Получение файлов изображений, если они есть.
      const files = req.files as { [fieldname: string]: Express.Multer.File[] };
      const logoFile = files?.logoFile?.[0];
      const posterFile = files?.posterFile?.[0];

      // Вызов сервиса.
      const response = await this.teamService.put({
        team: { ...parsedTeamData, creator: userId },
        logoFile,
        posterFile,
      });

      // Возврат успешного ответа.
      return res.status(200).json(response);
    } catch (error) {
      handleErrorInController(res, error);
    }
  };

  /**
   * Обработчик заявки на вступление.
   */
  public handleJoinRequest = async (req: Request, res: Response): Promise<Response | void> => {
    try {
      const userId = req.user?.id;

      if (!userId) {
        return res.status(400).json({ message: 'Не получен userId!' });
      }

      const { urlSlug } = req.body;

      if (!urlSlug) {
        return res.status(400).json({ message: 'Не получен urlSlug команды!' });
      }

      // Вызов сервиса.
      const response = await this.teamService.handleJoinRequest({
        candidateId: userId,
        urlSlug,
      });

      // Возврат успешного ответа.
      return res.status(200).json(response);
    } catch (error) {
      handleErrorInController(res, error);
    }
  };

  /**
   * Контроллер получения списка пользователей, которые подали заявку на вступление в команду.
   */
  public getPendingRiders = async (req: Request, res: Response): Promise<Response | void> => {
    try {
      const userId = req.user?.id;

      if (!userId) {
        return res.status(400).json({ message: 'Не получен userId!' });
      }

      // Вызов сервиса.
      const response = await this.teamService.getPendingRiders(userId);

      // Возврат успешного ответа.
      return res.status(200).json(response);
    } catch (error) {
      handleErrorInController(res, error);
    }
  };

  /**
   * Контроллер получения списка заблокированных пользователей.
   */
  public getBannedRiders = async (req: Request, res: Response): Promise<Response | void> => {
    try {
      const userId = req.user?.id;

      if (!userId) {
        return res.status(400).json({ message: 'Не получен userId!' });
      }

      // Вызов сервиса.
      const response = await this.teamService.getBannedUsers(userId);

      // Возврат успешного ответа.
      return res.status(200).json(response);
    } catch (error) {
      handleErrorInController(res, error);
    }
  };

  /**
   * Контроллер получения всех результатов заездов участников команды.
   */
  public getTeamRiderResults = async (
    req: Request,
    res: Response
  ): Promise<Response | void> => {
    try {
      const urlSlug = req.params.urlSlug;
      const query = req.query as { docsOnPage?: number; page?: number };

      if (!urlSlug) {
        return res.status(400).json({ message: 'В запросе не получен urlSlug команды!' });
      }

      // Вызов сервиса.
      const response = await this.teamService.getTeamRiderResults({
        urlSlug,
        docsOnPage: query.docsOnPage,
        page: query.page,
      });

      // Возврат успешного ответа.
      return res.status(200).json(response);
    } catch (error) {
      handleErrorInController(res, error);
    }
  };

  /**
   * Контроллер получения всех результатов заездов участников команды.
   */
  public getTeamStatistics = async (req: Request, res: Response): Promise<Response | void> => {
    try {
      const urlSlug = req.params.urlSlug;

      if (!urlSlug) {
        return res.status(400).json({ message: 'В запросе не получен urlSlug команды!' });
      }

      const statisticsService = new TeamStatisticsService();
      // Вызов сервиса.
      const response = await statisticsService.get(urlSlug);

      // Возврат успешного ответа.
      return res.status(200).json(response);
    } catch (error) {
      handleErrorInController(res, error);
    }
  };
}
