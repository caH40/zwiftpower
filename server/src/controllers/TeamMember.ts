import { Request, Response } from 'express';

import { handleErrorInController } from '../errors/error.js';
import { TeamMemberService } from '../service/TeamMember.js';

// types
import { TControlMemberAction } from '../types/team.types.js';

/**
 * Контроллер работы с сущностью "Команда".
 */
export class TeamMemberController {
  teamMember: TeamMemberService;

  constructor() {
    this.teamMember = new TeamMemberService();
  }

  /**
   * Получает данные участников команды.
   * @param {Request} req - Запрос Express.
   * @param {Response} res - Ответ Express.
   * @returns {Promise<Response>} JSON-ответ с сериями.
   */
  public getAll = async (req: Request, res: Response): Promise<Response | void> => {
    try {
      const urlSlug = req.params.urlSlug;

      if (!urlSlug) {
        return res.status(400).json({ message: 'В запросе не получен urlSlug команды!' });
      }

      // Вызов сервиса.
      const response = await this.teamMember.getAll(urlSlug);

      // Возврат успешного ответа.
      return res.status(200).json(response);
    } catch (error) {
      handleErrorInController(res, error);
    }
  };

  /**
   * Контроллер управления участниками команды.
   */
  public controlMembers = async (req: Request, res: Response): Promise<Response | void> => {
    try {
      const userId = req.user?.id;
      const { action, teamMemberId } = req.body as {
        action: TControlMemberAction;
        teamMemberId: string;
      };

      if (!userId) {
        return res.status(400).json({ message: 'Не получен userId!' });
      }

      const memberService = new TeamMemberService();
      // Вызов сервиса.
      const response = await memberService.controlMembers({
        teamCreatorId: userId,
        action,
        teamMemberId,
      });

      // Возврат успешного ответа.
      return res.status(200).json(response);
    } catch (error) {
      handleErrorInController(res, error);
    }
  };

  /**
   * Контроллер управления участниками команды.
   */
  public leave = async (req: Request, res: Response): Promise<Response | void> => {
    try {
      const userId = req.user?.id;

      const { urlSlug } = req.body;

      if (!userId) {
        return res.status(400).json({ message: 'Не получен userId!' });
      }

      const memberService = new TeamMemberService();
      // Вызов сервиса.
      const response = await memberService.leave({
        teamMemberId: userId,
        urlSlug,
      });

      // Возврат успешного ответа.
      return res.status(200).json(response);
    } catch (error) {
      handleErrorInController(res, error);
    }
  };
}
