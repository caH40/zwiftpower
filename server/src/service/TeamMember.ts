// types

import { TeamMemberModel } from '../Model/TeamMember.js';
import { TTeamRole } from '../types/team.types.js';

export class TeamMemberService {
  constructor() {}

  /**
   * Получение данных участника команды.
   */
  // async get(urlSlug: string): Promise<unknown> {
  // const teamDB = await TeamModel.findOne({ urlSlug }).lean<TTeam>();
  // if (!teamDB) {
  //   throw new Error(`Не найдена запрашиваемая команда с urlSlug: "${urlSlug}"!`);
  // }
  // return { data: teamDB };
  // }

  /**
   * Создание участника команды.
   */
  async create({
    userId,
    teamRole,
    teamId,
  }: {
    userId: string;
    teamId: string;
    teamRole?: TTeamRole;
  }): Promise<{ message: string }> {
    await TeamMemberModel.create({ user: userId, role: teamRole, team: teamId });

    return { message: 'Участник добавлен в команду' };
  }
}
